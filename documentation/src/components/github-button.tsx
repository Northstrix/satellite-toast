'use client';

import { useEffect, useState } from "react";
import { Star } from "lucide-react";

const Counter = ({ targetValue }: { targetValue: number }) => {
  const [currentValue, setCurrentValue] = useState(0);
  useEffect(() => {
    if (targetValue > 0) {
      setCurrentValue(targetValue);
    }
  }, [targetValue]);
  return <span>{currentValue}</span>;
};

export default function GithubButton() {
  const [stars, setStars] = useState<number>(0);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    fetch("https://api.github.com/repos/Northstrix/satellite-toast")
      .then((r) => r.json())
      .then((data) => setStars(data.stargazers_count || 0))
      .catch(() => setStars(0));
  }, []);

  // Separate individual border properties for clarity
  const baseStyle: React.CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '0.625rem',
    width: 'auto',
    padding: '0.75rem 1.5rem',
    fontSize: '1rem',
    fontWeight: 500,
    borderRadius: '8px',
    borderWidth: '1px',
    borderStyle: 'solid',
    borderColor: 'hsl(var(--border))',
    backgroundColor: 'hsl(var(--background))',
    color: 'hsl(var(--foreground))',
    transition: 'background-color 0.3s ease-in-out, color 0.3s ease-in-out, border-color 0.3s ease-in-out',
    cursor: 'pointer',
  };

  const hoverStyle: React.CSSProperties = {
    backgroundColor: 'var(--accent-color)',
    color: 'hsl(var(--foreground))',
    borderColor: 'var(--accent-color)',
  };

  const finalStyle = isHovered ? { ...baseStyle, ...hoverStyle } : baseStyle;

  return (
    <a
      href="https://github.com/Northstrix/satellite-toast"
      target="_blank"
      rel="noopener noreferrer"
      style={{ textDecoration: 'none' }}
    >
      <button
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        style={finalStyle}
      >
        <span>Star on GitHub</span>
        <span>|</span>
        <Star size={18} strokeWidth={2} className="text-foreground fill-foreground" />
        <Counter targetValue={stars} />
      </button>
    </a>
  );
}
