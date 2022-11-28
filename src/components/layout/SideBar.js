import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import ViewWeekOutlinedIcon from '@mui/icons-material/ViewWeekOutlined';
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
import DashboardOutlinedIcon from '@mui/icons-material/DashboardOutlined';
import ViewTimelineOutlinedIcon from '@mui/icons-material/ViewTimelineOutlined';
import ViewListOutlinedIcon from '@mui/icons-material/ViewListOutlined';

const links = [
  {
    name: 'Roadmap',
    link: '/roadmap',
    icon: <ViewTimelineOutlinedIcon style={{ fontSize: "34px" }} />
  },
  {
    name: 'Backlog',
    link: '/backlog',
    icon: <ViewListOutlinedIcon style={{ fontSize: "34px" }} />
  },
  {
    name: 'Board',
    link: '/board',
    icon: <ViewWeekOutlinedIcon style={{ fontSize: "34px" }} />
  },
  {
    name: 'Document',
    link: '/document',
    icon: <DescriptionOutlinedIcon style={{ fontSize: "34px" }} />
  },
  {
    name: 'Dashboard',
    link: '/dashboard',
    icon: <DashboardOutlinedIcon style={{ fontSize: "34px" }} />
  },
  {
    name: 'Project Settings',
    link: '/project-settings',
    icon: <SettingsOutlinedIcon style={{ fontSize: "34px" }} />
  },
  
]

function SideBar() {
  const [isActive, setIsActive] = useState(false)

  return (
    <div 
      className="fixed left-0 right- overflow-auto bg-gray-200 h-screen"
      style={{ paddingLeft: "2%", paddingRight: "2%"}}
    >
      <div className="flex mt-5 justify-center">
        <p
          style={{ backgroundImage: "linear-gradient(to bottom right, #FAFF00, #5DDED6, #00FF0A)" }} 
          className="text-4xl font-extrabold 2xl:px-3.5 2xl:py-1 xl:px-3 xl:py-0.5  rounded text-white"
        >F</p>
        <p className="ml-3 2xl:text-base xl:text-sm py-3 font-semibold text-green-tx">First Scrum Project</p> 
      </div>
      <p class="2xl:mx-4 xl:mx-2 mt-5 h-px border-0 bg-gray-400 font-extrabold shadow-2xl"></p>

      <div className="ml-3 mt-5">
        {links.map((item) => (
          <div key={item.name} className="mt-2 hover:text-green-tx">
            <NavLink 
              to={item.link}
              onClick={() => setIsActive(!isActive)}
              className={({ isActive }) => isActive ? "text-green-tx font-bold" : ""}
            >
              {item.icon}
              <span className="ml-3 text-sm py-0.5">{item.name}</span>
            </NavLink>
          </div>
        ))}
      </div>
    </div>    
  );
}

export default SideBar;
