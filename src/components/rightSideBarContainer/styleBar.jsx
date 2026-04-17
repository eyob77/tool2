import { ChevronDown, Layout } from "lucide-react";
import { useBuilder } from "../../context/builderContext";
import {  LayoutSettings, ModifiedCollapsable, OptionsPopover, PositionSettings, SizeSettings, SpacingEditor } from "../designer/utils";

const StyleValue ={
  layout:{ name: 'Display', property: 'display', options: ['block', 'flex', 'grid', 'none',"inline", "inline-block", "inline-flex", "inline-grid"] },
 //make all the style in side this object and then loop through it in the component to render the style sections, this will make it more scalable and easier to maintain in the future when we want to add more styles
}

const StylePanel = () => {
  const { selectedId, treeMirror, sendMessage } = useBuilder();

  // Find the selected element in the tree mirror
  const findElement = (node, id) => {
    if (!node) return null;
    if (node.id === id) return node;
    if (node.children) {
      for (let child of node.children) {
        const found = findElement(child, id);
        if (found) return found;
      }
    }
    return null;
  };

  const activeElement = findElement(treeMirror, selectedId);

  if (!activeElement) {
    return (
      <div className="p-8 text-center">
        <div className="w-12 h-12 bg-gray-100 rounded-full mx-auto mb-4 flex items-center justify-center">
          <span className="text-gray-400">🖱️</span>
        </div>
        <p className="text-gray-500 text-sm">Select an element on the canvas to edit styles</p>
      </div>
    );
  }

 const updateStyle = (styles) => {
  sendMessage({
    type: 'UPDATE_ELEMENT',
    payload: { 
      id: selectedId, 
      styles: { 
        ...activeElement.styles,
        ...styles
      } 
    }
  });
};

  if (!activeElement) return <div className="p-4 text-gray-400 text-sm">Select an element</div>;

  return (
    <div className="w-full h-full overflow-y-auto flex flex-col">

      {/* --- LAYER INFO --- */}
      <div className="w-full py-2 border-b border-gray-200 pl-2 pr-2 ">
        <ModifiedCollapsable styleCategory="Layout">
          <div className="flex items-center gap-2 p-1">
            <span className="text-xs font-medium text-gray-700 flex-1">{StyleValue.layout.name}</span>
            <div className="flex items-center flex-2 gap-1 px-1 py-0.5 border border-gray-200 rounded-md bg-white shadow-sm">
              
              {StyleValue.layout.options.slice(0, 4).map(option => (
                <button 
                  key={option}
                  onClick={() => updateStyle({'display': option})} 
                  className="text-[11px] px-0.5 py-1 font-medium capitalize text-gray-600 hover:bg-gray-100 hover:text-gray-900 rounded transition-colors"
                >
                  {option}
                </button>
              ))}

              <div className="w-px h-4 bg-gray-200 mx-1" /> {/* Subtle Divider */}

                <OptionsPopover Icon={() => <ChevronDown className="size-3.5 text-gray-500"/>}>
                  {StyleValue.layout.options.slice(4,StyleValue.layout.options.length).map(option => (
                      <button
                      key={option}  
                      onClick={() => updateStyle({'display': option})} 
                      className="text-[11px] px-0.5 py-1 font-medium text-gray-600 hover:bg-gray-100 hover:text-gray-900 rounded transition-colors"
                    >
                      {option}
                    </button>
                  ))}
                </OptionsPopover>
              </div>
          </div>
        </ModifiedCollapsable>
      </div>


      {/* --- SPACING SECTION --- */}
      <div className="w-full py-2 border-b border-gray-200 pl-2 pr-2 ">
        <ModifiedCollapsable styleCategory="Layout">
          <LayoutSettings activeElement={activeElement} updateStyle={updateStyle}/>
        </ModifiedCollapsable>
      </div>
      {/* <div className="w-full py-2 border-b border-gray-200 pl-4 pr-2 ">
        <ModifiedCollapsable styleCategory="Spacing">
          <SpacingEditor activeElement={activeElement} updateStyle={updateStyle}/>
        </ModifiedCollapsable>
      </div>

      <div className="w-full py-2 border-b border-gray-200 pl-4 pr-2 ">
        <ModifiedCollapsable styleCategory="Size">
          <SizeSettings activeElement={activeElement} updateStyle={updateStyle}/>
        </ModifiedCollapsable>
      </div>

      <div className="w-full py-2 border-b border-gray-200 pl-4 pr-2 ">
        <ModifiedCollapsable styleCategory="Position">
          <PositionSettings activeElement={activeElement} updateStyle={updateStyle}/>
        </ModifiedCollapsable>
      </div> */}
      {/* <div className="mb-8">
        <h3 className="text-[10px] font-bold text-gray-400 uppercase mb-3">Spacing</h3>
        <div className="grid grid-cols-2 gap-2">
          <div>
            <label className="text-[10px] text-gray-500">Padding</label>
            <input 
              type="text" 
              placeholder="16px"
              value={activeElement.styles?.padding || ''}
              onChange={(e) => updateStyle('padding', e.target.value)}
              className="w-full border rounded p-1 text-xs focus:ring-1 ring-blue-500 outline-none"
            />
          </div>
          <div>
            <label className="text-[10px] text-gray-500">Margin</label>
            <input 
              type="text" 
              placeholder="0px"
              value={activeElement.styles?.margin || ''}
              onChange={(e) => updateStyle('margin', e.target.value)}
              className="w-full border rounded p-1 text-xs focus:ring-1 ring-blue-500 outline-none"
            />
          </div>
        </div>
      </div> */}

      {/* --- TYPOGRAPHY SECTION --- */}
      {/* <div className="mb-8">
        <h3 className="text-[10px] font-bold text-gray-400 uppercase mb-3">Typography</h3>
        <div className="space-y-3">
          <div>
            <label className="text-[10px] text-gray-500">Font Size</label>
            <input 
              type="range" min="12" max="80" 
              value={parseInt(activeElement.styles?.fontSize) || 16}
              onChange={(e) => updateStyle('fontSize', `${e.target.value}px`)}
              className="w-full h-1 bg-gray-200 rounded-lg appearance-none cursor-pointer"
            />
          </div>
          <div className="flex gap-2">
             <button onClick={() => updateStyle('fontWeight', 'bold')} className="flex-1 border text-[10px] py-1 hover:bg-gray-50 rounded">Bold</button>
             <button onClick={() => updateStyle('textAlign', 'center')} className="flex-1 border text-[10px] py-1 hover:bg-gray-50 rounded">Center</button>
          </div>
        </div>
      </div> */}

      {/* --- DECORATION SECTION --- */}
      {/* <div className="mb-8">
        <h3 className="text-[10px] font-bold text-gray-400 uppercase mb-3">Background</h3>
        <div className="flex items-center gap-3">
          <input 
            type="color" 
            value={activeElement.styles?.backgroundColor || '#ffffff'}
            onChange={(e) => updateStyle('backgroundColor', e.target.value)}
            className="w-8 h-8 rounded border-none cursor-pointer"
          />
          <span className="text-[10px] text-gray-600 font-mono">{activeElement.styles?.backgroundColor || '#FFFFFF'}</span>
        </div>
      </div> */}
    </div>
  );
};

export default StylePanel;