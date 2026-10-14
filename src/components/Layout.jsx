import { Outlet } from "react-router-dom";
 
import Sidebar from "./SideBar";

import Topbar from "./Topbar";
import "../styles/layout.css";

function Layout() {
    return (
        <div className="app-layout">

            <Sidebar />
            
            <Topbar />

            <main className="main-content">
                <Outlet />
            </main>

        </div>
    );
}

export default Layout;
 