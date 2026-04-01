import { useEffect, useRef, useMemo } from 'react';
import { useBuilder } from '../../context/builderContext';

const CanvasFrame = () => {
  const { iframeRef, isDragging, setIsDragging, sendMessage } = useBuilder();

  // 1. Listen for messages FROM the iframe
  useEffect(() => {
    const handleInternalMessages = (e) => {
      // Security check: only listen to messages from your own site
      if (e.origin !== window.location.origin) return;

      if (e.data.type === 'INTERNAL_DRAG_START') {
        setIsDragging(true); 
        sendMessage({
          type: 'SET_MOVING_ID',
          payload: { id: e.data.payload.id }
        });
      }
    };

    window.addEventListener('message', handleInternalMessages);
    return () => window.removeEventListener('message', handleInternalMessages);
  }, [setIsDragging, sendMessage]);

  // 2. Throttle logic to keep the UI smooth (60fps)
  const throttledSendMessage = useMemo(() => {
    let lastCall = 0;
    return (payload) => {
      const now = new Date().getTime();
      if (now - lastCall < 16) return; // ~60fps
      lastCall = now;
      sendMessage(payload);
    };
  }, [sendMessage]);

  const handleDragOver = (e) => {
    e.preventDefault();
    if (!iframeRef.current) return;

    const rect = iframeRef.current.getBoundingClientRect();
    
    // We send coordinates relative to the iframe's top-left corner
    const relativeX = e.clientX - rect.left;
    const relativeY = e.clientY - rect.top;

    throttledSendMessage({
      type: 'DRAGGING',
      payload: { x: relativeX, y: relativeY },
    });
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const type = e.dataTransfer.getData("compType"); 
    setIsDragging(false);

    // Final message to the canvas to commit the drop
    sendMessage({
      type: 'DROP',
      payload: { type },
    });
  };

  return (
    <div className="w-[77%] h-full bg-white absolute left-[13%] top-0 shadow-inner overflow-hidden">
      <div className="flex h-screen w-full bg-gray-100">
        <div className="flex-1 p-10 relative flex flex-col items-center">
          
          {/* THE SHIELD 🛡️ */}
          {isDragging && (
            <div
              className="absolute inset-0 z-50 cursor-move bg-transparent"
              onDragOver={handleDragOver}
              onDrop={handleDrop}
            />
          )}

          <iframe
            ref={iframeRef}
            src="/canvas"
            className={`w-full h-full border-2 shadow-2xl rounded-lg bg-white transition-all duration-300 ${
              isDragging ? 'border-blue-400 scale-[0.99]' : 'border-gray-200'
            }`}
            title="preview"
          />
        </div>
      </div>
    </div>
  );
};

export default CanvasFrame;