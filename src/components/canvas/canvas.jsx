import React, { useState, useEffect } from 'react';

const ElementRenderer = ({ element, dropTarget, selectedId }) => {
  const isContainer = element.type === 'section' || element.type === 'root';
  const isTarget = dropTarget?.id === element.id;
  const isSelected = selectedId === element.id;

  const inlineStyles = {
    ...element.styles,
    minHeight: isContainer && !element.styles?.height ? '80px' : element.styles?.height,
  };

  const handleSelect = (e) => {
    e.stopPropagation();
    // Notify the Parent (BuilderContext) that this ID is now active
    window.parent.postMessage({ type: 'SELECT_ELEMENT', payload: { id: element.id } }, '*');
  };

  const handleInternalDragStart = (e) => {
    e.stopPropagation();
    window.parent.postMessage({
      type: 'INTERNAL_DRAG_START',
      payload: { id: element.id, type: element.type }
    }, '*');
  };

  return (
    <div className="relative group">
      {/* Visual Sibling Indicators */}
      {isTarget && dropTarget.position === 'before' && (
        <div className="absolute -top-1 left-0 w-full h-0.5 bg-blue-500 z-50 rounded shadow-[0_0_8px_rgba(59,130,246,0.5)]" />
      )}

      <div
        data-id={element.id}
        data-is-container={isContainer}
        draggable={element.type !== 'root'}
        onDragStart={handleInternalDragStart}
        onClick={handleSelect}
        style={inlineStyles}
        className={`
          relative p-4 transition-all duration-200 cursor-grab active:cursor-grabbing
          ${isContainer ? 'border-2 border-dashed' : 'border'}
          ${isSelected ? 'ring-1 ring-blue-600 border-transparent z-20' : 'border-gray-200 hover:border-blue-300'}
          ${isTarget && dropTarget.position === 'inside' ? 'bg-blue-100/30' : ''}
        `}
      >
        {/* Component Label - Visible on hover or when selected */}
        <div className={`absolute -top-4 left-2 bg-blue-600 text-white text-[10px] rounded-t-sm px-1  capitalize z-30 pointer-events-none transition-opacity ${isSelected ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}>
          {element.type}
        </div>

        {/* Content Renderers */}
        {element.type === 'heading' && <h1 className=" font-bold pointer-events-none">{element.content || 'Heading'}</h1>}
        {element.type === 'button' && <button className="px-4 py-2 bg-gray-900 text-white rounded pointer-events-none">{element.content || 'Button'}</button>}

        {/* Recursive Children Render */}
        {isContainer && (
          <div className="mt-2 flex flex-col gap-1 min-h-10">
             {/* Note: We removed pointer-events-none from the wrapper to ensure clicks hit children reliably */}
            {element.children?.map((child) => (
               <ElementRenderer key={child.id} element={child} dropTarget={dropTarget} selectedId={selectedId} />
            ))}
          </div>
        )}
      </div>

      {isTarget && dropTarget.position === 'after' && (
        <div className="absolute -bottom-1 left-0 w-full h-0.5 bg-blue-500 z-50 rounded shadow-[0_0_8px_rgba(59,130,246,0.5)]" />
      )}
    </div>
  );
};

const Canvas = () => {
  const [tree, setTree] = useState({ id: 'root-canvas', type: 'root', children: [], styles: {} });
  const [dropTarget, setDropTarget] = useState(null);
  const [movingId, setMovingId] = useState(null);
  const [selectedId, setSelectedId] = useState(null);

  // Sync tree with Parent whenever it changes
  useEffect(() => {
    window.parent.postMessage({ type: 'TREE_UPDATE', payload: tree }, '*');
  }, [tree]);

  // --- TREE HELPERS ---
  const insertIntoTree = (node, targetId, element, position) => {
    if (position === 'inside' && node.id === targetId) {
      return { ...node, children: [...(node.children || []), element] };
    }
    if (node.children) {
      const index = node.children.findIndex(c => c.id === targetId);
      if (index !== -1 && position !== 'inside') {
        const newChildren = [...node.children];
        const insertIndex = position === 'before' ? index : index + 1;
        newChildren.splice(insertIndex, 0, element);
        return { ...node, children: newChildren };
      }
      return { ...node, children: node.children.map(c => insertIntoTree(c, targetId, element, position)) };
    }
    return node;
  };

  useEffect(() => {
    const handleMessage = (e) => {
      if (!e.data || !e.data.type) return;
      const { type, payload } = e.data;

      // 1. SELECT_ELEMENT: This happens when the Navigator in the sidebar is clicked
      if (type === 'SELECT_ELEMENT') {
        setSelectedId(payload.id);
      }

      // 2. UPDATE_ELEMENT: This happens when the Style Panel sliders change
      if (type === 'UPDATE_ELEMENT') {
        setTree(prevTree => {
          const updateRecursive = (node) => {
            if (node.id === payload.id) {
              const { styles, ...otherData } = payload;
              return { 
                ...node, 
                ...otherData, 
                styles: { ...node.styles, ...styles } 
              };
            }
            if (node.children) {
              return { ...node, children: node.children.map(updateRecursive) };
            }
            return node;
          };
          return updateRecursive(prevTree);
        });
      }

      // 3. DRAGGING / DROP Logic
      if (type === 'DRAGGING') {
        const hoveredEl = document.elementFromPoint(payload.x, payload.y);
        const item = hoveredEl?.closest('[data-id]');
        if (item) {
          const id = item.getAttribute('data-id');
          if (id === movingId) return;
          const isContainer = item.getAttribute('data-is-container') === 'true';
          const rect = item.getBoundingClientRect();
          const relativeY = payload.y - rect.top;
          const threshold = rect.height * 0.25;

          if (id === 'root-canvas') setDropTarget({ id, position: 'inside' });
          else if (relativeY < threshold) setDropTarget({ id, position: 'before' });
          else if (relativeY > rect.height - threshold) setDropTarget({ id, position: 'after' });
          else if (isContainer) setDropTarget({ id, position: 'inside' });
          else setDropTarget({ id, position: relativeY < rect.height / 2 ? 'before' : 'after' });
        }
      }

      if (type === 'SET_MOVING_ID') setMovingId(payload.id);

      if (type === 'DROP') {
        if (dropTarget) {
          setTree(prevTree => {
            let elementToInsert;
            let currentTree = { ...prevTree };

            if (movingId) {
              const findNode = (n, id) => {
                if (n.id === id) return n;
                for (let c of (n.children || [])) {
                  const f = findNode(c, id);
                  if (f) return f;
                }
              };
              elementToInsert = { ...findNode(prevTree, movingId) };
              const removeAnywhere = (n, id) => ({
                ...n,
                children: n.children?.filter(c => c.id !== id).map(c => removeAnywhere(c, id))
              });
              currentTree = removeAnywhere(currentTree, movingId);
            } else {
              elementToInsert = {
                id: crypto.randomUUID(),
                type: payload.type,
                styles: { padding: '20px', display: 'flex', flexDirection: 'column', backgroundColor: '#ffffff' },
                children: payload.type === 'section' ? [] : undefined
              };
            }
            return insertIntoTree(currentTree, dropTarget.id, elementToInsert, dropTarget.position);
          });
        }
        setDropTarget(null);
        setMovingId(null);
      }
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, [dropTarget, movingId]);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center">
      <div className="w-full bg-white min-h-screen shadow-sm">
        {/* Pass selectedId down so the renderer can show the blue ring */}
        <ElementRenderer element={tree} dropTarget={dropTarget} selectedId={selectedId} />
      </div>
    </div>
  );
};

export default Canvas;