import LeftSidebar from "../designer/LeftSidebar";
import RightSidebar from "../designer/RightSidebar";
import CanvasFrame from "./CanvasFrame";

const Editor = () => {
  return (
    <div className="w-screen h-[97%] relative left-0 top-[3%]">
      <RightSidebar />
      <CanvasFrame />
      <LeftSidebar />
    </div>
  )
}

export default Editor;