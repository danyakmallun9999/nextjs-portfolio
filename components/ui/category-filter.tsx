'use client'
import { motion } from 'motion/react'
import { Filter, X } from 'lucide-react'
import { useState } from 'react'

interface CategoryFilterProps {
  categories: string[]
  selectedCategory: string | null
  onCategoryChange: (category: string | null) => void
  totalPosts: number
  filteredPosts: number
}

export function CategoryFilter({
  categories,
  selectedCategory,
  onCategoryChange,
  totalPosts,
  filteredPosts
}: CategoryFilterProps) {
  const [isOpen, setIsOpen] = useState(false)

  const handleCategorySelect = (category: string) => {
    if (selectedCategory === category) {
      onCategoryChange(null)
    } else {
      onCategoryChange(category)
    }
    setIsOpen(false)
  }

  const clearFilter = () => {
    onCategoryChange(null)
    setIsOpen(false)
  }

  return (
    <div className="relative">
      {/* Filter Button and Info - Mobile Responsive */}
      <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-6">
        {/* Filter Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center justify-center sm:justify-start gap-2 px-4 py-3 sm:py-2 bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-200 rounded-lg hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors w-full sm:w-auto min-w-fit"
        >
          <Filter className="w-4 h-4 flex-shrink-0" />
          <span className="text-sm sm:text-base whitespace-nowrap">Filter by Category</span>
          {selectedCategory && (
            <span className="px-2 py-1 text-xs bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 rounded-full flex-shrink-0 max-w-[120px] sm:max-w-[150px] truncate" title={selectedCategory}>
              {selectedCategory}
            </span>
          )}
        </button>

        {/* Post Count - Mobile Responsive */}
        <div className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 text-center sm:text-left flex-1 min-w-0">
          {selectedCategory ? (
            <span className="block sm:inline">
              Showing {filteredPosts} of {totalPosts} posts
              {selectedCategory && (
                <span className="block sm:inline sm:ml-1">
                  in "<span className="font-medium">{selectedCategory}</span>"
                </span>
              )}
            </span>
          ) : (
            <span>Showing all {totalPosts} posts</span>
          )}
        </div>

        {/* Clear Filter Button - Mobile Responsive */}
        {selectedCategory && (
          <button
            onClick={clearFilter}
            className="flex items-center justify-center gap-1 px-3 py-2 text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 transition-colors bg-zinc-50 dark:bg-zinc-800 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-700 w-full sm:w-auto flex-shrink-0"
          >
            <X className="w-3 h-3" />
            <span>Clear filter</span>
          </button>
        )}
      </div>

      {/* Dropdown - Mobile Responsive */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -10, scale: 0.95 }}
          transition={{ duration: 0.2 }}
          className="absolute top-full left-0 right-0 sm:right-auto z-[9999] w-full sm:w-80 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 rounded-lg shadow-2xl p-2 mt-1"
        >
          <div className="max-h-64 overflow-y-auto">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => handleCategorySelect(category)}
                className={`w-full text-left px-3 py-3 sm:py-2 rounded-md text-sm transition-colors truncate ${
                  selectedCategory === category
                    ? 'bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300'
                    : 'hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-700 dark:text-zinc-200'
                }`}
                title={category}
              >
                {category}
              </button>
            ))}
          </div>
          
          {categories.length === 0 && (
            <div className="px-3 py-3 sm:py-2 text-sm text-zinc-500 dark:text-zinc-400">
              No categories available
            </div>
          )}
        </motion.div>
      )}

      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 z-[9998]"
          onClick={() => setIsOpen(false)}
        />
      )}
    </div>
  )
}
