import { ChevronDown, ChevronRight } from "lucide-react";
import { useCollapse } from "react-collapsed";


export const HorizontalDivider = ()=>{
  return <div className="w-[80%] h-px bg-gray-300 my-1"/>
}

export const VerticalDivider = <div className="w-px h-full bg-gray-300 mx-2"/>


export const Collapsable=()=>{
  const { getCollapseProps, getToggleProps, isExpanded } = useCollapse()
  return (
    <>
      <button {...getToggleProps()} className="w-[95%] h-[5%] rounded-sm ">
        <span className="flex justify-between items-center text-sm font-bold">
          <span>Structure</span>
          {isExpanded ? <ChevronDown className="size-4"/>:<ChevronRight className="size-4"/>}
        </span>
      </button>
      <section {...getCollapseProps()} className="w-full h-[50%]">
        <div className="w-[95%] h-full grid grid-cols-3 grid-rows-3 border-2 border-gray-300 rounded-sm py-1">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </section>
    </>
  )
}