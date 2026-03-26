import Navbar from "./components/designer/Navbar"

const DesignerLayout = ({ children }) => {
  return (
    <>
      <Navbar />
      {children}
    </>
  );
};

export default DesignerLayout;