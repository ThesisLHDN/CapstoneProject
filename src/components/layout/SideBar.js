import React, {useState} from 'react';
import {NavLink} from 'react-router-dom';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import ViewWeekOutlinedIcon from '@mui/icons-material/ViewWeekOutlined';
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
import DashboardOutlinedIcon from '@mui/icons-material/DashboardOutlined';
import ViewTimelineOutlinedIcon from '@mui/icons-material/ViewTimelineOutlined';
import ViewListOutlinedIcon from '@mui/icons-material/ViewListOutlined';
// import WPQuickSetting from '../WPQuickSetting';

const links = [
  {
    name: 'Roadmap',
    link: '/roadmap',
    icon: <ViewTimelineOutlinedIcon style={{fontSize: '34px'}} />,
  },
  {
    name: 'Backlog',
    link: '/backlog',
    icon: <ViewListOutlinedIcon style={{fontSize: '34px'}} />,
  },
  {
    name: 'Board',
    link: '/board',
    icon: <ViewWeekOutlinedIcon style={{fontSize: '34px'}} />,
  },
  {
    name: 'Document',
    link: '/document',
    icon: <DescriptionOutlinedIcon style={{fontSize: '34px'}} />,
  },
  {
    name: 'Dashboard',
    link: '/dashboard',
    icon: <DashboardOutlinedIcon style={{fontSize: '34px'}} />,
  },
  {
    name: 'Project Settings',
    link: '/project-setting',
    icon: <SettingsOutlinedIcon style={{fontSize: '34px'}} />,
  },
];

const sampleWP = [
  {
    name: "Hai Dang's Workspace",
    link: '/workspace-setting',
  },
  {
    name: "Lam Nguyen's Workspaces of ABC",
    link: '/abc',
  },
]

function SideBar(props) {
  const [isActive, setIsActive] = useState(false);

  return (
    <div className="fixed overflow-auto bg-gray-200 h-screen w-1/6">
      {props.wp ? <div>
        <div className="mt-5 mx-6 ">
          <p className="text-2xl font-black text-green-tx uppercase text-center">
            Workspaces
          </p>
        </div>
        <div>
          <p className="mx-6 mt-4 h-0.5 border-0 bg-black font-extrabold shadow-2xl"></p>
        </div>
        <div className="mt-3">
          {sampleWP.map((wp) => (
            <NavLink
              to={wp.link}
              onClick={() => setIsActive(!isActive)}
              className={({isActive}) => isActive ? 'text-green-tx' : ''}
            >
              <div className="hover:bg-gray-300" >
                <div key={wp.name} className="px-5 pt-3 pb-3 font-semibold ">
                  <span className="2xl:text-lg lg:text-base py-0.5">{wp.name}</span>
                </div>
              </div>
            </NavLink>  
          ))}
        </div>
      </div> : <div>
        <div className="flex mt-5 mx-6">
          <p
            style={{ backgroundImage:'linear-gradient(to bottom right, #FAFF00, #5DDED6, #00FF0A)', }}
            className="text-4xl font-extrabold px-3 py-0.5 rounded text-white"
          >F</p>
          <p className="ml-3 2xl:text-base xl:text-sm py-3 font-semibold text-green-tx overflow-hidden truncate">
            First Scrum Project
          </p>
        </div>

        <div>
          <p className="mx-6 mt-5 h-px border-0 bg-gray-400 font-extrabold shadow-2xl"></p>
        </div>

        <div className="mx-8 mt-5">
          {links.map((item) => (
            <div key={item.name} className="mt-2 hover:text-green-tx">
              <NavLink
                to={item.link}
                onClick={() => setIsActive(!isActive)}
                className={({isActive}) =>
                  isActive ? 'text-green-tx font-bold' : ''
              }>
                {item.icon}
                <span className="ml-3 text-sm py-0.5">{item.name}</span>
              </NavLink>
            </div>
          ))}
        </div>
        {/* <WPQuickSetting /> */}
      </div>}
    </div>
  );
}

export default SideBar;
