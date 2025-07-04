import React from 'react'

export const Button = ({
    children,
    variant = 'primary',
    size = 'md',
    disabled = false,
    onClick,
    className = '',
    type = 'button',
    ...props
}) => {
    const baseClasses = 'btn'

    const variantClasses = {
        primary: 'btn-primary',
        secondary: 'btn-secondary',
        ghost: 'btn-ghost'
    }

    const sizeClasses = {
        sm: 'px-3 py-1.5 text-sm',
        md: 'px-4 py-2 text-sm',
        lg: 'px-6 py-3 text-base'
    }

    const classes = [
        baseClasses,
        variantClasses[variant],
        sizeClasses[size],
        className
    ].filter(Boolean).join(' ')

    return (
        <button
            type={type}
            className={classes}
            disabled={disabled}
            onClick={onClick}
            {...props}
        >
            {children}
        </button>
    )
}

export const IconButton = ({
    children,
    size = 'md',
    className = '',
    ...props
}) => {
    const sizeClasses = {
        sm: 'p-1',
        md: 'p-2',
        lg: 'p-3'
    }

    return (
        <Button
            variant="ghost"
            className={`${sizeClasses[size]} ${className}`}
            {...props}
        >
            {children}
        </Button>
    )
}
