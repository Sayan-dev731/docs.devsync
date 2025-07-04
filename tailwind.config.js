/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    darkMode: 'class',
    theme: {
        extend: {
            colors: {
                primary: {
                    50: '#f0f9ff',
                    100: '#e0f2fe',
                    200: '#bae6fd',
                    300: '#7dd3fc',
                    400: '#38bdf8',
                    500: '#0ea5e9',
                    600: '#0284c7',
                    700: '#0369a1',
                    800: '#075985',
                    900: '#0c4a6e',
                },
                gray: {
                    50: '#f9fafb',
                    100: '#f3f4f6',
                    200: '#e5e7eb',
                    300: '#d1d5db',
                    400: '#9ca3af',
                    500: '#6b7280',
                    600: '#4b5563',
                    700: '#374151',
                    800: '#1f2937',
                    900: '#111827',
                },
                github: {
                    canvas: {
                        default: 'var(--color-canvas-default)',
                        overlay: 'var(--color-canvas-overlay)',
                        inset: 'var(--color-canvas-inset)',
                        subtle: 'var(--color-canvas-subtle)'
                    },
                    fg: {
                        default: 'var(--color-fg-default)',
                        muted: 'var(--color-fg-muted)',
                        subtle: 'var(--color-fg-subtle)',
                        onEmphasis: 'var(--color-fg-on-emphasis)'
                    },
                    border: {
                        default: 'var(--color-border-default)',
                        muted: 'var(--color-border-muted)',
                        subtle: 'var(--color-border-subtle)'
                    },
                    neutral: {
                        emphasisPlus: 'var(--color-neutral-emphasis-plus)',
                        emphasis: 'var(--color-neutral-emphasis)',
                        muted: 'var(--color-neutral-muted)',
                        subtle: 'var(--color-neutral-subtle)'
                    },
                    accent: {
                        fg: 'var(--color-accent-fg)',
                        emphasis: 'var(--color-accent-emphasis)',
                        muted: 'var(--color-accent-muted)',
                        subtle: 'var(--color-accent-subtle)'
                    },
                    success: {
                        fg: 'var(--color-success-fg)',
                        emphasis: 'var(--color-success-emphasis)',
                        muted: 'var(--color-success-muted)',
                        subtle: 'var(--color-success-subtle)'
                    },
                    attention: {
                        fg: 'var(--color-attention-fg)',
                        emphasis: 'var(--color-attention-emphasis)',
                        muted: 'var(--color-attention-muted)',
                        subtle: 'var(--color-attention-subtle)'
                    },
                    severe: {
                        fg: 'var(--color-severe-fg)',
                        emphasis: 'var(--color-severe-emphasis)',
                        muted: 'var(--color-severe-muted)',
                        subtle: 'var(--color-severe-subtle)'
                    },
                    danger: {
                        fg: 'var(--color-danger-fg)',
                        emphasis: 'var(--color-danger-emphasis)',
                        muted: 'var(--color-danger-muted)',
                        subtle: 'var(--color-danger-subtle)'
                    },
                    done: {
                        fg: 'var(--color-done-fg)',
                        emphasis: 'var(--color-done-emphasis)',
                        muted: 'var(--color-done-muted)',
                        subtle: 'var(--color-done-subtle)'
                    }
                }
            },
            fontFamily: {
                sans: ['-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Helvetica', 'Arial', 'sans-serif'],
                mono: ['SFMono-Regular', 'Consolas', 'Liberation Mono', 'Menlo', 'monospace']
            },
            fontSize: {
                'xs': ['12px', '18px'],
                'sm': ['14px', '20px'],
                'base': ['16px', '24px'],
                'lg': ['18px', '28px'],
                'xl': ['20px', '28px'],
                '2xl': ['24px', '32px'],
                '3xl': ['30px', '36px'],
                '4xl': ['36px', '40px']
            },
            spacing: {
                '18': '4.5rem',
                '88': '22rem',
                '120': '30rem'
            },
            animation: {
                'fade-in': 'fadeIn 0.3s ease-in-out',
                'slide-in': 'slideIn 0.3s ease-out',
                'pulse-subtle': 'pulseSubtle 2s infinite'
            },
            keyframes: {
                fadeIn: {
                    '0%': { opacity: '0' },
                    '100%': { opacity: '1' }
                },
                slideIn: {
                    '0%': { transform: 'translateY(10px)', opacity: '0' },
                    '100%': { transform: 'translateY(0)', opacity: '1' }
                },
                pulseSubtle: {
                    '0%, 100%': { opacity: '1' },
                    '50%': { opacity: '0.8' }
                }
            }
        },
    },
    plugins: [],
}
