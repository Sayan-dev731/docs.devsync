export const frontendArchitectureContent = `# Frontend Architecture Documentation

> [!NOTE]
> DevSync's frontend is built with modern web technologies, focusing on user experience, accessibility, and maintainability. The architecture emphasizes component reusability, responsive design, and seamless integration with the backend API.

## Table of contents

- [Frontend Overview](#frontend-overview)
- [Technology Stack](#technology-stack)
- [Project Structure](#project-structure)
- [Component Architecture](#component-architecture)
- [State Management](#state-management)
- [Styling System](#styling-system)
- [API Integration](#api-integration)
- [Performance Optimization](#performance-optimization)
- [Accessibility](#accessibility)
- [Testing Strategy](#testing-strategy)

## Frontend Overview

### Modern Web Technologies
- **Framework**: React 18 with Hooks
- **Build Tool**: Vite for fast development and optimized builds
- **Styling**: Tailwind CSS with custom design system
- **Icons**: Lucide React for consistent iconography
- **Animations**: Framer Motion for smooth interactions
- **Routing**: React Router v6 for client-side navigation

### Key Features
- **Responsive Design**: Mobile-first approach with seamless desktop experience
- **Dark/Light Theme**: System preference detection with manual toggle
- **Real-time Search**: Instant documentation search with highlighting
- **Progressive Enhancement**: Works without JavaScript for core content
- **Accessibility**: WCAG 2.1 AA compliance

## Technology Stack

### Core Dependencies

\`\`\`json
{
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-router-dom": "^6.8.1",
    "framer-motion": "^10.0.0",
    "lucide-react": "^0.263.1",
    "tailwindcss": "^3.3.0"
  },
  "devDependencies": {
    "vite": "^4.4.5",
    "@vitejs/plugin-react": "^4.0.3",
    "eslint": "^8.45.0",
    "prettier": "^3.0.0",
    "autoprefixer": "^10.4.14",
    "postcss": "^8.4.27"
  }
}
\`\`\`

### Build Configuration (\`vite.config.js\`)

\`\`\`javascript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@components': path.resolve(__dirname, './src/components'),
      '@pages': path.resolve(__dirname, './src/pages'),
      '@utils': path.resolve(__dirname, './src/utils'),
      '@data': path.resolve(__dirname, './src/data')
    }
  },
  build: {
    outDir: 'dist',
    sourcemap: true,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          router: ['react-router-dom'],
          animation: ['framer-motion']
        }
      }
    }
  },
  server: {
    port: 3000,
    open: true
  }
})
\`\`\`

## Project Structure

\`\`\`
frontend/
├── public/                     # Static assets
│   ├── favicon.ico
│   └── manifest.json
├── src/
│   ├── components/            # Reusable UI components
│   │   ├── layout/           # Layout components
│   │   │   ├── Header.jsx
│   │   │   ├── Footer.jsx
│   │   │   └── Sidebar.jsx
│   │   └── ui/               # UI primitives
│   │       ├── Button.jsx
│   │       ├── SearchInput.jsx
│   │       └── LoadingSpinner.jsx
│   ├── contexts/             # React Context providers
│   │   ├── ThemeContext.jsx
│   │   └── SearchContext.jsx
│   ├── data/                 # Static data and content
│   │   ├── documentationData.js
│   │   └── markdownContent/
│   ├── pages/                # Page components
│   │   ├── HomePage.jsx
│   │   ├── DocumentationPage.jsx
│   │   ├── SearchPage.jsx
│   │   └── NotFoundPage.jsx
│   ├── utils/                # Utility functions
│   │   └── markdownLoader.js
│   ├── styles/               # Global styles
│   │   └── index.css
│   ├── App.jsx              # Main application component
│   └── main.jsx             # Application entry point
├── tailwind.config.js        # Tailwind CSS configuration
├── postcss.config.js         # PostCSS configuration
└── package.json
\`\`\`

## Component Architecture

### Layout Components

#### Header Component (\`components/layout/Header.jsx\`)

\`\`\`jsx
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Github, Sun, Moon } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';
import Button from '@/components/ui/Button';

const Header = () => {
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  const navigation = [
    { name: 'Home', href: '/' },
    { name: 'Documentation', href: '/docs' },
    { name: 'API', href: '/docs/api-documentation' },
    { name: 'Contributing', href: '/docs/contributing' }
  ];

  return (
    <header className="sticky top-0 z-50 bg-github-canvas-default border-b border-github-border-default">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link 
            to="/" 
            className="flex items-center gap-2 text-xl font-bold text-github-fg-default"
          >
            <div className="w-8 h-8 bg-github-accent-emphasis rounded-md flex items-center justify-center">
              <span className="text-white font-bold">DS</span>
            </div>
            DevSync
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={\`px-3 py-2 text-sm font-medium rounded-md transition-colors \${
                  location.pathname === item.href
                    ? 'text-github-accent-fg bg-github-accent-subtle'
                    : 'text-github-fg-muted hover:text-github-fg-default hover:bg-github-neutral-muted'
                }\`}
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleTheme}
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </Button>
            
            <Button
              variant="ghost"
              size="sm"
              as="a"
              href="https://github.com/devsync/devsync"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="View on GitHub"
            >
              <Github className="h-4 w-4" />
            </Button>

            {/* Mobile menu button */}
            <Button
              variant="ghost"
              size="sm"
              className="md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle mobile menu"
            >
              {mobileMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-github-border-default">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={\`block px-3 py-2 text-base font-medium rounded-md transition-colors \${
                    location.pathname === item.href
                      ? 'text-github-accent-fg bg-github-accent-subtle'
                      : 'text-github-fg-muted hover:text-github-fg-default hover:bg-github-neutral-muted'
                  }\`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;
\`\`\`

### UI Components

#### Button Component (\`components/ui/Button.jsx\`)

\`\`\`jsx
import React from 'react';
import { motion } from 'framer-motion';

const Button = React.forwardRef(({
  children,
  variant = 'primary',
  size = 'md',
  disabled = false,
  loading = false,
  as: Component = 'button',
  className = '',
  ...props
}, ref) => {
  const baseClasses = 'inline-flex items-center justify-center font-medium rounded-md transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-github-accent-emphasis focus:ring-offset-2';
  
  const variantClasses = {
    primary: 'bg-github-accent-emphasis text-white hover:bg-github-accent-emphasis/90 disabled:opacity-50',
    secondary: 'bg-github-canvas-subtle border border-github-border-default text-github-fg-default hover:bg-github-canvas-inset hover:border-github-border-muted disabled:opacity-50',
    ghost: 'text-github-fg-muted hover:text-github-fg-default hover:bg-github-neutral-muted disabled:opacity-50',
    danger: 'bg-github-danger-emphasis text-white hover:bg-github-danger-emphasis/90 disabled:opacity-50'
  };
  
  const sizeClasses = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-sm',
    lg: 'px-6 py-3 text-base'
  };

  const classes = \`
    \${baseClasses}
    \${variantClasses[variant]}
    \${sizeClasses[size]}
    \${disabled ? 'cursor-not-allowed' : 'cursor-pointer'}
    \${className}
  \`.trim();

  return (
    <motion.div
      whileHover={!disabled ? { scale: 1.02 } : {}}
      whileTap={!disabled ? { scale: 0.98 } : {}}
    >
      <Component
        ref={ref}
        className={classes}
        disabled={disabled || loading}
        {...props}
      >
        {loading ? (
          <>
            <div className="animate-spin rounded-full h-4 w-4 border-2 border-current border-t-transparent mr-2" />
            Loading...
          </>
        ) : (
          children
        )}
      </Component>
    </motion.div>
  );
});

Button.displayName = 'Button';

export default Button;
\`\`\`

#### Search Input Component (\`components/ui/SearchInput.jsx\`)

\`\`\`jsx
import React from 'react';
import { Search, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const SearchInput = ({
  placeholder = 'Search...',
  value = '',
  onChange,
  onSelect,
  suggestions = [],
  showSuggestions = false,
  className = ''
}) => {
  const [inputValue, setInputValue] = React.useState(value);
  const [showSuggestionsList, setShowSuggestionsList] = React.useState(false);
  const inputRef = React.useRef(null);

  const handleInputChange = (e) => {
    const newValue = e.target.value;
    setInputValue(newValue);
    onChange?.(newValue);
    setShowSuggestionsList(newValue.length > 0 && suggestions.length > 0);
  };

  const handleSuggestionClick = (suggestion) => {
    setInputValue(suggestion);
    onSelect?.(suggestion);
    setShowSuggestionsList(false);
  };

  const handleClear = () => {
    setInputValue('');
    onChange?.('');
    setShowSuggestionsList(false);
    inputRef.current?.focus();
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      onSelect?.(inputValue);
      setShowSuggestionsList(false);
    } else if (e.key === 'Escape') {
      setShowSuggestionsList(false);
      inputRef.current?.blur();
    }
  };

  return (
    <div className={\`relative \${className}\`}>
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-github-fg-muted" />
        <input
          ref={inputRef}
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          onFocus={() => setShowSuggestionsList(inputValue.length > 0 && suggestions.length > 0)}
          placeholder={placeholder}
          className="w-full pl-10 pr-10 py-2 border border-github-border-default rounded-md bg-github-canvas-default text-github-fg-default placeholder-github-fg-muted focus:outline-none focus:ring-2 focus:ring-github-accent-emphasis focus:border-transparent"
        />
        {inputValue && (
          <button
            onClick={handleClear}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-github-fg-muted hover:text-github-fg-default"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>

      <AnimatePresence>
        {showSuggestionsList && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute z-50 w-full mt-1 bg-github-canvas-default border border-github-border-default rounded-md shadow-lg max-h-60 overflow-y-auto"
          >
            {suggestions.map((suggestion, index) => (
              <button
                key={index}
                onClick={() => handleSuggestionClick(suggestion)}
                className="w-full text-left px-4 py-2 text-sm text-github-fg-default hover:bg-github-canvas-subtle focus:bg-github-canvas-subtle focus:outline-none"
              >
                {suggestion}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SearchInput;
\`\`\`

## State Management

### Theme Context (\`contexts/ThemeContext.jsx\`)

\`\`\`jsx
import React, { createContext, useContext, useEffect, useState } from 'react';

const ThemeContext = createContext();

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(() => {
    // Check localStorage first
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      return savedTheme;
    }
    
    // Check system preference
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return 'dark';
    }
    
    return 'light';
  });

  useEffect(() => {
    // Apply theme to document
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  useEffect(() => {
    // Listen for system theme changes
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (e) => {
      if (!localStorage.getItem('theme')) {
        setTheme(e.matches ? 'dark' : 'light');
      }
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  return (
    <ThemeContext.Provider value={{ theme, setTheme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
\`\`\`

### Search Context (\`contexts/SearchContext.jsx\`)

\`\`\`jsx
import React, { createContext, useContext, useState, useCallback } from 'react';
import { documentationStructure } from '@/data/documentationData';

const SearchContext = createContext();

export const useSearch = () => {
  const context = useContext(SearchContext);
  if (!context) {
    throw new Error('useSearch must be used within a SearchProvider');
  }
  return context;
};

export const SearchProvider = ({ children }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [recentSearches, setRecentSearches] = useState(() => {
    const saved = localStorage.getItem('recentSearches');
    return saved ? JSON.parse(saved) : [];
  });

  // Flatten documentation structure for searching
  const flattenDocs = useCallback(() => {
    const flattened = [];
    
    const traverse = (items) => {
      items.forEach(item => {
        if (item.children) {
          traverse(item.children);
        } else if (item.content) {
          flattened.push(item);
        }
      });
    };
    
    traverse(documentationStructure);
    return flattened;
  }, []);

  // Perform search with scoring
  const performSearch = useCallback(async (query) => {
    if (!query.trim()) {
      setSearchResults([]);
      return;
    }

    setIsSearching(true);
    
    // Simulate API delay for better UX
    await new Promise(resolve => setTimeout(resolve, 300));
    
    const docs = flattenDocs();
    const queryLower = query.toLowerCase();
    
    const results = docs
      .map(doc => {
        let score = 0;
        
        // Title match (highest weight)
        if (doc.title.toLowerCase().includes(queryLower)) {
          score += 10;
        }
        
        // Description match
        if (doc.description?.toLowerCase().includes(queryLower)) {
          score += 5;
        }
        
        // Content match
        if (doc.content?.toLowerCase().includes(queryLower)) {
          score += 2;
        }
        
        // Category match
        if (doc.category?.toLowerCase().includes(queryLower)) {
          score += 3;
        }
        
        return { ...doc, score };
      })
      .filter(doc => doc.score > 0)
      .sort((a, b) => b.score - a.score);
    
    setSearchResults(results);
    setIsSearching(false);
    
    // Add to recent searches
    addRecentSearch(query);
  }, [flattenDocs]);

  const addRecentSearch = useCallback((query) => {
    const updated = [query, ...recentSearches.filter(q => q !== query)].slice(0, 5);
    setRecentSearches(updated);
    localStorage.setItem('recentSearches', JSON.stringify(updated));
  }, [recentSearches]);

  const clearRecentSearches = useCallback(() => {
    setRecentSearches([]);
    localStorage.removeItem('recentSearches');
  }, []);

  return (
    <SearchContext.Provider value={{
      searchQuery,
      setSearchQuery,
      searchResults,
      isSearching,
      recentSearches,
      performSearch,
      addRecentSearch,
      clearRecentSearches
    }}>
      {children}
    </SearchContext.Provider>
  );
};
\`\`\`

## Styling System

### Tailwind Configuration (\`tailwind.config.js\`)

\`\`\`javascript
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: ['class', '[data-theme="dark"]'],
  theme: {
    extend: {
      colors: {
        // GitHub design system colors
        github: {
          // Canvas colors
          'canvas-default': 'var(--color-canvas-default)',
          'canvas-overlay': 'var(--color-canvas-overlay)',
          'canvas-inset': 'var(--color-canvas-inset)',
          'canvas-subtle': 'var(--color-canvas-subtle)',
          
          // Foreground colors
          'fg-default': 'var(--color-fg-default)',
          'fg-muted': 'var(--color-fg-muted)',
          'fg-subtle': 'var(--color-fg-subtle)',
          'fg-onEmphasis': 'var(--color-fg-on-emphasis)',
          
          // Border colors
          'border-default': 'var(--color-border-default)',
          'border-muted': 'var(--color-border-muted)',
          'border-subtle': 'var(--color-border-subtle)',
          
          // Accent colors
          'accent-fg': 'var(--color-accent-fg)',
          'accent-emphasis': 'var(--color-accent-emphasis)',
          'accent-muted': 'var(--color-accent-muted)',
          'accent-subtle': 'var(--color-accent-subtle)',
          
          // Success colors
          'success-fg': 'var(--color-success-fg)',
          'success-emphasis': 'var(--color-success-emphasis)',
          'success-muted': 'var(--color-success-muted)',
          'success-subtle': 'var(--color-success-subtle)',
          
          // Danger colors
          'danger-fg': 'var(--color-danger-fg)',
          'danger-emphasis': 'var(--color-danger-emphasis)',
          'danger-muted': 'var(--color-danger-muted)',
          'danger-subtle': 'var(--color-danger-subtle)',
          
          // Neutral colors
          'neutral-muted': 'var(--color-neutral-muted)',
          'neutral-subtle': 'var(--color-neutral-subtle)',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'Consolas', 'monospace'],
      },
      typography: {
        DEFAULT: {
          css: {
            maxWidth: 'none',
            color: 'var(--color-fg-default)',
            lineHeight: '1.7',
          }
        }
      }
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}
\`\`\`

### CSS Custom Properties (\`src/styles/index.css\`)

\`\`\`css
@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  /* Light theme colors */
  --color-canvas-default: #ffffff;
  --color-canvas-overlay: #ffffff;
  --color-canvas-inset: #f6f8fa;
  --color-canvas-subtle: #f6f8fa;
  
  --color-fg-default: #1f2328;
  --color-fg-muted: #656d76;
  --color-fg-subtle: #6e7781;
  --color-fg-on-emphasis: #ffffff;
  
  --color-border-default: #d1d9e0;
  --color-border-muted: #d1d9e0;
  --color-border-subtle: #eaeef2;
  
  --color-accent-fg: #0969da;
  --color-accent-emphasis: #0969da;
  --color-accent-muted: #54aeff;
  --color-accent-subtle: #ddf4ff;
  
  --color-success-fg: #1a7f37;
  --color-success-emphasis: #1f883d;
  --color-success-muted: #4ac26b;
  --color-success-subtle: #dcffe4;
  
  --color-danger-fg: #d1242f;
  --color-danger-emphasis: #da3633;
  --color-danger-muted: #f85149;
  --color-danger-subtle: #ffebe9;
  
  --color-neutral-muted: #afb8c1;
  --color-neutral-subtle: #f6f8fa;
}

[data-theme="dark"] {
  /* Dark theme colors */
  --color-canvas-default: #0d1117;
  --color-canvas-overlay: #161b22;
  --color-canvas-inset: #010409;
  --color-canvas-subtle: #161b22;
  
  --color-fg-default: #e6edf3;
  --color-fg-muted: #7d8590;
  --color-fg-subtle: #6e7681;
  --color-fg-on-emphasis: #ffffff;
  
  --color-border-default: #30363d;
  --color-border-muted: #30363d;
  --color-border-subtle: #21262d;
  
  --color-accent-fg: #58a6ff;
  --color-accent-emphasis: #1f6feb;
  --color-accent-muted: #388bfd;
  --color-accent-subtle: #0d419d;
  
  --color-success-fg: #3fb950;
  --color-success-emphasis: #238636;
  --color-success-muted: #2ea043;
  --color-success-subtle: #0f5132;
  
  --color-danger-fg: #f85149;
  --color-danger-emphasis: #da3633;
  --color-danger-muted: #f85149;
  --color-danger-subtle: #67060c;
  
  --color-neutral-muted: #484f58;
  --color-neutral-subtle: #161b22;
}

/* Custom scrollbar */
::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}

::-webkit-scrollbar-track {
  background: var(--color-canvas-default);
}

::-webkit-scrollbar-thumb {
  background: var(--color-neutral-muted);
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background: var(--color-fg-muted);
}

/* Focus styles */
.focus-ring {
  @apply focus:outline-none focus:ring-2 focus:ring-github-accent-emphasis focus:ring-offset-2;
}

/* Animation utilities */
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes slideIn {
  from { transform: translateY(10px); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
}

.animate-fade-in {
  animation: fadeIn 0.3s ease-out;
}

.animate-slide-in {
  animation: slideIn 0.3s ease-out;
}
\`\`\`

## Performance Optimization

### Code Splitting and Lazy Loading

\`\`\`jsx
// Lazy load pages for better performance
const HomePage = React.lazy(() => import('@/pages/HomePage'));
const DocumentationPage = React.lazy(() => import('@/pages/DocumentationPage'));
const SearchPage = React.lazy(() => import('@/pages/SearchPage'));
const NotFoundPage = React.lazy(() => import('@/pages/NotFoundPage'));

// App.jsx
function App() {
  return (
    <Router>
      <ThemeProvider>
        <SearchProvider>
          <div className="min-h-screen bg-github-canvas-default">
            <Header />
            
            <Suspense fallback={
              <div className="flex items-center justify-center min-h-[50vh]">
                <LoadingSpinner size="lg" />
              </div>
            }>
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/docs/*" element={<DocumentationPage />} />
                <Route path="/search" element={<SearchPage />} />
                <Route path="*" element={<NotFoundPage />} />
              </Routes>
            </Suspense>
            
            <Footer />
          </div>
        </SearchProvider>
      </ThemeProvider>
    </Router>
  );
}
\`\`\`

### Image Optimization

\`\`\`jsx
// Optimized image component
const OptimizedImage = ({ src, alt, className, ...props }) => {
  const [isLoaded, setIsLoaded] = React.useState(false);
  const [hasError, setHasError] = React.useState(false);

  return (
    <div className={\`relative \${className}\`}>
      {!isLoaded && !hasError && (
        <div className="absolute inset-0 bg-github-neutral-subtle animate-pulse rounded" />
      )}
      
      <img
        src={src}
        alt={alt}
        onLoad={() => setIsLoaded(true)}
        onError={() => setHasError(true)}
        className={\`transition-opacity duration-300 \${
          isLoaded ? 'opacity-100' : 'opacity-0'
        }\`}
        loading="lazy"
        {...props}
      />
      
      {hasError && (
        <div className="absolute inset-0 flex items-center justify-center bg-github-neutral-subtle text-github-fg-muted">
          Failed to load image
        </div>
      )}
    </div>
  );
};
\`\`\`

## Accessibility

### Semantic HTML and ARIA

\`\`\`jsx
// Accessible navigation component
const AccessibleNavigation = ({ items, currentPath }) => {
  return (
    <nav role="navigation" aria-label="Main navigation">
      <ul className="flex space-x-4">
        {items.map((item) => (
          <li key={item.href}>
            <Link
              to={item.href}
              className={linkClasses}
              aria-current={currentPath === item.href ? 'page' : undefined}
            >
              {item.name}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

// Accessible modal component
const AccessibleModal = ({ isOpen, onClose, title, children }) => {
  React.useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      
      // Focus trap
      const focusableElements = document.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      const firstElement = focusableElements[0];
      firstElement?.focus();
    } else {
      document.body.style.overflow = '';
    }
    
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div
        className="fixed inset-0 bg-black bg-opacity-50"
        onClick={onClose}
        aria-hidden="true"
      />
      
      <div className="relative bg-github-canvas-default rounded-lg shadow-lg max-w-md w-full mx-4">
        <h2 id="modal-title" className="sr-only">
          {title}
        </h2>
        
        {children}
        
        <button
          onClick={onClose}
          className="absolute top-4 right-4"
          aria-label="Close modal"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
};
\`\`\`

## Testing Strategy

### Component Testing with React Testing Library

\`\`\`jsx
// __tests__/components/Button.test.jsx
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Button from '@/components/ui/Button';

describe('Button Component', () => {
  test('renders with correct text', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByRole('button')).toHaveTextContent('Click me');
  });

  test('applies correct variant classes', () => {
    render(<Button variant="secondary">Secondary</Button>);
    const button = screen.getByRole('button');
    expect(button).toHaveClass('bg-github-canvas-subtle');
  });

  test('handles click events', () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Click me</Button>);
    
    fireEvent.click(screen.getByRole('button'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  test('shows loading state', () => {
    render(<Button loading>Loading button</Button>);
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  test('is disabled when loading', () => {
    render(<Button loading>Loading button</Button>);
    expect(screen.getByRole('button')).toBeDisabled();
  });
});
\`\`\`

### Integration Testing

\`\`\`jsx
// __tests__/integration/SearchFlow.test.jsx
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import App from '@/App';

describe('Search Flow Integration', () => {
  test('complete search flow works correctly', async () => {
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );

    // Navigate to search page
    fireEvent.click(screen.getByText('Search'));

    // Enter search query
    const searchInput = screen.getByPlaceholderText('Search documentation...');
    fireEvent.change(searchInput, { target: { value: 'API' } });

    // Wait for search results
    await waitFor(() => {
      expect(screen.getByText(/API Documentation/)).toBeInTheDocument();
    });

    // Click on a result
    fireEvent.click(screen.getByText('API Documentation'));

    // Verify navigation
    await waitFor(() => {
      expect(window.location.pathname).toBe('/docs/api-documentation');
    });
  });
});
\`\`\`

> [!NOTE]
> This frontend architecture provides a robust, accessible, and maintainable foundation for the DevSync documentation platform, with modern tooling and best practices for React development.
`;
