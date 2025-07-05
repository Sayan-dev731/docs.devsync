export const databaseSchemaContent = `# Database Schema & Models Documentation

> [!NOTE]
> DevSync uses MongoDB as its primary database with Mongoose ODM for schema definition and data validation. The database is designed to support user management, project tracking, contribution monitoring, and community features.

## Table of contents

- [Database Overview](#database-overview)
- [Schema Architecture](#schema-architecture)
- [Model Definitions](#model-definitions)
- [Relationships](#relationships)
- [Indexes and Performance](#indexes-and-performance)
- [Data Validation](#data-validation)
- [Migration Strategy](#migration-strategy)

## Database Overview

### Technology Stack
- **Database**: MongoDB 5.0+
- **ODM**: Mongoose 6.x
- **Connection**: Connection pooling with automatic reconnection
- **Environment**: Supports both local MongoDB and MongoDB Atlas

### Database Configuration

\`\`\`javascript
// Connection configuration
const mongoConfig = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  maxPoolSize: 10,
  serverSelectionTimeoutMS: 5000,
  socketTimeoutMS: 45000,
  bufferMaxEntries: 0
};
\`\`\`

## Schema Architecture

\`\`\`
MongoDB Database: devsync
├── users              (User profiles and authentication)
├── repos              (Registered open-source projects)
├── pendingprs         (Pull request submissions for review)
├── events             (Community events and workshops)
├── tickets            (Support and feature requests)
└── sessions           (User session management)
\`\`\`

## Model Definitions

### 1. User Model (\`models/User.js\`)

**Purpose**: Stores user profiles, authentication data, and contribution statistics.

\`\`\`javascript
{
  githubId: String (required, unique),      // GitHub user ID
  username: String (required),              // GitHub username
  displayName: String,                      // Full display name
  email: String (required),                 // Primary email address
  avatarUrl: String,                        // GitHub profile picture URL
  profileUrl: String,                       // GitHub profile URL
  bio: String,                              // User bio from GitHub
  location: String,                         // Geographic location
  company: String,                          // Company/organization
  blog: String,                             // Personal website URL
  
  // Authentication & Permissions
  isAdmin: Boolean (default: false),        // Admin privileges
  
  // Contribution Tracking
  mergedPRs: [{                            // Successfully merged contributions
    repoId: String,                         // Repository identifier
    prNumber: Number,                       // Pull request number
    title: String,                          // PR title
    url: String,                            // Full PR URL
    mergedAt: Date,                         // Merge timestamp
    points: Number                          // Points awarded
  }],
  
  cancelledPRs: [{                         // Rejected/cancelled contributions
    repoId: String,                         // Repository identifier
    prNumber: Number,                       // Pull request number
    title: String,                          // PR title
    cancelledAt: Date,                      // Cancellation timestamp
    rejectionReason: String                 // Admin-provided reason
  }],
  
  // Gamification
  points: Number (default: 0),              // Total contribution points
  badges: [String] (default: ['Newcomer']), // Earned achievement badges
  
  // Timestamps
  joinedAt: Date (default: Date.now),       // Registration timestamp
  lastActive: Date,                         // Last activity timestamp
  welcomeEmailSent: Boolean (default: false) // Email notification status
}
\`\`\`

**Indexes**: 
- \`githubId\`: Unique index for fast user lookup
- \`username\`: Index for username-based queries
- \`points\`: Index for leaderboard sorting
- \`isAdmin\`: Index for admin queries

### 2. Repository Model (\`models/Repo.js\`)

**Purpose**: Manages registered open-source projects available for contributions.

\`\`\`javascript
{
  // Repository Information
  repoLink: String (required, unique),      // GitHub repository URL
  repoName: String (required),              // Repository name
  ownerName: String (required),             // Repository owner username
  description: String (required),           // Project description
  
  // Technical Details
  language: String,                         // Primary programming language
  technologies: [String] (required),        // Technology stack array
  topics: [String],                         // GitHub topics/tags
  
  // Maintainer Information
  userId: String (required),                // Maintainer's GitHub ID
  
  // Review Process
  reviewStatus: String {                    // Admin review status
    enum: ['pending', 'approved', 'rejected'],
    default: 'pending'
  },
  submittedAt: Date (default: Date.now),    // Submission timestamp
  reviewedAt: Date,                         // Review completion timestamp
  reviewedBy: String,                       // Reviewing admin username
  reviewFeedback: String,                   // Admin feedback/notes
  
  // Contribution Metrics
  successPoints: Number (default: 50),      // Points awarded per contribution
  difficulty: String {                      // Project difficulty level
    enum: ['beginner', 'intermediate', 'advanced'],
    default: 'intermediate'
  },
  
  // GitHub Statistics (cached)
  stars: Number,                            // GitHub stars count
  forks: Number,                            // GitHub forks count
  openIssues: Number,                       // Open issues count
  lastCommit: Date,                         // Last commit timestamp
  
  // Metadata
  isActive: Boolean (default: true),        // Project is accepting contributions
  featured: Boolean (default: false),       // Featured project status
  lastUpdated: Date (default: Date.now)     // Last modification timestamp
}
\`\`\`

**Indexes**:
- \`repoLink\`: Unique index to prevent duplicates
- \`reviewStatus\`: Index for admin filtering
- \`userId\`: Index for maintainer queries
- \`language\`: Index for technology filtering
- \`featured\`: Index for featured projects
- \`isActive\`: Index for active projects

### 3. PendingPR Model (\`models/PendingPR.js\`)

**Purpose**: Tracks pull request submissions awaiting admin approval.

\`\`\`javascript
{
  // Contributor Information
  userId: String (required, indexed),       // Contributor's GitHub ID
  username: String (required, indexed),     // Contributor's GitHub username
  
  // Repository Information
  repoId: String (required),                // Repository identifier (legacy)
  repoUrl: String (required, indexed),      // Repository URL
  repoName: String,                         // Repository name
  
  // Pull Request Details
  prNumber: Number (required, indexed),     // Pull request number
  prUrl: String (required),                 // Full PR URL
  title: String (required),                 // PR title
  description: String,                      // PR description
  
  // Timestamps
  mergedAt: Date (required),                // PR merge timestamp
  submittedAt: Date (default: Date.now),    // Submission for review
  
  // Point Calculation
  suggestedPoints: Number {                 // Proposed point value
    default: 50,
    min: 0,
    max: 1000
  },
  
  // Review Process
  reviewStatus: String {                    // Review status
    enum: ['pending', 'approved', 'rejected'],
    default: 'pending'
  },
  reviewedAt: Date,                         // Review completion
  reviewedBy: String,                       // Reviewing admin
  reviewNotes: String,                      // Admin notes
  
  // Metadata
  labels: [String],                         // PR labels from GitHub
  linesAdded: Number,                       // Lines of code added
  linesRemoved: Number,                     // Lines of code removed
  filesChanged: Number                      // Number of files modified
}
\`\`\`

**Indexes**:
- \`userId\`: Index for user's submissions
- \`reviewStatus\`: Index for admin filtering
- \`repoUrl\`: Index for repository filtering
- \`mergedAt\`: Index for chronological sorting

### 4. Event Model (\`models/Event.js\`)

**Purpose**: Manages community events, workshops, and activities.

\`\`\`javascript
{
  // Event Information
  title: String (required),                 // Event title
  description: String (required),           // Event description
  eventType: String {                       // Type of event
    enum: ['workshop', 'meetup', 'conference', 'hackathon', 'webinar'],
    default: 'workshop'
  },
  
  // Scheduling
  startDate: Date (required),               // Event start time
  endDate: Date,                            // Event end time (optional)
  timezone: String (default: 'UTC'),        // Event timezone
  
  // Location
  location: String,                         // Event location
  isVirtual: Boolean (default: true),       // Virtual or in-person
  meetingUrl: String,                       // Virtual meeting link
  
  // Registration
  registrationUrl: String,                  // External registration link
  maxAttendees: Number,                     // Maximum participants
  registrationDeadline: Date,               // Registration cutoff
  
  // Organization
  organizer: String (required),             // Event organizer name
  organizerContact: String,                 // Contact information
  
  // Content
  agenda: [String],                         // Event agenda items
  prerequisites: [String],                  // Required knowledge/tools
  tags: [String],                           // Event tags/categories
  
  // Status
  status: String {                          // Event status
    enum: ['draft', 'published', 'cancelled', 'completed'],
    default: 'draft'
  },
  
  // Metadata
  createdBy: String (required),             // Creator's GitHub ID
  createdAt: Date (default: Date.now),      // Creation timestamp
  updatedAt: Date (default: Date.now)       // Last update timestamp
}
\`\`\`

### 5. Support Ticket Model (\`models/Ticket.js\`)

**Purpose**: Handles user support requests and feature suggestions.

\`\`\`javascript
{
  // Ticket Information
  ticketNumber: String (required, unique),  // Auto-generated ticket ID
  title: String (required),                 // Ticket title
  description: String (required),           // Detailed description
  
  // Classification
  category: String {                        // Ticket category
    enum: ['bug', 'feature', 'support', 'account', 'other'],
    default: 'support'
  },
  priority: String {                        // Priority level
    enum: ['low', 'medium', 'high', 'urgent'],
    default: 'medium'
  },
  
  // User Information
  userId: String (required),                // Reporter's GitHub ID
  username: String (required),              // Reporter's username
  userEmail: String,                        // Contact email
  
  // Status Tracking
  status: String {                          // Current status
    enum: ['open', 'in-progress', 'resolved', 'closed'],
    default: 'open'
  },
  
  // Assignment
  assignedTo: String,                       // Assigned admin username
  assignedAt: Date,                         // Assignment timestamp
  
  // Resolution
  resolution: String,                       // Resolution notes
  resolvedAt: Date,                         // Resolution timestamp
  
  // Communication
  comments: [{                              // Ticket conversation
    author: String,                         // Comment author
    content: String,                        // Comment content
    timestamp: Date (default: Date.now),    // Comment timestamp
    isInternal: Boolean (default: false)    // Internal admin note
  }],
  
  // Metadata
  createdAt: Date (default: Date.now),      // Creation timestamp
  updatedAt: Date (default: Date.now),      // Last update timestamp
  tags: [String]                            // Additional tags
}
\`\`\`

## Relationships

### User → Repository (One-to-Many)
- A user can submit multiple repositories
- \`repos.userId\` references \`users.githubId\`

### User → PendingPR (One-to-Many)
- A user can have multiple pending PRs
- \`pendingprs.userId\` references \`users.githubId\`

### Repository → PendingPR (One-to-Many)
- A repository can have multiple contribution submissions
- \`pendingprs.repoUrl\` references \`repos.repoLink\`

### User → Event (Many-to-Many)
- Users can attend multiple events
- Events can have multiple attendees
- Relationship tracked through registration systems

### User → Ticket (One-to-Many)
- A user can create multiple support tickets
- \`tickets.userId\` references \`users.githubId\`

## Indexes and Performance

### Compound Indexes

\`\`\`javascript
// User collection
users.createIndex({ "points": -1, "joinedAt": 1 });  // Leaderboard queries
users.createIndex({ "username": 1, "isAdmin": 1 });   // Admin user lookup

// Repository collection
repos.createIndex({ "reviewStatus": 1, "submittedAt": -1 }); // Admin review queue
repos.createIndex({ "language": 1, "isActive": 1 });         // Technology filtering
repos.createIndex({ "userId": 1, "reviewStatus": 1 });       // User's projects

// PendingPR collection
pendingprs.createIndex({ "reviewStatus": 1, "submittedAt": -1 }); // Review queue
pendingprs.createIndex({ "userId": 1, "mergedAt": -1 });          // User's PRs

// Event collection
events.createIndex({ "startDate": 1, "status": 1 });              // Upcoming events
events.createIndex({ "eventType": 1, "isVirtual": 1 });           // Event filtering

// Ticket collection
tickets.createIndex({ "status": 1, "priority": -1, "createdAt": -1 }); // Support queue
tickets.createIndex({ "userId": 1, "status": 1 });                     // User tickets
\`\`\`

## Data Validation

### Custom Validators

\`\`\`javascript
// GitHub URL validation
const githubUrlValidator = {
  validator: function(url) {
    return /^https:\\/\\/github\\.com\\/[\\w\\.-]+\\/[\\w\\.-]+$/.test(url);
  },
  message: 'Invalid GitHub repository URL format'
};

// Email validation
const emailValidator = {
  validator: function(email) {
    return /^[\\w\\.-]+@[\\w\\.-]+\\.[a-zA-Z]{2,}$/.test(email);
  },
  message: 'Invalid email format'
};

// Points range validation
const pointsValidator = {
  validator: function(points) {
    return points >= 0 && points <= 1000;
  },
  message: 'Points must be between 0 and 1000'
};
\`\`\`

### Pre-save Middleware

\`\`\`javascript
// Auto-generate ticket numbers
ticketSchema.pre('save', function(next) {
  if (!this.ticketNumber) {
    this.ticketNumber = \`DEV-\${Date.now().toString(36).toUpperCase()}\`;
  }
  next();
});

// Update timestamps
const updateTimestamp = function(next) {
  this.updatedAt = new Date();
  next();
};

userSchema.pre('save', updateTimestamp);
repoSchema.pre('save', updateTimestamp);
eventSchema.pre('save', updateTimestamp);
\`\`\`

## Migration Strategy

### Version Control

\`\`\`javascript
// Schema versioning for migrations
const schemaVersion = {
  user: '1.2.0',
  repo: '1.1.0',
  pendingpr: '1.0.1',
  event: '1.0.0',
  ticket: '1.0.0'
};
\`\`\`

### Migration Scripts

\`\`\`bash
# Run database migrations
npm run migrate:up     # Apply pending migrations
npm run migrate:down   # Rollback last migration
npm run migrate:status # Check migration status
\`\`\`

> [!WARNING]
> Always backup your database before running migrations in production!

> [!NOTE]
> This schema documentation is regularly updated to reflect the current database structure. For implementation details, refer to the individual model files in the \`/models\` directory.
`;
