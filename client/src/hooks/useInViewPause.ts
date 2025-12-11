import { useEffect, RefObject } from 'react';
import { useInView } from 'framer-motion';

/**
 * Hook to pause/resume CSS animations when element is in/out of view
 * @param ref - Reference to the element to observe
 * @param options - IntersectionObserver options
 * @returns isInView - Boolean indicating if element is in view
 */
export function useInViewPause(
    ref: RefObject<HTMLElement>,
    options?: {
        once?: boolean;
        amount?: number | 'some' | 'all';
        margin?: string;
    }
) {
    const isInView = useInView(ref, {
        once: options?.once ?? false,
        amount: options?.amount ?? 0.3,
        margin: options?.margin,
    });

    useEffect(() => {
        if (!ref.current) return;

        // Pause/resume CSS animations
        if (isInView) {
            ref.current.style.animationPlayState = 'running';
        } else {
            ref.current.style.animationPlayState = 'paused';
        }
    }, [isInView, ref]);

    return isInView;
}


/**
 * Hook to pause/resume video when element is in/out of view
 * Includes logic to handle Play() promises and prevent interruption errors
 * @param videoRef - Reference to the video element
 * @param options - IntersectionObserver options
 * @returns isInView - Boolean indicating if element is in view
 */
export function useVideoInViewPause(
    videoRef: RefObject<HTMLVideoElement>,
    options?: {
        once?: boolean;
        amount?: number | 'some' | 'all';
        margin?: string;
    }
) {
    const isInView = useInView(videoRef, {
        once: options?.once ?? false,
        amount: options?.amount ?? 0.3,
        margin: options?.margin,
    });

    useEffect(() => {
        if (!videoRef.current) return;

        const video = videoRef.current;
        let playPromise: Promise<void> | undefined;

        // Small debounce to prevent rapid toggling
        const timeoutId = setTimeout(() => {
            if (isInView) {
                // Play video when in view
                // Check if video is paused to avoid redundant calls
                if (video.paused) {
                    playPromise = video.play();

                    if (playPromise !== undefined) {
                        playPromise.catch((error) => {
                            // Auto-play was prevented or interrupted
                            // This is common and usually safe to ignore for background videos
                            if (error.name !== 'AbortError') {
                                console.warn('Video play failed:', error);
                            }
                        });
                    }
                }
            } else {
                // Pause video when out of view
                // Only pause if not already paused
                if (!video.paused) {
                    // If a play promise is pending, we should wait for it (though we can't await here easily)
                    // or just pause which might reject the play promise.
                    // The catch block above handles the rejection.
                    video.pause();
                }
            }
        }, 100);

        return () => {
            clearTimeout(timeoutId);
        };
    }, [isInView, videoRef]);

    return isInView;
}

/**
 * Hook to pause/resume all animations within a container when in/out of view
 * Useful for complex components with multiple animated children
 * @param containerRef - Reference to the container element
 * @param options - IntersectionObserver options
 * @returns isInView - Boolean indicating if element is in view
 */
export function useContainerInViewPause(
    containerRef: RefObject<HTMLElement>,
    options?: {
        once?: boolean;
        amount?: number | 'some' | 'all';
        margin?: string;
        selector?: string; // CSS selector for animated children
    }
) {
    const isInView = useInView(containerRef, {
        once: options?.once ?? false,
        amount: options?.amount ?? 0.3,
        margin: options?.margin,
    });

    useEffect(() => {
        if (!containerRef.current) return;

        const selector = options?.selector || '*';
        const animatedElements = containerRef.current.querySelectorAll(selector);

        animatedElements.forEach((element) => {
            if (element instanceof HTMLElement) {
                element.style.animationPlayState = isInView ? 'running' : 'paused';
            }
        });

        // Also handle videos within the container
        const videos = containerRef.current.querySelectorAll('video');
        videos.forEach((video) => {
            if (isInView) {
                video.play().catch((error) => {
                    console.warn('Video play failed:', error);
                });
            } else {
                video.pause();
            }
        });
    }, [isInView, containerRef, options?.selector]);

    return isInView;
}
