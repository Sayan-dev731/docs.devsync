import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'

// Components
import Header from './components/layout/Header'
import Sidebar from './components/layout/Sidebar'
import Footer from './components/layout/Footer'
import LoadingSpinner from './components/ui/LoadingSpinner'

// Pages
import HomePage from './pages/HomePage'
import DocumentationPage from './pages/DocumentationPage'
import SearchPage from './pages/SearchPage'
import NotFoundPage from './pages/NotFoundPage'

// Contexts
import { ThemeProvider } from './contexts/ThemeContext'
import { SearchProvider } from './contexts/SearchContext'

// Data
import { documentationStructure } from './data/documentationData'

function App() {
    const [isLoading, setIsLoading] = useState(true)
    const [isSidebarOpen, setIsSidebarOpen] = useState(false)

    useEffect(() => {
        // Simulate initial loading
        const timer = setTimeout(() => {
            setIsLoading(false)
        }, 1000)

        return () => clearTimeout(timer)
    }, [])

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen)
    }

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-github-canvas-default">
                <LoadingSpinner size="lg" />
            </div>
        )
    }

    return (
        <ThemeProvider>
            <SearchProvider>
                <Router>
                    <div className="min-h-screen bg-github-canvas-default text-github-fg-default">
                        <Header
                            onToggleSidebar={toggleSidebar}
                            isSidebarOpen={isSidebarOpen}
                        />

                        <div className="flex">
                            <AnimatePresence>
                                {isSidebarOpen && (
                                    <motion.div
                                        initial={{ x: -300, opacity: 0 }}
                                        animate={{ x: 0, opacity: 1 }}
                                        exit={{ x: -300, opacity: 0 }}
                                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                                        className="fixed top-16 left-0 z-40 lg:relative lg:top-0 lg:z-auto"
                                    >
                                        <Sidebar
                                            structure={documentationStructure}
                                            onItemClick={() => setIsSidebarOpen(false)}
                                        />
                                    </motion.div>
                                )}
                            </AnimatePresence>

                            {/* Overlay for mobile */}
                            {isSidebarOpen && (
                                <div
                                    className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
                                    onClick={() => setIsSidebarOpen(false)}
                                />
                            )}

                            <main className="flex-1 min-w-0 lg:max-w-none">
                                <div className="max-w-none mx-auto">
                                    <Routes>
                                        <Route path="/" element={<HomePage />} />
                                        <Route path="/search" element={<SearchPage />} />
                                        <Route
                                            path="/docs/*"
                                            element={
                                                <DocumentationPage
                                                    structure={documentationStructure}
                                                />
                                            }
                                        />
                                        <Route path="*" element={<NotFoundPage />} />
                                    </Routes>
                                </div>
                            </main>
                        </div>

                        <Footer />
                    </div>
                </Router>
            </SearchProvider>
        </ThemeProvider>
    )
}

export default App
