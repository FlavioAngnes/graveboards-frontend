import React, {ButtonHTMLAttributes, forwardRef} from 'react';
import {cva, VariantProps} from "class-variance-authority";
import cn from "@/utils/cn";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {
}

const buttonVariants = cva(
    'whitespace-nowrap flex items-center justify-center gap-2 overflow-hidden shrink-0 transition-colors duration-300 ease-in-out',
    {
        variants: {
            size: {
                'xs': 'h-6',
                'sm': 'h-8',
                'md': 'h-10',
                'lg': 'h-12'
            },
            rounded: {
                'sm': 'rounded-sm px-2',
                'md': 'rounded-md px-2',
                'lg': 'rounded-lg px-4',
                'xl': 'rounded-xl px-6',
                '2xl': 'rounded-2xl px-6',
                '3xl': 'rounded-3xl px-6',
                'full': 'rounded-full px-6',
            },
            variant: {
                'fill': 'text-white bg-primary-500 hover:bg-primary-400 active:bg-primary-300 disabled:text-tertiary-600 disabled:bg-tertiary-200 disabled:dark:text-tertiary-900 disabled:dark:bg-tertiary-500',
                'outline': 'text-primary-500 bg-transparent border-2 border-primary-500 hover:bg-primary-100 active:bg-primary-200 dark:border-primary-500 dark:hover:bg-primary-400 dark:hover:text-white dark:active:bg-primary-300 dark:active:text-white disabled:text-tertiary-600 disabled:border-tertiary-600 disabled:dark:text-tertiary-700 disabled:dark:border-tertiary-700 disabled:dark:border-2',
                'clear': 'text-tertiary-500 dark:text-tertiary-400 hover:text-tertiary-800 dark:hover:text-tertiary-100 bg-transparent hover:bg-tertiary-100 dark:hover:bg-tertiary-900 active:bg-tertiary-200 dark:active:bg-tertiary-800',
            },
        },
        defaultVariants: {
            size: 'md',
            rounded: 'md',
            variant: 'fill',
        }
    }
)

const Button = forwardRef<HTMLButtonElement, ButtonProps>(({className, size, rounded, variant, ...props}, ref) => {
    return (
        <button ref={ref} className={cn(buttonVariants({className, size, rounded, variant}))} {...props}/>
    );
});

Button.displayName = 'Button';

export default Button;
