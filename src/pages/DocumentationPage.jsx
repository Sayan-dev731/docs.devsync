import React, { useState, useEffect } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import rehypeHighlight from 'rehype-highlight'
import rehypeRaw from 'rehype-raw'
import {
    ChevronRight,
    Edit,
    Github,
    Calendar,
    Clock,
    ArrowLeft,
    ArrowRight,
    Share,
    BookOpen,
    ExternalLink
} from 'lucide-react'

import { findDocumentationByPath, getBreadcrumbs, getNavigation } from '../data/documentationData'
import { loadMarkdownContent } from '../utils/markdownLoader'
import { Button } from '../components/ui/Button'
import LoadingSpinner from '../components/ui/LoadingSpinner'

// Table of contents generator
const generateTableOfContents = (content) => {
    const headings = []
    const lines = content.split('\n')

    lines.forEach((line, index) => {
        const match = line.match(/^(#{1,6})\s+(.+)$/)
        if (match) {
            const level = match[1].length
            const title = match[2]
            const id = title.toLowerCase()
                .replace(/[^\w\s-]/g, '')
                .replace(/\s+/g, '-')

            headings.push({
                level,
                title,
                id,
                line: index
            })
        }
    })

    return headings
}

const DocumentationPage = ({ structure }) => {
    const { '*': pathParam } = useParams()
    const navigate = useNavigate()
    const [currentDoc, setCurrentDoc] = useState(null)
    const [loading, setLoading] = useState(true)
    const [breadcrumbs, setBreadcrumbs] = useState([])
    const [navigation, setNavigation] = useState({ previous: null, next: null })
    const [tableOfContents, setTableOfContents] = useState([])

    const currentPath = pathParam || 'getting-started'

    useEffect(() => {
        const loadDocumentation = async () => {
            setLoading(true)

            // Simulate loading delay for better UX
            await new Promise(resolve => setTimeout(resolve, 300))

            const doc = findDocumentationByPath(currentPath)

            if (doc) {
                setCurrentDoc(doc)
                setBreadcrumbs(getBreadcrumbs(currentPath))
                setNavigation(getNavigation(currentPath))
                setTableOfContents(generateTableOfContents(doc.content))
            } else {
                // Redirect to 404 or first doc
                navigate('/docs/getting-started')
            }

            setLoading(false)
        }

        loadDocumentation()
    }, [currentPath, navigate])

    const handleShare = async () => {
        if (navigator.share) {
            try {
                await navigator.share({
                    title: currentDoc.title,
                    text: currentDoc.description,
                    url: window.location.href
                })
            } catch (err) {
                console.log('Error sharing:', err)
            }
        } else {
            // Fallback to clipboard
            navigator.clipboard.writeText(window.location.href)
        }
    }

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-github-canvas-default">
                <LoadingSpinner size="lg" />
            </div>
        )
    }

    if (!currentDoc) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-github-canvas-default">
                <div className="text-center">
                    <h1 className="text-2xl font-bold text-github-fg-default mb-4">
                        Documentation Not Found
                    </h1>
                    <p className="text-github-fg-muted mb-6">
                        The requested documentation page could not be found.
                    </p>
                    <Button>
                        <Link to="/docs/getting-started">
                            Go to Getting Started
                        </Link>
                    </Button>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-github-canvas-default">
            <div className="max-w-none mx-auto">
                <div className="lg:grid lg:grid-cols-12 lg:gap-8">
                    {/* Main content */}
                    <main className="lg:col-span-9 xl:col-span-10">
                        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                            {/* Breadcrumbs */}
                            {breadcrumbs.length > 0 && (
                                <nav className="mb-8" aria-label="Breadcrumb">
                                    <ol className="flex items-center space-x-2 text-sm">
                                        <li>
                                            <Link
                                                to="/docs"
                                                className="text-github-fg-muted hover:text-github-fg-default transition-colors"
                                            >
                                                Docs
                                            </Link>
                                        </li>
                                        {breadcrumbs.map((crumb, index) => (
                                            <li key={crumb.path} className="flex items-center">
                                                <ChevronRight className="h-4 w-4 text-github-fg-muted mx-2" />
                                                {index === breadcrumbs.length - 1 ? (
                                                    <span className="text-github-fg-default font-medium">
                                                        {crumb.title}
                                                    </span>
                                                ) : (
                                                    <Link
                                                        to={`/docs/${crumb.path}`}
                                                        className="text-github-fg-muted hover:text-github-fg-default transition-colors"
                                                    >
                                                        {crumb.title}
                                                    </Link>
                                                )}
                                            </li>
                                        ))}
                                    </ol>
                                </nav>
                            )}

                            {/* Header */}
                            <motion.header
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5 }}
                                className="mb-8"
                            >
                                <div className="flex items-start justify-between mb-4">
                                    <div className="flex-1">
                                        <h1 className="text-4xl font-bold text-github-fg-default mb-4">
                                            {currentDoc.title}
                                        </h1>
                                        {currentDoc.description && (
                                            <p className="text-lg text-github-fg-muted leading-relaxed">
                                                {currentDoc.description}
                                            </p>
                                        )}
                                    </div>

                                    {/* Action buttons */}
                                    <div className="flex items-center gap-2 ml-4">
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            onClick={handleShare}
                                            className="hidden sm:flex"
                                        >
                                            <Share className="h-4 w-4" />
                                        </Button>
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            onClick={() => window.open(`https://github.com/devsync/docs/edit/main/docs/${currentPath}.md`, '_blank')}
                                        >
                                            <Edit className="h-4 w-4" />
                                            <span className="hidden sm:inline ml-2">Edit</span>
                                        </Button>
                                    </div>
                                </div>

                                {/* Meta information */}
                                <div className="flex items-center gap-4 text-sm text-github-fg-muted border-b border-github-border-muted pb-6">
                                    <div className="flex items-center gap-1">
                                        <BookOpen className="h-4 w-4" />
                                        <span>{currentDoc.category || 'Documentation'}</span>
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <Calendar className="h-4 w-4" />
                                        <span>Updated July 4, 2025</span>
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <Clock className="h-4 w-4" />
                                        <span>5 min read</span>
                                    </div>
                                </div>
                            </motion.header>

                            {/* Content */}
                            <motion.article
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: 0.2 }}
                                className="prose prose-lg max-w-none"
                            >
                                <ReactMarkdown
                                    remarkPlugins={[remarkGfm]}
                                    rehypePlugins={[rehypeHighlight, rehypeRaw]}
                                    components={{
                                        // Custom components for better styling
                                        a: ({ href, children, ...props }) => {
                                            const isExternal = href?.startsWith('http')
                                            return (
                                                <a
                                                    href={href}
                                                    {...props}
                                                    target={isExternal ? '_blank' : undefined}
                                                    rel={isExternal ? 'noopener noreferrer' : undefined}
                                                    className="text-github-accent-fg hover:underline inline-flex items-center gap-1"
                                                >
                                                    {children}
                                                    {isExternal && <ExternalLink className="h-3 w-3" />}
                                                </a>
                                            )
                                        },
                                        blockquote: ({ children }) => (
                                            <blockquote className="border-l-4 border-github-accent-emphasis bg-github-accent-subtle p-4 my-4 rounded-r-md">
                                                {children}
                                            </blockquote>
                                        ),
                                        code: ({ inline, className, children, ...props }) => {
                                            if (inline) {
                                                return (
                                                    <code
                                                        className="bg-github-neutral-muted text-github-fg-default px-1.5 py-0.5 rounded text-sm font-mono"
                                                        {...props}
                                                    >
                                                        {children}
                                                    </code>
                                                )
                                            }
                                            return (
                                                <code className={className} {...props}>
                                                    {children}
                                                </code>
                                            )
                                        }
                                    }}
                                >
                                    {currentDoc.content}
                                </ReactMarkdown>
                            </motion.article>

                            {/* Navigation */}
                            <motion.nav
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: 0.4 }}
                                className="flex items-center justify-between pt-8 mt-8 border-t border-github-border-muted"
                            >
                                {navigation.previous ? (
                                    <Link
                                        to={`/docs/${navigation.previous.path}`}
                                        className="flex items-center gap-2 p-4 border border-github-border-default rounded-lg hover:border-github-border-muted hover:bg-github-canvas-subtle transition-all duration-200 group"
                                    >
                                        <ArrowLeft className="h-4 w-4 text-github-fg-muted group-hover:text-github-accent-fg" />
                                        <div className="text-left">
                                            <div className="text-xs text-github-fg-muted uppercase tracking-wide">
                                                Previous
                                            </div>
                                            <div className="text-sm font-medium text-github-fg-default group-hover:text-github-accent-fg">
                                                {navigation.previous.title}
                                            </div>
                                        </div>
                                    </Link>
                                ) : (
                                    <div />
                                )}

                                {navigation.next && (
                                    <Link
                                        to={`/docs/${navigation.next.path}`}
                                        className="flex items-center gap-2 p-4 border border-github-border-default rounded-lg hover:border-github-border-muted hover:bg-github-canvas-subtle transition-all duration-200 group ml-auto"
                                    >
                                        <div className="text-right">
                                            <div className="text-xs text-github-fg-muted uppercase tracking-wide">
                                                Next
                                            </div>
                                            <div className="text-sm font-medium text-github-fg-default group-hover:text-github-accent-fg">
                                                {navigation.next.title}
                                            </div>
                                        </div>
                                        <ArrowRight className="h-4 w-4 text-github-fg-muted group-hover:text-github-accent-fg" />
                                    </Link>
                                )}
                            </motion.nav>

                            {/* Feedback section */}
                            <motion.section
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: 0.6 }}
                                className="mt-12 p-6 bg-github-canvas-subtle border border-github-border-default rounded-lg"
                            >
                                <h3 className="text-lg font-semibold text-github-fg-default mb-4">
                                    Was this page helpful?
                                </h3>
                                <p className="text-github-fg-muted mb-4">
                                    Help us improve our documentation by providing feedback.
                                </p>
                                <div className="flex items-center gap-4">
                                    <Button variant="secondary" size="sm">
                                        👍 Yes
                                    </Button>
                                    <Button variant="secondary" size="sm">
                                        👎 No
                                    </Button>
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        onClick={() => window.open(`https://github.com/devsync/docs/issues/new?title=Feedback: ${currentDoc.title}`, '_blank')}
                                        className="ml-auto"
                                    >
                                        <Github className="h-4 w-4 mr-2" />
                                        Report Issue
                                    </Button>
                                </div>
                            </motion.section>
                        </div>
                    </main>

                    {/* Table of contents sidebar */}
                    <aside className="hidden xl:block xl:col-span-2">
                        <div className="sticky top-20 p-6">
                            <h3 className="text-sm font-semibold text-github-fg-default mb-4 uppercase tracking-wide">
                                On this page
                            </h3>
                            {/* Table of contents would be generated from markdown headings */}
                            <div className="space-y-2 text-sm">
                                {tableOfContents.map((heading) => (
                                    <a
                                        key={heading.id}
                                        href={`#${heading.id}`}
                                        className="block text-github-fg-muted hover:text-github-fg-default"
                                    >
                                        {heading.title}
                                    </a>
                                ))}
                            </div>
                        </div>
                    </aside>
                </div>
            </div>
        </div>
    )
}

export default DocumentationPage
