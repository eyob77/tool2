
import { useState } from "react";
import { useCollapse } from "react-collapsed";
import { Collapsable } from "../../designer/utils";


const AddElementContainer = ()=>{
  const [activeTab, setActiveTab] = useState('Elements');
  return (
    <div className="w-full h-full flex-col gap-1">
      <h2 className="h-[3%] font-bold pl-4">Add</h2>
      <div className="h-[3%] w-full flex justify-start gap-2 items-center pl-4">
        <span className={`text-sm font-bold cursor-pointer ${activeTab === 'Elements' ? 'underline' : ''}`} onClick={()=>setActiveTab('Elements')}>Elements</span>
        <span className={`text-sm font-bold cursor-pointer ${activeTab === 'Layouts' ? 'underline' : ''}`} onClick={()=>setActiveTab('Layouts')}>Layouts</span>
      </div>
      <div className="h-[94%] w-full border-t-2 border-gray-300">
        {activeTab === 'Elements' ? 
        <ElementContainer />: 
        <div>Layouts</div>}
      </div>
    </div>
  )
}

export default AddElementContainer;


const ElementContainer = ()=>{

  return (
    <div className="w-full h-full flex flex-col gap-3 pl-4 pt-2">
      <input type="text" placeholder="Search elements" className="w-[95%] h-30px placeholder:text-sm rounded-sm placeholder:indent-2 border-2 border-gray-300 focus:indent-2 focus:outline-none"/>
      <div className="w-full h-full">
        <div className="w-[99.5%] h-full overflow-auto">
         <Collapsable/>
         <Collapsable/>
         <Collapsable/>
         <Collapsable/>
         <Collapsable/>
         <Collapsable/>
        </div>
      </div>
    </div>
  )
}