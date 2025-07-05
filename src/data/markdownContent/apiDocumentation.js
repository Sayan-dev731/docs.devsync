export const apiDocumentationContent = `# API Documentation

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

### GitHub OAuth Callback

\`\`\`http
GET /auth/github/callback
\`\`\`

**Purpose**: Handles GitHub OAuth callback  
**Authentication**: None required  
**Response**: Redirects to frontend URL  

---

## User Management

### Get Current User

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

### Get User Statistics

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

### Get User Profile by Username

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

## Project Management

### Get User's Projects

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

### Submit New Project

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

### Delete Project

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

### Get Accepted Projects

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

## Leaderboard & Statistics

### Get Leaderboard

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

### Get Global Statistics

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

## GitHub Integration

### Sync User Contributions

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

### Validate Repository

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

## Event Management

### Get Events

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

### Create Event (Admin Only)

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

## Support Tickets

### Create Support Ticket

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

### Get User's Tickets

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

## Administrative Routes

> [!WARNING]
> All admin routes require admin authentication

### Get Pending Projects

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

### Approve/Reject Project

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

### Get All Users

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

## Public Routes

### Health Check

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

### Get Public Stats

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

## Error Handling

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

## Rate Limiting

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

## Pagination

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

> [!NOTE]
> This API documentation provides complete reference for integrating with DevSync programmatically. For questions or support, please refer to our [GitHub repository](https://github.com/devsync/devsync) or contact the maintainers.
`;
