export const contributingContent = `# Contributing Guide

> [!NOTE]
> Thank you for your interest in contributing to DevSync! This guide will help you understand how to contribute effectively to the project, whether you're fixing a bug, adding a feature, or improving documentation.

## Table of contents

- [How to Contribute](#how-to-contribute)
- [Getting Started](#getting-started)
- [Development Workflow](#development-workflow)
- [Testing Guidelines](#testing-guidelines)
- [Code Review Process](#code-review-process)
- [Bug Reports](#bug-reports)
- [Feature Requests](#feature-requests)
- [Recognition](#recognition)

## How to Contribute

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

## Getting Started

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

Follow the [Setup Guide](setup-guide) to configure your local development environment.

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

## Development Workflow

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

## Testing Guidelines

### Unit Tests
- Write tests for all new functions
- Test both success and error cases
- Use descriptive test names
- Maintain >80% code coverage

### Integration Tests
- Test API endpoints
- Test database interactions
- Test GitHub API integration

### Manual Testing
- Test in multiple browsers
- Test responsive design
- Test with different user roles
- Test error scenarios

## Code Review Process

### Before Submitting

- [ ] Code follows style guidelines
- [ ] All tests pass
- [ ] Documentation is updated
- [ ] No merge conflicts
- [ ] PR description is clear

### Review Criteria

Reviewers will check for:
- **Functionality**: Does the code work as expected?
- **Code Quality**: Is the code readable and maintainable?
- **Performance**: Are there any performance implications?
- **Security**: Are there any security concerns?
- **Testing**: Are tests adequate and passing?

## Bug Reports

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

## Feature Requests

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

## Recognition

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

## Getting Help

### Community Channels

- **GitHub Discussions**: Ask questions and get help from the community
- **Issues**: Report bugs or request features
- **Discord**: Real-time chat with other contributors (link in README)

### Maintainer Contact

For sensitive issues or questions, contact the maintainers:
- **Email**: maintainers@devsync.dev
- **GitHub**: @maintainer-username

> [!NOTE]
> Thank you for contributing to DevSync! Your efforts help make this project better for everyone. 🚀
`;
