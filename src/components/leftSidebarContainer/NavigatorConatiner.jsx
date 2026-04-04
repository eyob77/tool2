import { useBuilder } from "../../context/builderContext";

const NavigatorItem = ({ item, depth = 0 }) => {
  return (
    <div className="flex flex-col">
      <div 
        style={{ paddingLeft: `${depth * 12}px` }}
        className="flex items-center gap-2 py-1 hover:bg-blue-100 cursor-pointer text-sm border-b border-gray-100"
      >
        <span className="text-gray-400">#</span>
        <span className="font-medium text-gray-700">{item.type}</span>
      </div>
      {item.children?.map(child => (
        <NavigatorItem key={child.id} item={child} depth={depth + 1} />
      ))}
    </div>
  );
};


const NavigatorContainer = ()=>{
 const { treeMirror } = useBuilder();

  if (!treeMirror) return <div className="p-4 text-gray-400">Loading layers...</div>;

  return (
    <div className="flex flex-col bg-white h-full border-l overflow-y-auto">
      <div className="p-3 bg-gray-50 font-bold text-xs uppercase text-gray-500">Navigator</div>
      <NavigatorItem item={treeMirror} />
    </div>
  );
}

export default NavigatorContainer;