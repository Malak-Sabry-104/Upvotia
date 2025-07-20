import { Outlet } from "react-router-dom";
import MouseTrail from "./Mouse";
import NavBar from "./NavBar";
import Footer from "./Footer";

export default function Layout() {
  return (
    <>
      <MouseTrail /> {/* 👈 Add this */}
      <NavBar />      {/* your nav or layout */}
        <Outlet />    {/* all page content */}
<Footer/>
    </>
  );
}
