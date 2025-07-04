import React, { useState, useRef, useEffect } from 'react'
import { Search, X, Clock, ArrowRight } from 'lucide-react'
import { useSearch } from '../../contexts/SearchContext'
import { motion, AnimatePresence } from 'framer-motion'

const SearchInput = ({
    placeholder = 'Search documentation...',
    showSuggestions = true,
    onSelect,
    className = ''
}) => {
    const [isFocused, setIsFocused] = useState(false)
    const [showDropdown, setShowDropdown] = useState(false)
    const inputRef = useRef(null)
    const dropdownRef = useRef(null)

    const {
        searchQuery,
        updateSearchQuery,
        recentSearches,
        addToRecentSearches,
        getSearchSuggestions,
        isSearching
    } = useSearch()

    const suggestions = getSearchSuggestions(searchQuery)

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target) &&
                !inputRef.current.contains(event.target)
            ) {
                setShowDropdown(false)
            }
        }

        document.addEventListener('mousedown', handleClickOutside)
        return () => document.removeEventListener('mousedown', handleClickOutside)
    }, [])

    const handleInputChange = (e) => {
        const value = e.target.value
        updateSearchQuery(value)
        setShowDropdown(value.length > 0 || recentSearches.length > 0)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if (searchQuery.trim()) {
            addToRecentSearches(searchQuery.trim())
            onSelect?.(searchQuery.trim())
            setShowDropdown(false)
            inputRef.current?.blur()
        }
    }

    const handleSuggestionClick = (suggestion) => {
        updateSearchQuery(suggestion.text)
        addToRecentSearches(suggestion.text)
        onSelect?.(suggestion.text)
        setShowDropdown(false)
        inputRef.current?.blur()
    }

    const handleRecentClick = (query) => {
        updateSearchQuery(query)
        onSelect?.(query)
        setShowDropdown(false)
        inputRef.current?.blur()
    }

    const clearSearch = () => {
        updateSearchQuery('')
        inputRef.current?.focus()
    }

    const handleFocus = () => {
        setIsFocused(true)
        if (searchQuery.length > 0 || recentSearches.length > 0) {
            setShowDropdown(true)
        }
    }

    const handleBlur = () => {
        setIsFocused(false)
        // Delay hiding dropdown to allow click on suggestions
        setTimeout(() => setShowDropdown(false), 150)
    }

    // Keyboard navigation
    const handleKeyDown = (e) => {
        if (e.key === 'Escape') {
            setShowDropdown(false)
            inputRef.current?.blur()
        }
    }

    return (
        <div className={`relative ${className}`}>
            <form onSubmit={handleSubmit} className="relative">
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-github-fg-muted" />
                    <input
                        ref={inputRef}
                        type="text"
                        value={searchQuery}
                        onChange={handleInputChange}
                        onFocus={handleFocus}
                        onBlur={handleBlur}
                        onKeyDown={handleKeyDown}
                        placeholder={placeholder}
                        className={`
              w-full pl-10 pr-10 py-2 text-sm
              bg-github-canvas-default
              border border-github-border-default
              rounded-md
              focus:outline-none focus:ring-2 focus:ring-github-accent-emphasis focus:border-transparent
              placeholder-github-fg-muted
              transition-all duration-200
              ${isFocused ? 'shadow-md' : ''}
            `}
                    />
                    {searchQuery && (
                        <button
                            type="button"
                            onClick={clearSearch}
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 p-1 hover:bg-github-neutral-muted rounded"
                        >
                            <X className="h-3 w-3 text-github-fg-muted" />
                        </button>
                    )}
                    {isSearching && (
                        <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                            <div className="animate-spin h-4 w-4 border-2 border-github-accent-emphasis border-t-transparent rounded-full" />
                        </div>
                    )}
                </div>
            </form>

            <AnimatePresence>
                {showDropdown && showSuggestions && (
                    <motion.div
                        ref={dropdownRef}
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2 }}
                        className="absolute top-full left-0 right-0 mt-1 bg-github-canvas-default border border-github-border-default rounded-md shadow-lg z-50 max-h-80 overflow-y-auto"
                    >
                        {/* Search suggestions */}
                        {searchQuery && suggestions.length > 0 && (
                            <div className="p-2">
                                <div className="text-xs font-semibold text-github-fg-muted mb-2 px-2">
                                    Suggestions
                                </div>
                                {suggestions.map((suggestion, index) => (
                                    <button
                                        key={index}
                                        onClick={() => handleSuggestionClick(suggestion)}
                                        className="w-full text-left px-3 py-2 text-sm hover:bg-github-neutral-muted rounded flex items-center justify-between group"
                                    >
                                        <span className="text-github-fg-default">{suggestion.text}</span>
                                        <ArrowRight className="h-3 w-3 text-github-fg-muted opacity-0 group-hover:opacity-100 transition-opacity" />
                                    </button>
                                ))}
                            </div>
                        )}

                        {/* Recent searches */}
                        {!searchQuery && recentSearches.length > 0 && (
                            <div className="p-2">
                                <div className="text-xs font-semibold text-github-fg-muted mb-2 px-2">
                                    Recent searches
                                </div>
                                {recentSearches.slice(0, 5).map((query, index) => (
                                    <button
                                        key={index}
                                        onClick={() => handleRecentClick(query)}
                                        className="w-full text-left px-3 py-2 text-sm hover:bg-github-neutral-muted rounded flex items-center gap-2"
                                    >
                                        <Clock className="h-3 w-3 text-github-fg-muted" />
                                        <span className="text-github-fg-default">{query}</span>
                                    </button>
                                ))}
                            </div>
                        )}

                        {/* No results */}
                        {searchQuery && suggestions.length === 0 && (
                            <div className="p-4 text-sm text-github-fg-muted text-center">
                                No suggestions found for "{searchQuery}"
                            </div>
                        )}

                        {/* Empty state */}
                        {!searchQuery && recentSearches.length === 0 && (
                            <div className="p-4 text-sm text-github-fg-muted text-center">
                                Start typing to search documentation
                            </div>
                        )}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}

export default SearchInput
