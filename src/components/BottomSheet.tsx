import React, { useEffect, useState, useRef } from 'react';
import { createPortal } from 'react-dom';
import { useSpring, animated, config } from '@react-spring/web';
import { useDrag } from '@use-gesture/react';
import { X } from 'lucide-react';

interface BottomSheetProps {
  children: React.ReactNode;
  isOpen: boolean;
  onClose: () => void;
  title: React.ReactNode;
  initialSnap?: number; // 0 to 1, where 1 is bottom (closed) and 0 is top (fully open)
  modal?: boolean; // If true, acts as a modal (backdrop, closes on swipe down). If false, persistent (no backdrop, minimizes on swipe down).
  peekHeight?: number; // Height in pixels to peek when minimized (only used if modal=false)
}

export function BottomSheet({ 
  children, 
  isOpen, 
  onClose, 
  title, 
  initialSnap = 0.5,
  modal = true,
  peekHeight = 80
}: BottomSheetProps) {
  const sheetRef = useRef<HTMLDivElement>(null);
  
  // Window height needed for snap calculations
  const [windowHeight, setWindowHeight] = useState(() => typeof window !== 'undefined' ? window.innerHeight : 800);

  useEffect(() => {
    const handleResize = () => setWindowHeight(window.innerHeight);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Constants
  const SNAP_TOP = 0;
  const SNAP_INITIAL = windowHeight * initialSnap;
  const SNAP_PEEK = windowHeight - peekHeight;
  // If modal=true, 'closed' for gesture is windowHeight.
  // If modal=false, 'closed' for gesture is SNAP_PEEK.
  // But if isOpen=false, it must always go to windowHeight.
  const SNAP_CLOSED_OFFSCREEN = windowHeight;

  // Spring setup
  const [{ y }, api] = useSpring(() => ({
    y: SNAP_CLOSED_OFFSCREEN,
    config: { tension: 280, friction: 30, clamp: true }
  }));

  const [backdropStyle, backdropApi] = useSpring(() => ({ opacity: 0 }));

  // Open/Close effects
  useEffect(() => {
    if (isOpen) {
      api.start({ y: SNAP_INITIAL });
      if (modal) {
        backdropApi.start({ opacity: 1 });
      }
    } else {
      if (modal) {
        backdropApi.start({ opacity: 0 });
      }
      api.start({ y: SNAP_CLOSED_OFFSCREEN });
    }
  }, [isOpen, SNAP_INITIAL, SNAP_CLOSED_OFFSCREEN, api, backdropApi, modal]);

  // Helper to find scroll parent
  const getScrollParent = (node: HTMLElement | null): HTMLElement | null => {
    if (!node || node === sheetRef.current) return null;
    
    const style = window.getComputedStyle(node);
    const overflowY = style.overflowY;
    const isScrollable = overflowY.includes('auto') || overflowY.includes('scroll');
    
    if (isScrollable && node.scrollHeight > node.clientHeight) {
      return node;
    }
    return getScrollParent(node.parentElement);
  };

  // Drag Gesture
  const bind = useDrag(
    ({ active, movement: [, my], velocity: [, vy], direction: [, dy], last, cancel, event, memo }) => {
      // Current position (memoized or from spring)
      const currentY = memo ?? y.get();

      // --- SCROLL vs DRAG LOGIC ---
      if (active) {
          const target = event.target as HTMLElement;
          const scrollContainer = getScrollParent(target);

          if (scrollContainer) {
            const isAtTop = scrollContainer.scrollTop <= 0;
            
            if (!isAtTop) {
                // Content is scrolled down -> Let native scroll handle it
                cancel();
                return currentY;
            }

            if (dy < 0) {
                // Dragging UP at top -> We want to scroll content down (unless sheet is not full)
                const isFullyOpen = currentY < 10; // Tolerance
                if (isFullyOpen) {
                    cancel();
                    return currentY;
                }
            }
          }
      }

      // --- DRAG CALCULATION ---
      const newY = currentY + my;

      // Rubberbanding if pulling past top
      if (newY < 0) {
         api.start({ y: newY * 0.4, immediate: true });
         return currentY;
      }

      if (last) {
        const predictedY = newY + vy * 200;
        
        // Define Snap Points based on mode
        // Modal: TOP, INITIAL, CLOSED(Offscreen)
        // Persistent: TOP, INITIAL, PEEK(Minimized)
        
        const bottomSnap = modal ? SNAP_CLOSED_OFFSCREEN : SNAP_PEEK;

        // Calculate distances to snap points
        const distTop = Math.abs(predictedY - SNAP_TOP);
        const distInitial = Math.abs(predictedY - SNAP_INITIAL);
        const distBottom = Math.abs(predictedY - bottomSnap);
        
        let targetSnap = SNAP_INITIAL;
        
        // Simple proximity check
        if (distTop < distInitial && distTop < distBottom) targetSnap = SNAP_TOP;
        else if (distBottom < distInitial) targetSnap = bottomSnap;
        
        // Velocity overrides
        if (vy > 0.5 && dy > 0) targetSnap = bottomSnap; // Flick down
        if (vy > 0.5 && dy < 0) targetSnap = SNAP_TOP;    // Flick up

        api.start({
          y: targetSnap,
          immediate: false,
          config: config.stiff,
          onRest: () => {
            // Only trigger close if we hit the offscreen target
            if (targetSnap === SNAP_CLOSED_OFFSCREEN && modal) {
                onClose();
            }
            // In persistent mode, hitting SNAP_PEEK does NOT trigger onClose.
          }
        });

      } else {
        api.start({ y: newY, immediate: true });
      }

      return currentY;
    },
    {
      from: () => [0, y.get()],
      filterTaps: true,
      bounds: { top: -50 },
      rubberband: true
    }
  );

  if (typeof document === 'undefined') return null;

  return createPortal(
    <div 
      className={`fixed inset-0 z-[100] flex flex-col justify-end isolate pointer-events-none ${isOpen ? 'flex' : 'hidden'}`}
    >
      {/* Backdrop - Only render if modal */}
      {modal && (
        <animated.div 
          className="absolute inset-0 bg-black/40 backdrop-blur-sm pointer-events-auto"
          style={backdropStyle}
          onClick={onClose}
        />
      )}

      {/* Sheet */}
      <animated.div
        ref={sheetRef}
        {...bind()}
        className="relative w-full bg-white dark:bg-gray-900 rounded-t-[2rem] shadow-2xl flex flex-col overflow-hidden pointer-events-auto touch-none"
        style={{
          height: windowHeight,
          y,
        }}
      >
        {/* Handle */}
        <div className="flex-none flex flex-col items-center pt-3 pb-2 cursor-grab active:cursor-grabbing z-10 bg-white dark:bg-gray-900 border-b border-gray-100 dark:border-gray-800 touch-none">
          <div className="w-12 h-1.5 bg-gray-300 dark:bg-gray-600 rounded-full mb-3" />
          
          <div className="w-full px-6 flex justify-between items-center min-h-[40px]">
            <h2 className="text-lg font-bold text-gray-900 dark:text-gray-100 truncate flex-1 pr-4">
              {title}
            </h2>
            <button 
              onClick={onClose} // X always closes
              className="p-2 -mr-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Content Wrapper */}
        <div 
          className="flex-1 flex flex-col relative overflow-hidden bg-white dark:bg-gray-900 touch-pan-y" 
        >
          {children}
        </div>
      </animated.div>
    </div>,
    document.body
  );
}