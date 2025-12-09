import { useRef, ReactNode } from 'react';
import { useInViewPause, useContainerInViewPause } from '../hooks/useInViewPause';

interface PauseOnScrollProps {
    children: ReactNode;
    className?: string;
    /**
     * If true, pauses all animations within the container
     * If false, only pauses the container's own animation
     */
    pauseChildren?: boolean;
    /**
     * CSS selector for specific children to pause (only used if pauseChildren is true)
     */
    childSelector?: string;
    /**
     * Intersection observer options
     */
    options?: {
        once?: boolean;
        amount?: number | 'some' | 'all';
        margin?: string;
    };
}

/**
 * Wrapper component that automatically pauses animations when scrolled out of view
 * 
 * @example
 * // Pause single element animation
 * <PauseOnScroll className="animate-marquee">
 *   <div>Content</div>
 * </PauseOnScroll>
 * 
 * @example
 * // Pause all child animations
 * <PauseOnScroll pauseChildren>
 *   <div className="animate-float">Item 1</div>
 *   <div className="animate-pulse">Item 2</div>
 * </PauseOnScroll>
 * 
 * @example
 * // Pause specific children
 * <PauseOnScroll pauseChildren childSelector=".animated-card">
 *   <div className="animated-card">Card 1</div>
 *   <div className="static-card">Card 2</div>
 * </PauseOnScroll>
 */
export function PauseOnScroll({
    children,
    className = '',
    pauseChildren = false,
    childSelector,
    options,
}: PauseOnScrollProps) {
    const containerRef = useRef<HTMLDivElement>(null);

    if (pauseChildren) {
        useContainerInViewPause(containerRef, {
            ...options,
            selector: childSelector,
        });
    } else {
        useInViewPause(containerRef, options);
    }

    return (
        <div ref={containerRef} className={className}>
            {children}
        </div>
    );
}
