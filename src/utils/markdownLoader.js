// Utility to load markdown content from the docs folder

// Map of file paths to their content (this would normally be loaded from the docs folder)
const markdownFiles = {
    'PROJECT_OVERVIEW.md': `# DevSync Project Overview

## 🎯 Project Mission

DevSync is a comprehensive open-source community platform designed to foster collaboration, track contributions, and build developer portfolios. It serves as a bridge between open-source maintainers and contributors, providing tools for project management, contribution tracking, and community engagement.

## 🏗️ Architecture Overview

DevSync follows a traditional MVC (Model-View-Controller) architecture with the following key components:

\`\`\`
┌─────────────────────────────────────────────────────────────┐
│                    DevSync Platform                         │
├─────────────────────────────────────────────────────────────┤
│  Frontend (Static HTML/CSS/JS)                             │
│  ├── User Interface Components                             │
│  ├── Admin Dashboard                                       │
│  └── Interactive Features                                  │
├─────────────────────────────────────────────────────────────┤
│  Backend API (Express.js)                                  │
│  ├── Authentication & Authorization                        │
│  ├── RESTful API Endpoints                                 │
│  ├── GitHub Integration                                    │
│  └── Email Services                                        │
├─────────────────────────────────────────────────────────────┤
│  Data Layer (MongoDB)                                      │
│  ├── User Management                                       │
│  ├── Project Repository                                    │
│  ├── Contribution Tracking                                 │
│  └── Events & Tickets                                      │
└─────────────────────────────────────────────────────────────┘
\`\`\`

## 🔧 Technology Stack

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: Passport.js with GitHub OAuth2
- **Email**: Nodemailer with Gmail integration

### Frontend
- **Languages**: HTML5, CSS3, JavaScript (ES6+)
- **UI Components**: Custom CSS with modern design patterns
- **Responsive Design**: Mobile-first approach

## 🎯 Core Features

### 1. User Management System
- **GitHub OAuth Authentication**: Seamless login via GitHub
- **Profile Management**: User profiles with contribution history
- **Role-based Access**: Admin and regular user roles

### 2. Project Repository Management
- **Project Submission**: Allow users to submit open-source projects
- **Review System**: Admin approval/rejection workflow
- **Technology Categorization**: Tag projects by programming languages

### 3. Contribution Tracking
- **PR Monitoring**: Automatic tracking of merged pull requests
- **Point Calculation**: Dynamic point calculation based on contribution value
- **Leaderboard**: Community ranking system

## 🔐 Security Features

### Authentication & Authorization
- **OAuth2 Implementation**: Secure GitHub-based authentication
- **Session Management**: Secure session handling with MongoDB store
- **API Key Protection**: Configurable API key authentication

### Data Protection
- **Input Validation**: Comprehensive data validation
- **Rate Limiting**: API endpoint protection
- **CORS Configuration**: Secure cross-origin resource sharing

This overview provides the foundation for understanding DevSync's architecture, purpose, and implementation approach.`,

    'SETUP_GUIDE.md': `# Environment Setup & Configuration Guide

## 🚀 Getting Started

This guide provides step-by-step instructions for setting up the DevSync development environment, configuring all necessary services, and understanding the deployment process.

## 📋 Prerequisites

### System Requirements
- **Node.js**: Version 16.x or higher
- **npm**: Version 8.x or higher (comes with Node.js)
- **MongoDB**: Version 5.0 or higher (local or Atlas)
- **Git**: Latest version
- **Code Editor**: VS Code recommended

### Required Accounts
- **GitHub Account**: For OAuth authentication and API access
- **MongoDB Atlas Account**: For cloud database (optional, can use local MongoDB)
- **Gmail Account**: For email service integration

## 🔧 Installation Steps

### 1. Clone the Repository
\`\`\`bash
git clone https://github.com/your-username/devsync.git
cd devsync
\`\`\`

### 2. Install Dependencies
\`\`\`bash
npm install
\`\`\`

### 3. Environment Configuration

Create a \`.env\` file in the root directory:

\`\`\`bash
cp .env.example .env
\`\`\`

### 4. Configure Environment Variables

Edit the \`.env\` file with your specific configuration:

\`\`\`env
# Server Configuration
NODE_ENV=development
PORT=5500
SERVER_URL=http://localhost:5500
FRONTEND_URL=http://localhost:5500

# MongoDB Configuration
MONGODB_URI=mongodb://localhost:27017/devsync

# Session Configuration
SESSION_SECRET=your-super-secret-session-key-here

# GitHub OAuth Configuration
GITHUB_CLIENT_ID=your-github-client-id
GITHUB_CLIENT_SECRET=your-github-client-secret
GITHUB_CALLBACK_URL=http://localhost:5500/auth/github/callback

# Admin Configuration
ADMIN_GITHUB_IDS=admin1,admin2,admin3

# Email Configuration (Gmail)
GMAIL_EMAIL=your-email@gmail.com
GMAIL_PASSWORD=your-app-specific-password

# API Security
API_SECRET_KEY=generate-using-generateApiKey.js
\`\`\`

## 🛠️ GitHub OAuth Setup

### 1. Create GitHub OAuth App

1. Go to [GitHub Developer Settings](https://github.com/settings/developers)
2. Click "New OAuth App"
3. Fill in the application details:
   - **Application name**: DevSync Local Development
   - **Homepage URL**: \`http://localhost:5500\`
   - **Authorization callback URL**: \`http://localhost:5500/auth/github/callback\`
4. Click "Register application"
5. Copy the **Client ID** and **Client Secret** to your \`.env\` file

### 2. Configure OAuth Scopes

DevSync requires the following GitHub scopes:
- \`user\`: Read access to user profile information
- \`user:email\`: Access to user's email addresses

## 💾 Database Setup

### Option 1: Local MongoDB

1. **Install MongoDB**:
   - **Windows**: Download from [MongoDB Community Server](https://www.mongodb.com/try/download/community)
   - **macOS**: \`brew install mongodb-community\`
   - **Linux**: Follow [official installation guide](https://docs.mongodb.com/manual/installation/)

2. **Start MongoDB**:
   \`\`\`bash
   # macOS/Linux
   mongod
   
   # Windows (if installed as service)
   net start MongoDB
   \`\`\`

3. **Verify Connection**:
   \`\`\`bash
   mongo
   # Should connect to MongoDB shell
   \`\`\`

### Option 2: MongoDB Atlas (Cloud)

1. Create a free account at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a new cluster
3. Create a database user
4. Whitelist your IP address
5. Get the connection string and add it to \`.env\`:
   \`\`\`env
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/devsync
   \`\`\`

## ✉️ Email Service Setup

### Gmail Configuration

1. **Enable 2-Factor Authentication** on your Gmail account
2. **Generate App Password**:
   - Go to [Google Account Security](https://myaccount.google.com/security)
   - Click "App passwords"
   - Select "Mail" and generate a password
   - Use this password in your \`.env\` file

3. **Update Environment Variables**:
   \`\`\`env
   GMAIL_EMAIL=your-email@gmail.com
   GMAIL_PASSWORD=your-16-character-app-password
   \`\`\`

## 🔑 API Key Generation

Generate a secure API key for programmatic access:

\`\`\`bash
node generateApiKey.js
\`\`\`

Copy the generated key to your \`.env\` file:
\`\`\`env
API_SECRET_KEY=generated-64-character-key
\`\`\`

## 🚀 Running the Application

### Development Mode

\`\`\`bash
npm run dev
\`\`\`

This starts the application in development mode with:
- **Hot reload**: Automatic restart on file changes
- **Debug logging**: Detailed console output
- **Error handling**: Descriptive error messages

### Production Mode

\`\`\`bash
npm start
\`\`\`

## 🧪 Testing the Setup

### 1. Verify Server Startup
- Open \`http://localhost:5500\` in your browser
- You should see the DevSync homepage

### 2. Test GitHub Authentication
- Click "Login with GitHub"
- Complete the OAuth flow
- Verify user profile creation

### 3. Test Database Connection
- Check MongoDB logs for connection confirmation
- Verify user data is stored in the database

### 4. Test Email Service
- Register a new user
- Verify welcome email is sent

## 🔧 Troubleshooting

### Common Issues

#### MongoDB Connection Issues
\`\`\`
Error: connect ECONNREFUSED 127.0.0.1:27017
\`\`\`
**Solution**: Ensure MongoDB is running locally or check Atlas connection string

#### GitHub OAuth Issues
\`\`\`
Error: invalid_client
\`\`\`
**Solution**: Verify GitHub OAuth app configuration and callback URL

#### Email Service Issues
\`\`\`
Error: Invalid login: 535-5.7.8 Username and Password not accepted
\`\`\`
**Solution**: Use Gmail app password instead of regular password

### Development Tips

1. **Use nodemon** for automatic restarts during development
2. **Enable debug logging** by setting \`DEBUG=*\` in environment
3. **Use MongoDB Compass** for database visualization
4. **Test OAuth flow** in incognito mode to avoid cached sessions

## 📚 Next Steps

After successful setup:

1. Read the [Contributing Guide](CONTRIBUTING.md) for development workflows
2. Explore [Backend Architecture](BACKEND_ARCHITECTURE.md) for technical details
3. Review [API Documentation](API_DOCUMENTATION.md) for endpoint references
4. Check [Security Policy](SECURITY.md) for security best practices

Your DevSync development environment is now ready! 🎉`,

    'CONTRIBUTING.md': `# Contributing Guide

## 🤝 Welcome Contributors!

Thank you for your interest in contributing to DevSync! This guide will help you understand how to contribute effectively to the project, whether you're fixing a bug, adding a feature, or improving documentation.

## 🎯 How to Contribute

### Types of Contributions

We welcome all types of contributions:

- 🐛 **Bug Fixes**: Help us identify and fix issues
- ✨ **Feature Development**: Add new functionality
- 📚 **Documentation**: Improve or add documentation
- 🎨 **UI/UX Improvements**: Enhance user experience
- 🧪 **Testing**: Add or improve test coverage
- 🔧 **DevOps**: Improve development and deployment processes
- 🌐 **Translations**: Help make DevSync accessible globally

### Ways to Get Started

1. **Browse Issues**: Look for issues labeled \`good first issue\` or \`help wanted\`
2. **Report Bugs**: Found a bug? Create a detailed issue report
3. **Suggest Features**: Have an idea? Open a feature request
4. **Improve Documentation**: Help others understand the codebase
5. **Review Pull Requests**: Help review and test pending changes

## 🚀 Getting Started

### 1. Fork and Clone

\`\`\`bash
# Fork the repository on GitHub
# Then clone your fork
git clone https://github.com/YOUR_USERNAME/devsync.git
cd devsync

# Add upstream remote
git remote add upstream https://github.com/original-repo/devsync.git
\`\`\`

### 2. Set Up Development Environment

Follow the [Setup Guide](SETUP_GUIDE.md) to configure your local development environment.

### 3. Create a Feature Branch

\`\`\`bash
# Create and switch to a new branch
git checkout -b feature/your-feature-name

# OR for bug fixes
git checkout -b fix/issue-description
\`\`\`

### 4. Make Your Changes

Follow our coding standards and best practices outlined below.

### 5. Test Your Changes

\`\`\`bash
# Run tests
npm test

# Run linting
npm run lint

# Test manually
npm run dev
\`\`\`

### 6. Commit Your Changes

\`\`\`bash
# Add your changes
git add .

# Commit with a descriptive message
git commit -m "feat: add user profile export functionality"
\`\`\`

### 7. Push and Create Pull Request

\`\`\`bash
# Push to your fork
git push origin feature/your-feature-name

# Create a pull request on GitHub
\`\`\`

## 📝 Development Workflow

### 1. Coding Standards

#### JavaScript Guidelines

- Use **ES6+** features when possible
- Follow **ESLint** configuration
- Use **camelCase** for variables and functions
- Use **PascalCase** for classes and constructors
- Add **JSDoc comments** for functions and classes

**Example:**
\`\`\`javascript
/**
 * Calculates user contribution points based on merged PRs
 * @param {Array} mergedPRs - Array of merged pull request objects
 * @param {string} userId - User's GitHub ID
 * @returns {Promise<number>} Total points calculated
 */
async function calculatePoints(mergedPRs, userId) {
  try {
    let totalPoints = 0;
    
    for (const pr of mergedPRs) {
      const repo = await Repo.findOne({ repoLink: pr.repoId });
      if (repo && repo.userId !== userId) {
        totalPoints += repo.successPoints || 50;
      }
    }
    
    return totalPoints;
  } catch (error) {
    console.error('Point calculation error:', error);
    return 0;
  }
}
\`\`\`

#### CSS Guidelines

- Use **BEM methodology** for class naming
- Prefer **CSS Grid** and **Flexbox** for layouts
- Use **CSS custom properties** for theming
- Follow **mobile-first** responsive design

**Example:**
\`\`\`css
/* Good */
.project-card {
  display: grid;
  gap: var(--space-4);
  padding: var(--space-4);
  border-radius: var(--border-radius);
}

.project-card__title {
  font-size: var(--text-lg);
  font-weight: var(--font-semibold);
}

.project-card__meta {
  color: var(--text-muted);
}

/* Responsive */
@media (min-width: 768px) {
  .project-card {
    grid-template-columns: 1fr 2fr;
  }
}
\`\`\`

#### File Organization

\`\`\`
New Feature Structure:
├── models/NewModel.js          # Database schema
├── routes/newRoutes.js         # API endpoints
├── controllers/newController.js # Business logic
├── middleware/newMiddleware.js  # Custom middleware
├── utils/newUtils.js           # Utility functions
├── public/new-page.html        # Frontend page
├── public/assets/css/new.css   # Styles
├── public/assets/js/new.js     # Frontend logic
└── templates/newEmail.html     # Email template
\`\`\`

### 2. Git Workflow

#### Branch Naming

- **Feature branches**: \`feature/description-of-feature\`
- **Bug fixes**: \`fix/description-of-bug\`
- **Documentation**: \`docs/description-of-changes\`
- **Refactoring**: \`refactor/description-of-refactor\`

#### Commit Messages

Follow the [Conventional Commits](https://www.conventionalcommits.org/) specification:

\`\`\`
<type>[optional scope]: <description>

[optional body]

[optional footer(s)]
\`\`\`

**Types:**
- \`feat\`: New feature
- \`fix\`: Bug fix
- \`docs\`: Documentation changes
- \`style\`: Code style changes (formatting, etc.)
- \`refactor\`: Code refactoring
- \`test\`: Adding or updating tests
- \`chore\`: Maintenance tasks

**Examples:**
\`\`\`
feat: add user profile export functionality
fix: resolve memory leak in contribution tracking
docs: update API authentication guide
style: format user controller code
refactor: optimize database queries
test: add unit tests for point calculation
chore: update dependencies
\`\`\`

### 3. Testing Guidelines

#### Unit Tests
- Write tests for all new functions
- Test both success and error cases
- Use descriptive test names
- Maintain >80% code coverage

#### Integration Tests
- Test API endpoints
- Test database interactions
- Test GitHub API integration

#### Manual Testing
- Test in multiple browsers
- Test responsive design
- Test with different user roles
- Test error scenarios

### 4. Code Review Process

#### Before Submitting

- [ ] Code follows style guidelines
- [ ] All tests pass
- [ ] Documentation is updated
- [ ] No merge conflicts
- [ ] PR description is clear

#### Review Criteria

Reviewers will check for:
- **Functionality**: Does the code work as expected?
- **Code Quality**: Is the code readable and maintainable?
- **Performance**: Are there any performance implications?
- **Security**: Are there any security concerns?
- **Testing**: Are tests adequate and passing?

## 🐛 Bug Reports

### Before Reporting

1. **Search existing issues** to avoid duplicates
2. **Test with latest version** to ensure bug still exists
3. **Gather reproduction steps** and relevant information

### Bug Report Template

\`\`\`markdown
## Bug Description
A clear description of what the bug is.

## Steps to Reproduce
1. Go to '...'
2. Click on '...'
3. Scroll down to '...'
4. See error

## Expected Behavior
What you expected to happen.

## Actual Behavior
What actually happened.

## Environment
- OS: [e.g., Windows 10, macOS 12.0, Ubuntu 20.04]
- Browser: [e.g., Chrome 95, Firefox 93, Safari 15]
- Node.js version: [e.g., 16.14.0]
- DevSync version: [e.g., 1.0.0]

## Additional Context
Add any other context about the problem here.
\`\`\`

## ✨ Feature Requests

### Feature Request Template

\`\`\`markdown
## Feature Description
A clear description of the feature you'd like to see.

## Problem Statement
What problem does this feature solve?

## Proposed Solution
How do you envision this feature working?

## Alternative Solutions
Any alternative approaches you've considered.

## Additional Context
Any other context or screenshots about the feature.
\`\`\`

## 📚 Documentation

### Types of Documentation

- **API Documentation**: Endpoint specifications and examples
- **User Guides**: Step-by-step instructions for users
- **Developer Guides**: Technical implementation details
- **Code Comments**: Inline documentation for complex logic

### Writing Guidelines

- Use clear, concise language
- Include code examples
- Add screenshots when helpful
- Keep documentation up-to-date
- Follow markdown formatting standards

## 🎉 Recognition

### Contributors Hall of Fame

We recognize contributors in several ways:

- **GitHub Contributors**: Listed on repository contributors page
- **Documentation Credits**: Mentioned in documentation they help create
- **Release Notes**: Contributors credited in release announcements
- **Community Badges**: Special badges for significant contributions

### Contribution Types Recognized

- Code contributions (features, bugs, refactoring)
- Documentation improvements
- Issue reporting and bug hunting
- Code reviews and testing
- Community support and mentoring

## 📞 Getting Help

### Community Channels

- **GitHub Discussions**: Ask questions and get help from the community
- **Issues**: Report bugs or request features
- **Discord**: Real-time chat with other contributors (link in README)

### Maintainer Contact

For sensitive issues or questions, contact the maintainers:
- **Email**: maintainers@devsync.dev
- **GitHub**: @maintainer-username

## 📋 Development Environment

### Recommended Tools

- **Code Editor**: VS Code with recommended extensions
- **Database Client**: MongoDB Compass
- **API Testing**: Postman or Insomnia
- **Git Client**: Command line or GitHub Desktop

### VS Code Extensions

- ESLint
- Prettier
- MongoDB for VS Code
- GitLens
- REST Client

Thank you for contributing to DevSync! Your efforts help make this project better for everyone. 🚀`,

    'API_DOCUMENTATION.md': `# API Documentation

## 🌐 API Overview

DevSync provides a comprehensive RESTful API for managing users, projects, contributions, events, and administrative functions. The API supports both session-based authentication (for web browsers) and API key authentication (for programmatic access).

## 🔐 Authentication Methods

### 1. Session Authentication
Used for web browser access via GitHub OAuth:
\`\`\`javascript
// Login via GitHub OAuth
GET /auth/github

// OAuth callback
GET /auth/github/callback
\`\`\`

### 2. API Key Authentication
Used for programmatic access:
\`\`\`bash
curl -H "x-api-key: your-api-key-here" \\
  http://localhost:3000/api/endpoint
\`\`\`

## 📋 API Endpoints

### Authentication Routes (\`/auth\`)

#### GitHub OAuth Login
\`\`\`http
GET /auth/github
\`\`\`
**Purpose**: Initiates GitHub OAuth authentication flow  
**Authentication**: None required  
**Response**: Redirects to GitHub OAuth  

#### GitHub OAuth Callback
\`\`\`http
GET /auth/github/callback
\`\`\`
**Purpose**: Handles GitHub OAuth callback  
**Authentication**: None required  
**Response**: Redirects to frontend URL  

---

### User Management (\`/api/user\`)

#### Get Current User
\`\`\`http
GET /api/user
\`\`\`
**Purpose**: Retrieve authenticated user's profile  
**Authentication**: Required (session or API key)  
**Response**:
\`\`\`json
{
  "githubId": "12345",
  "username": "johndoe",
  "displayName": "John Doe",
  "email": "john@example.com",
  "points": 150,
  "badges": ["First Contribution", "Active Contributor"],
  "joinedAt": "2025-01-15T10:30:00Z"
}
\`\`\`

#### Get User Statistics
\`\`\`http
GET /api/user/stats
\`\`\`
**Purpose**: Retrieve user's contribution statistics  
**Authentication**: Required  
**Response**:
\`\`\`json
{
  "totalContributions": 5,
  "totalPoints": 250,
  "rank": 15,
  "badges": [
    "First Contribution",
    "Active Contributor"
  ],
  "recentPRs": [
    {
      "url": "https://github.com/user/repo/pull/123",
      "mergedAt": "2025-01-10T14:20:00Z",
      "points": 50
    }
  ]
}
\`\`\`

#### Get User Profile by Username
\`\`\`http
GET /api/user/profile/:username
\`\`\`
**Purpose**: Retrieve public profile of any user  
**Authentication**: Required  
**Parameters**:
- \`username\` (path): GitHub username
**Response**:
\`\`\`json
{
  "username": "johndoe",
  "displayName": "John Doe",
  "avatarUrl": "https://github.com/johndoe.png",
  "points": 150,
  "badges": ["First Contribution"],
  "publicStats": {
    "totalContributions": 5,
    "rank": 15
  }
}
\`\`\`

---

### Project Management (\`/api/projects\`)

#### Get User's Projects
\`\`\`http
GET /api/projects/:userId
\`\`\`
**Purpose**: Retrieve projects submitted by a specific user  
**Authentication**: Required  
**Parameters**:
- \`userId\` (path): User's GitHub ID
**Response**:
\`\`\`json
{
  "projects": [
    {
      "id": "project-id",
      "repoName": "awesome-project",
      "repoLink": "https://github.com/user/awesome-project",
      "description": "An awesome open source project",
      "language": "JavaScript",
      "technologies": ["React", "Node.js"],
      "reviewStatus": "approved",
      "successPoints": 75,
      "submissionDate": "2025-01-10T10:00:00Z"
    }
  ]
}
\`\`\`

#### Submit New Project
\`\`\`http
POST /api/projects
\`\`\`
**Purpose**: Submit a new project for review  
**Authentication**: Required  
**Request Body**:
\`\`\`json
{
  "repoLink": "https://github.com/user/new-project",
  "description": "Description of the project",
  "language": "Python",
  "technologies": ["Django", "PostgreSQL"],
  "successPoints": 60
}
\`\`\`
**Response**:
\`\`\`json
{
  "message": "Project submitted successfully",
  "projectId": "new-project-id",
  "reviewStatus": "pending"
}
\`\`\`

#### Delete Project
\`\`\`http
DELETE /api/projects/:projectId
\`\`\`
**Purpose**: Delete a project (owner or admin only)  
**Authentication**: Required  
**Parameters**:
- \`projectId\` (path): Project ID to delete
**Response**:
\`\`\`json
{
  "message": "Project deleted successfully"
}
\`\`\`

#### Get Accepted Projects
\`\`\`http
GET /api/accepted-projects
\`\`\`
**Purpose**: Retrieve all approved projects  
**Authentication**: Required  
**Query Parameters**:
- \`language\` (optional): Filter by programming language
- \`page\` (optional): Page number for pagination
- \`limit\` (optional): Number of results per page
**Response**:
\`\`\`json
{
  "projects": [
    {
      "id": "project-id",
      "repoName": "awesome-project",
      "repoLink": "https://github.com/user/awesome-project",
      "description": "An awesome open source project",
      "language": "JavaScript",
      "technologies": ["React", "Node.js"],
      "successPoints": 75,
      "maintainer": {
        "username": "maintainer-user",
        "displayName": "Maintainer Name"
      }
    }
  ],
  "pagination": {
    "currentPage": 1,
    "totalPages": 5,
    "totalProjects": 47
  }
}
\`\`\`

---

### Leaderboard & Statistics (\`/api\`)

#### Get Leaderboard
\`\`\`http
GET /api/leaderboard
\`\`\`
**Purpose**: Retrieve user rankings based on contribution points  
**Authentication**: Required  
**Query Parameters**:
- \`limit\` (optional): Number of users to return (default: 50)
- \`page\` (optional): Page number for pagination
**Response**:
\`\`\`json
{
  "leaderboard": [
    {
      "rank": 1,
      "username": "topcontributor",
      "displayName": "Top Contributor",
      "avatarUrl": "https://github.com/topcontributor.png",
      "points": 1250,
      "badges": ["Super Contributor", "Early Adopter"],
      "totalContributions": 25
    }
  ],
  "pagination": {
    "currentPage": 1,
    "totalPages": 3,
    "totalUsers": 142
  }
}
\`\`\`

#### Get Global Statistics
\`\`\`http
GET /api/stats/global
\`\`\`
**Purpose**: Retrieve platform-wide statistics  
**Authentication**: Required  
**Response**:
\`\`\`json
{
  "totalUsers": 142,
  "totalProjects": 47,
  "totalContributions": 324,
  "totalPoints": 15680,
  "avgPointsPerContribution": 48.4,
  "topLanguages": [
    { "language": "JavaScript", "count": 18 },
    { "language": "Python", "count": 12 },
    { "language": "Java", "count": 8 }
  ],
  "recentActivity": [
    {
      "type": "contribution",
      "user": "contributor",
      "project": "awesome-project",
      "points": 50,
      "timestamp": "2025-01-15T14:30:00Z"
    }
  ]
}
\`\`\`

---

### GitHub Integration (\`/api/github\`)

#### Sync User Contributions
\`\`\`http
POST /api/github/sync-contributions
\`\`\`
**Purpose**: Manually trigger contribution sync from GitHub  
**Authentication**: Required  
**Response**:
\`\`\`json
{
  "message": "Contributions synced successfully",
  "newContributions": 3,
  "pointsAwarded": 150,
  "totalPoints": 500
}
\`\`\`

#### Validate Repository
\`\`\`http
POST /api/github/validate-repo
\`\`\`
**Purpose**: Validate if a GitHub repository exists and is accessible  
**Authentication**: Required  
**Request Body**:
\`\`\`json
{
  "repoUrl": "https://github.com/user/repository"
}
\`\`\`
**Response**:
\`\`\`json
{
  "valid": true,
  "repoData": {
    "name": "repository",
    "description": "Repository description",
    "language": "JavaScript",
    "stars": 42,
    "forks": 8,
    "openIssues": 3
  }
}
\`\`\`

---

### Event Management (\`/api/events\`)

#### Get Events
\`\`\`http
GET /api/events
\`\`\`
**Purpose**: Retrieve community events  
**Authentication**: Required  
**Query Parameters**:
- \`upcoming\` (optional): Filter to upcoming events only
- \`limit\` (optional): Number of events to return
**Response**:
\`\`\`json
{
  "events": [
    {
      "id": "event-id",
      "title": "Open Source Workshop",
      "description": "Learn how to contribute to open source",
      "date": "2025-02-15T18:00:00Z",
      "location": "Virtual",
      "registrationUrl": "https://eventbrite.com/event-link",
      "organizer": "DevSync Team"
    }
  ]
}
\`\`\`

#### Create Event (Admin Only)
\`\`\`http
POST /api/events
\`\`\`
**Purpose**: Create a new community event  
**Authentication**: Required (Admin only)  
**Request Body**:
\`\`\`json
{
  "title": "New Workshop",
  "description": "Workshop description",
  "date": "2025-03-01T18:00:00Z",
  "location": "Virtual",
  "registrationUrl": "https://example.com/register"
}
\`\`\`

---

### Support Tickets (\`/api/tickets\`)

#### Create Support Ticket
\`\`\`http
POST /api/tickets
\`\`\`
**Purpose**: Create a new support ticket  
**Authentication**: Required  
**Request Body**:
\`\`\`json
{
  "subject": "Issue with contribution tracking",
  "description": "Detailed description of the issue",
  "priority": "medium"
}
\`\`\`
**Response**:
\`\`\`json
{
  "message": "Support ticket created successfully",
  "ticketId": "ticket-id",
  "ticketNumber": "DEV-001"
}
\`\`\`

#### Get User's Tickets
\`\`\`http
GET /api/tickets/my
\`\`\`
**Purpose**: Retrieve current user's support tickets  
**Authentication**: Required  
**Response**:
\`\`\`json
{
  "tickets": [
    {
      "id": "ticket-id",
      "ticketNumber": "DEV-001",
      "subject": "Issue with contribution tracking",
      "status": "open",
      "priority": "medium",
      "createdAt": "2025-01-10T10:00:00Z",
      "lastUpdated": "2025-01-12T14:30:00Z"
    }
  ]
}
\`\`\`

---

### Administrative Routes (\`/api/admin\`)

> **Note**: All admin routes require admin authentication

#### Get Pending Projects
\`\`\`http
GET /api/admin/pending-projects
\`\`\`
**Purpose**: Retrieve projects awaiting approval  
**Authentication**: Required (Admin only)  
**Response**:
\`\`\`json
{
  "pendingProjects": [
    {
      "id": "project-id",
      "repoName": "new-project",
      "repoLink": "https://github.com/user/new-project",
      "submittedBy": "contributor",
      "submissionDate": "2025-01-10T10:00:00Z",
      "description": "Project description"
    }
  ]
}
\`\`\`

#### Approve/Reject Project
\`\`\`http
PUT /api/admin/review-project/:projectId
\`\`\`
**Purpose**: Approve or reject a pending project  
**Authentication**: Required (Admin only)  
**Request Body**:
\`\`\`json
{
  "action": "approve",
  "feedback": "Optional feedback message"
}
\`\`\`

#### Get All Users
\`\`\`http
GET /api/admin/users
\`\`\`
**Purpose**: Retrieve all platform users  
**Authentication**: Required (Admin only)  
**Query Parameters**:
- \`page\` (optional): Page number
- \`limit\` (optional): Users per page
- \`search\` (optional): Search by username

---

### Public Routes (\`/api\`)

#### Health Check
\`\`\`http
GET /api/health
\`\`\`
**Purpose**: Check API health status  
**Authentication**: None required  
**Response**:
\`\`\`json
{
  "status": "healthy",
  "timestamp": "2025-01-15T12:00:00Z",
  "version": "1.0.0"
}
\`\`\`

#### Get Public Stats
\`\`\`http
GET /api/public/stats
\`\`\`
**Purpose**: Retrieve public platform statistics  
**Authentication**: None required  
**Response**:
\`\`\`json
{
  "totalUsers": 142,
  "totalProjects": 47,
  "totalContributions": 324
}
\`\`\`

## 🚫 Error Handling

### Error Response Format
\`\`\`json
{
  "error": "Error Type",
  "message": "Human-readable error message",
  "statusCode": 400,
  "timestamp": "2025-01-15T12:00:00Z"
}
\`\`\`

### Common Error Codes

| Status Code | Error Type | Description |
|-------------|------------|-------------|
| 400 | Bad Request | Invalid request data |
| 401 | Unauthorized | Authentication required |
| 403 | Forbidden | Insufficient permissions |
| 404 | Not Found | Resource not found |
| 409 | Conflict | Resource already exists |
| 429 | Too Many Requests | Rate limit exceeded |
| 500 | Internal Server Error | Server error |

## 🔄 Rate Limiting

### Rate Limits

| Endpoint Type | Limit | Window |
|---------------|-------|--------|
| Authentication | 5 requests | 15 minutes |
| General API | 100 requests | 15 minutes |
| GitHub Sync | 10 requests | 1 hour |

### Rate Limit Headers
\`\`\`
X-RateLimit-Limit: 100
X-RateLimit-Remaining: 95
X-RateLimit-Reset: 1642781400
\`\`\`

## 📊 Pagination

### Pagination Parameters
- \`page\`: Page number (default: 1)
- \`limit\`: Items per page (default: 20, max: 100)

### Pagination Response
\`\`\`json
{
  "data": [...],
  "pagination": {
    "currentPage": 1,
    "totalPages": 5,
    "totalItems": 95,
    "itemsPerPage": 20,
    "hasNextPage": true,
    "hasPrevPage": false
  }
}
\`\`\`

This API documentation provides complete reference for integrating with DevSync programmatically. For questions or support, please refer to our [GitHub repository](https://github.com/devsync/devsync) or contact the maintainers.`
}

// Function to load markdown content by filename
export const loadMarkdownContent = async (filename) => {
    // In a real implementation, this would fetch from the docs folder
    // For now, we'll use the pre-loaded content
    return markdownFiles[filename] || '# Content Not Found\n\nThe requested content could not be loaded.'
}

// Function to get all available markdown files
export const getAvailableMarkdownFiles = () => {
    return Object.keys(markdownFiles)
}

// Function to search through markdown content
export const searchMarkdownContent = (query) => {
    const results = []
    const searchTerm = query.toLowerCase()

    Object.entries(markdownFiles).forEach(([filename, content]) => {
        if (content.toLowerCase().includes(searchTerm)) {
            // Extract relevant sections
            const lines = content.split('\n')
            const matchingLines = lines.filter(line =>
                line.toLowerCase().includes(searchTerm)
            ).slice(0, 3) // Limit to 3 matching lines per file

            results.push({
                filename,
                title: lines[0]?.replace(/^#\s*/, '') || filename,
                matches: matchingLines
            })
        }
    })

    return results
}

export default {
    loadMarkdownContent,
    getAvailableMarkdownFiles,
    searchMarkdownContent
}
