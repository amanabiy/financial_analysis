import { ComponentProps, FC, memo } from 'react';
import { type MDXComponents } from 'mdx/types';
import { ErrorBoundary } from 'react-error-boundary';
import ReactMarkdown, { Options } from 'react-markdown';
import remarkEmoji from 'remark-emoji';
import remarkGfm from 'remark-gfm';

import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'
import SyntaxHighlighter from 'react-syntax-highlighter';
import { nightOwl } from 'react-syntax-highlighter/dist/esm/styles/hljs';

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

const components: MDXComponents = {
    h1: ({ className, ...props }: ComponentProps<'h1'>) => (
        <h1
            className={cn(
                'mt-2 text-3xl font-extrabold tracking-tight text-white', // dark-themed styling
                className
            )}
            {...props}
        />
    ),
    h2: ({ className, ...props }: ComponentProps<'h2'>) => (
        <h2
            className={cn(
                'mt-3 text-3xl font-semibold tracking-tight text-white',
                className
            )}
            {...props}
        />
    ),
    h3: ({ className, ...props }: ComponentProps<'h3'>) => (
        <h3
            className={cn(
                'mt-2 text-2xl font-semibold tracking-tight text-white',
                className
            )}
            {...props}
        />
    ),
    h4: ({ className, ...props }: ComponentProps<'h4'>) => (
        <h4
            className={cn(
                'mt-2 text-xl font-medium tracking-tight text-white',
                className
            )}
            {...props}
        />
    ),
    h5: ({ className, ...props }: ComponentProps<'h5'>) => (
        <h5
            className={cn(
                'mt-2 text-lg font-medium tracking-tight text-white',
                className
            )}
            {...props}
        />
    ),
    h6: ({ className, ...props }: ComponentProps<'h6'>) => (
        <h6
            className={cn(
                'mt-2 text-base font-medium tracking-tight text-white',
                className
            )}
            {...props}
        />
    ),
    p: ({ className, ...props }: ComponentProps<'p'>) => (
        <p
            className={cn('my-2 text-lg text-white', className)} // text-white for dark mode
            {...props}
        />
    ),
    code({ inline, className, children, ...props }: any) {
        const match = /language-(\w+)/.exec(className ?? '');
        return !inline && match ? (
          <SyntaxHighlighter
            language={match[1]}
            PreTag="div"
            children={String(children).replace(/\n$/, '')}
            {...props}
            style={nightOwl} 
          />
        ) : (
          <code className={className} {...props} />
        );
      },

    ol: ({ className, ...props }: ComponentProps<'ol'>) => (
        <ol
            className={cn('list-decimal pl-5 text-white', className)} // white text for ordered lists
            {...props}
        />
    ),
    ul: ({ className, ...props }: ComponentProps<'ul'>) => (
        <ul
            className={cn('list-disc pl-5 text-white', className)} // white text for unordered lists
            {...props}
        />
    ),
    blockquote: ({ className, ...props }: ComponentProps<'blockquote'>) => (
        <blockquote
            className={cn(
                'border-l-4 border-gray-400 pl-5 italic text-lg text-white', // blockquote styling for dark mode
                className
            )}
            {...props}
        />
    ),
    a: ({ className, ...props }: ComponentProps<'a'>) => (
        <a
            className={cn(
                'text-blue-400 hover:text-blue-600 underline',
                className
            )}
            {...props}
        />
    ),
    img: ({ className, ...props }: ComponentProps<'img'>) => (
        <img
            className={cn('mx-auto my-4 rounded-md shadow-md', className)}
            {...props}
        />
    ),
    // Table components
    table: ({ className, ...props }: ComponentProps<'table'>) => (
        <table
          className={cn(
            'min-w-full text-sm border-collapse table-auto', // Ensures full width and appropriate table layout
            'border border-gray-700', // Dark border color
            'bg-gray-800', // Dark background for table
            className
          )}
          {...props}
        />
      ),
      th: ({ className, ...props }: ComponentProps<'th'>) => (
        <th
          className={cn(
            'px-4 py-2 text-left font-semibold text-white border-b border-gray-700', // Styling for table headers
            'bg-gray-700', // Dark header background
            className
          )}
          {...props}
        />
      ),
      td: ({ className, ...props }: ComponentProps<'td'>) => (
        <td
          className={cn(
            'px-4 py-2 border-b border-gray-700 text-white', // Styling for table data
            'bg-gray-800', // Dark data cell background
            className
          )}
          {...props}
        />
      ),
};

const MemoizedReactMarkdown: FC<Options> = memo(
    ReactMarkdown,
    (prevProps, nextProps) =>
        prevProps.children === nextProps.children && prevProps.className === nextProps.className
);

export function RenderMessage({ children }: { children: string }) {
    return (
        <ErrorBoundary fallback={<div className='whitespace-pre-wrap'>{children}</div>}>
            <MemoizedReactMarkdown components={components} remarkPlugins={[remarkGfm, remarkEmoji]}>
                {children}
            </MemoizedReactMarkdown>
        </ErrorBoundary>
    );
}
