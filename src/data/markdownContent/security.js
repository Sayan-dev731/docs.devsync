export const securityContent = `# Security Policy & Guidelines

> [!NOTE]
> DevSync takes security seriously and implements multiple layers of protection to safeguard user data, prevent unauthorized access, and maintain platform integrity. This document outlines our security measures, reporting procedures, and best practices.

## Table of contents

- [Security Overview](#security-overview)
- [Authentication & Authorization](#authentication--authorization)
- [Data Protection](#data-protection)
- [Input Validation & Sanitization](#input-validation--sanitization)
- [Session Security](#session-security)
- [API Security](#api-security)
- [Database Security](#database-security)
- [Infrastructure Security](#infrastructure-security)
- [Security Monitoring](#security-monitoring)
- [Vulnerability Reporting](#vulnerability-reporting)
- [Security Best Practices](#security-best-practices)

## Security Overview

### Security Architecture

DevSync implements a multi-layered security approach:

\`\`\`
Security Layers
├── Application Layer
│   ├── Input Validation
│   ├── Output Encoding
│   ├── Authentication
│   └── Authorization
├── Session Layer
│   ├── Secure Cookies
│   ├── CSRF Protection
│   └── Session Management
├── API Layer
│   ├── Rate Limiting
│   ├── API Key Validation
│   └── Request Validation
├── Database Layer
│   ├── Query Sanitization
│   ├── Connection Security
│   └── Data Encryption
└── Infrastructure Layer
    ├── HTTPS/TLS
    ├── Firewall Rules
    └── Server Hardening
\`\`\`

### Security Principles

1. **Defense in Depth**: Multiple security layers
2. **Least Privilege**: Minimal required permissions
3. **Fail Secure**: Secure defaults and error handling
4. **Security by Design**: Built-in security from the start
5. **Regular Updates**: Keep dependencies current
6. **Monitoring & Logging**: Continuous security monitoring

## Authentication & Authorization

### 1. OAuth2 Implementation

DevSync uses GitHub OAuth2 for secure third-party authentication:

\`\`\`javascript
// Secure OAuth2 configuration
passport.use(new GitHubStrategy({
  clientID: process.env.GITHUB_CLIENT_ID,
  clientSecret: process.env.GITHUB_CLIENT_SECRET,
  callbackURL: process.env.GITHUB_CALLBACK_URL,
  scope: ["user", "user:email"], // Minimal required scopes
  state: true // CSRF protection
}, async (accessToken, refreshToken, profile, done) => {
  try {
    // Validate and sanitize profile data
    const sanitizedProfile = sanitizeGitHubProfile(profile);
    
    // Find or create user with rate limiting
    const user = await findOrCreateUser(sanitizedProfile);
    
    return done(null, user);
  } catch (error) {
    console.error('OAuth authentication error:', error);
    return done(error, null);
  }
}));
\`\`\`

### 2. Session Security

\`\`\`javascript
// Secure session configuration
app.use(session({
  secret: process.env.SESSION_SECRET, // 256-bit random secret
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({
    mongoUrl: process.env.MONGODB_URI,
    ttl: 24 * 60 * 60, // 24 hours
    autoRemove: 'native',
    crypto: {
      secret: process.env.SESSION_ENCRYPTION_KEY
    }
  }),
  cookie: {
    secure: process.env.NODE_ENV === 'production', // HTTPS only in production
    httpOnly: true, // Prevent XSS attacks
    maxAge: 24 * 60 * 60 * 1000, // 24 hours
    sameSite: process.env.NODE_ENV === 'production' ? 'strict' : 'lax'
  },
  name: 'devsync.sid' // Custom session name
}));
\`\`\`

### 3. Role-Based Access Control (RBAC)

\`\`\`javascript
// Admin authorization middleware
const isAdmin = (req, res, next) => {
  if (!req.isAuthenticated()) {
    return res.status(401).json({ 
      error: 'Authentication required' 
    });
  }
  
  const adminIds = process.env.ADMIN_GITHUB_IDS?.split(',') || [];
  
  if (!adminIds.includes(req.user.username)) {
    // Log unauthorized access attempt
    console.warn(\`Unauthorized admin access attempt by user: \${req.user.username}\`);
    
    return res.status(403).json({ 
      error: 'Admin access required',
      message: 'This operation requires administrative privileges'
    });
  }
  
  next();
};

// Resource ownership validation
const canAccessResource = (resourceType) => {
  return async (req, res, next) => {
    try {
      const resourceId = req.params.id;
      const userId = req.user.id;
      
      const resource = await getResource(resourceType, resourceId);
      
      if (!resource) {
        return res.status(404).json({ error: 'Resource not found' });
      }
      
      // Check ownership or admin status
      if (resource.userId !== userId && !isUserAdmin(req.user)) {
        return res.status(403).json({ 
          error: 'Access denied',
          message: 'You do not have permission to access this resource'
        });
      }
      
      req.resource = resource;
      next();
    } catch (error) {
      console.error('Resource access validation error:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };
};
\`\`\`

## Data Protection

### 1. Input Validation & Sanitization

\`\`\`javascript
const { body, param, query, validationResult } = require('express-validator');
const DOMPurify = require('isomorphic-dompurify');

// Comprehensive input validation
const validateUserInput = [
  // Sanitize and validate username
  body('username')
    .trim()
    .isLength({ min: 1, max: 39 })
    .matches(/^[a-zA-Z0-9]([a-zA-Z0-9-]*[a-zA-Z0-9])?$/)
    .withMessage('Username must be valid GitHub username format'),
    
  // Sanitize and validate email
  body('email')
    .trim()
    .isEmail()
    .normalizeEmail()
    .isLength({ max: 254 })
    .withMessage('Must be a valid email address'),
    
  // Sanitize HTML content
  body('description')
    .customSanitizer(value => {
      return DOMPurify.sanitize(value, {
        ALLOWED_TAGS: ['b', 'i', 'em', 'strong', 'p', 'br'],
        ALLOWED_ATTR: []
      });
    })
    .isLength({ min: 1, max: 1000 })
    .withMessage('Description must be between 1 and 1000 characters'),
    
  // Validate URLs
  body('repositoryUrl')
    .isURL({ protocols: ['https'] })
    .matches(/^https:\\/\\/github\\.com\\/[\\w.-]+\\/[\\w.-]+$/)
    .withMessage('Must be a valid GitHub repository URL'),
    
  // Handle validation errors
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        error: 'Validation failed',
        details: errors.array().map(err => ({
          field: err.param,
          message: err.msg,
          value: err.value
        }))
      });
    }
    next();
  }
];

// Custom sanitization functions
const sanitizeGitHubProfile = (profile) => {
  return {
    id: parseInt(profile.id),
    username: profile.username?.replace(/[^a-zA-Z0-9-]/g, '').substring(0, 39),
    displayName: profile.displayName?.substring(0, 100),
    email: isValidEmail(profile.emails?.[0]?.value) ? profile.emails[0].value : null,
    avatarUrl: isValidUrl(profile.photos?.[0]?.value) ? profile.photos[0].value : null,
    bio: profile._json?.bio?.substring(0, 500) || null
  };
};
\`\`\`

### 2. Output Encoding

\`\`\`javascript
const he = require('he');

// HTML encoding for user-generated content
const encodeHtml = (text) => {
  if (!text) return '';
  return he.encode(text, {
    useNamedReferences: true,
    decimal: false
  });
};

// JSON response sanitization
const sanitizeJsonResponse = (data) => {
  if (typeof data === 'string') {
    return encodeHtml(data);
  }
  
  if (Array.isArray(data)) {
    return data.map(sanitizeJsonResponse);
  }
  
  if (typeof data === 'object' && data !== null) {
    const sanitized = {};
    for (const [key, value] of Object.entries(data)) {
      sanitized[key] = sanitizeJsonResponse(value);
    }
    return sanitized;
  }
  
  return data;
};

// Response middleware
app.use((req, res, next) => {
  const originalJson = res.json;
  
  res.json = function(data) {
    const sanitizedData = sanitizeJsonResponse(data);
    return originalJson.call(this, sanitizedData);
  };
  
  next();
});
\`\`\`

## Session Security

### 1. CSRF Protection

\`\`\`javascript
const csrf = require('csurf');

// CSRF protection middleware
const csrfProtection = csrf({
  cookie: {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict'
  }
});

// Apply CSRF protection to state-changing operations
app.use('/api', (req, res, next) => {
  if (['POST', 'PUT', 'DELETE', 'PATCH'].includes(req.method)) {
    return csrfProtection(req, res, next);
  }
  next();
});

// Provide CSRF token to frontend
app.get('/api/csrf-token', csrfProtection, (req, res) => {
  res.json({ csrfToken: req.csrfToken() });
});
\`\`\`

### 2. Session Fixation Prevention

\`\`\`javascript
// Regenerate session ID after authentication
passport.use('github', new GitHubStrategy({
  // ... strategy config
}, async (accessToken, refreshToken, profile, done) => {
  try {
    const user = await authenticateUser(profile);
    
    // Session will be regenerated by passport
    return done(null, user);
  } catch (error) {
    return done(error, null);
  }
}));

// Manual session regeneration
const regenerateSession = (req, res, next) => {
  const oldSession = req.session;
  req.session.regenerate((err) => {
    if (err) {
      console.error('Session regeneration error:', err);
      return next(err);
    }
    
    // Restore important session data
    Object.assign(req.session, oldSession);
    next();
  });
};
\`\`\`

## API Security

### 1. Rate Limiting

\`\`\`javascript
const rateLimit = require('express-rate-limit');
const slowDown = require('express-slow-down');

// Aggressive rate limiting for authentication endpoints
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // 5 attempts per window
  skipSuccessfulRequests: true,
  message: {
    error: 'Too many authentication attempts',
    retryAfter: '15 minutes'
  },
  standardHeaders: true,
  legacyHeaders: false
});

// General API rate limiting
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // 100 requests per window
  message: {
    error: 'Rate limit exceeded',
    retryAfter: '15 minutes'
  }
});

// Progressive delay for suspicious behavior
const speedLimiter = slowDown({
  windowMs: 15 * 60 * 1000, // 15 minutes
  delayAfter: 50, // allow 50 requests per window at full speed
  delayMs: 500, // add 500ms delay per request after delayAfter
  maxDelayMs: 20000 // max delay of 20 seconds
});

// Apply rate limiting
app.use('/auth', authLimiter);
app.use('/api', apiLimiter, speedLimiter);
\`\`\`

### 2. API Key Security

\`\`\`javascript
const crypto = require('crypto');

// Secure API key validation with timing attack protection
const validateApiKey = (provided, expected) => {
  if (!provided || !expected) {
    return false;
  }
  
  // Use timing-safe comparison to prevent timing attacks
  return crypto.timingSafeEqual(
    Buffer.from(provided, 'utf8'),
    Buffer.from(expected, 'utf8')
  );
};

// API key middleware with enhanced security
const apiKeyAuth = (req, res, next) => {
  const apiKey = req.headers['x-api-key'];
  const validApiKey = process.env.API_SECRET_KEY;
  
  if (!validateApiKey(apiKey, validApiKey)) {
    // Log failed API key attempts
    console.warn(\`Invalid API key attempt from IP: \${req.ip}\`);
    
    return res.status(401).json({
      error: 'Invalid API key',
      message: 'Please provide a valid API key'
    });
  }
  
  next();
};
\`\`\`

## Database Security

### 1. Query Sanitization

\`\`\`javascript
const mongoose = require('mongoose');

// Prevent NoSQL injection
app.use((req, res, next) => {
  // Remove any keys that start with '$' or contain '.'
  const sanitizeObject = (obj) => {
    if (obj && typeof obj === 'object') {
      for (const key in obj) {
        if (key.startsWith('$') || key.includes('.')) {
          delete obj[key];
        } else if (typeof obj[key] === 'object') {
          sanitizeObject(obj[key]);
        }
      }
    }
  };
  
  sanitizeObject(req.body);
  sanitizeObject(req.query);
  sanitizeObject(req.params);
  
  next();
});

// Use parameterized queries
const findUserSecurely = async (username) => {
  // Good: Uses Mongoose's built-in sanitization
  return await User.findOne({ 
    username: { $eq: username } 
  });
  
  // Avoid: Direct string interpolation
  // return await User.findOne({ username: username });
};
\`\`\`

### 2. Connection Security

\`\`\`javascript
// Secure MongoDB connection
const mongoOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  maxPoolSize: 10,
  serverSelectionTimeoutMS: 5000,
  socketTimeoutMS: 45000,
  bufferMaxEntries: 0,
  
  // Security options
  ssl: process.env.NODE_ENV === 'production',
  sslValidate: true,
  authSource: 'admin'
};

mongoose.connect(process.env.MONGODB_URI, mongoOptions);

// Monitor connection events
mongoose.connection.on('error', (err) => {
  console.error('MongoDB connection error:', err);
});

mongoose.connection.on('disconnected', () => {
  console.warn('MongoDB disconnected');
});
\`\`\`

## Infrastructure Security

### 1. HTTPS/TLS Configuration

\`\`\`javascript
const https = require('https');
const fs = require('fs');

// Production HTTPS server
if (process.env.NODE_ENV === 'production') {
  const options = {
    key: fs.readFileSync(process.env.SSL_PRIVATE_KEY),
    cert: fs.readFileSync(process.env.SSL_CERTIFICATE),
    
    // Security options
    secureProtocol: 'TLSv1_2_method',
    ciphers: [
      'ECDHE-RSA-AES128-GCM-SHA256',
      'ECDHE-RSA-AES256-GCM-SHA384',
      'ECDHE-RSA-AES128-SHA256',
      'ECDHE-RSA-AES256-SHA384'
    ].join(':'),
    honorCipherOrder: true
  };
  
  https.createServer(options, app).listen(443, () => {
    console.log('HTTPS Server running on port 443');
  });
}
\`\`\`

### 2. Security Headers

\`\`\`javascript
const helmet = require('helmet');

// Comprehensive security headers
app.use(helmet({
  // Content Security Policy
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
      fontSrc: ["'self'", "https://fonts.gstatic.com"],
      imgSrc: ["'self'", "data:", "https://avatars.githubusercontent.com"],
      scriptSrc: ["'self'"],
      connectSrc: ["'self'", "https://api.github.com"],
      frameSrc: ["'none'"],
      objectSrc: ["'none'"],
      baseUri: ["'self'"]
    }
  },
  
  // HTTP Strict Transport Security
  hsts: {
    maxAge: 31536000, // 1 year
    includeSubDomains: true,
    preload: true
  },
  
  // Additional security headers
  noSniff: true,
  frameguard: { action: 'deny' },
  xssFilter: true,
  referrerPolicy: { policy: 'strict-origin-when-cross-origin' }
}));

// Custom security headers
app.use((req, res, next) => {
  res.setHeader('X-Powered-By', ''); // Remove server fingerprinting
  res.setHeader('Server', ''); // Remove server header
  next();
});
\`\`\`

## Security Monitoring

### 1. Logging & Monitoring

\`\`\`javascript
const winston = require('winston');

// Security event logging
const securityLogger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.errors({ stack: true }),
    winston.format.json()
  ),
  transports: [
    new winston.transports.File({ 
      filename: 'logs/security.log',
      level: 'warn'
    }),
    new winston.transports.Console({
      format: winston.format.simple()
    })
  ]
});

// Log security events
const logSecurityEvent = (type, details, req) => {
  securityLogger.warn('Security Event', {
    type: type,
    timestamp: new Date().toISOString(),
    ip: req.ip,
    userAgent: req.get('User-Agent'),
    userId: req.user?.id,
    details: details
  });
};

// Example usage
app.use('/admin', (req, res, next) => {
  if (!isAdmin(req.user)) {
    logSecurityEvent('Unauthorized Admin Access', {
      attemptedRoute: req.path,
      username: req.user?.username
    }, req);
  }
  next();
});
\`\`\`

### 2. Intrusion Detection

\`\`\`javascript
// Simple intrusion detection
const suspiciousActivity = new Map();

const detectSuspiciousActivity = (req, res, next) => {
  const ip = req.ip;
  const now = Date.now();
  
  if (!suspiciousActivity.has(ip)) {
    suspiciousActivity.set(ip, {
      requests: 0,
      firstRequest: now,
      failedAuth: 0
    });
  }
  
  const activity = suspiciousActivity.get(ip);
  activity.requests++;
  
  // Check for suspicious patterns
  if (activity.requests > 1000 && (now - activity.firstRequest) < 60000) {
    logSecurityEvent('Potential DDoS', {
      ip: ip,
      requestCount: activity.requests,
      timeWindow: now - activity.firstRequest
    }, req);
    
    return res.status(429).json({
      error: 'Suspicious activity detected'
    });
  }
  
  next();
};

app.use(detectSuspiciousActivity);
\`\`\`

## Vulnerability Reporting

### 1. Security Contact

For security vulnerabilities, please contact us at:
- **Email**: security@devsync.dev
- **PGP Key**: [Download our PGP key](/.well-known/security.txt)
- **Response Time**: We aim to respond within 24 hours

### 2. Responsible Disclosure

We follow responsible disclosure practices:

1. **Report**: Send details to security@devsync.dev
2. **Acknowledgment**: We'll acknowledge receipt within 24 hours
3. **Investigation**: We'll investigate and provide updates
4. **Resolution**: We'll work on a fix and coordinate disclosure
5. **Recognition**: We'll credit researchers (if desired)

### 3. Bug Bounty Scope

**In Scope:**
- Authentication bypasses
- SQL/NoSQL injection
- Cross-site scripting (XSS)
- Cross-site request forgery (CSRF)
- Server-side request forgery (SSRF)
- Remote code execution
- Privilege escalation

**Out of Scope:**
- Social engineering attacks
- Physical attacks
- Denial of service attacks
- Issues in third-party services
- Non-security-impacting bugs

## Security Best Practices

### 1. Development Security

\`\`\`javascript
// Security checklist for developers
const securityChecklist = {
  input: [
    'Validate all user inputs',
    'Sanitize output data',
    'Use parameterized queries',
    'Implement rate limiting'
  ],
  
  authentication: [
    'Use strong session secrets',
    'Implement proper logout',
    'Protect against session fixation',
    'Use secure cookie settings'
  ],
  
  authorization: [
    'Implement least privilege',
    'Validate resource ownership',
    'Use role-based access control',
    'Check permissions on every request'
  ],
  
  communication: [
    'Use HTTPS everywhere',
    'Validate SSL certificates',
    'Implement HSTS',
    'Set secure headers'
  ]
};
\`\`\`

### 2. Deployment Security

\`\`\`bash
# Production deployment security checklist

# Environment security
export NODE_ENV=production
export SESSION_SECRET=$(openssl rand -hex 32)
export API_SECRET_KEY=$(openssl rand -hex 32)

# Database security
# - Use strong passwords
# - Enable authentication
# - Use SSL connections
# - Regular backups

# Server security
# - Keep OS updated
# - Configure firewall
# - Disable unnecessary services
# - Regular security scans
\`\`\`

### 3. Ongoing Security

1. **Regular Updates**
   \`\`\`bash
   # Check for vulnerabilities
   npm audit
   npm audit fix
   
   # Update dependencies
   npm update
   \`\`\`

2. **Security Testing**
   \`\`\`bash
   # Run security tests
   npm run test:security
   
   # Static analysis
   npm run lint:security
   
   # Dependency scanning
   npm run scan:dependencies
   \`\`\`

3. **Monitoring**
   - Monitor logs for suspicious activity
   - Set up alerts for security events
   - Regular security assessments
   - Penetration testing

---

> [!WARNING]
> **Security is Everyone's Responsibility**: All team members should follow these security guidelines and report potential vulnerabilities immediately.

> [!TIP]
> **Need Help?** For security questions or to report vulnerabilities, contact our security team at security@devsync.dev.
`;
