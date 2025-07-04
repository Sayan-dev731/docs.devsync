import React, { useEffect, useState } from 'react'
import { useSearchParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Search, Clock, FileText, ArrowRight, Filter, X } from 'lucide-react'

import { useSearch } from '../contexts/SearchContext'
import { Button } from '../components/ui/Button'
import SearchInput from '../components/ui/SearchInput'
import LoadingSpinner from '../components/ui/LoadingSpinner'

const SearchPage = () => {
    const [searchParams, setSearchParams] = useSearchParams()
    const [selectedCategory, setSelectedCategory] = useState('all')
    const [sortBy, setSortBy] = useState('relevance')

    const {
        searchQuery,
        searchResults,
        isSearching,
        recentSearches,
        updateSearchQuery,
        addToRecentSearches,
        clearRecentSearches
    } = useSearch()

    const queryFromUrl = searchParams.get('q') || ''

    useEffect(() => {
        if (queryFromUrl && queryFromUrl !== searchQuery) {
            updateSearchQuery(queryFromUrl)
            addToRecentSearches(queryFromUrl)
        }
    }, [queryFromUrl, searchQuery, updateSearchQuery, addToRecentSearches])

    const handleSearch = (query) => {
        updateSearchQuery(query)
        addToRecentSearches(query)
        setSearchParams({ q: query })
    }

    const categories = [
        { id: 'all', label: 'All Results', count: searchResults.length },
        {
            id: 'getting-started',
            label: 'Getting Started',
            count: searchResults.filter(r => r.category === 'getting-started').length
        },
        {
            id: 'technical-docs',
            label: 'Technical Docs',
            count: searchResults.filter(r => r.category === 'technical-docs').length
        },
        {
            id: 'integration-security',
            label: 'Integration & Security',
            count: searchResults.filter(r => r.category === 'integration-security').length
        },
        {
            id: 'deployment',
            label: 'Deployment',
            count: searchResults.filter(r => r.category === 'deployment').length
        }
    ]

    const filteredResults = selectedCategory === 'all'
        ? searchResults
        : searchResults.filter(result => result.category === selectedCategory)

    const sortedResults = [...filteredResults].sort((a, b) => {
        switch (sortBy) {
            case 'title':
                return a.title.localeCompare(b.title)
            case 'category':
                return a.category.localeCompare(b.category)
            case 'relevance':
            default:
                return (a.score || 0) - (b.score || 0)
        }
    })

    const highlightText = (text, query) => {
        if (!query) return text

        const regex = new RegExp(`(${query})`, 'gi')
        const parts = text.split(regex)

        return parts.map((part, index) =>
            regex.test(part) ? (
                <mark key={index} className="search-highlight">
                    {part}
                </mark>
            ) : (
                part
            )
        )
    }

    return (
        <div className="min-h-screen bg-github-canvas-default">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="mb-8"
                >
                    <h1 className="text-3xl font-bold text-github-fg-default mb-4">
                        Search Documentation
                    </h1>
                    <p className="text-github-fg-muted mb-6">
                        Find answers in our comprehensive documentation
                    </p>

                    {/* Search input */}
                    <SearchInput
                        placeholder="Search documentation..."
                        onSelect={handleSearch}
                        className="max-w-2xl"
                    />
                </motion.div>

                <div className="lg:grid lg:grid-cols-12 lg:gap-8">
                    {/* Sidebar - Filters */}
                    <aside className="lg:col-span-3 mb-8 lg:mb-0">
                        <div className="sticky top-20">
                            {/* Categories filter */}
                            <div className="mb-6">
                                <h3 className="text-sm font-semibold text-github-fg-default mb-3 uppercase tracking-wide">
                                    Categories
                                </h3>
                                <div className="space-y-1">
                                    {categories.map((category) => (
                                        <button
                                            key={category.id}
                                            onClick={() => setSelectedCategory(category.id)}
                                            className={`
                        w-full text-left px-3 py-2 text-sm rounded-md transition-colors flex items-center justify-between
                        ${selectedCategory === category.id
                                                    ? 'bg-github-accent-subtle text-github-accent-fg font-medium'
                                                    : 'text-github-fg-muted hover:text-github-fg-default hover:bg-github-neutral-muted'
                                                }
                      `}
                                        >
                                            <span>{category.label}</span>
                                            <span className="text-xs">{category.count}</span>
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Sort options */}
                            <div className="mb-6">
                                <h3 className="text-sm font-semibold text-github-fg-default mb-3 uppercase tracking-wide">
                                    Sort by
                                </h3>
                                <select
                                    value={sortBy}
                                    onChange={(e) => setSortBy(e.target.value)}
                                    className="w-full px-3 py-2 text-sm bg-github-canvas-default border border-github-border-default rounded-md focus:outline-none focus:ring-2 focus:ring-github-accent-emphasis"
                                >
                                    <option value="relevance">Relevance</option>
                                    <option value="title">Title</option>
                                    <option value="category">Category</option>
                                </select>
                            </div>

                            {/* Recent searches */}
                            {recentSearches.length > 0 && (
                                <div>
                                    <div className="flex items-center justify-between mb-3">
                                        <h3 className="text-sm font-semibold text-github-fg-default uppercase tracking-wide">
                                            Recent Searches
                                        </h3>
                                        <button
                                            onClick={clearRecentSearches}
                                            className="text-xs text-github-fg-muted hover:text-github-fg-default"
                                        >
                                            Clear
                                        </button>
                                    </div>
                                    <div className="space-y-1">
                                        {recentSearches.slice(0, 5).map((query, index) => (
                                            <button
                                                key={index}
                                                onClick={() => handleSearch(query)}
                                                className="w-full text-left px-3 py-2 text-sm text-github-fg-muted hover:text-github-fg-default hover:bg-github-neutral-muted rounded-md flex items-center gap-2"
                                            >
                                                <Clock className="h-3 w-3" />
                                                <span className="truncate">{query}</span>
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </aside>

                    {/* Main content */}
                    <main className="lg:col-span-9">
                        {/* Results header */}
                        {searchQuery && (
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: 0.2 }}
                                className="mb-6 pb-4 border-b border-github-border-muted"
                            >
                                <div className="flex items-center justify-between">
                                    <div>
                                        <h2 className="text-lg font-semibold text-github-fg-default">
                                            {isSearching ? (
                                                <span className="flex items-center gap-2">
                                                    <LoadingSpinner size="sm" />
                                                    Searching...
                                                </span>
                                            ) : (
                                                <>
                                                    {sortedResults.length} result{sortedResults.length !== 1 ? 's' : ''} for "
                                                    <span className="text-github-accent-fg">{searchQuery}</span>"
                                                </>
                                            )}
                                        </h2>
                                        {selectedCategory !== 'all' && (
                                            <p className="text-sm text-github-fg-muted mt-1">
                                                Filtered by {categories.find(c => c.id === selectedCategory)?.label}
                                            </p>
                                        )}
                                    </div>

                                    {selectedCategory !== 'all' && (
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            onClick={() => setSelectedCategory('all')}
                                            className="flex items-center gap-1"
                                        >
                                            <X className="h-3 w-3" />
                                            Clear filter
                                        </Button>
                                    )}
                                </div>
                            </motion.div>
                        )}

                        {/* Search results */}
                        <div className="space-y-6">
                            {!searchQuery ? (
                                /* Empty state */
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5, delay: 0.3 }}
                                    className="text-center py-12"
                                >
                                    <Search className="h-12 w-12 text-github-fg-muted mx-auto mb-4" />
                                    <h3 className="text-lg font-semibold text-github-fg-default mb-2">
                                        Search DevSync Documentation
                                    </h3>
                                    <p className="text-github-fg-muted max-w-md mx-auto">
                                        Enter a search term above to find relevant documentation, guides,
                                        and API references.
                                    </p>
                                </motion.div>
                            ) : isSearching ? (
                                /* Loading state */
                                <div className="space-y-4">
                                    {[...Array(3)].map((_, i) => (
                                        <div key={i} className="animate-pulse">
                                            <div className="h-6 bg-github-neutral-muted rounded w-3/4 mb-2"></div>
                                            <div className="h-4 bg-github-neutral-muted rounded w-full mb-1"></div>
                                            <div className="h-4 bg-github-neutral-muted rounded w-5/6"></div>
                                        </div>
                                    ))}
                                </div>
                            ) : sortedResults.length === 0 ? (
                                /* No results */
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5 }}
                                    className="text-center py-12"
                                >
                                    <Search className="h-12 w-12 text-github-fg-muted mx-auto mb-4" />
                                    <h3 className="text-lg font-semibold text-github-fg-default mb-2">
                                        No results found
                                    </h3>
                                    <p className="text-github-fg-muted max-w-md mx-auto mb-4">
                                        We couldn't find any documentation matching "{searchQuery}".
                                        Try adjusting your search terms or browse our categories.
                                    </p>
                                    <Button
                                        variant="secondary"
                                        onClick={() => setSelectedCategory('all')}
                                    >
                                        Browse All Documentation
                                    </Button>
                                </motion.div>
                            ) : (
                                /* Results */
                                sortedResults.map((result, index) => (
                                    <motion.div
                                        key={result.id}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.5, delay: index * 0.1 }}
                                    >
                                        <Link
                                            to={`/docs/${result.path}`}
                                            className="block p-4 border border-github-border-default rounded-lg hover:border-github-border-muted hover:bg-github-canvas-subtle transition-all duration-200 group"
                                        >
                                            <div className="flex items-start justify-between mb-2">
                                                <div className="flex items-center gap-2">
                                                    <FileText className="h-4 w-4 text-github-fg-muted mt-0.5" />
                                                    <h3 className="text-lg font-semibold text-github-fg-default group-hover:text-github-accent-fg transition-colors">
                                                        {highlightText(result.title, searchQuery)}
                                                    </h3>
                                                </div>
                                                <ArrowRight className="h-4 w-4 text-github-fg-muted group-hover:text-github-accent-fg group-hover:translate-x-1 transition-all duration-200" />
                                            </div>

                                            {result.description && (
                                                <p className="text-github-fg-muted mb-3 leading-relaxed">
                                                    {highlightText(result.description, searchQuery)}
                                                </p>
                                            )}

                                            <div className="flex items-center gap-2 text-xs text-github-fg-muted">
                                                <span className="px-2 py-1 bg-github-neutral-muted rounded capitalize">
                                                    {result.category.replace('-', ' ')}
                                                </span>
                                                <span>•</span>
                                                <span>/docs/{result.path}</span>
                                                {result.score && (
                                                    <>
                                                        <span>•</span>
                                                        <span>{Math.round((1 - result.score) * 100)}% match</span>
                                                    </>
                                                )}
                                            </div>
                                        </Link>
                                    </motion.div>
                                ))
                            )}
                        </div>
                    </main>
                </div>
            </div>
        </div>
    )
}

export default SearchPage
