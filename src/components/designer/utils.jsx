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
      <button {...getToggleProps()} className="w-full h-[3%] rounded-sm border-gray-200 py-1">
        <span className="flex justify-between items-center text-sm font-bold">
          <span className="font-bold">{styleCategory}</span>
          {isExpanded ? <ChevronDown className="size-3"/>:<ChevronRight className="size-3"/>}
        </span>
      </button>
      <section {...getCollapseProps()} className="w-full! h-max flex justify-center px-0! mt-3">
        <div className="w-full h-full ">
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


export const SegmentButton = ({options,property,updateStyle}) => {
  const [selected, setSelected] = useState(null);

  return (
    <>
      {options.map(option => (
        <button 
          key={option}
          onClick={() => {
            setSelected(option);
            updateStyle(property, option);
          }}
          className={`text-[11px] px-0.5 py-1 font-medium capitalize rounded transition-colors
            ${selected === option 
              ? "bg-gray-200 text-gray-500 border border-gray-300 shadow-md border-0.5"   // active style
              : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
            }`}
        >
          {option}
        </button>
      ))}
    </>
  )
}
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




// --- 1. THE FLEX WIZARD COMPONENT ---
const FlexSettings = ({ s, updateStyle }) => (
  <div className="space-y-6 animate-in fade-in slide-in-from-top-2 duration-300 p-1 mt-0.5">
    {/* Direction Toggle */}
    <div className="w-full flex items-center gap-2 ">
      <span className="text-xs font-medium text-gray-700 w">Direction</span>
      <div className="flex items-center justify-around flex-2 gap-1 py-0.5 border border-gray-200 rounded-md bg-white shadow-sm">
        {/* add row-reverse and column-reverse */}
        <SegmentButton options={['row', 'column']} property="flexDirection" updateStyle={updateStyle} />
      </div>
    </div>

    {/* The Mini-Map Dots */}
    <div className="flex flex-col items-center gap-2 py-2">
      <div className="grid grid-cols-3 gap-4 bg-gray-900/5 p-4 rounded-xl border border-gray-200 w-32 h-32 shadow-inner relative">
        {[
          { jc: 'flex-start', ai: 'flex-start' }, { jc: 'center', ai: 'flex-start' }, { jc: 'flex-end', ai: 'flex-start' },
          { jc: 'flex-start', ai: 'center' },     { jc: 'center', ai: 'center' },     { jc: 'flex-end', ai: 'center' },
          { jc: 'flex-start', ai: 'flex-end' },   { jc: 'center', ai: 'flex-end' },   { jc: 'flex-end', ai: 'flex-end' },
        ].map((z, i) => {
          const isActive = s.justifyContent === z.jc && s.alignItems === z.ai;
          return (
            <button key={i} onClick={() => { updateStyle('justifyContent', z.jc); updateStyle('alignItems', z.ai); }} className="relative flex items-center justify-center">
              {isActive && <div className="absolute w-5 h-5 border border-blue-500 rounded-full animate-pulse" />}
              <div className={`w-1.5 h-1.5 rounded-full transition-all ${isActive ? 'bg-blue-600 scale-125' : 'bg-gray-300 hover:bg-gray-400'}`} />
            </button>
          );
        })}
      </div>
      <span className="text-[9px] text-gray-400 font-bold uppercase tracking-widest">Alignment Map</span>
    </div>

    {/* Distribution Overrides */}
    <div className="grid grid-cols-2 gap-2">
       <button onClick={() => updateStyle('justifyContent', 'space-between')} className={`py-1.5 text-[9px] font-bold rounded border ${s.justifyContent === 'space-between' ? 'bg-blue-50 border-blue-400 text-blue-700' : 'bg-white text-gray-500'}`}>Space Between</button>
       <button onClick={() => updateStyle('alignItems', 'stretch')} className={`py-1.5 text-[9px] font-bold rounded border ${s.alignItems === 'stretch' ? 'bg-blue-50 border-blue-400 text-blue-700' : 'bg-white text-gray-500'}`}>Stretch Fill</button>
    </div>
  </div>
);

// --- 2. THE GRID WIZARD COMPONENT ---
const GridSettings = ({ s, updateStyle }) => (
  <div className="space-y-4 animate-in fade-in slide-in-from-top-2 duration-300">
    <div>
      <label className="text-[10px] text-gray-400 font-bold uppercase mb-2 block">Grid Configuration</label>
      <div className="space-y-3">
        <div>
          <span className="text-[9px] text-gray-500 mb-1 block">Columns (e.g., 1fr 1fr 1fr)</span>
          <input 
            type="text" className="w-full bg-white border border-gray-300 rounded px-2 py-1.5 text-[11px] font-mono"
            placeholder="1fr 1fr" value={s.gridTemplateColumns || ''} onChange={(e) => updateStyle('gridTemplateColumns', e.target.value)}
          />
        </div>
        <div>
          <span className="text-[9px] text-gray-500 mb-1 block">Rows</span>
          <input 
            type="text" className="w-full bg-white border border-gray-300 rounded px-2 py-1.5 text-[11px] font-mono"
            placeholder="auto" value={s.gridTemplateRows || ''} onChange={(e) => updateStyle('gridTemplateRows', e.target.value)}
          />
        </div>
      </div>
    </div>
  </div>
);

// --- 3. THE MAIN COMPONENT ---
export const LayoutSettings = ({ activeElement, updateStyle }) => {
  const s = activeElement?.styles || {};
  const labelClass = "text-[10px] text-gray-500 font-bold uppercase mb-2 block";

  return (
    <div className="py-1">

      {/* Primary Switcher */}
      <div className="flex items-center gap-2 p-1">
            <span className="text-xs font-medium text-gray-700 flex-1">Display</span>
            <div className="flex items-center flex-2 gap-1 px-1 py-0.5 border border-gray-200 rounded-md bg-white shadow-sm">
              
              
              <SegmentButton options={['block', 'flex', 'grid', 'none']} property="display" updateStyle={updateStyle} />

              <div className="w-px h-4 bg-gray-200 mx-1" /> {/* Subtle Divider */}

                <OptionsPopover Icon={() => <ChevronDown className="size-3.5 text-gray-500"/>}>
                  {['inline', 'inline-block', 'inline-flex', 'inline-grid'].map(option => (
                  <button
                    key={option}  
                    onClick={() => updateStyle('display', option)} 
                    className="text-[11px] px-0.5 py-1 font-medium text-gray-600 hover:bg-gray-100 hover:text-gray-900 rounded transition-colors"
                  >
                    {option}
                </button>
              ))}
            </OptionsPopover>
          </div>
      </div>

      {/* DYNAMIC SUB-PANELS */}
        {s.display === 'flex' && <FlexSettings s={s} updateStyle={updateStyle} />}
        {s.display === 'grid' && <GridSettings s={s} updateStyle={updateStyle} />}
        {s.display === 'none' && ""}
        {s.display === 'block' && ""}
        
        {/* {(s.display === 'block' || s.display === 'none') && (
          <div className="flex flex-col items-center justify-center h-24 border-2 border-dashed border-gray-200 rounded-xl text-gray-400">
            <span className="text-[10px] font-medium italic">Standard Stacked Layout</span>
          </div>
        )} */}

      {/* COMMON SETTINGS (Visible for Flex and Grid) */}
      {(s.display === 'flex' || s.display === 'grid') && (
        <div className="mt-6 pt-4 border-t border-gray-200">
          <label className={labelClass}>Gap (Spacing Between Items)</label>
          <div className="grid grid-cols-2 gap-3">
             <div className="relative">
                <input 
                  type="text" className="w-full bg-white border border-gray-300 rounded-md pl-2 pr-2 py-1.5 text-[11px] outline-none" 
                  value={s.columnGap || ''} onChange={(e) => updateStyle('columnGap', e.target.value)} placeholder="Horizontal" 
                />
             </div>
             <div className="relative">
                <input 
                  type="text" className="w-full bg-white border border-gray-300 rounded-md pl-2 pr-2 py-1.5 text-[11px] outline-none" 
                  value={s.rowGap || ''} onChange={(e) => updateStyle('rowGap', e.target.value)} placeholder="Vertical" 
                />
             </div>
          </div>
        </div>
      )}
    </div>
  );
};

// In your Canvas.jsx DROP handler:
