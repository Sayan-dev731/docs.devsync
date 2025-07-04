import React, { createContext, useContext, useState, useCallback } from 'react'
import Fuse from 'fuse.js'
import { documentationStructure } from '../data/documentationData'

const SearchContext = createContext()

export const useSearch = () => {
    const context = useContext(SearchContext)
    if (!context) {
        throw new Error('useSearch must be used within a SearchProvider')
    }
    return context
}

export const SearchProvider = ({ children }) => {
    const [searchQuery, setSearchQuery] = useState('')
    const [searchResults, setSearchResults] = useState([])
    const [isSearching, setIsSearching] = useState(false)
    const [recentSearches, setRecentSearches] = useState(() => {
        const saved = localStorage.getItem('recentSearches')
        return saved ? JSON.parse(saved) : []
    })

    // Flatten documentation structure for search
    const searchableContent = React.useMemo(() => {
        const flatten = (items, parentPath = '') => {
            let result = []

            items.forEach(item => {
                const fullPath = parentPath ? `${parentPath}/${item.path}` : item.path

                result.push({
                    id: item.id,
                    title: item.title,
                    path: fullPath,
                    content: item.content || '',
                    description: item.description || '',
                    type: item.type || 'page',
                    category: item.category || 'documentation'
                })

                if (item.children) {
                    result = result.concat(flatten(item.children, fullPath))
                }
            })

            return result
        }

        return flatten(documentationStructure)
    }, [])

    // Configure Fuse.js for fuzzy search
    const fuse = React.useMemo(() => {
        return new Fuse(searchableContent, {
            keys: [
                { name: 'title', weight: 0.4 },
                { name: 'content', weight: 0.3 },
                { name: 'description', weight: 0.2 },
                { name: 'category', weight: 0.1 }
            ],
            threshold: 0.3,
            includeScore: true,
            includeMatches: true,
            minMatchCharLength: 2
        })
    }, [searchableContent])

    const performSearch = useCallback(async (query) => {
        if (!query.trim()) {
            setSearchResults([])
            return
        }

        setIsSearching(true)

        // Simulate API delay for realistic UX
        await new Promise(resolve => setTimeout(resolve, 200))

        const results = fuse.search(query)
        const formattedResults = results.map(result => ({
            ...result.item,
            score: result.score,
            matches: result.matches
        }))

        setSearchResults(formattedResults)
        setIsSearching(false)
    }, [fuse])

    const updateSearchQuery = useCallback((query) => {
        setSearchQuery(query)
        performSearch(query)
    }, [performSearch])

    const addToRecentSearches = useCallback((query) => {
        if (!query.trim()) return

        const updated = [query, ...recentSearches.filter(q => q !== query)].slice(0, 10)
        setRecentSearches(updated)
        localStorage.setItem('recentSearches', JSON.stringify(updated))
    }, [recentSearches])

    const clearRecentSearches = useCallback(() => {
        setRecentSearches([])
        localStorage.removeItem('recentSearches')
    }, [])

    const getSearchSuggestions = useCallback((query) => {
        if (!query.trim()) return []

        const suggestions = searchableContent
            .filter(item =>
                item.title.toLowerCase().includes(query.toLowerCase()) ||
                item.content.toLowerCase().includes(query.toLowerCase())
            )
            .slice(0, 5)
            .map(item => ({
                text: item.title,
                path: item.path,
                type: 'suggestion'
            }))

        return suggestions
    }, [searchableContent])

    const value = {
        searchQuery,
        searchResults,
        isSearching,
        recentSearches,
        updateSearchQuery,
        addToRecentSearches,
        clearRecentSearches,
        getSearchSuggestions,
        performSearch
    }

    return (
        <SearchContext.Provider value={value}>
            {children}
        </SearchContext.Provider>
    )
}
