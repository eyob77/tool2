import { useState } from "react";
import { HorizontalDivider } from "../designer/utils";


const AddElementContainer = ()=>{
  const [activeTab, setActiveTab] = useState('Elements');
  return (
    <div className="w-full h-full flex-col gap-1 py-2">
      <h2 className="font-bold pl-4">Add</h2>
      <div className="flex justify-between w-[50%] items-center gap-2 pl-4 mt-7">
        <span className={`text-sm font-bold cursor-pointer ${activeTab === 'Elements' ? 'underline' : ''}`} onClick={()=>setActiveTab('Elements')}>Elements</span>
        <span className={`text-sm font-bold cursor-pointer ${activeTab === 'Layouts' ? 'underline' : ''}`} onClick={()=>setActiveTab('Layouts')}>Layouts</span>
      </div>
      <div className="w-full border-t-2 border-gray-300 mt-2">
        {activeTab === 'Elements' ? 
        <div>element</div> : 
        <div>Layouts</div>}
      </div>
    </div>
  )
}

export default AddElementContainer;