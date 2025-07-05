// Utility to load markdown content from the docs folder

import { projectOverviewContent } from '../data/markdownContent/projectOverview.js'
import { setupGuideContent } from '../data/markdownContent/setupGuide.js'
import { contributingContent } from '../data/markdownContent/contributing.js'
import { apiDocumentationContent } from '../data/markdownContent/apiDocumentation.js'
import { backendArchitectureContent } from '../data/markdownContent/backendArchitecture.js'
import { frontendArchitectureContent } from '../data/markdownContent/frontendArchitecture.js'
import { deploymentGuideContent } from '../data/markdownContent/deploymentGuide.js'
import { databaseSchemaContent } from '../data/markdownContent/databaseSchema.js'

/**
 * Dynamically load markdown content from the docs folder
 * This reads the actual markdown files at runtime
 */
export const loadMarkdownFromDocs = async (filename) => {
    try {
        // In a real production environment, this would fetch from the actual docs folder
        // For now, we'll load from our data modules
        const content = markdownContentMap[filename]
        if (content) {
            return content
        }

        // Fallback to fetch if file is not in our map
        const response = await fetch(`/docs/${filename}`)
        if (!response.ok) {
            throw new Error(`Failed to load ${filename}`)
        }
        return await response.text()
    } catch (error) {
        console.error(`Error loading ${filename}:`, error)
        return `# Content Not Found\n\nThe requested content could not be loaded.`
    }
}

// Map of markdown files to their content
const markdownContentMap = {
    'PROJECT_OVERVIEW.md': projectOverviewContent,
    'SETUP_GUIDE.md': setupGuideContent,
    'CONTRIBUTING.md': contributingContent,
    'API_DOCUMENTATION.md': apiDocumentationContent,
    'BACKEND_ARCHITECTURE.md': backendArchitectureContent,
    'FRONTEND_ARCHITECTURE.md': frontendArchitectureContent,
    'DEPLOYMENT_GUIDE.md': deploymentGuideContent,
    'DATABASE_SCHEMA.md': databaseSchemaContent,
}

/**
 * Load markdown content by filename
 * @param {string} filename - The markdown filename
 * @returns {Promise<string>} The markdown content
 */
export const loadMarkdownContent = async (filename) => {
    const content = markdownContentMap[filename]
    if (content) {
        return content
    }

    // If not found in our map, try loading from docs folder
    return await loadMarkdownFromDocs(filename)
}

/**
 * Get all available markdown files
 * @returns {string[]} Array of available markdown filenames
 */
export const getAvailableMarkdownFiles = () => {
    return Object.keys(markdownContentMap)
}

/**
 * Search through markdown content
 * @param {string} query - Search query
 * @returns {Array} Search results
 */
export const searchMarkdownContent = (query) => {
    const results = []
    const searchTerm = query.toLowerCase()

    Object.entries(markdownContentMap).forEach(([filename, content]) => {
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
    loadMarkdownFromDocs,
    getAvailableMarkdownFiles,
    searchMarkdownContent
}
