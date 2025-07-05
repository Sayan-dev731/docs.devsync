export const setupGuideContent = `# Environment Setup & Configuration Guide

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
# OR for MongoDB Atlas:
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/devsync

# Session Configuration
SESSION_SECRET=your-super-secret-session-key-here

# GitHub OAuth Configuration
GITHUB_CLIENT_ID=your-github-client-id
GITHUB_CLIENT_SECRET=your-github-client-secret
GITHUB_CALLBACK_URL=http://localhost:5500/auth/github/callback
GITHUB_ACCESS_TOKEN=your-github-personal-access-token

# Admin Configuration
ADMIN_GITHUB_IDS=admin1,admin2,admin3

# Email Configuration (Gmail)
GMAIL_EMAIL=your-email@gmail.com
GMAIL_PASSWORD=your-app-specific-password

# API Security
API_SECRET_KEY=generate-using-generateApiKey.js
\`\`\`

## ⚙️ Service Configuration

### 1. MongoDB Setup

#### Option A: Local MongoDB Installation

**Windows:**
\`\`\`bash
# Download MongoDB Community Server from https://www.mongodb.com/try/download/community
# Install and start MongoDB service
net start MongoDB
\`\`\`

**macOS:**
\`\`\`bash
# Using Homebrew
brew tap mongodb/brew
brew install mongodb-community
brew services start mongodb/brew/mongodb-community
\`\`\`

**Linux (Ubuntu):**
\`\`\`bash
# Import MongoDB public GPG key
wget -qO - https://www.mongodb.org/static/pgp/server-5.0.asc | sudo apt-key add -

# Create source list file
echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu focal/mongodb-org/5.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-5.0.list

# Install MongoDB
sudo apt-get update
sudo apt-get install -y mongodb-org

# Start MongoDB
sudo systemctl start mongod
sudo systemctl enable mongod
\`\`\`

#### Option B: MongoDB Atlas (Cloud)

1. Create account at [MongoDB Atlas](https://www.mongodb.com/atlas)
2. Create a new cluster
3. Add database user and whitelist your IP
4. Get connection string and update \`MONGODB_URI\`

### 2. GitHub OAuth App Setup

1. Go to [GitHub Developer Settings](https://github.com/settings/developers)
2. Click "New OAuth App"
3. Fill in application details:
   - **Application name**: DevSync Local
   - **Homepage URL**: \`http://localhost:5500\`
   - **Authorization callback URL**: \`http://localhost:5500/auth/github/callback\`
4. Copy \`Client ID\` and \`Client Secret\` to \`.env\` file

### 3. GitHub Personal Access Token

1. Go to [GitHub Settings > Personal Access Tokens](https://github.com/settings/tokens)
2. Click "Generate new token (classic)"
3. Select scopes:
   - \`repo\` (Full control of private repositories)
   - \`user\` (Read/write access to profile info)
   - \`user:email\` (Access user email addresses)
4. Copy token to \`GITHUB_ACCESS_TOKEN\` in \`.env\`

### 4. Gmail App Password Setup

1. Enable 2-Factor Authentication on your Gmail account
2. Go to [Google App Passwords](https://myaccount.google.com/apppasswords)
3. Generate app password for "Mail"
4. Use this password (not your regular Gmail password) in \`GMAIL_PASSWORD\`

### 5. API Key Generation

Generate a secure API key:
\`\`\`bash
node generateApiKey.js
\`\`\`
Copy the generated key to \`API_SECRET_KEY\` in \`.env\`

## 🏃‍♂️ Running the Application

### Development Mode
\`\`\`bash
npm run dev
# OR
npm start
\`\`\`

### Testing the Setup
1. Open browser and navigate to \`http://localhost:5500\`
2. Test GitHub OAuth login
3. Submit a test project
4. Check email functionality

## 🔍 Troubleshooting

### Common Issues

#### 1. MongoDB Connection Error
\`\`\`bash
# Check MongoDB service status
sudo systemctl status mongod

# Restart MongoDB
sudo systemctl restart mongod

# Check connection string format
# Ensure IP whitelist includes your IP (Atlas)
\`\`\`

#### 2. GitHub OAuth Error
- Verify callback URL matches exactly
- Check client ID and secret
- Ensure GitHub app is not suspended

#### 3. Email Service Error
- Verify Gmail app password (not regular password)
- Check 2FA is enabled
- Ensure "Less secure app access" is disabled

#### 4. API Key Issues
\`\`\`bash
# Regenerate API key
node generateApiKey.js

# Test API access
node testApiAuth.js
\`\`\`

#### 5. Port Already in Use
\`\`\`bash
# Find process using port
lsof -i :5500

# Kill process
kill -9 <PID>

# Or use different port
PORT=3000 npm start
\`\`\`

## 📚 Additional Resources

### Documentation Links
- [MongoDB Documentation](https://docs.mongodb.com/)
- [Express.js Guide](https://expressjs.com/en/guide/)
- [Passport.js Documentation](http://www.passportjs.org/docs/)
- [GitHub API Documentation](https://docs.github.com/en/rest)
- [Nodemailer Documentation](https://nodemailer.com/about/)

### Development Tools
- **MongoDB Compass**: GUI for MongoDB
- **Postman**: API testing
- **VS Code Extensions**: 
  - MongoDB for VS Code
  - Thunder Client
  - GitLens
  - Prettier

This setup guide should help you get DevSync running in any environment. For specific deployment scenarios or issues not covered here, refer to the platform-specific documentation or create an issue in the repository.
`;
