import React, { createContext, useContext, useState, useRef, useCallback } from 'react';

const BuilderContext = createContext();

export const BuilderProvider = ({ children }) => {
  const iframeRef = useRef(null);
  
  // 1. The "Mirror" state that syncs with the Iframe's tree
  const [treeMirror, setTreeMirror] = useState(null);
  
  // 2. The ID of the element the user clicked on
  const [selectedId, setSelectedId] = useState(null);
  
  // 3. UI States for the Drag Shield
  const [isDragging, setIsDragging] = useState(false);

  // Helper to send messages to the Iframe
  const sendMessage = useCallback((data) => {
    if (iframeRef.current && iframeRef.current.contentWindow) {
      iframeRef.current.contentWindow.postMessage(data, '*');
    }
  }, []);

  return (
    <BuilderContext.Provider value={{
      iframeRef,
      treeMirror,
      setTreeMirror,
      selectedId,
      setSelectedId,
      isDragging,
      setIsDragging,
      sendMessage
    }}>
      {children}
    </BuilderContext.Provider>
  );
};

export const useBuilder = () => useContext(BuilderContext);