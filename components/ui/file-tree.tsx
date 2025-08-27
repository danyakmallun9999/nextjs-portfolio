'use client'

import { useState } from 'react'
import { ChevronRight, ChevronDown, File, Folder, FolderOpen } from 'lucide-react'

interface FileNode {
  name: string
  type: 'file' | 'folder'
  children?: FileNode[]
  content?: string
  language?: string
}

interface FileTreeProps {
  data: FileNode[]
  className?: string
}

export function FileTree({ data, className = '' }: FileTreeProps) {
  const [expandedNodes, setExpandedNodes] = useState<Set<string>>(new Set())

  const toggleNode = (path: string) => {
    const newExpanded = new Set(expandedNodes)
    if (newExpanded.has(path)) {
      newExpanded.delete(path)
    } else {
      newExpanded.add(path)
    }
    setExpandedNodes(newExpanded)
  }

  const renderNode = (node: FileNode, path: string = '', level: number = 0) => {
    const isExpanded = expandedNodes.has(path)
    const isFolder = node.type === 'folder'
    const hasChildren = node.children && node.children.length > 0

    return (
      <div key={path} className="file-tree-node">
        <div 
          className={`flex items-center py-1 px-2 hover:bg-zinc-700 rounded cursor-pointer transition-colors ${
            level > 0 ? 'ml-4' : ''
          }`}
          onClick={() => isFolder && toggleNode(path)}
        >
          {isFolder ? (
            <>
              <div className="w-4 h-4 mr-2 text-zinc-400">
                {isExpanded ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
              </div>
              <div className="w-4 h-4 mr-2 text-zinc-400">
                {isExpanded ? <FolderOpen size={16} /> : <Folder size={16} />}
              </div>
            </>
          ) : (
            <div className="w-4 h-4 mr-2 text-zinc-400">
              <File size={16} />
            </div>
          )}
          <span className="text-sm text-zinc-300 font-mono">{node.name}</span>
        </div>
        
        {isFolder && isExpanded && hasChildren && (
          <div className="ml-4 border-l border-zinc-700">
            {node.children!.map((child, index) => 
              renderNode(child, `${path}/${child.name}`, level + 1)
            )}
          </div>
        )}
      </div>
    )
  }

  return (
    <div className={`file-tree bg-zinc-900 rounded-lg border border-zinc-700 overflow-hidden ${className}`}>
      <div className="file-tree-header bg-zinc-800 px-4 py-2 border-b border-zinc-700">
        <div className="flex items-center space-x-2">
          <div className="flex space-x-2">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
          </div>
          <span className="text-xs text-zinc-400 font-mono ml-2">File Explorer</span>
        </div>
      </div>
      <div className="file-tree-content py-2">
        {data.map((node, index) => renderNode(node, node.name))}
      </div>
    </div>
  )
}
