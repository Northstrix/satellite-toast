"use client"

import { useState, useEffect } from "react"
import { Check, Copy } from "lucide-react"

interface CodeSnippetProps {
  code: string
}

export default function CodeSnippet({ code }: CodeSnippetProps) {
  const [hasCopied, setHasCopied] = useState(false)

  useEffect(() => {
    if (hasCopied) {
      const timer = setTimeout(() => {
        setHasCopied(false)
      }, 2000)
      return () => clearTimeout(timer)
    }
  }, [hasCopied])

  const copyToClipboard = () => {
    navigator.clipboard.writeText(code)
    setHasCopied(true)
  }

  return (
    <div className="h-full rounded-lg border border-[#3a3a3a] bg-[#1e1e1e]">
      <div className="flex items-center justify-between p-4 border-b border-[#3a3a3a]">
        <h3 className="text-lg font-semibold text-gray-200">Code</h3>
        <button
          onClick={copyToClipboard}
          className="p-2 rounded-md hover:bg-[#3a3a3a] transition-colors"
          aria-label="Copy code"
        >
          {hasCopied ? (
            <Check className="h-5 w-5 text-[#A594FD]" />
          ) : (
            <Copy className="h-5 w-5 text-gray-400" />
          )}
        </button>
      </div>
      <div className="p-4">
        <pre className="w-full overflow-x-auto rounded-md bg-[#2E2E2E] p-4 text-sm text-gray-300 font-mono">
          <code>{code}</code>
        </pre>
      </div>
    </div>
  )
}
