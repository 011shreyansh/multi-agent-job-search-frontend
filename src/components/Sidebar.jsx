import { NavLink } from "react-router-dom";
import {
    LayoutDashboard,
    FileText,
    Search,
    Heart,
    Briefcase,
    User
} from "lucide-react";

import "../styles/sidebar.css";

function Sidebar() {
    return (
        <aside className="sidebar">

            <div className="sidebar-logo">
                <div className="logo-box">N</div>
                <span>NextRole</span>
            </div>

            <nav className="sidebar-nav">

                <NavLink to="/dashboard">
                    <LayoutDashboard size={20} />
                    <span>Dashboard</span>
                </NavLink>

                <NavLink to="/master-resume">
                    <FileText size={20} />
                    <span>Resume</span>
                </NavLink>

                <NavLink to="/work-space">
                    <Search size={20} />
                    <span>WorkSpace</span>
                </NavLink>

                {/* <NavLink to="/saved-jobs">
                    <Heart size={20} />
                    <span>Saved Jobs</span>
                </NavLink> */}

                <NavLink to="/applications">
                    <Briefcase size={20} />
                    <span>Applications</span>
                </NavLink>

                <NavLink to="/profile">
                    <User size={20} />
                    <span>Profile</span>
                </NavLink>

            </nav>

            <div className="sidebar-bottom">
                <div className="profile-mini">
                    <div className="profile-avatar">AM</div>

                    <div>
                        <strong>Arjun Mehta</strong>
                        <span>arjun.mehta@example.com</span>
                    </div>
                </div>
            </div>

        </aside>
    );
}

export default Sidebar;