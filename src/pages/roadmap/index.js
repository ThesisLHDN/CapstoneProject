import {useState, useEffect, useContext} from 'react';
import 'src/App.scss';
import {Typography, Breadcrumbs, Link, Box, Grid} from '@mui/material';
import Gantt from './Gantt';
import Toolbar from './toolbar';
import {color} from 'src/style';
import {useLocation} from 'react-router-dom';
import axios from 'src/hooks/axios';
import {AppContext} from 'src/Context/AppProvider';
import {AuthContext} from 'src/Context/AuthProvider';
// import MessageArea from './messageArea';
import moment from 'moment/moment';

// import Filter from 'src/components/Filter';
// import AccessTimeRoundedIcon from '@mui/icons-material/AccessTimeRounded';
// import PermIdentityRoundedIcon from '@mui/icons-material/PermIdentityRounded';
// import FilterListRoundedIcon from '@mui/icons-material/FilterListRounded';
// import FilterAltRoundedIcon from '@mui/icons-material/FilterAltRounded';
// import SortRoundedIcon from '@mui/icons-material/SortRounded';
// import {colorHover} from 'src/style';

// import SearchBar from 'src/components/search';

// function handleClick(event) {
//   event.preventDefault();
//   console.info('You clicked a breadcrumb.');
// }

function RoadMap() {
  const location = useLocation();
  const pId = location.pathname.split('/')[2];
  const [zoom, setZoom] = useState('Days');
  const [messagesState, setMessagesState] = useState([]);
  const [issues, setIssues] = useState({data: []});
  const {
    user: {uid},
  } = useContext(AuthContext);
  const {project} = useContext(AppContext);

  const fetchIssuesData = async () => {
    try {
      const res = await axios.get(`/issues/${pId}`);

      const data = {
        data: res.data.map((issue) => {
          console.log(
            moment(issue.dueDate, 'YYYY-MM-DD HH:mm:ss'),
            moment(issue.createTime, 'YYYY-MM-DD HH:mm:ss'),
          );
          return {
            text: issue.issuename,
            id: issue.id,
            start_date: new Date(issue.createTime),
            duration: issue.dueDate
              ? moment(issue.dueDate, 'YYYY-MM-DD HH:mm:ss').diff(
                  moment(issue.createTime, 'YYYY-MM-DD HH:mm:ss'),
                  'days',
                )
              : 1,
            parent: issue.parentId ? issue.parentId : 0,
            progress: 100,
            status: issue.issuestatus,
            open: true,
            projectId: issue.projectId,
            cId: issue.cycleId,
          };
        }),
      };
      setIssues(data);
    } catch (err) {
      console.log(err);
    }
  };

  const updateIssue = async (cId, id, status, startDate, dueDate) => {
    try {
      const res = await axios.put(`/issue/${id}`, {
        cId: cId,
        status: status,
        startDate: startDate,
        dueDate: dueDate ? dueDate : null,
      });
      console.log('Update successful', res);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchIssuesData();
  }, []);

  // const addMessage = (message) => {
  //   const maxLogLength = 5;
  //   const newMessage = {message};
  //   const messages = [newMessage, ...messagesState];

  //   if (messages.length > maxLogLength) {
  //     messages.length = maxLogLength;
  //   }
  //   setMessagesState(messages);
  // };

  const updateItem = (type, action, item, id) => {
    convertTime(item.start_date, item.end_date);
    updateIssue(
      item.cId,
      item.id,
      item.status,
      convertTime(item.start_date),
      convertTime(item.end_date),
    );
  };

  const convertTime = (time) => {
    const tSplit = time.split(' ');
    const dateSplit = tSplit[0].split('-');
    return `${dateSplit[2]}-${dateSplit[1]}-${dateSplit[0]} ${tSplit[1]}:00`;
  };

  const handleZoomChange = (zoom) => {
    setZoom(zoom);
  };

  return (
    <div style={{textAlign: 'left'}}>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <Breadcrumbs separator="›" aria-label="breadcrumb" sx={{mb: 2}}>
            [
            <Link
              underline="hover"
              key="1"
              color="inherit"
              href={`/workspace-setting/${project.workspaceId}?user=${uid}`}
              onClick={() => {}}
              sx={{fontFamily: 'Open Sans, sans-serif'}}
            >
              {project.wsname}
            </Link>
            ,
            <Link
              underline="hover"
              key="2"
              color="inherit"
              href={`/roadmap/${project.id}`}
              onClick={() => {}}
              sx={{fontFamily: 'Open Sans, sans-serif'}}
            >
              {project.pname}
            </Link>
            ,
            <Typography key="3" color="text.primary" sx={{fontSize: 'inherit'}}>
              Roadmap
            </Typography>
            , ]
          </Breadcrumbs>
        </Grid>
        <Grid
          item
          xs={7}
          sx={{
            display: 'flex',
            justifyContent: 'flex-end',
            alignItems: 'center',
          }}
        ></Grid>
      </Grid>
      <Typography variant="h5" sx={{color: color.green03, fontWeight: 700}}>
        RoadMap
      </Typography>
      <Box>
        <Box
          className="zoom-bar"
          sx={{display: 'flex', justifyContent: 'flex-end'}}
        >
          <Toolbar zoom={zoom} onZoomChange={handleZoomChange} />
        </Box>
        <Box className="gantt-container">
          {issues && issues.data.length ? (
            <Gantt
              projectId={pId}
              tasks={issues}
              zoom={zoom}
              onDataUpdated={updateItem}
            />
          ) : (
            <>
              {' '}
              <Gantt
                tasks={{data: []}}
                zoom={zoom}
                onDataUpdated={updateItem}
              />
            </>
          )}
        </Box>
        {/* <MessageArea messages={messagesState} /> */}
      </Box>
    </div>
  );
}

export default RoadMap;
