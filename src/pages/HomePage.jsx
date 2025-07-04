import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
    BookOpen,
    Code2,
    Rocket,
    Users,
    ArrowRight,
    Star,
    GitBranch,
    Zap,
    Shield,
    Globe
} from 'lucide-react'
import { Button } from '../components/ui/Button'

const HomePage = () => {
    const features = [
        {
            icon: <BookOpen className="h-6 w-6" />,
            title: 'Comprehensive Documentation',
            description: 'Complete guides covering setup, development, deployment, and contributions.'
        },
        {
            icon: <Code2 className="h-6 w-6" />,
            title: 'API Reference',
            description: 'Detailed API documentation with examples and interactive testing tools.'
        },
        {
            icon: <GitBranch className="h-6 w-6" />,
            title: 'GitHub Integration',
            description: 'Seamless OAuth authentication and contribution tracking with GitHub.'
        },
        {
            icon: <Users className="h-6 w-6" />,
            title: 'Community Driven',
            description: 'Built by developers, for developers. Join our growing community.'
        },
        {
            icon: <Shield className="h-6 w-6" />,
            title: 'Secure by Design',
            description: 'Security-first approach with comprehensive authentication and authorization.'
        },
        {
            icon: <Zap className="h-6 w-6" />,
            title: 'Fast & Reliable',
            description: 'Optimized performance with modern technologies and best practices.'
        }
    ]

    const quickLinks = [
        {
            title: 'Getting Started',
            description: 'New to DevSync? Start here to set up your development environment.',
            path: '/docs/getting-started',
            icon: <Rocket className="h-5 w-5" />,
            color: 'text-green-600'
        },
        {
            title: 'API Documentation',
            description: 'Explore our comprehensive REST API with detailed examples.',
            path: '/docs/api-documentation',
            icon: <Code2 className="h-5 w-5" />,
            color: 'text-blue-600'
        },
        {
            title: 'Contributing',
            description: 'Learn how to contribute to DevSync and make an impact.',
            path: '/docs/contributing',
            icon: <Users className="h-5 w-5" />,
            color: 'text-purple-600'
        },
        {
            title: 'Deployment Guide',
            description: 'Deploy DevSync to production with our step-by-step guide.',
            path: '/docs/deployment-guide',
            icon: <Globe className="h-5 w-5" />,
            color: 'text-orange-600'
        }
    ]

    const stats = [
        { label: 'Documentation Pages', value: '25+' },
        { label: 'API Endpoints', value: '40+' },
        { label: 'Contributors', value: '100+' },
        { label: 'GitHub Stars', value: '1.2k+' }
    ]

    return (
        <div className="min-h-screen bg-github-canvas-default">
            {/* Hero Section */}
            <section className="relative overflow-hidden bg-gradient-to-b from-github-canvas-default to-github-canvas-subtle">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="text-center"
                    >
                        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-github-fg-default mb-6">
                            DevSync
                            <span className="text-github-accent-fg"> Documentation</span>
                        </h1>
                        <p className="text-xl text-github-fg-muted max-w-3xl mx-auto mb-8 leading-relaxed">
                            Your comprehensive guide to building, deploying, and contributing to the
                            DevSync open-source community platform. From setup to production deployment.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
                            <Button size="lg" className="text-base px-8">
                                <Link to="/docs/getting-started" className="flex items-center gap-2">
                                    Get Started
                                    <ArrowRight className="h-4 w-4" />
                                </Link>
                            </Button>
                            <Button variant="secondary" size="lg" className="text-base px-8">
                                <a
                                    href="https://github.com/devsync/docs"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-2"
                                >
                                    <Star className="h-4 w-4" />
                                    View on GitHub
                                </a>
                            </Button>
                        </div>

                        {/* Stats */}
                        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 max-w-2xl mx-auto">
                            {stats.map((stat, index) => (
                                <motion.div
                                    key={stat.label}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.8, delay: 0.2 + index * 0.1 }}
                                    className="text-center"
                                >
                                    <div className="text-2xl font-bold text-github-accent-fg mb-1">
                                        {stat.value}
                                    </div>
                                    <div className="text-sm text-github-fg-muted">
                                        {stat.label}
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Quick Links Section */}
            <section className="py-16 bg-github-canvas-default">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                        className="text-center mb-12"
                    >
                        <h2 className="text-3xl font-bold text-github-fg-default mb-4">
                            Quick Start Guides
                        </h2>
                        <p className="text-lg text-github-fg-muted max-w-2xl mx-auto">
                            Jump right into what you need. Whether you're a new contributor or
                            experienced developer, we have guides for every level.
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {quickLinks.map((link, index) => (
                            <motion.div
                                key={link.title}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, delay: index * 0.1 }}
                                viewport={{ once: true }}
                            >
                                <Link
                                    to={link.path}
                                    className="block p-6 bg-github-canvas-default border border-github-border-default rounded-lg hover:border-github-border-muted hover:shadow-md transition-all duration-200 group"
                                >
                                    <div className="flex items-start gap-4">
                                        <div className={`${link.color} mt-1`}>
                                            {link.icon}
                                        </div>
                                        <div className="flex-1">
                                            <h3 className="text-lg font-semibold text-github-fg-default mb-2 group-hover:text-github-accent-fg transition-colors">
                                                {link.title}
                                            </h3>
                                            <p className="text-github-fg-muted text-sm leading-relaxed">
                                                {link.description}
                                            </p>
                                        </div>
                                        <ArrowRight className="h-4 w-4 text-github-fg-muted group-hover:text-github-accent-fg group-hover:translate-x-1 transition-all duration-200" />
                                    </div>
                                </Link>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="py-16 bg-github-canvas-subtle">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                        className="text-center mb-12"
                    >
                        <h2 className="text-3xl font-bold text-github-fg-default mb-4">
                            Why Choose DevSync?
                        </h2>
                        <p className="text-lg text-github-fg-muted max-w-2xl mx-auto">
                            DevSync provides everything you need to build a thriving open-source
                            community with modern tools and best practices.
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {features.map((feature, index) => (
                            <motion.div
                                key={feature.title}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, delay: index * 0.1 }}
                                viewport={{ once: true }}
                                className="text-center p-6"
                            >
                                <div className="inline-flex items-center justify-center w-12 h-12 bg-github-accent-subtle text-github-accent-fg rounded-lg mb-4">
                                    {feature.icon}
                                </div>
                                <h3 className="text-lg font-semibold text-github-fg-default mb-3">
                                    {feature.title}
                                </h3>
                                <p className="text-github-fg-muted leading-relaxed">
                                    {feature.description}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-16 bg-github-canvas-default">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-3xl font-bold text-github-fg-default mb-4">
                            Ready to Get Started?
                        </h2>
                        <p className="text-lg text-github-fg-muted mb-8 max-w-2xl mx-auto">
                            Join hundreds of developers building amazing open-source projects
                            with DevSync. Start your journey today.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Button size="lg" className="text-base px-8">
                                <Link to="/docs/setup-guide" className="flex items-center gap-2">
                                    <Rocket className="h-4 w-4" />
                                    Start Building
                                </Link>
                            </Button>
                            <Button variant="secondary" size="lg" className="text-base px-8">
                                <Link to="/docs/contributing" className="flex items-center gap-2">
                                    <Users className="h-4 w-4" />
                                    Contribute
                                </Link>
                            </Button>
                        </div>
                    </motion.div>
                </div>
            </section>
        </div>
    )
}

export default HomePage
