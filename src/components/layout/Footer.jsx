import React from 'react'
import { Link } from 'react-router-dom'
import { Github, Heart, ExternalLink } from 'lucide-react'

const Footer = () => {
    const currentYear = new Date().getFullYear()

    const footerLinks = {
        documentation: [
            { title: 'Getting Started', path: '/docs/getting-started' },
            { title: 'API Reference', path: '/docs/api-documentation' },
            { title: 'Contributing', path: '/docs/contributing' },
            { title: 'Deployment', path: '/docs/deployment-guide' }
        ],
        community: [
            { title: 'GitHub', url: 'https://github.com/devsync/docs', external: true },
            { title: 'Discussions', url: 'https://github.com/devsync/docs/discussions', external: true },
            { title: 'Issues', url: 'https://github.com/devsync/docs/issues', external: true },
            { title: 'Contributors', url: 'https://github.com/devsync/docs/graphs/contributors', external: true }
        ],
        resources: [
            { title: 'Changelog', path: '/changelog' },
            { title: 'Roadmap', url: 'https://github.com/devsync/docs/projects', external: true },
            { title: 'Security', path: '/docs/security' },
            { title: 'License', url: 'https://github.com/devsync/docs/blob/main/LICENSE', external: true }
        ]
    }

    return (
        <footer className="bg-github-canvas-subtle border-t border-github-border-default">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                {/* Main footer content */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {/* Brand section */}
                    <div className="lg:col-span-1">
                        <div className="flex items-center gap-2 mb-4">
                            <div className="h-8 w-8 bg-github-accent-emphasis rounded-md flex items-center justify-center">
                                <span className="text-white font-bold text-sm">DS</span>
                            </div>
                            <span className="font-semibold text-lg text-github-fg-default">
                                DevSync Docs
                            </span>
                        </div>
                        <p className="text-sm text-github-fg-muted mb-4 max-w-sm">
                            Comprehensive documentation for the DevSync open-source community platform.
                            Learn how to contribute, deploy, and build amazing projects.
                        </p>
                        <div className="flex items-center gap-3">
                            <a
                                href="https://github.com/devsync/docs"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-github-fg-muted hover:text-github-fg-default transition-colors"
                            >
                                <Github className="h-5 w-5" />
                            </a>
                            <span className="text-github-fg-muted">•</span>
                            <span className="text-sm text-github-fg-muted">
                                Made with <Heart className="inline h-4 w-4 text-red-500" /> by the DevSync team
                            </span>
                        </div>
                    </div>

                    {/* Links sections */}
                    <div>
                        <h3 className="font-semibold text-github-fg-default mb-4">Documentation</h3>
                        <ul className="space-y-2">
                            {footerLinks.documentation.map((link) => (
                                <li key={link.title}>
                                    <Link
                                        to={link.path}
                                        className="text-sm text-github-fg-muted hover:text-github-fg-default transition-colors"
                                    >
                                        {link.title}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h3 className="font-semibold text-github-fg-default mb-4">Community</h3>
                        <ul className="space-y-2">
                            {footerLinks.community.map((link) => (
                                <li key={link.title}>
                                    {link.external ? (
                                        <a
                                            href={link.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-sm text-github-fg-muted hover:text-github-fg-default transition-colors flex items-center gap-1"
                                        >
                                            {link.title}
                                            <ExternalLink className="h-3 w-3" />
                                        </a>
                                    ) : (
                                        <Link
                                            to={link.path}
                                            className="text-sm text-github-fg-muted hover:text-github-fg-default transition-colors"
                                        >
                                            {link.title}
                                        </Link>
                                    )}
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h3 className="font-semibold text-github-fg-default mb-4">Resources</h3>
                        <ul className="space-y-2">
                            {footerLinks.resources.map((link) => (
                                <li key={link.title}>
                                    {link.external ? (
                                        <a
                                            href={link.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-sm text-github-fg-muted hover:text-github-fg-default transition-colors flex items-center gap-1"
                                        >
                                            {link.title}
                                            <ExternalLink className="h-3 w-3" />
                                        </a>
                                    ) : (
                                        <Link
                                            to={link.path}
                                            className="text-sm text-github-fg-muted hover:text-github-fg-default transition-colors"
                                        >
                                            {link.title}
                                        </Link>
                                    )}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Bottom bar */}
                <div className="mt-8 pt-8 border-t border-github-border-muted">
                    <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                        <p className="text-sm text-github-fg-muted">
                            © {currentYear} DevSync. Released under the GPL-3.0 License.
                        </p>
                        <div className="flex items-center gap-4 text-sm text-github-fg-muted">
                            <span>Built with React & Tailwind CSS</span>
                            <span>•</span>
                            <span>Deployed on Vercel</span>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer
