import { useBuilder } from '../../context/builderContext';

const CanvasFrame = ()=>{
  const { iframeRef, isDragging, setIsDragging, sendMessage } = useBuilder();

  const handleDragOver = (e) => {
    e.preventDefault();

    sendMessage({
      type: 'DRAGGING',
      payload: {
        x: e.clientX,
        y: e.clientY,
      },
    });
  };

  const handleDrop = (e) => {
    const type = e.dataTransfer.getData("compType");
    setIsDragging(false);

    sendMessage({
      type: 'DROP',
      payload: { type },
    });
  };
  return (
    <div className="w-[77%] h-full bg-white absolute left-[13%] top-0">
      <div className="flex h-screen w-full bg-gray-100">
      {/* Sidebar */}
      {/* <div className="w-64 bg-white border-r p-4 flex flex-col gap-4">
        <h2 className="font-bold text-gray-500 text-sm uppercase">
          Components
        </h2>

        <div
          draggable
          onDragStart={(e) => handleDragStart(e, 'heading')}
          className="p-4 border-2 border-dashed border-gray-300 rounded cursor-move hover:border-blue-500"
        >
          Heading
        </div>

        <div
          draggable
          onDragStart={(e) => handleDragStart(e, 'button')}
          className="p-4 border-2 border-dashed border-gray-300 rounded cursor-move hover:border-blue-500"
        >
          Button
        </div>
      </div> */}

      {/* Canvas */}
      <div className="flex-1 p-10 relative">
        {isDragging && (
          <div
            className="absolute inset-10 z-50"
            onDragOver={handleDragOver}
            onDrop={handleDrop}
          />
        )}

          <iframe
            ref={iframeRef}
            src="/canvas"
            className="w-full h-full border shadow-2xl rounded-lg bg-white"
            title="preview"
          />
        </div>
      </div>

    </div>
  )
}

export default CanvasFrame;