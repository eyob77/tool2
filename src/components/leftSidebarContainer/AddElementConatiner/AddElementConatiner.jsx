
import { useState } from "react";
import { Collapsable, IconDisplayElement } from "../../designer/utils";
import { Elements } from "./Eelements";
import { useBuilder } from "../../../context/builderContext";


const AddElementContainer = ()=>{
  const [activeTab, setActiveTab] = useState('Elements');
  return (
    <div className="w-full h-full flex-col gap-1">
      <h2 className="h-[3%] font-bold pl-4 pt-1">Add</h2>
      <div className="h-[3%] w-full flex justify-start gap-2 items-center pl-4">
        <span className={`text-sm font-bold cursor-pointer ${activeTab === 'Elements' ? 'underline' : ''}`} onClick={()=>setActiveTab('Elements')}>Elements</span>
        <span className={`text-sm font-bold cursor-pointer ${activeTab === 'Layouts' ? 'underline' : ''}`} onClick={()=>setActiveTab('Layouts')}>Layouts</span>
      </div>
      <div className="h-[94%] w-full border-t-2 border-gray-300">
        {activeTab === 'Elements' ? 
          <ElementContainer />: 
          <LayoutContainer/>
        }
      </div>
    </div>
  )
}

export default AddElementContainer;


const ElementContainer = () => {

  const [searchTerm,setSearchTerm] = useState("");

  const filteredElements = Elements.map(e=>e.elements).flat().filter(item=>
    item.name?.toLowerCase().includes(searchTerm.toLowerCase())
  )
  const { setIsDragging } = useBuilder();

  const handleDragStart = (e, type) => {
    setIsDragging(true);
    e.dataTransfer.setData("compType", type);
  };
  return (
 
    <div className="w-full h-full flex flex-col gap-3 pt-2">
      
      {/* Search Bar Section: flex-none prevents it from shrinking */}
      <div className="pl-4 flex-none">
       <input 
          type="text" 
          placeholder="Search elements" 
          value={searchTerm || ""}
          onChange={(e) => {setSearchTerm(e.target.value)}} // 3. Update state on change
          className="indent-2 w-[95%] h-7.5 placeholder:text-sm rounded-sm placeholder:indent-2 border-2 border-gray-300 focus:indent-2 focus:outline-none text-sm"
        />
      </div>


      <div className="flex-1 min-h-0 w-full">
        {/* <div className="w-full h-full overflow-y-auto pb-10 custom-scrollbar">
          {searchTerm &&
            <div className="w-full! h-max flex justify-center px-px! mb-2">
                {filteredElements?.length > 0 ? (
                  <div className="w-[99%] h-full grid grid-cols-3 rounded-sm gap-0.5">
                    {filteredElements.map(( el,i) => (
                      <IconDisplayElement Svg={el.svg} name={el.name} key={i}/>
                    ))}
                  </div>
                ) : (
                  <div className="pl-4 text-gray-500 text-sm">No elements found.</div>
                )}
            </div>
          }
          {!searchTerm &&
          <>
            {Elements?.map((rowCollapsable, index) => (
              <Collapsable rowCollapsable={rowCollapsable} key={index} />
            ))}
          </>
          }
          
        </div> */}
        <div className="w-64 bg-white border-r p-4 flex flex-col gap-4">
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
          <div
            draggable
            onDragStart={(e) => handleDragStart(e, 'section')}
            className="p-4 border-2 border-dashed border-gray-300 rounded cursor-move hover:border-blue-500"
          >
            Container
          </div>
        </div>
      </div>

    </div>
  );
};

const LayoutContainer =()=>{
  return (
    <div>
      hi layout
    </div>
  )
}