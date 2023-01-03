import React from 'react';
import 'src/App.scss';
import {Typography, Breadcrumbs, Link, Button, Box, Grid} from '@mui/material';
import Gantt from './Gantt';
import Toolbar from './toolbar';
// import MessageArea from './messageArea';
import {styled} from '@mui/material/styles';

import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
// import AccessTimeRoundedIcon from '@mui/icons-material/AccessTimeRounded';
// import PermIdentityRoundedIcon from '@mui/icons-material/PermIdentityRounded';
// import FilterListRoundedIcon from '@mui/icons-material/FilterListRounded';
import FilterAltRoundedIcon from '@mui/icons-material/FilterAltRounded';
// import SortRoundedIcon from '@mui/icons-material/SortRounded';

import SearchBar from 'src/components/search';

import data from './tasks';

function handleClick(event) {
  event.preventDefault();
  console.info('You clicked a breadcrumb.');
}
const GrayButton = styled(Button)({
  backgroundColor: '#cdcdcd',
  color: 'black',
  borderRadius: 3,
  height: 32,
  '&:hover': {
    backgroundColor: '#ddd',
  },
});

function RoadMap() {
  const [zoom, setZoom] = React.useState('Days');
  const [messagesState, setMessagesState] = React.useState([]);
  // d

  const addMessage = (message) => {
    const maxLogLength = 5;
    const newMessage = {message};
    const messages = [newMessage, ...messagesState];

    if (messages.length > maxLogLength) {
      messages.length = maxLogLength;
    }
    setMessagesState(messages);
  };

  const logDataUpdate = (type, action, item, id) => {
    let text = item && item.text ? ` (${item.text})` : '';
    let message = `${type} ${action}: ${id} ${text}`;
    if (type === 'link' && action !== 'delete') {
      message += ` ( source: ${item.source}, target: ${item.target} )`;
    }
    addMessage(message);
  };

  const handleZoomChange = (zoom) => {
    setZoom(zoom);
  };

  return (
    <div style={{textAlign: 'left'}}>
      <Grid container spacing={2}>
        <Grid item xs={5}>
          <Breadcrumbs separator=">" aria-label="breadcrumb" sx={{mb: 2}}>
            [
            <Link
              underline="hover"
              key="1"
              color="inherit"
              href="/"
              onClick={handleClick}
            >
              Dang&apos;s Workspace
            </Link>
            ,
            <Link
              underline="hover"
              key="2"
              color="inherit"
              href="/material-ui/getting-started/installation/"
              onClick={handleClick}
            >
              First Scrum Project
            </Link>
            ,
            <Typography key="3" color="text.primary">
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
        >
          {/* <Typography sx={{mx: 1, display: 'flex', justifyItems: 'center'}}>
            <AccessTimeRoundedIcon sx={{mr: 1}} />
            10 days remaining
          </Typography> */}
          {/* <GrayButton variant="contained">Complete sprint</GrayButton> */}
          <GrayButton sx={{mx: 1, width: '32px !important', minWidth: 32}}>
            <MoreHorizIcon />
          </GrayButton>
        </Grid>
      </Grid>
      <Typography variant="h5" sx={{color: 'green', fontWeight: 700}}>
        RoadMap
      </Typography>
      <Typography variant="caption" sx={{color: '#555'}}>
        Lorem Ipsum is simply dummy text of the printing and typesetting
        industry. Lorem Ipsum has been the industry&apos; s standard dummy text
        ever since the 1500s, when an unknown printer took a galley of type and
        scrambled it to make a type specimen book.
      </Typography>

      <Box
        sx={{
          display: 'flex',
          gap: 1,
          gridTemplateColumns: 'repeat(4, 1fr)',
          mt: 1,
        }}
      >
        <SearchBar sx={{width: '250px'}} />
        <Button
          variant="text"
          startIcon={<FilterAltRoundedIcon />}
          sx={{color: '#181818'}}
        >
          Filter
        </Button>
        {/* <Button
          variant="text"
          startIcon={<SortRoundedIcon />}
          sx={{color: '#181818'}}
        >
          Sort
        </Button>*/}
        {/* <Button
          variant="text"
          startIcon={<PermIdentityRoundedIcon />}
          sx={{color: '#181818', textTransform: 'none'}}
        >
          Me
        </Button> */}
      </Box>

      <Box>
        <Box
          className="zoom-bar"
          sx={{display: 'flex', justifyContent: 'flex-end'}}
        >
          <Toolbar zoom={zoom} onZoomChange={handleZoomChange} />
        </Box>
        <Box className="gantt-container">
          <Gantt tasks={data} zoom={zoom} onDataUpdated={logDataUpdate} />
        </Box>
        {/* <MessageArea messages={messagesState} /> */}
      </Box>
    </div>
  );
}

export default RoadMap;
