import type { MDXComponents } from 'mdx/types'
import { ComponentPropsWithoutRef } from 'react'
import { highlight } from 'sugar-high'

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
        <figure className="group relative mb-8 overflow-hidden rounded-2xl">
          <div className="relative">
            <img 
              src={src} 
              alt={alt} 
              className="w-full object-cover transition-transform duration-500 group-hover:scale-105" 
            />
          </div>
          <figcaption className="mt-4 text-center text-sm font-medium text-zinc-600 dark:text-zinc-400">
            {caption}
          </figcaption>
        </figure>
      )
    },
    code: ({ children, className, ...props }: ComponentPropsWithoutRef<'code'>) => {
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
        className="relative my-8 border-l-4 border-blue-500 bg-gradient-to-r from-blue-50/80 via-purple-50/60 to-blue-50/80 py-6 px-8 rounded-lg shadow-sm dark:from-blue-950/30 dark:via-purple-950/20 dark:to-blue-950/30 dark:shadow-zinc-900/20"
        {...props}
      >
        <div className="absolute -left-2.5 top-6 h-5 w-5 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 shadow-sm" />
        <div className="relative text-lg font-medium leading-relaxed text-zinc-800 dark:text-zinc-200">
          {children}
        </div>
        <div className="absolute -bottom-1 -right-1 h-8 w-8 rounded-full bg-gradient-to-br from-blue-400/20 to-purple-400/20 blur-sm" />
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
    pre: ({ children, ...props }) => (
      <pre
        className="group relative my-8 overflow-x-auto rounded-xl bg-gradient-to-br from-zinc-900 to-zinc-800 p-6 shadow-lg dark:from-zinc-950 dark:to-zinc-900"
        {...props}
      >
        <div className="absolute right-4 top-4 flex space-x-2">
          <div className="h-3 w-3 rounded-full bg-red-500" />
          <div className="h-3 w-3 rounded-full bg-yellow-500" />
          <div className="h-3 w-3 rounded-full bg-green-500" />
        </div>
        {children}
      </pre>
    ),
    hr: ({ ...props }) => (
      <hr
        className="my-12 border-0 bg-gradient-to-r from-transparent via-zinc-300 to-transparent dark:via-zinc-700"
        style={{ height: '1px' }}
        {...props}
      />
    ),
  }
}
