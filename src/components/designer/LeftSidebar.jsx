import { Box, Droplets, File, Images, ListFilter, Plus, Search, Settings, Variable, Zap } from "lucide-react";
import { useState } from "react";
import { HorizontalDivider } from "./utils";
import AddElementContainer from "../leftSidebarContainer/AddElementConatiner/AddElementConatiner";
import AssetContainer from "../leftSidebarContainer/AssetConatiner";
import InteractionsContainer from "../leftSidebarContainer/InteractionsConatiner";
import StyleSelectorContainer from "../leftSidebarContainer/StyleSelectorConatiner";
import VariablesContainer from "../leftSidebarContainer/VariablesConatiner";
import ComponentsContainer from "../leftSidebarContainer/ComponentsContaine";
import NavigatorContainer from "../leftSidebarContainer/NavigatorConatiner";
import PagesContainer from "../leftSidebarContainer/PagesConatiner";

import { Tooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";

const linksTop = [
  {
    name: 'Add Element',
    icon: <Plus/>,
    id:1
  },
  {
    name: 'Pages',
    icon: <File/>,
    id:2
  },
  {
    name: 'Navigator',
    icon: <ListFilter/>,
    id:3
  },
  {
    name: 'Components',
    icon: <Box/>,
    id:4
  },
  {
    name: 'Variables',
    icon: <Variable/>,
    id:5
  },
  {
    name: 'Style Selector',
    icon: <Droplets/>,
    id:6
  },
  {
    name: 'Interactions',
    icon: <Zap/>,
    id:7
  },
  {
    name: 'Asset',
    icon: <Images/>,
    id:8
  },
]

const linksBottom = [
  {
    name: 'Settings',
    icon: <Settings/>,
    id:1
  },
  {
    name: 'Find Anything',
    icon: <Search/>,
    id:2
  }
]

const LeftSidebar = ()=>{
  const [activeTab, setActiveTab] = useState('Navigator');

  return (
    <div className="w-[15%] h-full border-r-2 border-gray-300 absolute left-0 top-0">

      <div className="w-full h-full flex">
        <div className="flex-2 h-full flex flex-col justify-between px-1 py-2 border-r-2 border-gray-300">
          <div className="w-full  flex flex-col items-center justify-center gap-1">
            {linksTop.map(link=>(
              <>
                <div
                  data-tooltip-id="sidebar-tooltip"
                  data-tooltip-content={link.name}
                  key={link.id} 
                  onClick={()=>setActiveTab(link.name)} 
                  className={`w-full h-10 flex items-center justify-start gap-2 px-2 rounded cursor-pointer ${activeTab === link.name ? 'bg-gray-300' : 'hover:bg-gray-00'}`}>
                  {link.icon}
                  {/* <span className="text-xs">{link.name}</span> */}
                </div>
                {link.id === 3 && <HorizontalDivider />}
              </>
            ))}
            <Tooltip id="sidebar-tooltip" place="right" offset={10}/>
          </div>
          <div className="w-full flex flex-col items-center justify-center gap-1">
            {linksBottom.map(link=>(
              <div
                data-tooltip-id="sidebar-tooltip"
                data-tooltip-content={link.name}
                key={link.id} 
                onClick={()=>setActiveTab(link.name)} 
                className={`w-full h-10 flex items-center justify-center gap-2 px-2 rounded cursor-pointer ${activeTab === link.name ? 'bg-gray-300' : 'hover:bg-gray-00'}`}>
                {link.icon}
                {/* <span className="text-xs">{link.name}</span> */}
              </div>
            ))}
            <Tooltip id="sidebar-tooltip" place="right" offset={10}/>
          </div>
        </div>
        <div className="flex-13 h-full">
          {activeTab === 'Add Element' && <AddElementContainer />}
          {activeTab === 'Pages' && <PagesContainer />}
          {activeTab === 'Navigator' && <NavigatorContainer />}
          {activeTab === 'Components' && <ComponentsContainer />}
          {activeTab === 'Variables' && <VariablesContainer />}
          {activeTab === 'Style Selector' && <StyleSelectorContainer />}
          {activeTab === 'Interactions' && <InteractionsContainer />}
          {activeTab === 'Asset' && <AssetContainer />}
        </div>
      </div>
    </div>
  )
}

export default LeftSidebar;