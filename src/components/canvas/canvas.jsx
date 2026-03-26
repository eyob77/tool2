import React, { useState, useEffect, useRef } from 'react';

const Canvas = () => {
  const [elements, setElements] = useState([]);
  const [dropIndex, setDropIndex] = useState(null);
  const containerRef = useRef(null);

  // 🧠 Calculate drop position based on mouse Y
  const calculateDropIndex = (y) => {
    const children = Array.from(containerRef.current.children);

    for (let i = 0; i < children.length; i++) {
      const rect = children[i].getBoundingClientRect();
      const middle = rect.top + rect.height / 2;

      if (y < middle) return i;
    }

    return children.length;
  };

  useEffect(() => {
    const handleMessage = (e) => {
      // 🔒 Basic security check
      if (!e.data || !e.data.type) return;

      const { type, payload } = e.data;

      if (type === 'DRAGGING') {
        const index = calculateDropIndex(payload.y);
        setDropIndex(index);
      }

      if (type === 'DROP') {
        setElements((prev) => {
          const updated = [...prev];
          updated.splice(dropIndex, 0, {
            id: crypto.randomUUID(),
            type: payload.type,
          });
          return updated;
        });

        setDropIndex(null);
      }
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, [dropIndex]);

  return (
    <div ref={containerRef} className="p-8 min-h-screen bg-white">
      {elements.map((el, i) => (
        <React.Fragment key={el.id}>
          {dropIndex === i && (
            <div className="h-0.5 bg-blue-500 rounded my-2 animate-pulse" />
          )}

          <div className="p-4 mb-2 border border-gray-200 rounded bg-gray-50">
            {el.type === 'heading' ? (
              <h1 className="text-2xl font-bold">Heading</h1>
            ) : (
              <button className="bg-black text-white px-4 py-2">
                Butt
              </button>
            )}
          </div>
        </React.Fragment>
      ))}

      {dropIndex === elements.length && (
        <div className="h-0.5 bg-blue-500 rounded my-2" />
      )}
    </div>
  );
};

export default Canvas;