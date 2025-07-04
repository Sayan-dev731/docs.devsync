import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Home, Search, Book, ArrowRight } from 'lucide-react'
import { Button } from '../components/ui/Button'

const NotFoundPage = () => {
    const suggestions = [
        {
            title: 'Getting Started',
            description: 'New to DevSync? Start with our comprehensive setup guide.',
            path: '/docs/getting-started',
            icon: <Book className="h-5 w-5" />
        },
        {
            title: 'API Documentation',
            description: 'Explore our complete API reference with examples.',
            path: '/docs/api-documentation',
            icon: <Book className="h-5 w-5" />
        },
        {
            title: 'Search Documentation',
            description: 'Find what you\'re looking for with our search feature.',
            path: '/search',
            icon: <Search className="h-5 w-5" />
        }
    ]

    return (
        <div className="min-h-screen bg-github-canvas-default flex items-center justify-center px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl w-full text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    {/* 404 Illustration */}
                    <div className="mb-8">
                        <div className="text-8xl font-bold text-github-accent-fg mb-4">404</div>
                        <div className="w-24 h-1 bg-github-accent-emphasis mx-auto rounded"></div>
                    </div>

                    {/* Main message */}
                    <h1 className="text-3xl font-bold text-github-fg-default mb-4">
                        Page Not Found
                    </h1>
                    <p className="text-lg text-github-fg-muted mb-8 leading-relaxed">
                        The page you're looking for doesn't exist or has been moved.
                        Don't worry, let's get you back on track.
                    </p>

                    {/* Action buttons */}
                    <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
                        <Button size="lg">
                            <Link to="/" className="flex items-center gap-2">
                                <Home className="h-4 w-4" />
                                Go Home
                            </Link>
                        </Button>
                        <Button variant="secondary" size="lg">
                            <Link to="/search" className="flex items-center gap-2">
                                <Search className="h-4 w-4" />
                                Search Docs
                            </Link>
                        </Button>
                    </div>

                    {/* Suggestions */}
                    <div className="text-left">
                        <h2 className="text-xl font-semibold text-github-fg-default mb-6 text-center">
                            Popular Documentation
                        </h2>
                        <div className="space-y-4">
                            {suggestions.map((suggestion, index) => (
                                <motion.div
                                    key={suggestion.title}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                                >
                                    <Link
                                        to={suggestion.path}
                                        className="block p-4 border border-github-border-default rounded-lg hover:border-github-border-muted hover:bg-github-canvas-subtle transition-all duration-200 group"
                                    >
                                        <div className="flex items-center gap-4">
                                            <div className="text-github-accent-fg">
                                                {suggestion.icon}
                                            </div>
                                            <div className="flex-1">
                                                <h3 className="font-semibold text-github-fg-default group-hover:text-github-accent-fg transition-colors">
                                                    {suggestion.title}
                                                </h3>
                                                <p className="text-sm text-github-fg-muted mt-1">
                                                    {suggestion.description}
                                                </p>
                                            </div>
                                            <ArrowRight className="h-4 w-4 text-github-fg-muted group-hover:text-github-accent-fg group-hover:translate-x-1 transition-all duration-200" />
                                        </div>
                                    </Link>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    {/* Help section */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.6 }}
                        className="mt-12 p-6 bg-github-canvas-subtle border border-github-border-default rounded-lg"
                    >
                        <h3 className="font-semibold text-github-fg-default mb-2">
                            Still can't find what you're looking for?
                        </h3>
                        <p className="text-github-fg-muted mb-4">
                            Our community is here to help. Reach out if you need assistance.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-2 justify-center">
                            <Button variant="secondary" size="sm">
                                <a
                                    href="https://github.com/devsync/docs/issues"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    Report Issue
                                </a>
                            </Button>
                            <Button variant="secondary" size="sm">
                                <a
                                    href="https://github.com/devsync/docs/discussions"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    Ask Community
                                </a>
                            </Button>
                        </div>
                    </motion.div>
                </motion.div>
            </div>
        </div>
    )
}

export default NotFoundPage
