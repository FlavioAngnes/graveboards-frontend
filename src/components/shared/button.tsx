import React, {ButtonHTMLAttributes, forwardRef} from 'react';
import {cva, VariantProps} from "class-variance-authority";
import cn from "@/utils/cn";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {
}

const buttonVariants = cva(
    'flex items-center justify-center gap-2 overflow-hidden shrink-0 transition-all duration-300',
    {
        variants: {
            size: {
                'sm': 'h-8',
                'md': 'h-10',
                'lg': 'h-12'
            },
            rounded: {
                'sm': 'rounded-sm',
                'md': 'rounded-md',
                'lg': 'rounded-lg',
                'xl': 'rounded-xl',
                '2xl': 'rounded-2xl',
                '3xl': 'rounded-3xl',
                'full': 'rounded-full',
            },
            variant: {
                'fill': 'text-white bg-primary-500 hover:bg-primary-400 active:bg-primary-300 disabled:text-tertiary-600 disabled:bg-tertiary-200 disabled:dark:text-tertiary-900 disabled:dark:bg-tertiary-500',
                'outline': 'text-primary-500 bg-transparent border-[1px] border-primary-500 hover:bg-primary-100 active:bg-primary-200 dark:border-primary-500 dark:hover:bg-primary-900 dark:active:bg-primary-800 disabled:text-tertiary-600 disabled:border-tertiary-600 disabled:dark:text-tertiary-700 disabled:dark:border-tertiary-700 disabled:dark:border-2',
                'clear': 'text-white bg-transparent hover:bg-tertiary-100 dark:hover:bg-tertiary-900 active:bg-tertiary-200 dark:active:bg-tertiary-800',
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
