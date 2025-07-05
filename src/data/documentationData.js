// Documentation structure mirroring the actual DevSync docs
import {
    projectOverviewContent,
    setupGuideContent,
    contributingContent,
    apiDocumentationContent,
    backendArchitectureContent,
    frontendArchitectureContent,
    databaseSchemaContent,
    deploymentGuideContent,
    securityContent,
    githubIntegrationContent,
    apiAuthenticationContent
} from './markdownContent/index.js';

export const documentationStructure = [
    {
        id: 'getting-started',
        title: 'Getting Started',
        path: 'getting-started',
        type: 'page', // Changed from 'category' to 'page'
        icon: '🚀',
        description: 'Welcome to DevSync! Start your journey with our comprehensive guide.',
        content: `# Getting Started with DevSync

Welcome to DevSync! This comprehensive guide will help you understand, set up, and start contributing to the DevSync open-source community platform.

## 🎯 What is DevSync?

DevSync is a comprehensive open-source community platform designed to foster collaboration, track contributions, and build developer portfolios. It serves as a bridge between open-source maintainers and contributors, providing tools for project management, contribution tracking, and community engagement.

## 🚀 Quick Start Options

Choose your path based on your role and goals:

### 👨‍💻 For New Developers

**Want to understand DevSync?**
1. 📖 [Project Overview](project-overview) - Learn about DevSync's mission and architecture
2. 🔧 [Setup Guide](setup-guide) - Get your development environment running
3. 🤝 [Contributing Guide](contributing) - Join our developer community

### 🏗️ For Technical Implementation

**Ready to dive into the code?**
1. 🏗️ [Backend Architecture](backend-architecture) - Server-side implementation details
2. 🎨 [Frontend Architecture](frontend-architecture) - Client-side structure and components
3. 📊 [Database Schema](database-schema) - Data models and relationships
4. 🌐 [API Documentation](api-documentation) - Complete REST API reference

### 🔐 For Integration & Security

**Setting up authentication and security?**
1. 🔐 [GitHub Integration](github-integration) - OAuth and API integration details
2. 🔑 [API Authentication](api-authentication) - Authentication methods and security
3. 🛡️ [Security Policy](security) - Security guidelines and best practices

### 🚀 For Deployment

**Ready to deploy to production?**
1. 🌐 [Deployment Guide](deployment-guide) - Production deployment strategies
2. 🔧 [Setup Guide](setup-guide) - Environment configuration

## 🎯 Common Tasks

### Setting Up Development Environment
\`\`\`bash
# Clone the repository
git clone https://github.com/your-username/devsync.git
cd devsync

# Install dependencies
npm install

# Configure environment
cp .env.example .env
# Edit .env with your configuration

# Start development server
npm run dev
\`\`\`

### First Contribution
1. Read our [Contributing Guide](contributing)
2. Look for issues labeled \`good first issue\`
3. Fork the repository and create a feature branch
4. Make your changes and submit a pull request

### Using the API
1. Check the [API Documentation](api-documentation)
2. Set up [API Authentication](api-authentication)
3. Test endpoints with our examples

## 📚 Documentation Structure

Our documentation is organized into logical sections:

- **Getting Started** - Onboarding and basic setup
- **Technical Docs** - Architecture and implementation details  
- **Integration** - Third-party services and APIs
- **Security** - Authentication, authorization, and security policies
- **Deployment** - Production deployment and operations

## 🎯 Next Steps

1. **New to DevSync?** → Start with [Project Overview](project-overview)
2. **Ready to code?** → Follow the [Setup Guide](setup-guide)
3. **Want to contribute?** → Read the [Contributing Guide](contributing)
4. **Need API access?** → Check [API Documentation](api-documentation)

## 🤝 Getting Help

- 📚 **Documentation Issues**: [GitHub Issues](https://github.com/devsync/docs/issues)
- 💬 **Community Chat**: [Discord Server](https://discord.gg/devsync)
- 📧 **Direct Contact**: [developers@devsync.dev](mailto:developers@devsync.dev)

Welcome to the DevSync community! We're excited to have you on board. 🎉`,
        children: [
            {
                id: 'project-overview',
                title: 'Project Overview',
                path: 'project-overview',
                description: 'High-level architecture and project goals',
                category: 'getting-started',
                content: projectOverviewContent
            },
            {
                id: 'setup-guide',
                title: 'Setup Guide',
                path: 'setup-guide',
                description: 'Step-by-step installation and configuration',
                category: 'getting-started',
                content: setupGuideContent
            },
            {
                id: 'contributing',
                title: 'Contributing Guide',
                path: 'contributing',
                description: 'How to contribute to the project',
                category: 'getting-started',
                content: contributingContent
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
                content: databaseSchemaContent
            },
            {
                id: 'api-documentation',
                title: 'API Documentation',
                path: 'api-documentation',
                description: 'Complete REST API reference',
                category: 'technical-docs',
                content: apiDocumentationContent
            },
            {
                id: 'backend-architecture',
                title: 'Backend Architecture',
                path: 'backend-architecture',
                description: 'Server-side implementation details',
                category: 'technical-docs',
                content: backendArchitectureContent
            },
            {
                id: 'frontend-architecture',
                title: 'Frontend Architecture',
                path: 'frontend-architecture',
                description: 'Client-side structure and components',
                category: 'technical-docs',
                content: frontendArchitectureContent
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
                content: githubIntegrationContent
            },
            {
                id: 'api-authentication',
                title: 'API Authentication',
                path: 'api-authentication',
                description: 'Authentication methods and security',
                category: 'integration-security',
                content: apiAuthenticationContent
            },
            {
                id: 'security',
                title: 'Security Policy',
                path: 'security',
                description: 'Security guidelines and vulnerability reporting',
                category: 'integration-security',
                content: securityContent
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
                content: deploymentGuideContent
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
