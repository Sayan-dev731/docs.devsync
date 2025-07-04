import React, { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { ChevronDown, ChevronRight, FileText, Folder } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

const SidebarItem = ({ item, currentPath, level = 0, onItemClick }) => {
    const [isExpanded, setIsExpanded] = useState(false)
    const location = useLocation()

    const isActive = currentPath === `/docs/${item.path}`
    const hasChildren = item.children && item.children.length > 0
    const isParentOfCurrent = currentPath.startsWith(`/docs/${item.path}/`)

    useEffect(() => {
        if (isParentOfCurrent || isActive) {
            setIsExpanded(true)
        }
    }, [isParentOfCurrent, isActive])

    const handleToggle = (e) => {
        e.preventDefault()
        setIsExpanded(!isExpanded)
    }

    const handleClick = () => {
        if (onItemClick) {
            onItemClick()
        }
    }

    const itemContent = (
        <div
            className={`
        flex items-center gap-2 px-3 py-2 text-sm rounded-md transition-all duration-200
        ${level > 0 ? 'ml-4 border-l border-github-border-muted pl-4' : ''}
        ${isActive
                    ? 'bg-github-accent-subtle text-github-accent-fg border-l-2 border-github-accent-fg font-medium'
                    : 'text-github-fg-muted hover:text-github-fg-default hover:bg-github-neutral-muted'
                }
      `}
        >
            {/* Icon */}
            <div className="flex-shrink-0">
                {hasChildren ? (
                    <button
                        onClick={handleToggle}
                        className="p-0.5 hover:bg-github-neutral-muted rounded transition-colors"
                    >
                        <motion.div
                            animate={{ rotate: isExpanded ? 90 : 0 }}
                            transition={{ duration: 0.2 }}
                        >
                            <ChevronRight className="h-3 w-3" />
                        </motion.div>
                    </button>
                ) : (
                    <FileText className="h-3 w-3" />
                )}
            </div>

            {/* Emoji icon if available */}
            {item.icon && (
                <span className="text-base">{item.icon}</span>
            )}

            {/* Title */}
            <span className="flex-1 truncate">{item.title}</span>

            {/* Badge for new items */}
            {item.isNew && (
                <span className="px-1.5 py-0.5 text-xs bg-github-success-emphasis text-white rounded">
                    New
                </span>
            )}
        </div>
    )

    return (
        <div className="mb-1">
            {hasChildren ? (
                <div>
                    <div className="cursor-pointer" onClick={handleToggle}>
                        {itemContent}
                    </div>
                    <AnimatePresence>
                        {isExpanded && (
                            <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: 'auto', opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.2 }}
                                className="overflow-hidden"
                            >
                                <div className="mt-1 space-y-1">
                                    {item.children.map((child) => (
                                        <SidebarItem
                                            key={child.id}
                                            item={child}
                                            currentPath={currentPath}
                                            level={level + 1}
                                            onItemClick={onItemClick}
                                        />
                                    ))}
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            ) : (
                <Link
                    to={`/docs/${item.path}`}
                    onClick={handleClick}
                    className="block"
                >
                    {itemContent}
                </Link>
            )}
        </div>
    )
}

const Sidebar = ({ structure, onItemClick }) => {
    const location = useLocation()

    return (
        <aside className="w-80 h-screen bg-github-canvas-default border-r border-github-border-default overflow-y-auto">
            {/* Header */}
            <div className="sticky top-0 bg-github-canvas-default border-b border-github-border-muted p-4 z-10">
                <div className="flex items-center gap-2">
                    <Folder className="h-5 w-5 text-github-accent-fg" />
                    <h2 className="font-semibold text-github-fg-default">Documentation</h2>
                </div>
            </div>

            {/* Navigation */}
            <nav className="p-4">
                <div className="space-y-2">
                    {structure.map((item) => (
                        <SidebarItem
                            key={item.id}
                            item={item}
                            currentPath={location.pathname}
                            onItemClick={onItemClick}
                        />
                    ))}
                </div>

                {/* Quick links */}
                <div className="mt-8 pt-6 border-t border-github-border-muted">
                    <h3 className="text-xs font-semibold text-github-fg-muted uppercase tracking-wide mb-3">
                        Quick Links
                    </h3>
                    <div className="space-y-1">
                        <a
                            href="https://github.com/devsync/docs"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="block px-3 py-2 text-sm text-github-fg-muted hover:text-github-fg-default hover:bg-github-neutral-muted rounded-md transition-colors"
                        >
                            GitHub Repository
                        </a>
                        <a
                            href="https://github.com/devsync/docs/issues"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="block px-3 py-2 text-sm text-github-fg-muted hover:text-github-fg-default hover:bg-github-neutral-muted rounded-md transition-colors"
                        >
                            Report Issue
                        </a>
                        <a
                            href="https://github.com/devsync/docs/discussions"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="block px-3 py-2 text-sm text-github-fg-muted hover:text-github-fg-default hover:bg-github-neutral-muted rounded-md transition-colors"
                        >
                            Discussions
                        </a>
                    </div>
                </div>
            </nav>
        </aside>
    )
}

export default Sidebar
