import { ChevronDown, ChevronRight } from "lucide-react";
import { useCollapse } from "react-collapsed";
import { Container, QuickStack, Section } from "../svgs";


export const HorizontalDivider = ()=>{
  return <div className="w-[80%] h-px bg-gray-300 my-1 ml-1"/>
}

// export const VerticalDivider = <div className="w-px h-full bg-gray-300 mx-2"/>

export const ModifiedCollapsable = ({ rowCollapsable }) => {
  const { getCollapseProps, getToggleProps, isExpanded } = useCollapse();
  return (
    <>
      <button {...getToggleProps()} className="w-[95%] h-[5%] rounded-sm pl-4">
        <span className="flex justify-between items-center text-sm font-bold">
          <span className="font-normal">{rowCollapsable.name}</span>
          {isExpanded ? <ChevronDown className="size-4"/>:<ChevronRight className="size-4"/>}
        </span>
      </button>
      <section {...getCollapseProps()} className="w-full! h-max flex justify-center px-px! mb-2">
        <div className="w-[99%] h-full ">
          {rowCollapsable.element}
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

import { useState, useRef, useEffect } from 'react';

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

// In your Canvas.jsx DROP handler:
