import { ChevronDown, ChevronRight } from "lucide-react";
import { useCollapse } from "react-collapsed";
import { Container, QuickStack, Section } from "../svgs";


export const HorizontalDivider = ()=>{
  return <div className="w-[80%] h-px bg-gray-300 my-1 ml-1"/>
}

// export const VerticalDivider = <div className="w-px h-full bg-gray-300 mx-2"/>

export const ModifiedCollapsable = ({styleCategory,children}) => {
  const { getCollapseProps, getToggleProps, isExpanded } = useCollapse();
  return (
    <>
      <button {...getToggleProps()} className="w-[98%] h-[3%] rounded-sm border-gray-200 py-1">
        <span className="flex justify-between items-center text-sm font-bold">
          <span className="font-bold">{styleCategory}</span>
          {isExpanded ? <ChevronDown className="size-3"/>:<ChevronRight className="size-3"/>}
        </span>
      </button>
      <section {...getCollapseProps()} className="w-full! h-max flex justify-center px-0! mt-3">
        <div className="w-[99%] h-full ">
          {children}
        </div>
      </section>
    </>
  )
}


export const Collapsable=({rowCollapsable})=>{
  const { getCollapseProps, getToggleProps, isExpanded } = useCollapse()
  return (
    <>
      <button {...getToggleProps()} className="w-[95%] h-[5%] rounded-sm pl-4">
        <span className="flex justify-between items-center text-sm font-bold">
          <span className="font-normal">{rowCollapsable.name}</span>
          {isExpanded ? <ChevronDown className="size-4"/>:<ChevronRight className="size-4"/>}
        </span>
      </button>
      <section {...getCollapseProps()} className="w-full! h-max flex justify-center px-px! mb-2">
        <div className="w-[99%] h-full grid grid-cols-3 rounded-sm gap-0.5">
          {rowCollapsable.elements.map(({name,svg},i)=>(

            <IconDisplayElement Svg={svg} name={name} key={i}/>
          ))}
        </div>
      </section>
    </>
  )
}

export const IconDisplayElement = ({ Svg, name }) => {
  return (
    <div className="flex flex-col gap-0.5 justify-between items-center group">
      {/* SVG Container with darker background */}
      <div className="p-1.5 bg-gray-100 rounded text-gray-800 transition-colors group-hover:bg-gray-200">
        <div className="scale-113"> {/* Makes the SVG ~25% bigger */}
          <Svg />
        </div>
      </div>

      {/* Subtle Text */}
      <span className="text-[11px] leading-tight text-gray-400 font-medium capitalize tracking-wide">
        {name}
      </span>
    </div>
  );
};

// Function to remove a node by ID from anywhere in the tree
export const removeNode = (nodes, id) => {
  if (Array.isArray(nodes)) {
    return nodes
      .filter(node => node.id !== id)
      .map(node => ({ ...node, children: node.children ? removeNode(node.children, id) : [] }));
  }
  return {
    ...nodes,
    children: nodes.children ? removeNode(nodes.children, id) : []
  };
};

import React, { useState, useRef, useEffect } from 'react';

export const OptionsPopover = ({ children,Icon,text }) => {
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef(null);

  // Close the mini-modal if the user clicks anywhere outside of it
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setIsVisible(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative inline-block" ref={containerRef}>
      {/* The "More Options" Trigger */}
      <button
        onClick={() => setIsVisible(!isVisible)}
        className=" hover:bg-gray-100 border-gray-200 transition-colors"
      >
        {Icon && <Icon />}
        {text && <span className="text-sm font-medium">{text}</span>}
      </button>

      {/* The Mini-Modal (Hidden & Uninteractive when isVisible is false) */}
      {isVisible && (
        <div className="w-44 absolute right-6 mt-3 z-50 bg-white rounded shadow-xl border border-gray-200 p-2">
          <div className="flex flex-col gap-3">
            <div className="flex flex-col gap-1 justify-center">
               {children}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};



// The input field that appears when clicking a spacing value
export const SpacingInput = ({ value, onUpdate, isPadding }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [tempValue, setTempValue] = useState(value || '0');

  const handleSubmit = () => {
    setIsEditing(false);
    // Auto-append px if it's just a number
    const finalValue = isNaN(tempValue) ? tempValue : `${tempValue}px`;
    onUpdate(finalValue);
  };

  const textClass = isPadding ? 'text-blue-700' : 'text-gray-700';

  return (
    <div className="flex flex-col items-center justify-center min-w-7.5 h-4">
      {isEditing ? (
        <input
          autoFocus
          className="w-6 text-[10px] bg-white border border-blue-500 outline-none text-center rounded font-mono shadow-inner"
          value={tempValue}
          onChange={(e) => setTempValue(e.target.value)}
          onBlur={handleSubmit}
          onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
        />
      ) : (
        <span 
          onClick={() => setIsEditing(true)}
          className={`
            text-[10px] cursor-ns-resize hover:bg-blue-100 px-1 py-0.5 rounded font-medium
            transition-colors ${textClass}
          `}
        >
          {value ? value.replace('px', '') : '0'}
        </span>
      )}
    </div>
  );
};

export const SpacingEditor = ({ activeElement, updateStyle }) => {
  const s = activeElement?.styles || {};

  return (
    <div className="flex flex-col gap-5 bg-gray-50 rounded-xl border border-gray-100">
      
      {/* 🟢 MARGIN BOX (Outer - Gray/Orange scheme) */}
      <div className="relative p-8 border border-gray-400 rounded bg-gray-100 shadow-sm transition-all hover:border-gray-500">
        <span className="absolute top-1 left-1.5 text-[8px] text-gray-500 uppercase font-semibold">Margin</span>
        
        {/* Margin Positions */}
        <div className="absolute top-1 left-1/2 -translate-x-1/2">
          <SpacingInput value={s.marginTop} onUpdate={(v) => updateStyle('marginTop', v)} isPadding={false} />
        </div>
        <div className="absolute right-0.5 top-1/2 -translate-y-1/2">
          <SpacingInput value={s.marginRight} onUpdate={(v) => updateStyle('marginRight', v)} isPadding={false} />
        </div>
        <div className="absolute bottom-1 left-1/2 -translate-x-1/2">
          <SpacingInput value={s.marginBottom} onUpdate={(v) => updateStyle('marginBottom', v)} isPadding={false} />
        </div>
        <div className="absolute left-0.5 top-1/2 -translate-y-1/2">
          <SpacingInput value={s.marginLeft} onUpdate={(v) => updateStyle('marginLeft', v)} isPadding={false} />
        </div>

        {/* 🔵 PADDING BOX (Inner - Webflow Blue scheme) */}
        <div className={`
          relative p-6  border border-solid border-blue-300 rounded shadow-md
          bg-linear-to-br from-blue-100 to-blue-50/50
          transition-all hover:border-blue-400 hover:shadow-lg
        `}>
          <span className="absolute top-1 left-1.5 text-[8px] text-blue-600 uppercase font-bold">Padding</span>
          
          {/* Padding Positions */}
          <div className="absolute top-1 left-1/2 -translate-x-1/2">
            <SpacingInput value={s.paddingTop} onUpdate={(v) => updateStyle('paddingTop', v)} isPadding={true} />
          </div>
          <div className="absolute right-1 top-1/2 -translate-y-1/2">
            <SpacingInput value={s.paddingRight} onUpdate={(v) => updateStyle('paddingRight', v)} isPadding={true} />
          </div>
          <div className="absolute bottom-1 left-1/2 -translate-x-1/2">
            <SpacingInput value={s.paddingBottom} onUpdate={(v) => updateStyle('paddingBottom', v)} isPadding={true} />
          </div>
          <div className="absolute left-1 top-1/2 -translate-y-1/2">
            <SpacingInput value={s.paddingLeft} onUpdate={(v) => updateStyle('paddingLeft', v)} isPadding={true} />
          </div>

          {/* Center "Content" Placeholder */}
          <div className="h-5 w-16 bg-blue-200/50 rounded-sm mx-auto shadow-inner border border-blue-300/50" />
        </div>
      </div>
    </div>
  );
};


export const SegmentButton = ({ prop, value, label, current }) => (
  <button
    onClick={() => updateStyle(prop, value)}
    className={`flex-1 py-1 text-[9px] rounded transition-all capitalize ${
      current === value 
        ? 'bg-white text-blue-600 shadow-sm ring-1 ring-black/5' 
        : 'text-gray-400 hover:text-gray-600'
    }`}
  >
    {label}
  </button>
);
export const SizeSettings = ({ activeElement, updateStyle }) => {
  const s = activeElement?.styles || {};

  const inputClass = "w-full bg-white border border-gray-300 rounded px-2 py-1 text-[11px] focus:border-blue-500 outline-none font-mono transition-colors";
  const labelClass = "text-[10px] text-gray-500 font-bold capitalize mb-1 block";
  const selectClass = "w-full bg-white border border-gray-300 rounded px-1 py-1 text-[11px] focus:border-gray-500 outline-none appearance-none cursor-pointer";

  // Helper for Segmented Control Buttons

  return (
    <div>

      <div className="grid grid-cols-2 gap-x-4 gap-y-3 mb-4">
        <div>
          <label className={labelClass}>Width</label>
          <input 
            type="text" placeholder="auto" className={inputClass}
            value={s.width || ''} onChange={(e) => updateStyle('width', e.target.value)}
          />
        </div>
        <div>
          <label className={labelClass}>Height</label>
          <input 
            type="text" placeholder="auto" className={inputClass}
            value={s.height || ''} onChange={(e) => updateStyle('height', e.target.value)}
          />
        </div>
        <div>
          <label className={labelClass}>Min W</label>
          <input 
            type="text" placeholder="0px" className={inputClass}
            value={s.minWidth || ''} onChange={(e) => updateStyle('minWidth', e.target.value)}
          />
        </div>
        <div>
          <label className={labelClass}>Min H</label>
          <input 
            type="text" placeholder="0px" className={inputClass}
            value={s.minHeight || ''} onChange={(e) => updateStyle('minHeight', e.target.value)}
          />
        </div>
        <div>
          <label className={labelClass}>Max W</label>
          <input 
            type="text" placeholder="none" className={inputClass}
            value={s.maxWidth || ''} onChange={(e) => updateStyle('maxWidth', e.target.value)}
          />
        </div>
        <div>
          <label className={labelClass}>Max H</label>
          <input 
            type="text" placeholder="none" className={inputClass}
            value={s.maxHeight || ''} onChange={(e) => updateStyle('maxHeight', e.target.value)}
          />
        </div>
      </div>

      <ToggleOption>
        <div className="space-y-4">
          {/* Aspect Ratio */}
          <div>
            <label className={labelClass}>Aspect Ratio</label>
            <input 
              type="text" placeholder="auto (e.g. 16/9)" className={inputClass}
              value={s.aspectRatio || ''} onChange={(e) => updateStyle('aspectRatio', e.target.value)}
            />
          </div>

          {/* Improved Overflow Section */}
          <div className="space-y-3">
            <label className={labelClass}>Overflow</label>
            
            <div className="space-y-2 bg-gray-200/50 p-2 rounded-lg">
              {/* Overflow X */}
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold text-gray-400 w-4">X</span>
                <div className="flex flex-1 bg-gray-200 p-0.5 rounded gap-0.5">
                  {['visible', 'hidden', 'scroll', 'auto'].map(v => (
                    <SegmentButton key={v} prop="overflowX" value={v} label={v.substring(0, 3)} current={s.overflowX || 'visible'} />
                  ))}
                </div>
              </div>

              {/* Overflow Y */}
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold text-gray-400 w-4">Y</span>
                <div className="flex flex-1 bg-gray-200 p-0.5 rounded gap-0.5">
                  {['visible', 'hidden', 'scroll', 'auto'].map(v => (
                    <SegmentButton key={v} prop="overflowY" value={v} label={v.substring(0, 3)} current={s.overflowY || 'visible'} />
                  ))}
                </div>
              </div>
            </div>

          </div>

          {/* Box Sizing */}
          <div>
            <label className={labelClass}>Box Sizing</label>
            <select 
              className={selectClass} 
              value={s.boxSizing || 'border-box'} 
              onChange={(e) => updateStyle('boxSizing', e.target.value)}
            >
              <option value="border-box">Border Box</option>
              <option value="content-box">Content Box</option>
            </select>
          </div>

          {/* Object Fit */}
          <div>
            <label className={labelClass}>Object Fit</label>
            <div className="flex bg-gray-200 p-1 rounded gap-1 shadow-inner">
              {['fill', 'contain', 'cover', 'none'].map((fit) => (
                <button
                  key={fit}
                  onClick={() => updateStyle('objectFit', fit)}
                  className={`flex-1 text-[10px] py-1 rounded transition-all capitalize font-bold ${
                    s.objectFit === fit ? 'bg-white shadow-sm text-blue-600' : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  {fit}
                </button>
              ))}
            </div>
          </div>
        </div>
      </ToggleOption>      
      {/* Advanced Layout Properties */}
    </div>
  );
};




export const ToggleOption = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Header / Button */}
      <button
        onClick={() => setIsOpen(prev => !prev)}
        className="w-full text-xs text-left py-1 bg-gray-100 hover:bg-gray-200 font-medium flex items-center justify-center rounded border border-gray-300"
      >
        <div className="flex items-center justify-between gap-1 w-[50%]">

        <span>More-options</span>
        {isOpen ? <ChevronDown className="size-3"/> : <ChevronRight className="size-3"/>}
        </div>
      </button>

      {/* Content */}
      {isOpen && (
        <div className="pt-3 transition-all">
          {children}
        </div>
      )}
    </>
  );
};


export const PositionSettings = ({ activeElement, updateStyle }) => {
  const s = activeElement?.styles || {};

  const labelClass = "text-[10px] text-gray-500 font-bold uppercase mb-1 block";
  const inputClass = "w-full bg-white border border-gray-300 rounded px-2 py-1 text-[11px] focus:border-blue-500 outline-none font-mono transition-colors";
  
  // Webflow-style segmented control for Position types
  const positions = ['static', 'relative', 'absolute', 'fixed', 'sticky'];

  return (
    <div className="p-4 bg-gray-50 border-t border-gray-200">
      <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-4">Position</h3>

      {/* Position Type Toggle */}
      <div className="mb-4">
        <label className={labelClass}>Type</label>
        <div className="grid grid-cols-3 gap-1 bg-gray-200 p-1 rounded-md">
          {positions.map((pos) => (
            <button
              key={pos}
              onClick={() => updateStyle('position', pos)}
              className={`text-[9px] py-1 rounded font-bold uppercase transition-all ${
                (s.position || 'static') === pos 
                  ? 'bg-white text-blue-600 shadow-sm' 
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              {pos}
            </button>
          ))}
        </div>
      </div>

      {/* Show Coordinates only if NOT static */}
      {(s.position && s.position !== 'static') && (
        <div className="space-y-4 animate-in fade-in slide-in-from-top-1 duration-200">
          
          {/* Z-Index */}
          <div>
            <label className={labelClass}>Z-Index</label>
            <input 
              type="number" placeholder="auto" className={inputClass}
              value={s.zIndex || ''} onChange={(e) => updateStyle('zIndex', e.target.value)}
            />
          </div>

          {/* The "Compass" Coordinate Grid */}
          <div className="relative p-8 border border-gray-300 rounded bg-[#e8e8e8] shadow-inner">
             <span className="absolute top-1 left-1.5 text-[8px] text-gray-400 uppercase font-bold">Coordinates</span>
             
             {/* Top Input */}
             <div className="absolute top-1 left-1/2 -translate-x-1/2 w-12">
               <input 
                 type="text" placeholder="0" className={`${inputClass} text-center py-0.5`}
                 value={s.top || ''} onChange={(e) => updateStyle('top', e.target.value)}
               />
             </div>

             {/* Right Input */}
             <div className="absolute right-1 top-1/2 -translate-y-1/2 w-12">
               <input 
                 type="text" placeholder="0" className={`${inputClass} text-center py-0.5`}
                 value={s.right || ''} onChange={(e) => updateStyle('right', e.target.value)}
               />
             </div>

             {/* Bottom Input */}
             <div className="absolute bottom-1 left-1/2 -translate-x-1/2 w-12">
               <input 
                 type="text" placeholder="0" className={`${inputClass} text-center py-0.5`}
                 value={s.bottom || ''} onChange={(e) => updateStyle('bottom', e.target.value)}
               />
             </div>

             {/* Left Input */}
             <div className="absolute left-1 top-1/2 -translate-y-1/2 w-12">
               <input 
                 type="text" placeholder="0" className={`${inputClass} text-center py-0.5`}
                 value={s.left || ''} onChange={(e) => updateStyle('left', e.target.value)}
               />
             </div>

             {/* Center visual icon */}
             <div className="w-8 h-8 mx-auto bg-gray-300/50 rounded flex items-center justify-center border border-gray-400/30">
                <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
             </div>
          </div>
        </div>
      )}
      
      {/* Helper text for Sticky */}
      {s.position === 'sticky' && (
        <p className="mt-2 text-[9px] text-orange-600 font-medium italic">
          * Sticky requires at least one coordinate (e.g., Top: 0) and an overflow-visible parent.
        </p>
      )}
    </div>
  );
};


const FlexMiniMap = ({ s, updateStyle }) => {
  // Mapping the 3x3 grid dots to CSS
  const zones = [
    { jc: 'flex-start', ai: 'flex-start' }, { jc: 'center', ai: 'flex-start' }, { jc: 'flex-end', ai: 'flex-start' },
    { jc: 'flex-start', ai: 'center' },     { jc: 'center', ai: 'center' },     { jc: 'flex-end', ai: 'center' },
    { jc: 'flex-start', ai: 'flex-end' },   { jc: 'center', ai: 'flex-end' },   { jc: 'flex-end', ai: 'flex-end' },
  ];

  return (
    <div className="flex flex-col items-center gap-2">
      <div className="grid grid-cols-3 gap-4 bg-gray-900/5 p-4 rounded-xl border border-gray-200 w-32 h-32 shadow-inner relative">
        {zones.map((z, i) => {
          const isActive = s.justifyContent === z.jc && s.alignItems === z.ai;
          return (
            <button
              key={i}
              onClick={() => {
                updateStyle('justifyContent', z.jc);
                updateStyle('alignItems', z.ai);
              }}
              className="relative flex items-center justify-center"
            >
              {/* The Active Ring (Visible only when selected) */}
              {isActive && (
                <div className="absolute w-5 h-5 border border-blue-500 rounded-full animate-pulse" />
              )}
              {/* The Dot */}
              <div className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                isActive ? 'bg-blue-600 scale-125' : 'bg-gray-300 hover:bg-gray-400'
              }`} />
            </button>
          );
        })}
      </div>
      <span className="text-[9px] text-gray-400 font-bold uppercase tracking-widest">Quick Align</span>
    </div>
  );
};

export const LayoutSettings = ({ activeElement, updateStyle }) => {
  const s = activeElement?.styles || {};
  
  const labelClass = "text-[10px] text-gray-500 font-bold uppercase mb-2 block";
  const selectClass = "w-full bg-white border border-gray-300 rounded-md px-2 py-1.5 text-[11px] outline-none focus:border-blue-500 appearance-none cursor-pointer shadow-sm transition-all hover:border-gray-400";
  const inputClass = "w-full bg-white border border-gray-300 rounded-md px-2 py-1.5 text-[11px] outline-none focus:border-blue-500 appearance-none cursor-pointer shadow-sm transition-all hover:border-gray-400";

  return (
    <div className="p-4 bg-gray-50 border-t border-gray-200 select-none">
      <h3 className="text-xs font-bold text-gray-700 uppercase tracking-wide mb-4">Layout</h3>

      {/* 1. Display Selector */}
      <div className="mb-6">
        <label className={labelClass}>Display</label>
        <select 
          className={selectClass}
          value={s.display || 'block'}
          onChange={(e) => updateStyle('display', e.target.value)}
        >
          <option value="block">Stacked (Block)</option>
          <option value="flex">Flexible (Flex)</option>
          <option value="grid">Grid</option>
          <option value="inline-block">Inline Block</option>
          <option value="none">Hidden (None)</option>
        </select>
      </div>

      {s.display === 'flex' && (
        <div className="space-y-6 animate-in fade-in duration-300">
          
          {/* 2. Direction Toggle */}
          <div>
            <label className={labelClass}>Direction</label>
            <div className="flex bg-gray-200 p-1 rounded-lg gap-1 border border-gray-300 shadow-inner">
              <button 
                onClick={() => updateStyle('flexDirection', 'row')} 
                className={`flex-1 py-1.5 text-[10px] font-bold rounded-md transition-all ${s.flexDirection !== 'column' ? 'bg-white shadow text-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
              >
                Horizontal
              </button>
              <button 
                onClick={() => updateStyle('flexDirection', 'column')} 
                className={`flex-1 py-1.5 text-[10px] font-bold rounded-md transition-all ${s.flexDirection === 'column' ? 'bg-white shadow text-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
              >
                Vertical
              </button>
            </div>
          </div>

          {/* 3. The Mini-Map (Wizard) */}
          <FlexMiniMap s={s} updateStyle={updateStyle} />

          {/* 4. Manual Overrides (For Coders/Advanced Users) */}
          <div className="pt-4 border-t border-gray-200 space-y-3">
            <details className="group">
              <summary className="text-[10px] text-blue-500 font-bold uppercase cursor-pointer list-none flex items-center gap-1 hover:text-blue-600">
                <span className="group-open:rotate-90 transition-transform">▶</span>
                Manual Alignment
              </summary>
              <div className="mt-3 space-y-3 p-3 bg-white rounded-lg border border-gray-200 shadow-sm animate-in slide-in-from-top-1">
                <div>
                  <label className="text-[9px] text-gray-400 font-bold uppercase block mb-1">Justify Content</label>
                  <select className={selectClass} value={s.justifyContent || 'flex-start'} onChange={(e) => updateStyle('justifyContent', e.target.value)}>
                    <option value="flex-start">Start</option>
                    <option value="center">Center</option>
                    <option value="flex-end">End</option>
                    <option value="space-between">Space Between</option>
                    <option value="space-around">Space Around</option>
                  </select>
                </div>
                <div>
                  <label className="text-[9px] text-gray-400 font-bold uppercase block mb-1">Align Items</label>
                  <select className={selectClass} value={s.alignItems || 'flex-start'} onChange={(e) => updateStyle('alignItems', e.target.value)}>
                    <option value="flex-start">Top / Start</option>
                    <option value="center">Center</option>
                    <option value="flex-end">Bottom / End</option>
                    <option value="stretch">Stretch (Fill)</option>
                    <option value="baseline">Baseline</option>
                  </select>
                </div>
              </div>
            </details>
          </div>

          {/* 5. Gaps */}
          <div className="pt-4 border-t border-gray-200">
            <label className={labelClass}>Spacing Between (Gap)</label>
            <div className="grid grid-cols-2 gap-3">
               <input 
                type="text" className={inputClass} 
                value={s.columnGap || ''} onChange={(e) => updateStyle('columnGap', e.target.value)} 
                placeholder="Column Gap (px)" 
               />
               <input 
                type="text" className={inputClass} 
                value={s.rowGap || ''} onChange={(e) => updateStyle('rowGap', e.target.value)} 
                placeholder="Row Gap (px)" 
               />
            </div>
          </div>

        </div>
      )}
    </div>
  );
};
// In your Canvas.jsx DROP handler:
