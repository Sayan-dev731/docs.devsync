// Documentation structure mirroring the actual DevSync docs
export const documentationStructure = [
    {
        id: 'getting-started',
        title: 'Getting Started',
        path: 'getting-started',
        type: 'category',
        icon: '🚀',
        children: [
            {
                id: 'project-overview',
                title: 'Project Overview',
                path: 'project-overview',
                description: 'High-level architecture and project goals',
                category: 'getting-started',
                content: '# DevSync Project Overview\n\n## 🎯 Project Mission\n\nDevSync is a comprehensive open-source community platform designed to foster collaboration, track contributions, and build developer portfolios. It serves as a bridge between open-source maintainers and contributors, providing tools for project management, contribution tracking, and community engagement.\n\n## 🏗️ Architecture Overview\n\nDevSync follows a traditional MVC (Model-View-Controller) architecture with the following key components:\n\n```\n┌─────────────────────────────────────────────────────────────┐\n│                    DevSync Platform                         │\n├─────────────────────────────────────────────────────────────┤\n│  Frontend (Static HTML/CSS/JS)                             │\n│  ├── User Interface Components                             │\n│  ├── Admin Dashboard                                       │\n│  └── Interactive Features                                  │\n├─────────────────────────────────────────────────────────────┤\n│  Backend API (Express.js)                                  │\n│  ├── Authentication & Authorization                        │\n│  ├── RESTful API Endpoints                                 │\n│  ├── GitHub Integration                                    │\n│  └── Email Services                                        │\n├─────────────────────────────────────────────────────────────┤\n│  Data Layer (MongoDB)                                      │\n│  ├── User Management                                       │\n│  ├── Project Repository                                    │\n│  ├── Contribution Tracking                                 │\n│  └── Events & Tickets                                      │\n└─────────────────────────────────────────────────────────────┘\n```\n\n## 🔧 Technology Stack\n\n### Backend\n- **Runtime**: Node.js\n- **Framework**: Express.js\n- **Database**: MongoDB with Mongoose ODM\n- **Authentication**: Passport.js with GitHub OAuth2\n- **Email**: Nodemailer with Gmail integration\n\n### Frontend\n- **Languages**: HTML5, CSS3, JavaScript (ES6+)\n- **UI Components**: Custom CSS with modern design patterns\n- **Responsive Design**: Mobile-first approach\n\n## 🎯 Core Features\n\n### 1. User Management System\n- **GitHub OAuth Authentication**: Seamless login via GitHub\n- **Profile Management**: User profiles with contribution history\n- **Role-based Access**: Admin and regular user roles\n\n### 2. Project Repository Management\n- **Project Submission**: Allow users to submit open-source projects\n- **Review System**: Admin approval/rejection workflow\n- **Technology Categorization**: Tag projects by programming languages\n\n### 3. Contribution Tracking\n- **PR Monitoring**: Automatic tracking of merged pull requests\n- **Point Calculation**: Dynamic point calculation based on contribution value\n- **Leaderboard**: Community ranking system\n\n## 🔐 Security Features\n\n### Authentication & Authorization\n- **OAuth2 Implementation**: Secure GitHub-based authentication\n- **Session Management**: Secure session handling with MongoDB store\n- **API Key Protection**: Configurable API key authentication\n\n### Data Protection\n- **Input Validation**: Comprehensive data validation\n- **Rate Limiting**: API endpoint protection\n- **CORS Configuration**: Secure cross-origin resource sharing\n\nThis overview provides the foundation for understanding DevSync\'s architecture, purpose, and implementation approach.'
            },
            {
                id: 'setup-guide',
                title: 'Setup Guide',
                path: 'setup-guide',
                description: 'Step-by-step installation and configuration',
                category: 'getting-started',
                content: '# Environment Setup & Configuration Guide\n\n## 🚀 Getting Started\n\nThis guide provides step-by-step instructions for setting up the DevSync development environment, configuring all necessary services, and understanding the deployment process.\n\n## 📋 Prerequisites\n\n### System Requirements\n- **Node.js**: Version 16.x or higher\n- **npm**: Version 8.x or higher (comes with Node.js)\n- **MongoDB**: Version 5.0 or higher (local or Atlas)\n- **Git**: Latest version\n- **Code Editor**: VS Code recommended\n\n### Required Accounts\n- **GitHub Account**: For OAuth authentication and API access\n- **MongoDB Atlas Account**: For cloud database (optional, can use local MongoDB)\n- **Gmail Account**: For email service integration\n\n## 🔧 Installation Steps\n\n### 1. Clone the Repository\n```bash\ngit clone https://github.com/your-username/devsync.git\ncd devsync\n```\n\n### 2. Install Dependencies\n```bash\nnpm install\n```\n\n### 3. Environment Configuration\n\nCreate a `.env` file in the root directory:\n\n```bash\ncp .env.example .env\n```\n\n### 4. Configure Environment Variables\n\nEdit the `.env` file with your specific configuration:\n\n```env\n# Server Configuration\nNODE_ENV=development\nPORT=5500\nSERVER_URL=http://localhost:5500\nFRONTEND_URL=http://localhost:5500\n\n# MongoDB Configuration\nMONGODB_URI=mongodb://localhost:27017/devsync\n\n# Session Configuration\nSESSION_SECRET=your-super-secret-session-key-here\n\n# GitHub OAuth Configuration\nGITHUB_CLIENT_ID=your-github-client-id\nGITHUB_CLIENT_SECRET=your-github-client-secret\nGITHUB_CALLBACK_URL=http://localhost:5500/auth/github/callback\n\n# Admin Configuration\nADMIN_GITHUB_IDS=admin1,admin2,admin3\n\n# Email Configuration (Gmail)\nGMAIL_EMAIL=your-email@gmail.com\nGMAIL_PASSWORD=your-app-specific-password\n\n# API Security\nAPI_SECRET_KEY=generate-using-generateApiKey.js\n```'
            },
            {
                id: 'contributing',
                title: 'Contributing Guide',
                path: 'contributing',
                description: 'How to contribute to the project',
                category: 'getting-started',
                content: '# Contributing Guide\n\n## 🤝 Welcome Contributors!\n\nThank you for your interest in contributing to DevSync! This guide will help you understand how to contribute effectively to the project, whether you\'re fixing a bug, adding a feature, or improving documentation.\n\n## 🎯 How to Contribute\n\n### Types of Contributions\n\nWe welcome all types of contributions:\n\n- 🐛 **Bug Fixes**: Help us identify and fix issues\n- ✨ **Feature Development**: Add new functionality\n- 📚 **Documentation**: Improve or add documentation\n- 🎨 **UI/UX Improvements**: Enhance user experience\n- 🧪 **Testing**: Add or improve test coverage\n- 🔧 **DevOps**: Improve development and deployment processes\n- 🌐 **Translations**: Help make DevSync accessible globally\n\n### Ways to Get Started\n\n1. **Browse Issues**: Look for issues labeled `good first issue` or `help wanted`\n2. **Report Bugs**: Found a bug? Create a detailed issue report\n3. **Suggest Features**: Have an idea? Open a feature request\n4. **Improve Documentation**: Help others understand the codebase\n5. **Review Pull Requests**: Help review and test pending changes\n\n## 🚀 Getting Started\n\n### 1. Fork and Clone\n\n```bash\n# Fork the repository on GitHub\n# Then clone your fork\ngit clone https://github.com/YOUR_USERNAME/devsync.git\ncd devsync\n\n# Add upstream remote\ngit remote add upstream https://github.com/original-repo/devsync.git\n```\n\n### 2. Set Up Development Environment\n\nFollow the [Setup Guide](setup-guide) to configure your local development environment.\n\n### 3. Create a Feature Branch\n\n```bash\n# Create and switch to a new branch\ngit checkout -b feature/your-feature-name\n\n# OR for bug fixes\ngit checkout -b fix/issue-description\n```'
            }
        ]
    },
    {
        id: 'technical-docs',
        title: 'Technical Documentation',
        path: 'technical-docs',
        type: 'category',
        icon: '🏗️',
        children: [
            {
                id: 'database-schema',
                title: 'Database Schema',
                path: 'database-schema',
                description: 'MongoDB models and data relationships',
                category: 'technical-docs',
                content: '# Database Schema & Models Documentation\n\n## 📊 Database Overview\n\nDevSync uses MongoDB as its primary database with Mongoose ODM for schema definition and data validation. The database is designed to support user management, project tracking, contribution monitoring, and community features.\n\n## 🏗️ Schema Architecture\n\n```\nMongoDB Database: devsync\n├── users              (User profiles and authentication)\n├── repos              (Registered open-source projects)\n├── pendingprs         (Pull request submissions for review)\n├── events             (Community events and workshops)\n├── tickets            (Support and feature requests)\n└── sessions           (User session management)\n```\n\n## 📝 Model Definitions\n\n### 1. User Model (`models/User.js`)\n\n**Purpose**: Stores user profiles, authentication data, and contribution statistics.\n\n```javascript\n{\n  githubId: String (required, unique),      // GitHub user ID\n  username: String (required),              // GitHub username\n  displayName: String,                      // Full name from GitHub\n  email: String,                            // Primary email\n  profileUrl: String,                       // GitHub profile URL\n  avatarUrl: String,                        // Profile picture\n  bio: String,                              // User bio\n  location: String,                         // Geographic location\n  company: String,                          // Company/organization\n  blog: String,                             // Personal website\n  isAdmin: Boolean (default: false),       // Admin privileges\n  points: Number (default: 0),              // Total contribution points\n  badges: [String],                         // Earned achievement badges\n  mergedPRs: [String],                      // Array of merged PR URLs\n  joinedAt: Date (default: Date.now),       // Registration timestamp\n  lastActive: Date,                         // Last activity timestamp\n  welcomeEmailSent: Boolean (default: false) // Email notification status\n}\n```\n\n**Indexes**: \n- `githubId`: Unique index for fast user lookup\n- `username`: Index for username-based queries\n- `points`: Index for leaderboard sorting\n\n### 2. Repository Model (`models/Repo.js`)\n\n**Purpose**: Manages registered open-source projects available for contributions.\n\n```javascript\n{\n  repoLink: String (required, unique),      // GitHub repository URL\n  repoName: String (required),              // Repository name\n  description: String,                      // Project description\n  language: String,                         // Primary programming language\n  technologies: [String],                   // Technology stack\n  userId: String (required),                // Maintainer GitHub ID\n  successPoints: Number (default: 50),      // Points awarded per contribution\n  reviewStatus: String (enum: ["pending", "approved", "rejected"], default: "pending"),\n  submissionDate: Date (default: Date.now), // Initial submission\n  approvalDate: Date,                       // Admin approval timestamp\n  tags: [String],                           // Project category tags\n  difficulty: String (enum: ["beginner", "intermediate", "advanced"]),\n  stars: Number,                            // GitHub stars count\n  forks: Number,                            // GitHub forks count\n  openIssues: Number,                       // Open issues count\n  lastUpdated: Date                         // Last GitHub update\n}\n```\n\n**Indexes**:\n- `repoLink`: Unique index to prevent duplicates\n- `reviewStatus`: Index for admin filtering\n- `userId`: Index for maintainer queries\n- `language`: Index for technology filtering\n- `successPoints`: Index for point-based sorting'
            },
            {
                id: 'api-documentation',
                title: 'API Documentation',
                path: 'api-documentation',
                description: 'Complete REST API reference',
                category: 'technical-docs',
                content: '# API Documentation\n\n## 🌐 API Overview\n\nDevSync provides a comprehensive RESTful API for managing users, projects, contributions, events, and administrative functions. The API supports both session-based authentication (for web browsers) and API key authentication (for programmatic access).\n\n## 🔐 Authentication Methods\n\n### 1. Session Authentication\nUsed for web browser access via GitHub OAuth:\n```javascript\n// Login via GitHub OAuth\nGET /auth/github\n\n// OAuth callback\nGET /auth/github/callback\n```\n\n### 2. API Key Authentication\nUsed for programmatic access:\n```bash\ncurl -H "x-api-key: your-api-key-here" \\\n  http://localhost:3000/api/endpoint\n```\n\n## 📋 API Endpoints\n\n### Authentication Routes (`/auth`)\n\n#### GitHub OAuth Login\n```http\nGET /auth/github\n```\n**Purpose**: Initiates GitHub OAuth authentication flow  \n**Authentication**: None required  \n**Response**: Redirects to GitHub OAuth  \n\n#### GitHub OAuth Callback\n```http\nGET /auth/github/callback\n```\n**Purpose**: Handles GitHub OAuth callback  \n**Authentication**: None required  \n**Response**: Redirects to frontend URL  \n\n---\n\n### User Management (`/api/user`)\n\n#### Get Current User\n```http\nGET /api/user\n```\n**Purpose**: Retrieve authenticated user\'s profile  \n**Authentication**: Required (session or API key)  \n**Response**:\n```json\n{\n  "githubId": "12345",\n  "username": "johndoe",\n  "displayName": "John Doe",\n  "email": "john@example.com",\n  "points": 150,\n  "badges": ["First Contribution", "Active Contributor"],\n  "joinedAt": "2025-01-15T10:30:00Z"\n}\n```\n\n#### Get User Statistics\n```http\nGET /api/user/stats\n```\n**Purpose**: Retrieve user\'s contribution statistics  \n**Authentication**: Required  \n**Response**:\n```json\n{\n  "totalContributions": 5,\n  "totalPoints": 250,\n  "rank": 15,\n  "badges": [\n    "First Contribution",\n    "Active Contributor"\n  ],\n  "recentPRs": [\n    {\n      "url": "https://github.com/user/repo/pull/123",\n      "mergedAt": "2025-01-10T14:20:00Z",\n      "points": 50\n    }\n  ]\n}\n```'
            },
            {
                id: 'backend-architecture',
                title: 'Backend Architecture',
                path: 'backend-architecture',
                description: 'Server-side implementation details',
                category: 'technical-docs',
                content: '# Backend Architecture Documentation\n\n## 🏗️ Backend Overview\n\nDevSync\'s backend is built using Node.js and Express.js, following a modular MVC (Model-View-Controller) architecture. The system is designed for scalability, maintainability, and clear separation of concerns, with robust authentication, data validation, and API management.\n\n## 📁 Project Structure\n\n```\nbackend/\n├── app.js                 # Express app configuration\n├── index.js              # Server entry point and setup\n├── config/               # Configuration files\n│   ├── passport.js       # Authentication strategies\n│   └── octokit.js        # GitHub API configuration\n├── controllers/          # Business logic controllers\n│   ├── adminController.js\n│   └── githubController.js\n├── middleware/           # Custom middleware functions\n│   ├── authMiddleware.js\n│   └── adminMiddleware.js\n├── models/              # MongoDB schema definitions\n│   ├── User.js\n│   ├── Repo.js\n│   ├── PendingPR.js\n│   ├── Event.js\n│   └── Ticket.js\n├── routes/              # API route definitions\n│   ├── authRoutes.js\n│   ├── userRoutes.js\n│   ├── projectRoutes.js\n│   ├── adminRoutes.js\n│   └── [others...]\n├── services/            # Business logic services\n│   ├── emailService.js\n│   └── 404page.js\n├── utils/               # Utility functions\n│   ├── pointCalculator.js\n│   ├── badgeAssigner.js\n│   ├── githubHelpers.js\n│   └── [others...]\n└── jobs/                # Background jobs\n    └── ticketCleanup.js\n```\n\n## 🔧 Core Components\n\n### 1. Application Setup (`app.js`)\n\nThe main Express application configuration handles:\n\n```javascript\nconst express = require("express");\nconst session = require("express-session");\nconst passport = require("passport");\nconst cors = require("cors");\nconst MongoStore = require("connect-mongo");\n\nconst app = express();\n\n// Middleware Configuration\napp.use(express.json());                    // JSON parsing\napp.use(express.static("public"));          // Static file serving\napp.use(cors({                              // CORS configuration\n  origin: [process.env.SERVER_URL, process.env.FRONTEND_URL],\n  credentials: true\n}));\n\n// Session Management\napp.use(session({\n  secret: process.env.SESSION_SECRET,\n  resave: false,\n  saveUninitialized: false,\n  store: MongoStore.create({\n    mongoUrl: process.env.MONGODB_URI\n  }),\n  cookie: {\n    secure: process.env.NODE_ENV === "production",\n    httpOnly: true,\n    maxAge: 24 * 60 * 60 * 1000 // 24 hours\n  }\n}));\n\n// Passport Authentication\nrequire("./config/passport")(passport);\napp.use(passport.initialize());\napp.use(passport.session());\n```'
            },
            {
                id: 'frontend-architecture',
                title: 'Frontend Architecture',
                path: 'frontend-architecture',
                description: 'Client-side structure and components',
                category: 'technical-docs',
                content: '# Frontend Architecture Documentation\n\n## 🎨 Frontend Overview\n\nDevSync\'s frontend is built using modern HTML5, CSS3, and vanilla JavaScript, following a component-based architecture with a focus on responsive design and user experience. The frontend serves as a Single Page Application (SPA) with dynamic content loading and interactive features.\n\n## 🏗️ Architecture Structure\n\n```\npublic/\n├── assets/                 # Static assets and resources\n│   ├── css/               # Stylesheets\n│   ├── js/                # JavaScript modules\n│   └── img/               # Images and icons\n├── index.html             # Main SPA entry point\n├── login.html             # Authentication page\n├── admin.html             # Administrative dashboard\n├── profile.html           # User profile page\n├── projects.html          # Project management\n├── leaderboard.html       # Community rankings\n├── events.html            # Event listings\n├── ticket.html            # Support system\n└── [other pages...]       # Additional static pages\n```\n\n## 🧩 Component Architecture\n\n### 1. Layout Components\n\n#### Navigation System (`assets/css/navstyles.css`, `assets/js/nav-*.js`)\n- **Responsive Navigation**: Mobile-first navigation with hamburger menu\n- **User State**: Dynamic navigation based on authentication status\n- **Admin Features**: Special navigation items for administrative users\n\n#### Modal System (`assets/css/modal.css`, `assets/js/modal-*.js`)\n- **Reusable Modals**: Generic modal component for various use cases\n- **Form Modals**: Specialized modals for data input\n- **Confirmation Dialogs**: User action confirmations\n\n#### Toast Notifications (`assets/css/toast.css`, `assets/js/toast.js`)\n- **Success Messages**: Positive feedback for user actions\n- **Error Handling**: User-friendly error notifications\n- **Auto-dismiss**: Timed notification removal\n\n### 2. Page-Specific Components\n\n#### Home Page (`index.html`, `assets/css/home.css`)\n- **Hero Section**: Welcome message and call-to-action\n- **Feature Highlights**: Platform capability showcase\n- **Statistics Display**: Real-time platform metrics\n- **Recent Activity**: Latest community contributions\n\n#### User Dashboard (`profile.html`, `assets/css/profile.css`)\n- **Profile Information**: User details and avatar\n- **Contribution History**: Timeline of user activities\n- **Badge Showcase**: Achievement display system\n- **Statistics Cards**: Personal metrics visualization\n\n#### Project Management (`projects.html`, `assets/css/projects.css`)\n- **Project Grid**: Responsive project card layout\n- **Filter System**: Technology and status-based filtering\n- **Submission Form**: New project submission interface\n- **Status Indicators**: Visual project approval status'
            }
        ]
    },
    {
        id: 'integration-security',
        title: 'Integration & Security',
        path: 'integration-security',
        type: 'category',
        icon: '🔗',
        children: [
            {
                id: 'github-integration',
                title: 'GitHub Integration',
                path: 'github-integration',
                description: 'OAuth and API integration details',
                category: 'integration-security',
                content: '# GitHub Integration Documentation\n\n## 🔗 GitHub Integration Overview\n\nDevSync\'s GitHub integration is the cornerstone of the platform, providing seamless authentication, contribution tracking, and repository management. The integration uses GitHub\'s OAuth2 flow for authentication and the GitHub API for data synchronization.\n\n## 🏗️ Integration Architecture\n\n```\nDevSync Platform\n├── GitHub OAuth2 Authentication\n│   ├── Login Flow\n│   ├── User Profile Sync\n│   └── Session Management\n├── GitHub API Integration\n│   ├── Repository Validation\n│   ├── Contribution Tracking\n│   └── User Data Fetching\n└── Webhook Integration (Future)\n    ├── Real-time PR Updates\n    └── Automatic Point Attribution\n```\n\n## 🔐 Authentication Flow\n\n### 1. OAuth2 Implementation\n\nDevSync uses GitHub\'s OAuth2 flow for secure user authentication:\n\n```javascript\n// GitHub Strategy Configuration\npassport.use(new GitHubStrategy({\n  clientID: process.env.GITHUB_CLIENT_ID,\n  clientSecret: process.env.GITHUB_CLIENT_SECRET,\n  callbackURL: process.env.GITHUB_CALLBACK_URL,\n  scope: ["user", "user:email"]\n}, async (accessToken, refreshToken, profile, done) => {\n  try {\n    // Check if user exists\n    let user = await User.findOne({ githubId: profile.id });\n    \n    if (user) {\n      // Update existing user profile\n      user = await syncUserProfile(accessToken, profile);\n    } else {\n      // Create new user\n      user = await createNewUser(accessToken, profile);\n    }\n    \n    return done(null, user);\n  } catch (error) {\n    return done(error, null);\n  }\n}));\n```\n\n### 2. Scope Permissions\n\nDevSync requests the following GitHub scopes:\n\n- **`user`**: Read access to user profile information\n- **`user:email`**: Access to user\'s email addresses (including private)\n\n### 3. User Profile Synchronization\n\n```javascript\nasync function syncUserProfile(accessToken, profile) {\n  const userOctokit = new Octokit({ auth: accessToken });\n  \n  // Fetch detailed user information\n  const { data: githubUser } = await userOctokit.rest.users.getAuthenticated();\n  \n  // Update user in database\n  const user = await User.findOneAndUpdate(\n    { githubId: profile.id },\n    {\n      username: githubUser.login,\n      displayName: githubUser.name || githubUser.login,\n      email: githubUser.email,\n      profileUrl: githubUser.html_url,\n      avatarUrl: githubUser.avatar_url,\n      bio: githubUser.bio,\n      location: githubUser.location,\n      company: githubUser.company,\n      blog: githubUser.blog,\n      lastActive: new Date()\n    },\n    { new: true }\n  );\n  \n  return user;\n}\n```'
            },
            {
                id: 'api-authentication',
                title: 'API Authentication',
                path: 'api-authentication',
                description: 'Authentication methods and security',
                category: 'integration-security',
                content: '# API Authentication Guide\n\nThis guide explains how to secure and access the DevSync API endpoints.\n\n## Overview\n\nThe DevSync API uses two authentication methods:\n1. **API Key Authentication** - For programmatic access\n2. **Session Authentication** - For web browser access (via GitHub OAuth)\n\nAll API endpoints (except public ones) require either a valid API key or an active user session.\n\n## API Key Setup\n\n### 1. Generate a Secure API Key\n\nRun the included key generator:\n```bash\nnode generateApiKey.js\n```\n\nThis will generate a cryptographically secure 64-character hexadecimal key.\n\n### 2. Configure Environment Variable\n\nAdd the generated key to your `.env` file:\n```env\nAPI_SECRET_KEY=your-generated-key-here\n```\n\n⚠️ **Never commit your API key to version control!**\n\n### 3. Use the API Key\n\nInclude the API key in the `x-api-key` header of your requests:\n\n```bash\ncurl -H "x-api-key: your-api-key-here" \\\n  http://localhost:3000/api/leaderboard\n```\n\n```javascript\n// JavaScript/Node.js example\nconst response = await fetch(\'http://localhost:3000/api/leaderboard\', {\n  headers: {\n    \'x-api-key\': \'your-api-key-here\'\n  }\n});\n```\n\n## Protected Endpoints\n\nThe following endpoints require authentication:\n\n### User Data\n- `GET /api/user` - Get current user info\n- `GET /api/user/stats` - Get user statistics\n- `GET /api/user/profile/:username` - Get user profile\n\n### Leaderboard & Stats\n- `GET /api/leaderboard` - Get leaderboard data\n- `GET /api/stats/global` - Get global statistics\n\n### Projects\n- `GET /api/projects/:userId` - Get user\'s projects\n- `POST /api/projects` - Submit a project\n- `DELETE /api/projects/:projectId` - Delete a project\n- `GET /api/accepted-projects` - Get accepted projects'
            },
            {
                id: 'security',
                title: 'Security Policy',
                path: 'security',
                description: 'Security guidelines and vulnerability reporting',
                category: 'integration-security',
                content: '# Security Policy & Guidelines\n\n## 🔒 Security Overview\n\nDevSync takes security seriously and implements multiple layers of protection to safeguard user data, prevent unauthorized access, and maintain platform integrity. This document outlines our security measures, reporting procedures, and best practices.\n\n## 🛡️ Security Architecture\n\n### 1. Authentication & Authorization\n\n#### OAuth2 Implementation\n- **GitHub OAuth2**: Secure third-party authentication\n- **Scope Limitation**: Minimal required permissions\n- **Token Management**: Secure token storage and rotation\n- **Session Security**: HTTPOnly, secure cookies with proper expiration\n\n```javascript\n// Session Configuration\nsession({\n  secret: process.env.SESSION_SECRET,\n  resave: false,\n  saveUninitialized: false,\n  store: MongoStore.create({\n    mongoUrl: process.env.MONGODB_URI\n  }),\n  cookie: {\n    secure: process.env.NODE_ENV === "production",\n    httpOnly: true,\n    maxAge: 24 * 60 * 60 * 1000 // 24 hours\n  }\n});\n```\n\n#### Role-Based Access Control (RBAC)\n- **User Roles**: Regular users and administrators\n- **Permission Checking**: Middleware-based authorization\n- **Admin Functions**: Restricted administrative endpoints\n\n```javascript\n// Admin Authorization Middleware\nconst isAdmin = (req, res, next) => {\n  const adminIds = process.env.ADMIN_GITHUB_IDS.split(\',\');\n  if (!req.user || !adminIds.includes(req.user.githubId)) {\n    return res.status(403).json({ error: \'Admin access required\' });\n  }\n  next();\n};\n```\n\n### 2. API Security\n\n#### API Key Authentication\n- **Cryptographically Secure**: 64-character hexadecimal keys\n- **Environment Protection**: Keys stored in environment variables\n- **Header-based**: API keys transmitted via headers (x-api-key)\n\n```javascript\n// API Key Generation\nconst crypto = require(\'crypto\');\nconst generateApiKey = () => crypto.randomBytes(32).toString(\'hex\');\n```\n\n#### Rate Limiting\n- **IP-based Limiting**: Prevent brute force attacks\n- **Endpoint-specific**: Different limits for different endpoint types\n- **Memory Store**: In-memory rate limiting for development\n\n```javascript\nconst rateLimit = require(\'express-rate-limit\');\n\nconst apiLimiter = rateLimit({\n  windowMs: 15 * 60 * 1000, // 15 minutes\n  max: 100, // limit each IP to 100 requests per windowMs\n  message: \'Too many requests from this IP\',\n  standardHeaders: true,\n  legacyHeaders: false\n});\n\nconst authLimiter = rateLimit({\n  windowMs: 15 * 60 * 1000,\n  max: 5, // limit each IP to 5 requests per windowMs\n  message: \'Too many authentication attempts\'\n});\n```'
            }
        ]
    },
    {
        id: 'deployment',
        title: 'Deployment & Operations',
        path: 'deployment',
        type: 'category',
        icon: '🚀',
        children: [
            {
                id: 'deployment-guide',
                title: 'Deployment Guide',
                path: 'deployment-guide',
                description: 'Production deployment strategies',
                category: 'deployment',
                content: '# Deployment Guide\n\n## 🚀 Deployment Overview\n\nThis guide covers various deployment strategies for DevSync, from development to production environments. It includes setup instructions for popular hosting platforms, containerization, and best practices for scaling.\n\n## 🏗️ Deployment Architecture\n\n```\nProduction Deployment Stack\n├── Load Balancer (Nginx/CloudFlare)\n├── Application Server (Node.js/PM2)\n├── Database (MongoDB Atlas/Self-hosted)\n├── File Storage (Cloud Storage/CDN)\n├── Email Service (Gmail/SendGrid)\n└── Monitoring (Logs/Analytics)\n```\n\n## 📋 Pre-deployment Checklist\n\n### 1. Environment Preparation\n- [ ] Production environment variables configured\n- [ ] Database production instance ready\n- [ ] Domain name and SSL certificate acquired\n- [ ] GitHub OAuth app configured for production\n- [ ] Email service configured\n- [ ] API keys generated and secured\n\n### 2. Code Preparation\n- [ ] All dependencies updated and audited\n- [ ] Production build tested locally\n- [ ] Environment-specific configurations set\n- [ ] Database migrations completed\n- [ ] Security vulnerabilities patched\n\n### 3. Infrastructure Preparation\n- [ ] Server provisioned and secured\n- [ ] Firewall rules configured\n- [ ] Backup strategy implemented\n- [ ] Monitoring tools installed\n- [ ] CI/CD pipeline configured\n\n## 🌐 Platform-Specific Deployments\n\n### 1. Heroku Deployment\n\nHeroku provides a simple platform for deploying Node.js applications.\n\n#### Setup Steps\n\n1. **Install Heroku CLI**\n```bash\nnpm install -g heroku\nheroku login\n```\n\n2. **Create Heroku Application**\n```bash\nheroku create devsync-production\n```\n\n3. **Configure Environment Variables**\n```bash\nheroku config:set NODE_ENV=production\nheroku config:set MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/devsync\nheroku config:set GITHUB_CLIENT_ID=your-production-client-id\nheroku config:set GITHUB_CLIENT_SECRET=your-production-client-secret\n```\n\n4. **Deploy Application**\n```bash\ngit add .\ngit commit -m "Deploy to Heroku"\ngit push heroku main\n```'
            }
        ]
    }
]

// Helper function to find documentation by path
export const findDocumentationByPath = (path) => {
    const findInStructure = (items, targetPath) => {
        for (const item of items) {
            if (item.path === targetPath) {
                return item
            }
            if (item.children) {
                const found = findInStructure(item.children, targetPath)
                if (found) return found
            }
        }
        return null
    }

    return findInStructure(documentationStructure, path)
}

// Helper function to get navigation breadcrumbs
export const getBreadcrumbs = (path) => {
    const breadcrumbs = []
    const pathParts = path.split('/')

    let currentStructure = documentationStructure
    let currentPath = ''

    for (const part of pathParts) {
        if (!part) continue

        currentPath = currentPath ? `${currentPath}/${part}` : part

        const item = currentStructure.find(item => item.path === part)
        if (item) {
            breadcrumbs.push({
                title: item.title,
                path: currentPath
            })

            if (item.children) {
                currentStructure = item.children
            }
        }
    }

    return breadcrumbs
}

// Helper function to get previous/next navigation
export const getNavigation = (currentPath) => {
    const allDocs = getAllContent()
    const currentIndex = allDocs.findIndex(doc => doc.path === currentPath)

    return {
        previous: currentIndex > 0 ? allDocs[currentIndex - 1] : null,
        next: currentIndex < allDocs.length - 1 ? allDocs[currentIndex + 1] : null
    }
}

// Helper function to get all searchable content
export const getAllContent = () => {
    const getAllItems = (items) => {
        let allItems = []
        for (const item of items) {
            if (item.content) {
                allItems.push(item)
            }
            if (item.children) {
                allItems = allItems.concat(getAllItems(item.children))
            }
        }
        return allItems
    }

    return getAllItems(documentationStructure)
}
