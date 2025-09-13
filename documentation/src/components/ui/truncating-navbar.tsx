'use client';
import React, { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { Github, Menu } from 'lucide-react';

// =====================================================
// Navbar Types
// =====================================================
export interface RouteItem {
  name: string;
  link: string;
  external?: boolean;
}

export interface TruncatingNavbarProps {
  icon: string;
  appName: string;
  routes: RouteItem[];
  homeRoute?: string;
  scrolledBg?: string;
  outlineColor?: string;
  mobileBg?: string;
  fontSize?: string;
  desktopThreshold?: number;
  zIndex?: number;
  scrollContainerRef?: React.RefObject<HTMLElement>;
  navbarHoverOutline?: string;
}

// =====================================================
// Navbar Component
// =====================================================
export default function TruncatingNavbar({
  icon,
  appName,
  routes,
  homeRoute = '/',
  scrolledBg = '#151419',
  outlineColor = '#33313d',
  mobileBg = '#111014',
  fontSize = '0.875rem',
  desktopThreshold = 910,
  zIndex = 10,
  scrollContainerRef,
  navbarHoverOutline = '#403d4d',
}: TruncatingNavbarProps) {
  const [isMobile, setIsMobile] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [navHovered, setNavHovered] = useState(false);
  const router = useRouter();

  const mobileBreakpoint = desktopThreshold - 1;

  // Handlers
  const handleResize = useCallback(() => {
    const mobile = window.innerWidth < desktopThreshold;
    setIsMobile(mobile);
    if (!mobile) {
      setIsMobileMenuOpen(false);
    }
  }, [desktopThreshold]);

  const handleScroll = useCallback(() => {
    const scrollY = scrollContainerRef?.current
      ? scrollContainerRef.current.scrollTop
      : window.scrollY;
    setIsScrolled(scrollY > 8);
  }, [scrollContainerRef]);

  const handleRoute = useCallback(
    (item: RouteItem) => {
      if (!item.link) return;
      if (item.external) {
        window.open(item.link, '_blank', 'noopener,noreferrer');
      } else {
        router.push(item.link);
      }
    },
    [router]
  );
  
  useEffect(() => {
    if (typeof window !== 'undefined') {
      handleResize();
      window.addEventListener('resize', handleResize);
      const target = scrollContainerRef?.current || window;
      target.addEventListener('scroll', handleScroll, { passive: true });

      return () => {
        window.removeEventListener('resize', handleResize);
        target.removeEventListener('scroll', handleScroll);
      };
    }
  }, [handleResize, handleScroll, scrollContainerRef]);


  const navStyle: React.CSSProperties = {
    background: isScrolled ? scrolledBg : 'transparent',
    border: `1px solid ${
      isScrolled ? (navHovered ? navbarHoverOutline : outlineColor) : 'transparent'
    }`,
    borderRadius: isScrolled ? '8px' : '0',
    height: isScrolled ? '52px' : '64px',
    top: isScrolled ? '16px' : '0',
    boxShadow: isScrolled ? '0 4px 30px rgba(0, 0, 0, 0.1)' : 'none',
    backdropFilter: isScrolled ? 'blur(10px)' : 'none',
    transition:
      'background 0.3s ease-in-out, border-color 0.3s ease-in-out, height 0.3s ease-in-out, top 0.3s ease-in-out, border-radius 0.3s ease-in-out',
    zIndex,
    position: 'fixed',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: isScrolled ? 'calc(100% - 32px)' : '100%',
    maxWidth: '56rem', // 4xl = 56rem = 896px
    left: '50%',
    transform: 'translateX(-50%)',
    padding: '0 24px',
  };
  
  return (
    <nav
      style={navStyle}
      onMouseEnter={() => setNavHovered(true)}
      onMouseLeave={() => setNavHovered(false)}
    >
      <a href={homeRoute} className="navbar-logo">
        <span className="app-name">{appName}</span>
      </a>

      <div className="nav-items">
        <a
          href={routes[0].link}
          onClick={(e) => {
            e.preventDefault();
            handleRoute(routes[0]);
          }}
          className="nav-link"
          target={routes[0].external ? '_blank' : undefined}
          rel={routes[0].external ? 'noopener noreferrer' : undefined}
        >
          <Github className="h-5 w-5" />
        </a>
      </div>
      <style jsx>{`
        .navbar-logo {
          display: flex;
          align-items: center;
          gap: 10px;
          text-decoration: none;
        }
        .app-name {
          font-size: 1rem;
          font-weight: 600;
          color: #e5e7eb;
          transition: color 0.3s ease;
        }
        .navbar-logo:hover .app-name {
          color: #a594fd;
        }
        .nav-items {
          display: flex;
          align-items: center;
          gap: 18px;
        }
        .nav-link {
          color: #9ca3af;
          cursor: pointer;
          transition: color 0.3s ease;
        }
        .nav-link:hover {
          color: #e5e7eb;
        }
      `}</style>
    </nav>
  );
}
