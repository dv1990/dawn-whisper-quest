import React, { useState, useEffect, useRef, ReactNode } from 'react';
import { cn } from '@/lib/utils';
import { performanceMonitor } from '@/lib/performance-monitor';

interface LazySectionProps {
  children: ReactNode;
  className?: string;
  fallback?: ReactNode;
  rootMargin?: string;
  threshold?: number;
  trackPerformance?: boolean;
  sectionName?: string;
}

export const LazySection: React.FC<LazySectionProps> = ({
  children,
  className,
  fallback,
  rootMargin = '100px',
  threshold = 0.1,
  trackPerformance = false,
  sectionName = 'section'
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting) {
          if (trackPerformance) {
            const tracker = performanceMonitor.markFeature(`lazy-${sectionName}`);
            setTimeout(() => tracker.end(), 100);
          }
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin, threshold }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, [rootMargin, threshold, trackPerformance, sectionName]);

  return (
    <div ref={sectionRef} className={cn('w-full', className)}>
      {isVisible ? children : (fallback || <div className="h-96 bg-muted/5 animate-pulse" />)}
    </div>
  );
};