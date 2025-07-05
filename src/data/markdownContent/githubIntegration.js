export const githubIntegrationContent = `# GitHub Integration Documentation

> [!NOTE]
> DevSync's GitHub integration is the cornerstone of the platform, providing seamless authentication, contribution tracking, and repository management. The integration uses GitHub's OAuth2 flow for authentication and the GitHub API for data synchronization.

## Table of contents

- [GitHub Integration Overview](#github-integration-overview)
- [Integration Architecture](#integration-architecture)
- [Authentication Flow](#authentication-flow)
- [GitHub API Usage](#github-api-usage)
- [Repository Management](#repository-management)
- [Contribution Tracking](#contribution-tracking)
- [Webhook Integration](#webhook-integration)
- [Rate Limiting](#rate-limiting)
- [Error Handling](#error-handling)
- [Security Considerations](#security-considerations)

## GitHub Integration Overview

### Integration Features
- **OAuth2 Authentication**: Secure user login with GitHub credentials
- **Profile Synchronization**: Automatic user profile data retrieval
- **Repository Validation**: Verify repository existence and accessibility
- **Contribution Tracking**: Monitor and record user contributions
- **Real-time Updates**: Webhook-based notification system (planned)

### Required Permissions
- \`user\`: Access to user profile information
- \`user:email\`: Access to user email addresses
- \`public_repo\`: Access to public repository information

## Integration Architecture

\`\`\`
DevSync Platform
├── GitHub OAuth2 Authentication
│   ├── Login Flow
│   ├── User Profile Sync
│   └── Session Management
├── GitHub API Integration
│   ├── Repository Validation
│   ├── Contribution Tracking
│   └── User Data Fetching
└── Webhook Integration (Future)
    ├── Real-time PR Updates
    └── Automatic Point Attribution
\`\`\`

## Authentication Flow

### OAuth2 Implementation

DevSync uses GitHub's OAuth2 flow for secure user authentication:

\`\`\`javascript
// GitHub Strategy Configuration
passport.use(new GitHubStrategy({
  clientID: process.env.GITHUB_CLIENT_ID,
  clientSecret: process.env.GITHUB_CLIENT_SECRET,
  callbackURL: process.env.GITHUB_CALLBACK_URL,
  scope: ["user", "user:email"]
}, async (accessToken, refreshToken, profile, done) => {
  try {
    let user = await User.findOne({ githubId: profile.id });
    
    if (user) {
      // Update existing user profile
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
        email: profile.emails[0]?.value,
        joinedAt: new Date()
      });
      await user.save();
    }
    
    return done(null, user);
  } catch (error) {
    return done(error, null);
  }
}));
\`\`\`

### Authentication Sequence

\`\`\`mermaid
sequenceDiagram
    participant User
    participant DevSync
    participant GitHub
    
    User->>DevSync: Click "Login with GitHub"
    DevSync->>GitHub: Redirect to OAuth authorization
    GitHub->>User: Show authorization prompt
    User->>GitHub: Grant permissions
    GitHub->>DevSync: Redirect with authorization code
    DevSync->>GitHub: Exchange code for access token
    GitHub->>DevSync: Return access token
    DevSync->>GitHub: Fetch user profile data
    GitHub->>DevSync: Return user data
    DevSync->>User: Create session and redirect to dashboard
\`\`\`

### Setup Instructions

1. **Create GitHub OAuth App**
   - Go to GitHub Settings > Developer settings > OAuth Apps
   - Click "New OAuth App"
   - Configure the following:
     - Application name: "DevSync"
     - Homepage URL: \`https://your-domain.com\`
     - Authorization callback URL: \`https://your-domain.com/auth/github/callback\`

2. **Configure Environment Variables**
   \`\`\`env
   GITHUB_CLIENT_ID=your_client_id_here
   GITHUB_CLIENT_SECRET=your_client_secret_here
   GITHUB_CALLBACK_URL=https://your-domain.com/auth/github/callback
   \`\`\`

3. **Test Authentication**
   \`\`\`bash
   # Start the application
   npm start
   
   # Navigate to login page
   open http://localhost:3000/login
   \`\`\`

## GitHub API Usage

### API Client Configuration

\`\`\`javascript
const { Octokit } = require('@octokit/rest');

// Initialize Octokit client
const octokit = new Octokit({
  auth: process.env.GITHUB_PERSONAL_ACCESS_TOKEN,
  userAgent: 'DevSync v1.0.0'
});

// Rate limiting configuration
const rateLimitConfig = {
  maxRequests: 5000, // GitHub's rate limit
  perHour: 1,
  buffer: 100 // Safety buffer
};
\`\`\`

### Common API Operations

#### User Information Retrieval

\`\`\`javascript
async function fetchUserData(username) {
  try {
    const { data: user } = await octokit.rest.users.getByUsername({
      username: username
    });
    
    return {
      id: user.id,
      login: user.login,
      name: user.name,
      email: user.email,
      bio: user.bio,
      location: user.location,
      company: user.company,
      blog: user.blog,
      avatar_url: user.avatar_url,
      public_repos: user.public_repos,
      followers: user.followers,
      following: user.following,
      created_at: user.created_at
    };
  } catch (error) {
    console.error('Error fetching user data:', error);
    throw error;
  }
}
\`\`\`

#### Repository Validation

\`\`\`javascript
async function validateRepository(owner, repo) {
  try {
    const { data: repository } = await octokit.rest.repos.get({
      owner: owner,
      repo: repo
    });
    
    return {
      id: repository.id,
      name: repository.name,
      full_name: repository.full_name,
      description: repository.description,
      private: repository.private,
      html_url: repository.html_url,
      clone_url: repository.clone_url,
      language: repository.language,
      stargazers_count: repository.stargazers_count,
      forks_count: repository.forks_count,
      open_issues_count: repository.open_issues_count,
      default_branch: repository.default_branch,
      created_at: repository.created_at,
      updated_at: repository.updated_at
    };
  } catch (error) {
    if (error.status === 404) {
      throw new Error('Repository not found or not accessible');
    }
    throw error;
  }
}
\`\`\`

#### Pull Request Information

\`\`\`javascript
async function fetchPullRequest(owner, repo, pullNumber) {
  try {
    const { data: pullRequest } = await octokit.rest.pulls.get({
      owner: owner,
      repo: repo,
      pull_number: pullNumber
    });
    
    return {
      id: pullRequest.id,
      number: pullRequest.number,
      title: pullRequest.title,
      body: pullRequest.body,
      state: pullRequest.state,
      merged: pullRequest.merged,
      merged_at: pullRequest.merged_at,
      user: {
        login: pullRequest.user.login,
        id: pullRequest.user.id
      },
      head: {
        ref: pullRequest.head.ref,
        sha: pullRequest.head.sha
      },
      base: {
        ref: pullRequest.base.ref,
        sha: pullRequest.base.sha
      },
      created_at: pullRequest.created_at,
      updated_at: pullRequest.updated_at
    };
  } catch (error) {
    console.error('Error fetching pull request:', error);
    throw error;
  }
}
\`\`\`

## Repository Management

### Adding Repositories

\`\`\`javascript
async function addRepository(owner, repoName, adminUserId) {
  try {
    // Validate repository exists
    const repoData = await validateRepository(owner, repoName);
    
    // Check if repository already exists
    const existingRepo = await Repo.findOne({
      name: repoName,
      owner: owner
    });
    
    if (existingRepo) {
      throw new Error('Repository already registered');
    }
    
    // Create new repository record
    const newRepo = new Repo({
      githubId: repoData.id,
      name: repoName,
      owner: owner,
      fullName: repoData.full_name,
      description: repoData.description,
      url: repoData.html_url,
      language: repoData.language,
      stars: repoData.stargazers_count,
      forks: repoData.forks_count,
      isPrivate: repoData.private,
      addedBy: adminUserId,
      addedAt: new Date()
    });
    
    await newRepo.save();
    return newRepo;
  } catch (error) {
    console.error('Error adding repository:', error);
    throw error;
  }
}
\`\`\`

### Repository Synchronization

\`\`\`javascript
async function syncRepositoryData(repoId) {
  try {
    const repo = await Repo.findById(repoId);
    if (!repo) {
      throw new Error('Repository not found');
    }
    
    // Fetch latest repository data
    const repoData = await validateRepository(repo.owner, repo.name);
    
    // Update repository information
    repo.description = repoData.description;
    repo.language = repoData.language;
    repo.stars = repoData.stargazers_count;
    repo.forks = repoData.forks_count;
    repo.lastSyncAt = new Date();
    
    await repo.save();
    return repo;
  } catch (error) {
    console.error('Error syncing repository:', error);
    throw error;
  }
}
\`\`\`

## Contribution Tracking

### Pull Request Verification

\`\`\`javascript
async function verifyContribution(owner, repo, prNumber, userId) {
  try {
    // Fetch pull request data
    const prData = await fetchPullRequest(owner, repo, prNumber);
    
    // Get user information
    const user = await User.findById(userId);
    if (!user) {
      throw new Error('User not found');
    }
    
    // Verify the PR belongs to the user
    if (prData.user.login !== user.username) {
      throw new Error('Pull request does not belong to this user');
    }
    
    // Check if PR is merged
    if (!prData.merged) {
      throw new Error('Pull request is not merged');
    }
    
    return {
      verified: true,
      prData: prData,
      points: calculateContributionPoints(prData)
    };
  } catch (error) {
    console.error('Error verifying contribution:', error);
    return {
      verified: false,
      error: error.message
    };
  }
}

function calculateContributionPoints(prData) {
  let points = 10; // Base points for merged PR
  
  // Bonus points based on PR complexity (simplified)
  if (prData.title.toLowerCase().includes('feature')) points += 5;
  if (prData.title.toLowerCase().includes('bug')) points += 3;
  if (prData.title.toLowerCase().includes('docs')) points += 2;
  
  return points;
}
\`\`\`

### Automatic Contribution Detection

\`\`\`javascript
async function detectUserContributions(username) {
  try {
    const user = await User.findOne({ username: username });
    if (!user) {
      throw new Error('User not found');
    }
    
    // Get all registered repositories
    const repos = await Repo.find({});
    const contributions = [];
    
    for (const repo of repos) {
      try {
        // Search for user's pull requests in this repository
        const { data: pulls } = await octokit.rest.pulls.list({
          owner: repo.owner,
          repo: repo.name,
          creator: username,
          state: 'closed',
          per_page: 100
        });
        
        // Filter merged PRs
        const mergedPRs = pulls.filter(pr => pr.merged_at);
        
        for (const pr of mergedPRs) {
          // Check if this contribution is already recorded
          const existingContribution = user.mergedPRs.find(
            existing => existing.repoId === repo._id.toString() && 
                       existing.prNumber === pr.number
          );
          
          if (!existingContribution) {
            contributions.push({
              repoId: repo._id,
              prNumber: pr.number,
              title: pr.title,
              mergedAt: new Date(pr.merged_at),
              points: calculateContributionPoints(pr)
            });
          }
        }
      } catch (error) {
        console.error(\`Error checking repo \${repo.fullName}:\`, error);
        continue;
      }
    }
    
    return contributions;
  } catch (error) {
    console.error('Error detecting contributions:', error);
    throw error;
  }
}
\`\`\`

## Webhook Integration

### Webhook Setup (Future Feature)

\`\`\`javascript
// Webhook endpoint for GitHub events
app.post('/webhook/github', express.raw({type: 'application/json'}), (req, res) => {
  const signature = req.headers['x-hub-signature-256'];
  const payload = req.body;
  
  // Verify webhook signature
  const expectedSignature = \`sha256=\${crypto
    .createHmac('sha256', process.env.GITHUB_WEBHOOK_SECRET)
    .update(payload)
    .digest('hex')}\`;
  
  if (signature !== expectedSignature) {
    return res.status(401).send('Unauthorized');
  }
  
  const event = JSON.parse(payload);
  const eventType = req.headers['x-github-event'];
  
  // Handle different event types
  switch (eventType) {
    case 'pull_request':
      handlePullRequestEvent(event);
      break;
    case 'push':
      handlePushEvent(event);
      break;
    default:
      console.log(\`Unhandled event type: \${eventType}\`);
  }
  
  res.status(200).send('OK');
});

async function handlePullRequestEvent(event) {
  if (event.action === 'closed' && event.pull_request.merged) {
    // PR was merged - award points automatically
    const username = event.pull_request.user.login;
    const repoFullName = event.repository.full_name;
    const prNumber = event.pull_request.number;
    
    await awardContributionPoints(username, repoFullName, prNumber);
  }
}
\`\`\`

## Rate Limiting

### Rate Limit Management

\`\`\`javascript
class GitHubRateLimiter {
  constructor() {
    this.requests = [];
    this.maxRequests = 5000; // GitHub's hourly limit
    this.windowMs = 60 * 60 * 1000; // 1 hour
  }
  
  async checkRateLimit() {
    const now = Date.now();
    
    // Remove old requests outside the window
    this.requests = this.requests.filter(
      timestamp => now - timestamp < this.windowMs
    );
    
    // Check if we're approaching the limit
    if (this.requests.length >= this.maxRequests - 100) {
      const oldestRequest = Math.min(...this.requests);
      const waitTime = this.windowMs - (now - oldestRequest);
      
      console.warn(\`Rate limit approaching, waiting \${waitTime}ms\`);
      await new Promise(resolve => setTimeout(resolve, waitTime));
    }
    
    // Record this request
    this.requests.push(now);
  }
  
  async makeRequest(requestFn) {
    await this.checkRateLimit();
    return await requestFn();
  }
}

const rateLimiter = new GitHubRateLimiter();

// Usage
const userData = await rateLimiter.makeRequest(() =>
  octokit.rest.users.getByUsername({ username: 'example' })
);
\`\`\`

## Error Handling

### Common Error Scenarios

\`\`\`javascript
class GitHubApiError extends Error {
  constructor(message, status, response) {
    super(message);
    this.name = 'GitHubApiError';
    this.status = status;
    this.response = response;
  }
}

async function handleGitHubApiCall(apiCall) {
  try {
    return await apiCall();
  } catch (error) {
    switch (error.status) {
      case 401:
        throw new GitHubApiError('Unauthorized - Invalid token', 401, error);
      case 403:
        if (error.response?.headers['x-ratelimit-remaining'] === '0') {
          throw new GitHubApiError('Rate limit exceeded', 403, error);
        }
        throw new GitHubApiError('Forbidden - Insufficient permissions', 403, error);
      case 404:
        throw new GitHubApiError('Resource not found', 404, error);
      case 422:
        throw new GitHubApiError('Validation failed', 422, error);
      default:
        throw new GitHubApiError(\`GitHub API error: \${error.message}\`, error.status, error);
    }
  }
}
\`\`\`

### Retry Logic

\`\`\`javascript
async function retryGitHubApiCall(apiCall, maxRetries = 3, delay = 1000) {
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      return await apiCall();
    } catch (error) {
      if (attempt === maxRetries) {
        throw error;
      }
      
      // Don't retry on client errors (4xx)
      if (error.status >= 400 && error.status < 500) {
        throw error;
      }
      
      // Exponential backoff
      const waitTime = delay * Math.pow(2, attempt - 1);
      console.log(\`API call failed, retrying in \${waitTime}ms (attempt \${attempt}/\${maxRetries})\`);
      await new Promise(resolve => setTimeout(resolve, waitTime));
    }
  }
}
\`\`\`

## Security Considerations

### Token Security

1. **Environment Variables**: Store sensitive tokens in environment variables
2. **Token Rotation**: Regularly rotate GitHub tokens
3. **Minimal Permissions**: Request only necessary OAuth scopes
4. **Secure Storage**: Use secure session storage for user tokens

### API Security

\`\`\`javascript
// Validate GitHub webhook signatures
function verifyGitHubSignature(payload, signature, secret) {
  const expectedSignature = \`sha256=\${crypto
    .createHmac('sha256', secret)
    .update(payload)
    .digest('hex')}\`;
  
  return crypto.timingSafeEqual(
    Buffer.from(signature),
    Buffer.from(expectedSignature)
  );
}

// Sanitize user input from GitHub API
function sanitizeGitHubData(data) {
  return {
    id: parseInt(data.id),
    login: data.login?.replace(/[^a-zA-Z0-9-]/g, ''),
    name: data.name?.substring(0, 100),
    email: data.email && isValidEmail(data.email) ? data.email : null,
    bio: data.bio?.substring(0, 500)
  };
}
\`\`\`

### Best Practices

1. **Input Validation**: Always validate data from GitHub API
2. **Output Encoding**: Encode user-generated content before display
3. **Error Logging**: Log errors without exposing sensitive information
4. **Access Control**: Implement proper authorization checks
5. **Audit Trail**: Log all significant GitHub API interactions

---

> [!TIP]
> **Need Help?** For GitHub integration issues, check the [GitHub API documentation](https://docs.github.com/en/rest) or open an issue on our [GitHub repository](https://github.com/your-username/devsync/issues).
`;
