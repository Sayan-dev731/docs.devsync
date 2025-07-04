import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Menu, X, Sun, Moon, Github, Book } from 'lucide-react'
import { motion } from 'framer-motion'

import { useTheme } from '../../contexts/ThemeContext'
import { IconButton } from '../ui/Button'
import SearchInput from '../ui/SearchInput'

const Header = ({ onToggleSidebar, isSidebarOpen }) => {
    const navigate = useNavigate()
    const { theme, toggleTheme } = useTheme()
    const [isSearchFocused, setIsSearchFocused] = useState(false)

    const handleSearchSelect = (query) => {
        navigate(`/search?q=${encodeURIComponent(query)}`)
    }

    return (
        <header className="sticky top-0 z-50 bg-github-canvas-default border-b border-github-border-default backdrop-blur-sm bg-opacity-95">
            <div className="max-w-none mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* Left side */}
                    <div className="flex items-center gap-4">
                        {/* Sidebar toggle */}
                        <IconButton
                            onClick={onToggleSidebar}
                            className="lg:hidden"
                            size="sm"
                        >
                            {isSidebarOpen ? (
                                <X className="h-5 w-5" />
                            ) : (
                                <Menu className="h-5 w-5" />
                            )}
                        </IconButton>

                        {/* Logo */}
                        <Link
                            to="/"
                            className="flex items-center gap-2 text-github-fg-default hover:text-github-accent-fg transition-colors"
                        >
                            <Book className="h-6 w-6" />
                            <span className="font-semibold text-lg hidden sm:block">
                                DevSync Docs
                            </span>
                        </Link>

                        {/* Navigation links */}
                        <nav className="hidden md:flex items-center gap-1 ml-6">
                            <Link
                                to="/docs/getting-started"
                                className="nav-link"
                            >
                                Documentation
                            </Link>
                            <Link
                                to="/docs/api-documentation"
                                className="nav-link"
                            >
                                API
                            </Link>
                            <Link
                                to="/docs/contributing"
                                className="nav-link"
                            >
                                Contributing
                            </Link>
                        </nav>
                    </div>

                    {/* Center - Search */}
                    <div className="flex-1 max-w-md mx-4">
                        <SearchInput
                            placeholder="Search docs..."
                            onSelect={handleSearchSelect}
                            className={`transition-all duration-200 ${isSearchFocused ? 'transform scale-105' : ''
                                }`}
                        />
                    </div>

                    {/* Right side */}
                    <div className="flex items-center gap-2">
                        {/* Theme toggle */}
                        <IconButton
                            onClick={toggleTheme}
                            className="hidden sm:flex"
                            size="sm"
                        >
                            <motion.div
                                initial={false}
                                animate={{ rotate: theme === 'dark' ? 180 : 0 }}
                                transition={{ duration: 0.3 }}
                            >
                                {theme === 'dark' ? (
                                    <Sun className="h-4 w-4" />
                                ) : (
                                    <Moon className="h-4 w-4" />
                                )}
                            </motion.div>
                        </IconButton>

                        {/* GitHub link */}
                        <IconButton
                            onClick={() => window.open('https://github.com/devsync/docs', '_blank')}
                            size="sm"
                        >
                            <Github className="h-4 w-4" />
                        </IconButton>

                        {/* Version badge */}
                        <div className="hidden lg:flex items-center px-2 py-1 bg-github-accent-subtle text-github-accent-fg text-xs font-medium rounded">
                            v1.0.0
                        </div>
                    </div>
                </div>
            </div>

            {/* Mobile search overlay */}
            {isSearchFocused && (
                <div className="lg:hidden absolute top-full left-0 right-0 bg-github-canvas-default border-b border-github-border-default p-4">
                    <SearchInput
                        placeholder="Search documentation..."
                        onSelect={handleSearchSelect}
                    />
                </div>
            )}
        </header>
    )
}

export default Header
