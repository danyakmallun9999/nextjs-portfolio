import type { MDXComponents } from 'mdx/types'
import { ComponentPropsWithoutRef } from 'react'
import { highlight } from 'sugar-high'
import { CodeBlock } from '@/components/ui/code-block'
import { Terminal } from '@/components/ui/terminal'
import { FileTree } from '@/components/ui/file-tree'

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    ...components,
    Cover: ({
      src,
      alt,
      caption,
    }: {
      src: string
      alt: string
      caption: string
    }) => {
      return (
        <figure className="group relative mb-8 mt-0 overflow-hidden rounded-2xl">
          <div className="relative aspect-video">
            <img 
              src={src} 
              alt={alt} 
              className="w-full h-full object-cover" 
            />
          </div>
          <figcaption className="mt-4 text-center text-sm font-medium text-zinc-600 dark:text-zinc-400">
            {caption}
          </figcaption>
        </figure>
      )
    },
    code: ({ children, className, ...props }: ComponentPropsWithoutRef<'code'>) => {
      // Check if this is inline code (no className) or block code (has className)
      if (!className) {
        // Inline code with solid colors and no shadow
        return (
          <code
            className="bg-zinc-100 px-2 py-1 rounded-lg text-sm font-mono text-zinc-800 dark:bg-zinc-800 dark:text-zinc-200"
            {...props}
          >
            {children}
          </code>
        )
      }
      
      // Block code with syntax highlighting
      const codeHTML = highlight(children as string)
      return (
        <code
          className={className}
          dangerouslySetInnerHTML={{ __html: codeHTML }}
          {...props}
        />
      )
    },
    h1: ({ children, ...props }) => (
      <h1
        className="mb-6 text-4xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100"
        {...props}
      >
        {children}
      </h1>
    ),
    h2: ({ children, ...props }) => (
      <h2
        className="group relative mt-12 mb-6 text-2xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-100"
        {...props}
      >
        {children}
      </h2>
    ),
    h3: ({ children, ...props }) => (
      <h3
        className="mt-8 mb-4 text-xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-100"
        {...props}
      >
        {children}
      </h3>
    ),
    p: ({ children, ...props }) => (
      <p
        className="mb-6 leading-relaxed text-zinc-700 dark:text-zinc-300"
        {...props}
      >
        {children}
      </p>
    ),
    blockquote: ({ children, ...props }) => (
      <blockquote
        className="relative my-8 border-l-4 border-blue-500 bg-blue-50 py-6 px-8 rounded-lg dark:bg-blue-950"
        {...props}
      >
        <div className="relative text-lg font-medium leading-relaxed text-zinc-800 dark:text-zinc-200">
          {children}
        </div>
      </blockquote>
    ),
    ul: ({ children, ...props }) => (
      <ul
        className="mb-6 space-y-2 pl-6 text-zinc-700 dark:text-zinc-300"
        {...props}
      >
        {children}
      </ul>
    ),
    ol: ({ children, ...props }) => (
      <ol
        className="mb-6 space-y-2 pl-6 text-zinc-700 dark:text-zinc-300"
        {...props}
      >
        {children}
      </ol>
    ),
    li: ({ children, ...props }) => (
      <li
        className="relative"
        {...props}
      >
        {children}
      </li>
    ),
    strong: ({ children, ...props }) => (
      <strong className="font-semibold text-zinc-900 dark:text-zinc-100" {...props}>
        {children}
      </strong>
    ),
    em: ({ children, ...props }) => (
      <em className="italic text-zinc-800 dark:text-zinc-200" {...props}>
        {children}
      </em>
    ),
    a: ({ children, href, ...props }) => (
      <a
        href={href}
        className="font-medium text-blue-600 underline decoration-blue-400/30 underline-offset-2 transition-colors hover:text-blue-700 hover:decoration-blue-400 dark:text-blue-400 dark:decoration-blue-500/30 dark:hover:text-blue-300"
        {...props}
      >
        {children}
      </a>
    ),
    pre: ({ children, ...props }) => {
      // Extract language from className if available
      const className = (children as any)?.props?.className || ''
      const language = className.replace('language-', '') || 'text'
      
      return (
        <CodeBlock language={language}>
          {children}
        </CodeBlock>
      )
    },
    hr: ({ ...props }) => (
      <hr
        className="my-12 border-0 bg-zinc-300 dark:bg-zinc-700"
        style={{ height: '1px' }}
        {...props}
      />
    ),
    // Custom components for enhanced code display
    Terminal: ({ commands, autoType, typingSpeed, ...props }: any) => (
      <Terminal 
        commands={commands} 
        autoType={autoType} 
        typingSpeed={typingSpeed}
        {...props}
      />
    ),
    FileTree: ({ data, ...props }: any) => (
      <FileTree data={data} {...props} />
    ),
  }
}
