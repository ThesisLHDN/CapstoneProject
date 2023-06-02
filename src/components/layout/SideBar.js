import React, {useState, useContext, useEffect} from 'react';
import {AuthContext} from 'src/Context/AuthProvider';
import {NavLink, useLocation} from 'react-router-dom';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import ViewWeekOutlinedIcon from '@mui/icons-material/ViewWeekOutlined';
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
import DashboardOutlinedIcon from '@mui/icons-material/DashboardOutlined';
import ViewTimelineOutlinedIcon from '@mui/icons-material/ViewTimelineOutlined';
import ViewListOutlinedIcon from '@mui/icons-material/ViewListOutlined';
import axios from 'src/hooks/axios';
import {AppContext} from 'src/Context/AppProvider';
import {SocketContext} from 'src/Context/SocketProvider';

function SideBar(props) {
  const location = useLocation();
  const user = location.search;
  const pId = location.pathname.split('/')[2];
  const links = [
    {
      name: 'Roadmap',
      link: '/roadmap/' + pId,
      icon: <ViewTimelineOutlinedIcon style={{fontSize: '34px'}} />,
    },
    {
      name: 'Backlog',
      link: '/backlog/' + pId,
      icon: <ViewListOutlinedIcon style={{fontSize: '34px'}} />,
    },
    {
      name: 'Board',
      link: '/board/' + pId,
      icon: <ViewWeekOutlinedIcon style={{fontSize: '34px'}} />,
    },
    {
      name: 'Document',
      link: '/document/' + pId,
      icon: <DescriptionOutlinedIcon style={{fontSize: '34px'}} />,
    },
    {
      name: 'Dashboard',
      link: '/dashboard/' + pId,
      icon: <DashboardOutlinedIcon style={{fontSize: '34px'}} />,
    },
    {
      name: 'Project Settings',
      link: '/project-setting/' + pId,
      icon: <SettingsOutlinedIcon style={{fontSize: '34px'}} />,
    },
  ];
  const [isActive, setIsActive] = useState(false);
  const [workspaces, setWorkspaces] = useState([]);
  const {project, setProject} = useContext(AppContext);
  const {socket} = useContext(SocketContext);
  // const [char, setChar] = useState('');

  const {
    user: {uid},
  } = useContext(AuthContext);

  const fetchWorkspacesData = async () => {
    try {
      const res = await axios.get(`/workspaces${user}`);
      setWorkspaces(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const fetchProjectData = async () => {
    try {
      const res = await axios.get(`/project/${pId}`);
      setProject(res.data);
    } catch (err) {
      console.log(err);
    }
    // setChar(project.pname?.charAt(0));
  };

  useEffect(() => {
    fetchProjectData();
    fetchWorkspacesData();
    socket?.emit('newUser', uid);
  }, [location.pathname]);

  const handleClick = () => {
    setIsActive(!isActive);
  };

  return (
    <div className="fixed overflow-auto bg-gray-200 h-screen w-1/6">
      {props.wp ? (
        <div>
          <div className="mt-5 mx-6 ">
            <p className="text-2xl font-black text-green-tx uppercase text-center">
              Workspaces
            </p>
          </div>
          <div>
            <p className="mx-6 mt-4 h-0.5 border-0 bg-black font-extrabold shadow-2xl"></p>
          </div>
          <div className="mt-3">
            {workspaces?.map((wp) => (
              <NavLink
                key={wp.id}
                to={`/workspace-setting/${wp.id}?user=${uid}`}
                onClick={() => handleClick()}
                className={({isActive}) => (isActive ? 'text-green-tx' : '')}
              >
                <div className="hover:bg-gray-300">
                  <div
                    key={wp.wsname}
                    className="px-5 pt-3 pb-3 font-semibold "
                  >
                    <span className="2xl:text-lg lg:text-base py-0.5">
                      {wp.wsname}
                    </span>
                  </div>
                </div>
              </NavLink>
            ))}
          </div>
        </div>
      ) : (
        <div>
          <div className="flex mt-5 mx-6">
            <p
              style={{
                backgroundImage:
                  'linear-gradient(to bottom right, #FAFF00, #5DDED6, #00FF0A)',
              }}
              className="text-4xl font-extrabold px-3 py-0.5 rounded text-white"
            >
              {project.pname ? project.pname[0].toUpperCase() : ''}
            </p>
            <p className="ml-3 2xl:text-base xl:text-sm py-3 font-semibold text-green-tx overflow-hidden truncate">
              {project.pname}
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
                  }
                >
                  {item.icon}
                  <span className="ml-3 text-sm py-0.5">{item.name}</span>
                </NavLink>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default SideBar;
