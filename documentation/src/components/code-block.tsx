"use client";
import React from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { atomDark } from "react-syntax-highlighter/dist/cjs/styles/prism";

type CodeBlockProps = {
  language: string;
  highlightLines?: number[];
  code: string;
};

export const CodeBlock = ({
  language,
  code,
  highlightLines = [],
}: CodeBlockProps) => {

  return (
    <div className="relative w-full rounded-lg bg-[#1A1A1A] p-4 font-mono text-sm border border-[#242424]">
      <SyntaxHighlighter
        language={language}
        style={atomDark}
        customStyle={{
          margin: 0,
          padding: "1rem",
          background: "transparent",
          fontSize: "0.875rem",
        }}
        wrapLines={true}
        showLineNumbers={true}
        lineNumberStyle={{ color: '#6b7280', userSelect: 'none' }}
        lineProps={(lineNumber) => ({
          style: {
            backgroundColor: highlightLines.includes(lineNumber)
              ? "rgba(255,255,255,0.1)"
              : "transparent",
            display: "block",
            width: "100%",
          },
        })}
        PreTag="div"
      >
        {String(code).trim()}
      </SyntaxHighlighter>
    </div>
  );
};
