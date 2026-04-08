import { useState } from "react";
import StylePanel from "../rightSideBarContainer/styleBar";
const links=[
  {name:'Style',id:1},
]
const RightSidebar =()=>{
  const [activeTab, setActiveTab] = useState('Style');

  return (
    <div className="w-[10%] h-full border-l-2 border-gray-300 absolute right-0 top-0">
      
      <h3 className="h-[3%] font-light pl-4">selected element</h3>
      <div className="h-[3%] w-full flex justify-start gap-2 items-center pl-4">
        <span className={`text-sm font-bold cursor-pointer ${activeTab === 'Style' ? 'underline' : ''}`} onClick={()=>setActiveTab('Style')}>Style</span>      
        <span className={`text-sm font-bold cursor-pointer ${activeTab === 'Settings' ? 'underline' : ''}`} onClick={()=>setActiveTab('Settings')}>Settings</span>      
        <span className={`text-sm font-bold cursor-pointer ${activeTab === 'Interactions' ? 'underline' : ''}`} onClick={()=>setActiveTab('Interactions')}>Interactions</span>      
      </div>
       <div className="h-[94%] w-full border-t-2 border-gray-300">
        {activeTab === 'Style' && <StylePanel/>}
        {activeTab === 'Settings' && <p>Settings content</p>}
        {activeTab === 'Interactions' && <p>Interactions content</p>}
       </div>

    </div>
  )
}

export default RightSidebar;