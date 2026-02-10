import { Link } from "react-router-dom";

const Navbar = ()=>{
  return (
    <div className="fixed top-0 left-0 w-full h-[3%] border-b-2 border-gray-300">
      <Link to="/design">Design</Link>
      <Link to="/preview">Preview</Link>
    </div>
  )
}

export default Navbar;