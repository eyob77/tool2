import React, { useState, useEffect } from 'react';

const ElementRenderer = ({ element, dropTarget }) => {
  const isContainer = element.type === 'section' || element.type === 'root';
  const isTarget = dropTarget?.id === element.id;

  const handleInternalDragStart = (e) => {
    e.stopPropagation();
    window.parent.postMessage({
      type: 'INTERNAL_DRAG_START',
      payload: { id: element.id, type: element.type }
    }, '*');
  };

  return (
    <div className="relative group">
      {/* 🟢 TOP SIBLING INDICATOR */}
      {isTarget && dropTarget.position === 'before' && (
        <div className="absolute -top-1 left-0 w-full h-1 bg-blue-500 z-50 rounded shadow-[0_0_8px_rgba(59,130,246,0.5)]" />
      )}

      <div
        data-id={element.id}
        data-is-container={isContainer}
        draggable={element.type !== 'root'}
        onDragStart={handleInternalDragStart}
        className={`
          relative p-4 transition-all duration-200 cursor-grab active:cursor-grabbing
          ${isContainer ? 'min-h-20 border-2 border-dashed my-2' : 'border border-gray-200 bg-white my-1'}
          ${isContainer ? 'border-gray-300 bg-blue-50/5' : 'rounded shadow-sm'}
          ${isTarget && dropTarget.position === 'inside' ? 'ring-2 ring-blue-500 bg-blue-100/30' : ''}
        `}
      >
        <div className="absolute -top-2.5 left-2 bg-blue-500 text-white text-[10px] px-1 opacity-0 group-hover:opacity-100 uppercase z-10">
          {element.type}
        </div>

        {element.type === 'heading' && <h1 className="text-2xl font-bold text-gray-800">Heading</h1>}
        {element.type === 'button' && <button className="bg-black text-white px-4 py-2 text-sm rounded">Button</button>}

        {isContainer && element.children && (
          <div className="mt-2 flex flex-col gap-1 pointer-events-none min-h-10">
            {element.children.map((child) => (
              <div key={child.id} className="pointer-events-auto">
                <ElementRenderer element={child} dropTarget={dropTarget} />
              </div>
            ))}
          </div>
        )}
      </div>

      {/* 🔴 BOTTOM SIBLING INDICATOR */}
      {isTarget && dropTarget.position === 'after' && (
        <div className="absolute -bottom-1 left-0 w-full h-1 bg-blue-500 z-50 rounded shadow-[0_0_8px_rgba(59,130,246,0.5)]" />
      )}
    </div>
  );
};

const Canvas = () => {
  const [tree, setTree] = useState({ id: 'root-canvas', type: 'root', children: [] });
  const [dropTarget, setDropTarget] = useState(null); // { id, position: 'before' | 'after' | 'inside' }
  const [movingId, setMovingId] = useState(null);

  // --- REFINED TREE HELPERS ---
  
  const findAndRemove = (node, id) => {
    if (!node.children) return { node: null, newTree: node };
    const index = node.children.findIndex(c => c.id === id);
    if (index !== -1) {
      const found = node.children[index];
      const newChildren = node.children.filter(c => c.id !== id);
      return { found, newNode: { ...node, children: newChildren } };
    }
    const newChildren = node.children.map(c => {
      const result = findAndRemove(c, id);
      if (result.found) {
        c = result.newNode;
        this.tempFound = result.found;
      }
      return c;
    });
    return { found: this.tempFound, newNode: { ...node, children: newChildren } };
  };

  const insertIntoTree = (node, targetId, element, position) => {
    // 1. Handle Inside Drop
    if (position === 'inside' && node.id === targetId) {
      return { ...node, children: [...(node.children || []), element] };
    }
    
    // 2. Handle Sibling Drop (Before/After)
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
    // Every time the tree changes, send a copy to the Parent
    window.parent.postMessage({
      type: 'TREE_UPDATE',
      payload: tree
    }, window.location.origin);
  }, [tree]);
  
  useEffect(() => {
    const handleMessage = (e) => {
      if (!e.data || !e.data.type) return;
      const { type, payload } = e.data;

      if (type === 'DRAGGING') {
        const hoveredEl = document.elementFromPoint(payload.x, payload.y);
        const item = hoveredEl?.closest('[data-id]');
        
        if (item) {
          const id = item.getAttribute('data-id');
          if (id === movingId) return;

          const isContainer = item.getAttribute('data-is-container') === 'true';
          const rect = item.getBoundingClientRect();
          const relativeY = payload.y - rect.top;
          const threshold = rect.height * 0.25; // 25% zone for edges

          if (id === 'root-canvas') {
             setDropTarget({ id, position: 'inside' });
          } else if (relativeY < threshold) {
            setDropTarget({ id, position: 'before' });
          } else if (relativeY > rect.height - threshold) {
            setDropTarget({ id, position: 'after' });
          } else if (isContainer) {
            setDropTarget({ id, position: 'inside' });
          } else {
            // If it's a non-container (button/h1), drop before or after based on half-way point
            setDropTarget({ id, position: relativeY < rect.height / 2 ? 'before' : 'after' });
          }
        }
      }

      if (type === 'SET_MOVING_ID') setMovingId(payload.id);

      if (type === 'DROP') {
        if (dropTarget) {
          setTree(prevTree => {
            let elementToInsert;
            let currentTree = { ...prevTree };

            if (movingId) {
              // Standard Recursive Find & Remove
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
        <ElementRenderer element={tree} dropTarget={dropTarget} />
      </div>
    </div>
  );
};

export default Canvas;