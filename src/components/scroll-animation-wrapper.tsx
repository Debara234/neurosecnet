"use client";

import React, { useRef, useEffect, useState, ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface ScrollAnimationWrapperProps {
  children: ReactNode;
  className?: string;
  delay?: string; // e.g., 'delay-200'
  threshold?: number; // Intersection observer threshold (0 to 1)
}

const ScrollAnimationWrapper: React.FC<ScrollAnimationWrapperProps> = ({
  children,
  className,
  delay = '',
  threshold = 0.1, // Trigger when 10% of the element is visible
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const domRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          // Check if the element is intersecting and not already visible
          if (entry.isIntersecting && !isVisible) {
            setIsVisible(true);
            // Optional: Unobserve after the animation triggers to save resources
            // observer.unobserve(entry.target);
          }
          // Optional: Reset visibility if scrolling back up (if desired)
          // else if (!entry.isIntersecting && isVisible) {
          //   setIsVisible(false);
          // }
        });
      },
      { threshold } // Use the provided threshold
    );

    const currentRef = domRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    // Cleanup observer on component unmount
    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [isVisible, threshold]); // Re-run effect if isVisible or threshold changes

  return (
    <div
      ref={domRef}
      className={cn(
        'scroll-animate', // Base class for initial state (hidden)
        isVisible ? 'is-visible' : '', // Class to trigger animation
        delay, // Tailwind delay class if provided
        className // Allow additional custom classes
      )}
    >
      {children}
    </div>
  );
};

export default ScrollAnimationWrapper;
