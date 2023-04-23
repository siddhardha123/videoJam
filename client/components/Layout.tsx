import React from "react";
import Navbar from "./NavBar";
const Layout = ({ children } : any) => {
  return (
    <>
      <Navbar />
      {children}
    </>
  );
};
export default Layout;