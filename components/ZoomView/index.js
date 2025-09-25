import React, { useEffect, useRef, useState } from "react";

const ZoomView = ({ 
  windowId, 
  project, 
  isOpen, 
  isMinimized: propIsMinimized, 
  isFullscreen: propIsFullscreen, 
  cardRect, 
  windowSize: propWindowSize, 
  windowPosition: propWindowPosition, 
  zIndex, 
  minimizedIndex,
  onClose, 
  onUpdate, 
  onBringToFront 
}) => {
  const containerRef = useRef(null);
  const iframeRef = useRef(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isMinimized, setIsMinimized] = useState(propIsMinimized || false);
  const [isFullscreen, setIsFullscreen] = useState(propIsFullscreen || false);
  const [isResizing, setIsResizing] = useState(false);
  const [resizeHandle, setResizeHandle] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [windowSize, setWindowSize] = useState(propWindowSize || { width: 1200, height: 800 });
  const [windowPosition, setWindowPosition] = useState(propWindowPosition || { x: 0, y: 0 });
  const hasInitializedRef = useRef(false);
  
  const getOverlayCursor = () => {
    switch (resizeHandle) {
      case 'top-left':
        return 'nw-resize';
      case 'top-right':
        return 'ne-resize';
      case 'bottom-left':
        return 'sw-resize';
      case 'bottom-right':
        return 'se-resize';
      case 'left':
        return 'w-resize';
      case 'right':
        return 'e-resize';
      case 'top':
        return 'n-resize';
      case 'bottom':
        return 's-resize';
      default:
        return 'default';
    }
  };

  const handleMinimize = () => {
    const newMinimized = true;
    setIsMinimized(newMinimized);
    onUpdate?.({ isMinimized: newMinimized });
  };

  const handleMaximize = () => {
    const newMinimized = false;
    setIsMinimized(newMinimized);
    onUpdate?.({ isMinimized: newMinimized });
  };

  const handleFullscreen = () => {
    const newFullscreen = !isFullscreen;
    setIsFullscreen(newFullscreen);
    onUpdate?.({ isFullscreen: newFullscreen });
  };

  const handleHeaderMouseDown = (e) => {
    // Don't drag if clicking on window controls
    if (e.target.closest('button')) return;
    
    if (isFullscreen) return;
    
    // Only handle left mouse button clicks
    if (e.button !== 0) return;
    
    e.preventDefault();
    e.stopPropagation();
    
    // Bring window to front when clicked
    onBringToFront?.();
    
    setIsDragging(true);
    
    // Prevent text selection during drag
    document.body.style.userSelect = 'none';
    document.body.style.webkitUserSelect = 'none';
    document.body.style.mozUserSelect = 'none';
    document.body.style.msUserSelect = 'none';
    
    const startX = e.clientX;
    const startY = e.clientY;
    const startPosX = windowPosition.x;
    const startPosY = windowPosition.y;
    
    let isMoving = false;

    const handleMouseMove = (e) => {
      e.preventDefault();
      e.stopPropagation();
      
      // Only start moving after a small movement threshold
      const deltaX = e.clientX - startX;
      const deltaY = e.clientY - startY;
      const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
      
      if (!isMoving && distance < 3) {
        return; // Don't start moving until we've moved at least 3 pixels
      }
      
      isMoving = true;
      
      const newX = startPosX + deltaX;
      const newY = startPosY + deltaY;
      
      // Keep window within viewport bounds
      const maxX = window.innerWidth - windowSize.width;
      const maxY = window.innerHeight - windowSize.height;
      
      const clampedX = Math.max(0, Math.min(newX, maxX));
      const clampedY = Math.max(0, Math.min(newY, maxY));
      
      const newPosition = { x: clampedX, y: clampedY };
      setWindowPosition(newPosition);
      onUpdate?.({ windowPosition: newPosition });
    };

    const handleMouseUp = (e) => {
      e?.preventDefault();
      e?.stopPropagation();
      
      setIsDragging(false);
      
      // Restore text selection
      document.body.style.userSelect = '';
      document.body.style.webkitUserSelect = '';
      document.body.style.mozUserSelect = '';
      document.body.style.msUserSelect = '';
      
      // Clean up all event listeners
      document.removeEventListener('mousemove', handleMouseMove, true);
      document.removeEventListener('mouseup', handleMouseUp, true);
      window.removeEventListener('mouseup', handleMouseUp, true);
      window.removeEventListener('blur', handleMouseUp);
    };

    // Add event listeners with capture to ensure we get the events
    document.addEventListener('mousemove', handleMouseMove, { passive: false, capture: true });
    document.addEventListener('mouseup', handleMouseUp, { passive: false, capture: true });
    window.addEventListener('mouseup', handleMouseUp, { passive: false, capture: true });
    window.addEventListener('blur', handleMouseUp);
  };

  const handleMouseDown = (handle) => (e) => {
    if (isFullscreen) return;
    
    // Only handle left mouse button clicks
    if (e.button !== 0) return;
    
    e.preventDefault();
    e.stopPropagation();
    
    setIsResizing(true);
    setResizeHandle(handle);
    
    // Prevent text selection during drag
    document.body.style.userSelect = 'none';
    document.body.style.webkitUserSelect = 'none';
    document.body.style.mozUserSelect = 'none';
    document.body.style.msUserSelect = 'none';
    
    const startX = e.clientX;
    const startY = e.clientY;
    const startWidth = windowSize.width;
    const startHeight = windowSize.height;
    const startPosX = windowPosition.x;
    const startPosY = windowPosition.y;
    
    let isDragging = false;

    const handleMouseMove = (e) => {
      e.preventDefault();
      e.stopPropagation();
      
      // Only start resizing after a small movement threshold to prevent accidental resizing
      const deltaX = e.clientX - startX;
      const deltaY = e.clientY - startY;
      const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
      
      if (!isDragging && distance < 3) {
        return; // Don't start resizing until we've moved at least 3 pixels
      }
      
      isDragging = true;
      
      let newWidth = startWidth;
      let newHeight = startHeight;
      let newX = startPosX;
      let newY = startPosY;

      if (handle.includes('right')) newWidth = Math.max(400, startWidth + deltaX);
      if (handle.includes('left')) {
        newWidth = Math.max(400, startWidth - deltaX);
        newX = startPosX + (startWidth - newWidth);
      }
      if (handle.includes('bottom')) newHeight = Math.max(300, startHeight + deltaY);
      if (handle.includes('top')) {
        newHeight = Math.max(300, startHeight - deltaY);
        newY = startPosY + (startHeight - newHeight);
      }

      const newSize = { width: newWidth, height: newHeight };
      const newPosition = { x: newX, y: newY };
      
      setWindowSize(newSize);
      setWindowPosition(newPosition);
      onUpdate?.({ windowSize: newSize, windowPosition: newPosition });
    };

    const handleMouseUp = (e) => {
      e?.preventDefault();
      e?.stopPropagation();
      
      setIsResizing(false);
      setResizeHandle(null);
      
      // Restore text selection
      document.body.style.userSelect = '';
      document.body.style.webkitUserSelect = '';
      document.body.style.mozUserSelect = '';
      document.body.style.msUserSelect = '';
      
      // Re-enable iframe interactions
      if (iframeRef.current) {
        iframeRef.current.style.pointerEvents = 'auto';
      }
      
      // Clean up all event listeners
      document.removeEventListener('mousemove', handleMouseMove, true);
      document.removeEventListener('mouseup', handleMouseUp, true);
      window.removeEventListener('mouseup', handleMouseUp, true);
      window.removeEventListener('blur', handleMouseUp);
    };

    // During resize, ensure iframe doesn't eat events
    if (iframeRef.current) {
      iframeRef.current.style.pointerEvents = 'none';
    }

    // Add event listeners with capture to ensure we get the events
    document.addEventListener('mousemove', handleMouseMove, { passive: false, capture: true });
    document.addEventListener('mouseup', handleMouseUp, { passive: false, capture: true });
    window.addEventListener('mouseup', handleMouseUp, { passive: false, capture: true });
    window.addEventListener('blur', handleMouseUp);
  };

  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "Escape") onClose?.();
    };
    if (isOpen && !isMinimized) {
      document.addEventListener("keydown", handleKey);
      // Only lock background scroll in fullscreen mode
      if (isFullscreen) {
        document.body.style.overflow = "hidden";
      } else {
        document.body.style.overflow = "";
      }
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [isOpen, isMinimized, isFullscreen, onClose]);

  useEffect(() => {
    if (!containerRef.current || !cardRect) return;

    const container = containerRef.current;

    if (isOpen && !isMinimized) {
      // First-time open: animate from card to target
      if (!hasInitializedRef.current) {
        container.style.left = `${cardRect.left}px`;
        container.style.top = `${cardRect.top}px`;
        container.style.width = `${cardRect.width}px`;
        container.style.height = `${cardRect.height}px`;
        container.style.transform = "scale(1)";
        container.style.borderRadius = "0.5rem";

        // Force reflow
        // eslint-disable-next-line no-unused-expressions
        container.offsetHeight;

        requestAnimationFrame(() => {
          container.style.transition = "all 0.8s cubic-bezier(0.22, 1, 0.36, 1)";
          if (isFullscreen) {
            container.style.left = "0px";
            container.style.top = "0px";
            container.style.width = "100vw";
            container.style.height = "100vh";
            container.style.borderRadius = "0px";
          } else {
            const windowWidth = windowSize.width;
            const windowHeight = windowSize.height;
            const posX = windowPosition.x || (window.innerWidth - windowWidth) / 2;
            const posY = windowPosition.y || (window.innerHeight - windowHeight) / 2;

            container.style.left = `${posX}px`;
            container.style.top = `${posY}px`;
            container.style.width = `${windowWidth}px`;
            container.style.height = `${windowHeight}px`;
            container.style.borderRadius = "12px";

            if (!windowPosition.x && !windowPosition.y) {
              setWindowPosition({ x: posX, y: posY });
            }
          }
          hasInitializedRef.current = true;
        });
        return;
      }

      // Subsequent updates (resize/fullscreen toggle/dragging): apply immediately
      container.style.transition = (isResizing || isDragging) ? "none" : "all 0.15s ease-out";
      if (isFullscreen) {
        container.style.left = "0px";
        container.style.top = "0px";
        container.style.width = "100vw";
        container.style.height = "100vh";
        container.style.borderRadius = "0px";
      } else {
        container.style.left = `${windowPosition.x}px`;
        container.style.top = `${windowPosition.y}px`;
        container.style.width = `${windowSize.width}px`;
        container.style.height = `${windowSize.height}px`;
        container.style.borderRadius = "12px";
      }
      // Re-enable iframe interactions when not resizing
      if (iframeRef.current && !isResizing) {
        iframeRef.current.style.pointerEvents = 'auto';
      }
    } else if (!isOpen) {
      // Closing: animate back to card and reset init flag
      if (cardRect) {
        container.style.transition = "all 0.6s cubic-bezier(0.22, 1, 0.36, 1)";
        container.style.left = `${cardRect.left}px`;
        container.style.top = `${cardRect.top}px`;
        container.style.width = `${cardRect.width}px`;
        container.style.height = `${cardRect.height}px`;
        container.style.borderRadius = "0.5rem";
        container.style.transform = "scale(0.95)";
        container.style.opacity = "0";
      }
      hasInitializedRef.current = false;
    }
  }, [isOpen, isMinimized, isFullscreen, cardRect, windowSize, windowPosition, isResizing, isDragging]);

  if (!isOpen && !cardRect) return null;

  return (
    <>
      {/* Main window */}
      <div
        ref={containerRef}
        className={`fixed bg-white dark:bg-gray-900 shadow-2xl overflow-hidden ${
          (isResizing || isDragging) ? 'select-none' : ''
        }`}
        style={{
          zIndex: zIndex || 100,
          opacity: isOpen && !isMinimized ? 1 : 0,
          pointerEvents: isOpen && !isMinimized ? "auto" : "none",
          userSelect: (isResizing || isDragging) ? 'none' : 'auto',
        }}
      >
        {/* Resize overlay - shows during resizing to prevent iframe interference */}
        {isResizing && (
          <div 
            className="absolute inset-0 z-[20] bg-transparent"
            style={{ 
              cursor: getOverlayCursor(),
              pointerEvents: 'auto'
            }}
          />
        )}
        {/* Header bar with macOS controls */}
        <div 
          className={`absolute top-0 left-0 right-0 h-12 bg-black/5 dark:bg-white/5 backdrop-blur-sm border-b border-black/10 dark:border-white/10 flex items-center justify-between px-4 z-10 ${
            !isFullscreen ? 'cursor-move' : ''
          } ${isDragging ? 'bg-black/10 dark:bg-white/10' : ''}`}
          onMouseDown={handleHeaderMouseDown}
          style={{ 
            userSelect: isDragging ? 'none' : 'auto',
            touchAction: 'none'
          }}
        >
          <div className="flex items-center space-x-2">
            <button
              onClick={onClose}
              className="w-3 h-3 rounded-full bg-red-400 hover:bg-red-500 transition-colors flex items-center justify-center group"
              title="Close"
            >
              <span className="opacity-0 group-hover:opacity-100 text-red-900 text-xs leading-none">×</span>
            </button>
            <button
              onClick={handleMinimize}
              className="w-3 h-3 rounded-full bg-yellow-400 hover:bg-yellow-500 transition-colors flex items-center justify-center group"
              title="Minimize"
            >
              <span className="opacity-0 group-hover:opacity-100 text-yellow-900 text-xs leading-none">−</span>
            </button>
            <button
              onClick={handleFullscreen}
              className="w-3 h-3 rounded-full bg-green-400 hover:bg-green-500 transition-colors flex items-center justify-center group"
              title={isFullscreen ? "Exit Fullscreen" : "Fullscreen"}
            >
              <span className="opacity-0 group-hover:opacity-100 text-green-900 text-xs leading-none">
                ⤢
              </span>
            </button>
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-300 truncate max-w-[60%]">
            {project?.title}
          </div>
          <div className="w-16" /> {/* Spacer for centering */}
        </div>

      {/* Loading overlay */}
      {!isLoaded && (
        <div className="absolute inset-0 bg-white dark:bg-gray-900 flex items-center justify-center">
          <div className="flex flex-col items-center space-y-4">
            <div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
            <p className="text-gray-600 dark:text-gray-300">Loading {project?.title}...</p>
          </div>
        </div>
      )}

        {/* Iframe */}
        <iframe
          ref={iframeRef}
          src={isOpen ? project?.url : "about:blank"}
          title={project?.title}
          className="absolute top-12 left-0 w-full h-[calc(100%-3rem)] border-0 pointer-events-auto"
          onLoad={() => setIsLoaded(true)}
          style={{ background: "white", zIndex: 0 }}
        />

        {/* Resize handles - only show in windowed mode */}
        {!isFullscreen && (
          <>
            {/* Corner handles - made larger for easier clicking */}
            <div
              className="absolute top-0 left-0 w-4 h-4 cursor-nw-resize select-none hover:bg-blue-500/20 transition-colors"
              onMouseDown={handleMouseDown('top-left')}
              style={{ touchAction: 'none', zIndex: 10 }}
              title="Resize from top-left corner"
            />
            <div
              className="absolute top-0 right-0 w-4 h-4 cursor-ne-resize select-none hover:bg-blue-500/20 transition-colors"
              onMouseDown={handleMouseDown('top-right')}
              style={{ touchAction: 'none', zIndex: 10 }}
              title="Resize from top-right corner"
            />
            <div
              className="absolute bottom-0 left-0 w-4 h-4 cursor-sw-resize select-none hover:bg-blue-500/20 transition-colors"
              onMouseDown={handleMouseDown('bottom-left')}
              style={{ touchAction: 'none', zIndex: 10 }}
              title="Resize from bottom-left corner"
            />
            <div
              className="absolute bottom-0 right-0 w-4 h-4 cursor-se-resize select-none hover:bg-blue-500/20 transition-colors"
              onMouseDown={handleMouseDown('bottom-right')}
              style={{ touchAction: 'none', zIndex: 10 }}
              title="Resize from bottom-right corner"
            />
            
            {/* Edge handles - made larger for easier clicking */}
            <div
              className="absolute top-0 left-4 right-4 h-3 cursor-n-resize select-none hover:bg-blue-500/20 transition-colors"
              onMouseDown={handleMouseDown('top')}
              style={{ touchAction: 'none', zIndex: 10 }}
              title="Resize from top edge"
            />
            <div
              className="absolute bottom-0 left-4 right-4 h-3 cursor-s-resize select-none hover:bg-blue-500/20 transition-colors"
              onMouseDown={handleMouseDown('bottom')}
              style={{ touchAction: 'none', zIndex: 10 }}
              title="Resize from bottom edge"
            />
            <div
              className="absolute left-0 top-4 bottom-4 w-3 cursor-w-resize select-none hover:bg-blue-500/20 transition-colors"
              onMouseDown={handleMouseDown('left')}
              style={{ touchAction: 'none', zIndex: 10 }}
              title="Resize from left edge"
            />
            <div
              className="absolute right-0 top-4 bottom-4 w-3 cursor-e-resize select-none hover:bg-blue-500/20 transition-colors"
              onMouseDown={handleMouseDown('right')}
              style={{ touchAction: 'none', zIndex: 10 }}
              title="Resize from right edge"
            />
          </>
        )}
      </div>

      {/* Minimized tab in bottom-right */}
      {isMinimized && isOpen && (
        <div 
          className="fixed bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden cursor-pointer hover:shadow-xl transition-shadow"
          style={{ 
            zIndex: (zIndex || 100) + 1,
            bottom: `${16 + (minimizedIndex || 0) * 60}px`, // 16px from bottom + 60px per minimized window
            right: '16px'
          }}
          onClick={() => {
            onBringToFront?.();
            handleMaximize();
          }}
        >
          <div className="flex items-center p-2 space-x-3 min-w-[180px]">
            <div className="flex-shrink-0">
              <img
                src={project?.imageSrc}
                alt={project?.title}
                className="w-6 h-6 rounded object-cover"
              />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                {project?.title}
              </p>
            </div>
            <button
              onClick={handleMaximize}
              className="flex-shrink-0 p-1 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              title="Restore"
            >
              <svg className="w-4 h-4 text-gray-600 dark:text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
              </svg>
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default ZoomView;
