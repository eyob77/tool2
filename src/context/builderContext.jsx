import { createContext, useContext, useRef, useState } from 'react';

const BuilderContext = createContext();

export const BuilderProvider = ({ children }) => {
  const iframeRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);

  const sendMessage = (message) => {
    if (iframeRef.current) {
      // Use window.location.origin for security
      iframeRef.current.contentWindow.postMessage(message, window.location.origin);
    }
  };

  return (
    <BuilderContext.Provider value={{ iframeRef, isDragging, setIsDragging, sendMessage }}>
      {children}
    </BuilderContext.Provider>
  );
};

export const useBuilder = () => useContext(BuilderContext);