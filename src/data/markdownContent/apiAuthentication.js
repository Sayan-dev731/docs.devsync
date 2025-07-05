export const apiAuthenticationContent = `# API Authentication Guide

> [!NOTE]
> This guide explains how to secure and access the DevSync API endpoints. The DevSync API uses multiple authentication methods to ensure secure access to platform resources.

## Table of contents

- [Authentication Overview](#authentication-overview)
- [API Key Authentication](#api-key-authentication)
- [Session Authentication](#session-authentication)
- [GitHub OAuth Integration](#github-oauth-integration)
- [JWT Tokens](#jwt-tokens)
- [Rate Limiting](#rate-limiting)
- [Security Best Practices](#security-best-practices)
- [Error Handling](#error-handling)
- [Testing Authentication](#testing-authentication)

## Authentication Overview

The DevSync API supports multiple authentication methods:

1. **API Key Authentication** - For programmatic access and integrations
2. **Session Authentication** - For web browser access via GitHub OAuth
3. **JWT Tokens** - For stateless authentication (planned feature)

All API endpoints (except public ones) require either a valid API key or an active user session.

### Public Endpoints
These endpoints don't require authentication:
- \`GET /\` - Homepage
- \`GET /health\` - Health check
- \`GET /api/repos\` - List public repositories
- \`GET /auth/github\` - GitHub OAuth login

### Protected Endpoints
These endpoints require authentication:
- \`GET /api/leaderboard\` - User leaderboard
- \`POST /api/submit-pr\` - Submit pull request
- \`GET /api/users/profile\` - User profile
- \`POST /api/repos\` - Add repository (admin only)
- \`DELETE /api/repos/:id\` - Remove repository (admin only)

## API Key Authentication

### 1. Generate a Secure API Key

Use the included key generator to create a cryptographically secure API key:

\`\`\`bash
# Generate a new API key
node generateApiKey.js
\`\`\`

This will generate a 64-character hexadecimal key using Node.js crypto module:

\`\`\`javascript
// generateApiKey.js
const crypto = require('crypto');

function generateApiKey() {
  return crypto.randomBytes(32).toString('hex');
}

const apiKey = generateApiKey();
console.log('Generated API Key:', apiKey);
console.log('Add this to your .env file:');
console.log(\`API_SECRET_KEY=\${apiKey}\`);
\`\`\`

### 2. Configure Environment Variable

Add the generated key to your \`.env\` file:

\`\`\`env
API_SECRET_KEY=your-generated-64-character-key-here
\`\`\`

> [!WARNING]
> **Never commit your API key to version control!** Always use environment variables and add \`.env\` to your \`.gitignore\` file.

### 3. Using the API Key

Include the API key in the \`x-api-key\` header of your requests:

#### cURL Example
\`\`\`bash
curl -H "x-api-key: your-api-key-here" \\
  http://localhost:3000/api/leaderboard
\`\`\`

#### JavaScript Example
\`\`\`javascript
// Using fetch API
const response = await fetch('http://localhost:3000/api/leaderboard', {
  headers: {
    'x-api-key': 'your-api-key-here',
    'Content-Type': 'application/json'
  }
});

const data = await response.json();
console.log(data);
\`\`\`

#### Node.js Example
\`\`\`javascript
const axios = require('axios');

const apiClient = axios.create({
  baseURL: 'http://localhost:3000/api',
  headers: {
    'x-api-key': process.env.API_SECRET_KEY
  }
});

// Get leaderboard
const leaderboard = await apiClient.get('/leaderboard');
console.log(leaderboard.data);
\`\`\`

#### Python Example
\`\`\`python
import requests
import os

headers = {
    'x-api-key': os.getenv('API_SECRET_KEY'),
    'Content-Type': 'application/json'
}

response = requests.get(
    'http://localhost:3000/api/leaderboard',
    headers=headers
)

data = response.json()
print(data)
\`\`\`

### 4. API Key Validation Middleware

\`\`\`javascript
// middleware/apiAuth.js
const apiAuth = (req, res, next) => {
  const apiKey = req.headers['x-api-key'];
  const validApiKey = process.env.API_SECRET_KEY;

  if (!apiKey) {
    return res.status(401).json({
      error: 'API key required',
      message: 'Please provide a valid API key in the x-api-key header'
    });
  }

  if (apiKey !== validApiKey) {
    return res.status(401).json({
      error: 'Invalid API key',
      message: 'The provided API key is not valid'
    });
  }

  // API key is valid, proceed to next middleware
  next();
};

module.exports = apiAuth;
\`\`\`

## Session Authentication

### 1. GitHub OAuth Login

Users can authenticate via GitHub OAuth for web browser sessions:

\`\`\`javascript
// GitHub OAuth configuration
passport.use(new GitHubStrategy({
  clientID: process.env.GITHUB_CLIENT_ID,
  clientSecret: process.env.GITHUB_CLIENT_SECRET,
  callbackURL: process.env.GITHUB_CALLBACK_URL,
  scope: ["user", "user:email"]
}, async (accessToken, refreshToken, profile, done) => {
  try {
    let user = await User.findOne({ githubId: profile.id });
    
    if (user) {
      // Update existing user
      user.username = profile.username;
      user.displayName = profile.displayName;
      user.avatarUrl = profile.photos[0]?.value;
      user.email = profile.emails[0]?.value;
      await user.save();
    } else {
      // Create new user
      user = new User({
        githubId: profile.id,
        username: profile.username,
        displayName: profile.displayName,
        avatarUrl: profile.photos[0]?.value,
        email: profile.emails[0]?.value
      });
      await user.save();
    }
    
    return done(null, user);
  } catch (error) {
    return done(error, null);
  }
}));
\`\`\`

### 2. Session Management

\`\`\`javascript
// Session configuration
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({
    mongoUrl: process.env.MONGODB_URI,
    ttl: 24 * 60 * 60 // 24 hours
  }),
  cookie: {
    secure: process.env.NODE_ENV === 'production',
    httpOnly: true,
    maxAge: 24 * 60 * 60 * 1000 // 24 hours
  }
}));
\`\`\`

### 3. Session Authentication Middleware

\`\`\`javascript
// middleware/sessionAuth.js
const requireAuth = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  
  // For API requests, return JSON error
  if (req.path.startsWith('/api/')) {
    return res.status(401).json({
      error: 'Authentication required',
      message: 'Please log in with GitHub to access this resource'
    });
  }
  
  // For web requests, redirect to login
  res.redirect('/auth/github');
};

const requireAdmin = (req, res, next) => {
  if (!req.isAuthenticated()) {
    return res.status(401).json({
      error: 'Authentication required'
    });
  }
  
  const adminIds = process.env.ADMIN_GITHUB_IDS?.split(',') || [];
  if (!adminIds.includes(req.user.username)) {
    return res.status(403).json({
      error: 'Admin access required'
    });
  }
  
  next();
};

module.exports = { requireAuth, requireAdmin };
\`\`\`

### 4. Login/Logout Routes

\`\`\`javascript
// Authentication routes
app.get('/auth/github', passport.authenticate('github'));

app.get('/auth/github/callback',
  passport.authenticate('github', { failureRedirect: '/login' }),
  (req, res) => {
    res.redirect('/dashboard');
  }
);

app.get('/auth/logout', (req, res) => {
  req.logout((err) => {
    if (err) {
      console.error('Logout error:', err);
    }
    res.redirect('/');
  });
});
\`\`\`

## GitHub OAuth Integration

### 1. OAuth App Setup

1. **Create GitHub OAuth App**:
   - Go to GitHub Settings → Developer settings → OAuth Apps
   - Click "New OAuth App"
   - Fill in the details:
     - Application name: "DevSync"
     - Homepage URL: \`https://your-domain.com\`
     - Authorization callback URL: \`https://your-domain.com/auth/github/callback\`

2. **Configure Environment Variables**:
   \`\`\`env
   GITHUB_CLIENT_ID=your_github_client_id
   GITHUB_CLIENT_SECRET=your_github_client_secret
   GITHUB_CALLBACK_URL=https://your-domain.com/auth/github/callback
   \`\`\`

### 2. OAuth Scopes

DevSync requests the following OAuth scopes:

- \`user\`: Access to user profile information
- \`user:email\`: Access to user email addresses

\`\`\`javascript
// OAuth scope configuration
const GITHUB_SCOPES = ["user", "user:email"];
\`\`\`

### 3. OAuth Flow Implementation

\`\`\`javascript
// Complete OAuth flow
app.get('/auth/github', 
  passport.authenticate('github', { 
    scope: GITHUB_SCOPES 
  })
);

app.get('/auth/github/callback',
  passport.authenticate('github', { 
    failureRedirect: '/login?error=oauth_failed' 
  }),
  async (req, res) => {
    try {
      // Log successful authentication
      console.log(\`User \${req.user.username} authenticated successfully\`);
      
      // Redirect based on user preferences or default
      const redirectUrl = req.session.returnTo || '/dashboard';
      delete req.session.returnTo;
      
      res.redirect(redirectUrl);
    } catch (error) {
      console.error('OAuth callback error:', error);
      res.redirect('/login?error=callback_failed');
    }
  }
);
\`\`\`

## JWT Tokens

### 1. JWT Implementation (Future Feature)

\`\`\`javascript
const jwt = require('jsonwebtoken');

// Generate JWT token
function generateJWT(user) {
  const payload = {
    id: user._id,
    username: user.username,
    email: user.email,
    isAdmin: isAdmin(user.username)
  };
  
  return jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: '7d',
    issuer: 'devsync',
    audience: 'devsync-api'
  });
}

// Verify JWT token
function verifyJWT(token) {
  try {
    return jwt.verify(token, process.env.JWT_SECRET, {
      issuer: 'devsync',
      audience: 'devsync-api'
    });
  } catch (error) {
    throw new Error('Invalid or expired token');
  }
}

// JWT middleware
const jwtAuth = (req, res, next) => {
  const authHeader = req.headers.authorization;
  
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({
      error: 'JWT token required',
      message: 'Please provide a valid JWT token in the Authorization header'
    });
  }
  
  const token = authHeader.substring(7);
  
  try {
    const decoded = verifyJWT(token);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({
      error: 'Invalid JWT token',
      message: error.message
    });
  }
};
\`\`\`

## Rate Limiting

### 1. API Rate Limiting

\`\`\`javascript
const rateLimit = require('express-rate-limit');

// General API rate limiting
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
  message: {
    error: 'Too many requests',
    message: 'Rate limit exceeded. Please try again later.'
  },
  standardHeaders: true,
  legacyHeaders: false,
});

// Strict rate limiting for authentication endpoints
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // Limit each IP to 5 auth requests per windowMs
  message: {
    error: 'Too many authentication attempts',
    message: 'Please wait before trying to authenticate again.'
  }
});

// Apply rate limiting
app.use('/api/', apiLimiter);
app.use('/auth/', authLimiter);
\`\`\`

### 2. User-Specific Rate Limiting

\`\`\`javascript
// Rate limiting per user
const userRateLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 1000, // 1000 requests per hour per user
  keyGenerator: (req) => {
    return req.user?.id || req.ip;
  },
  message: {
    error: 'User rate limit exceeded',
    message: 'You have exceeded your hourly request limit.'
  }
});
\`\`\`

## Security Best Practices

### 1. Environment Security

\`\`\`env
# Use strong, randomly generated secrets
SESSION_SECRET=your-256-bit-session-secret
API_SECRET_KEY=your-256-bit-api-secret
JWT_SECRET=your-256-bit-jwt-secret

# Use secure GitHub OAuth configuration
GITHUB_CLIENT_ID=your_github_client_id
GITHUB_CLIENT_SECRET=your_github_client_secret
GITHUB_CALLBACK_URL=https://yourdomain.com/auth/github/callback
\`\`\`

### 2. Input Validation

\`\`\`javascript
const { body, validationResult } = require('express-validator');

// Validate API inputs
const validateSubmitPR = [
  body('repositoryUrl')
    .isURL()
    .matches(/^https:\\/\\/github\\.com\\/[\\w.-]+\\/[\\w.-]+$/)
    .withMessage('Must be a valid GitHub repository URL'),
  
  body('pullRequestNumber')
    .isInt({ min: 1 })
    .withMessage('Pull request number must be a positive integer'),
  
  body('description')
    .isLength({ min: 10, max: 500 })
    .withMessage('Description must be between 10 and 500 characters'),
  
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        error: 'Validation failed',
        details: errors.array()
      });
    }
    next();
  }
];
\`\`\`

### 3. Security Headers

\`\`\`javascript
const helmet = require('helmet');

// Apply security headers
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
      fontSrc: ["'self'", "https://fonts.gstatic.com"],
      imgSrc: ["'self'", "data:", "https://avatars.githubusercontent.com"],
      scriptSrc: ["'self'"]
    }
  },
  hsts: {
    maxAge: 31536000,
    includeSubDomains: true,
    preload: true
  }
}));
\`\`\`

## Error Handling

### 1. Authentication Errors

\`\`\`javascript
// Centralized error handling for authentication
const handleAuthError = (error, req, res, next) => {
  if (error.name === 'UnauthorizedError') {
    return res.status(401).json({
      error: 'Authentication failed',
      message: 'Invalid or expired authentication credentials'
    });
  }
  
  if (error.name === 'ForbiddenError') {
    return res.status(403).json({
      error: 'Access denied',
      message: 'You do not have permission to access this resource'
    });
  }
  
  // Log unexpected errors
  console.error('Authentication error:', error);
  
  res.status(500).json({
    error: 'Internal server error',
    message: 'An unexpected error occurred during authentication'
  });
};
\`\`\`

### 2. API Error Responses

\`\`\`javascript
// Standardized error responses
const createErrorResponse = (type, message, details = null) => {
  const response = {
    error: type,
    message: message,
    timestamp: new Date().toISOString()
  };
  
  if (details) {
    response.details = details;
  }
  
  return response;
};

// Usage examples
res.status(401).json(createErrorResponse(
  'Authentication required',
  'Please provide valid authentication credentials'
));

res.status(403).json(createErrorResponse(
  'Insufficient permissions',
  'Admin access required for this operation'
));

res.status(429).json(createErrorResponse(
  'Rate limit exceeded',
  'Too many requests. Please try again later.',
  { retryAfter: 60 }
));
\`\`\`

## Testing Authentication

### 1. Test API Key Authentication

\`\`\`bash
# Test with valid API key
curl -H "x-api-key: your-valid-api-key" \\
  http://localhost:3000/api/leaderboard

# Test with invalid API key
curl -H "x-api-key: invalid-key" \\
  http://localhost:3000/api/leaderboard

# Test without API key
curl http://localhost:3000/api/leaderboard
\`\`\`

### 2. Test Session Authentication

\`\`\`javascript
// Test session authentication
const request = require('supertest');
const app = require('../app');

describe('Session Authentication', () => {
  test('should redirect unauthenticated users to GitHub OAuth', async () => {
    const response = await request(app)
      .get('/dashboard')
      .expect(302);
    
    expect(response.headers.location).toContain('/auth/github');
  });
  
  test('should allow authenticated users to access protected routes', async () => {
    // Mock authenticated session
    const agent = request.agent(app);
    
    // Simulate successful OAuth callback
    await agent
      .get('/auth/github/callback?code=mock-auth-code')
      .expect(302);
    
    // Test access to protected route
    await agent
      .get('/api/users/profile')
      .expect(200);
  });
});
\`\`\`

### 3. Test Rate Limiting

\`\`\`javascript
// Test rate limiting
describe('Rate Limiting', () => {
  test('should enforce API rate limits', async () => {
    const apiKey = process.env.API_SECRET_KEY;
    
    // Make requests up to the limit
    for (let i = 0; i < 100; i++) {
      await request(app)
        .get('/api/leaderboard')
        .set('x-api-key', apiKey)
        .expect(200);
    }
    
    // The next request should be rate limited
    await request(app)
      .get('/api/leaderboard')
      .set('x-api-key', apiKey)
      .expect(429);
  });
});
\`\`\`

---

> [!TIP]
> **Need Help?** For authentication issues, check our [troubleshooting guide](deployment-guide#troubleshooting) or open an issue on [GitHub](https://github.com/your-username/devsync/issues).
`;
