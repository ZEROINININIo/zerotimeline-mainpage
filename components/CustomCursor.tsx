
import React, { useEffect, useRef, useState } from 'react';

const CustomCursor: React.FC = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const [isPointer, setIsPointer] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  
  // Track mouse position ref for scroll updates
  const mousePos = useRef({ x: -100, y: -100 });

  useEffect(() => {
    // Only enable on devices with fine pointers (mouse)
    const mediaQuery = window.matchMedia('(pointer: fine)');
    
    const handleVisibility = (matches: boolean) => {
        setIsVisible(matches);
        if (matches) {
            document.body.classList.add('custom-cursor-active');
        } else {
            document.body.classList.remove('custom-cursor-active');
        }
    };

    const handleMediaQueryChange = (e: MediaQueryListEvent | MediaQueryList) => {
        handleVisibility(e.matches);
    };

    // Initial check
    handleVisibility(mediaQuery.matches);

    if (mediaQuery.addEventListener) {
        mediaQuery.addEventListener('change', handleMediaQueryChange);
    } else {
        mediaQuery.addListener(handleMediaQueryChange);
    }
    
    // Logic to check hover state (shared between mousemove and scroll)
    const checkHoverState = (x: number, y: number) => {
        const target = document.elementFromPoint(x, y) as HTMLElement;
        if (target && typeof target.closest === 'function') {
            const isClickable = target.closest('a, button, input, textarea, select, [role="button"], .cursor-pointer');
            setIsPointer(!!isClickable);
        } else {
            setIsPointer(false);
        }
    };

    const onMouseMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
      
      // Direct DOM update to avoid React render cycle on every frame
      if (cursorRef.current) {
          cursorRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
      }
      
      checkHoverState(e.clientX, e.clientY);
    };

    // Scroll listener to update hover state even if mouse doesn't move relative to screen
    const onScroll = () => {
        if (mousePos.current.x >= 0) {
            checkHoverState(mousePos.current.x, mousePos.current.y);
        }
    };

    const onMouseDown = () => setIsClicking(true);
    const onMouseUp = () => setIsClicking(false);

    if (mediaQuery.matches) {
        window.addEventListener('mousemove', onMouseMove, { passive: true });
        window.addEventListener('mousedown', onMouseDown);
        window.addEventListener('mouseup', onMouseUp);
        window.addEventListener('scroll', onScroll, { passive: true });
    }

    return () => {
      document.body.classList.remove('custom-cursor-active');
      if (mediaQuery.removeEventListener) {
          mediaQuery.removeEventListener('change', handleMediaQueryChange);
      } else {
          mediaQuery.removeListener(handleMediaQueryChange);
      }
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mouseup', onMouseUp);
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  if (!isVisible) return null;

  return (
    <div 
      ref={cursorRef}
      className="fixed top-0 left-0 pointer-events-none z-[99999] text-white mix-blend-difference will-change-transform"
      style={{ 
        // Initial position off-screen to prevent flash
        transform: 'translate3d(-100px, -100px, 0)',
      }}
    >
      <div className={`transition-transform duration-100 ease-out ${isClicking ? 'scale-75' : 'scale-100'}`}>
        {!isPointer ? (
            // Default State: Tactical Arrow
            <div className="-translate-x-[2px] -translate-y-[2px]">
                 <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="drop-shadow-[0_0_2px_rgba(255,255,255,0.5)]">
                    <path d="M2 2L9 19L12.5 11.5L20 8L2 2Z" fill="currentColor" stroke="currentColor" strokeWidth="1.5"/>
                </svg>
            </div>
        ) : (
            // Hover State: Dynamic Reticle
            <div className="-translate-x-1/2 -translate-y-1/2">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
                    {/* Spinning Outer Brackets */}
                    <g className="origin-center animate-[spin_8s_linear_infinite]">
                        <path d="M4 4H9M4 4V9" stroke="currentColor" strokeWidth="1.5" />
                        <path d="M20 4H15M20 4V9" stroke="currentColor" strokeWidth="1.5" />
                        <path d="M4 20H9M4 20V15" stroke="currentColor" strokeWidth="1.5" />
                        <path d="M20 20H15M20 20V15" stroke="currentColor" strokeWidth="1.5" />
                    </g>
                    {/* Static Center Dot */}
                    <circle cx="12" cy="12" r="1.5" fill="currentColor" />
                    {/* Inner Crosshair - Subtle Pulse */}
                    <g className="origin-center opacity-50">
                         <path d="M12 7V9M12 15V17M7 12H9M15 12H17" stroke="currentColor" strokeWidth="1" />
                    </g>
                </svg>
            </div>
        )}
      </div>
    </div>
  );
};

export default CustomCursor;
