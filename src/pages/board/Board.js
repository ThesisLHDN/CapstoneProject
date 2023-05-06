// import React from 'react';
import 'src/App.scss';

import {Typography, Breadcrumbs, Link, Grid, Button, Box} from '@mui/material';
// import {styled} from '@mui/material/styles';

import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import AccessTimeRoundedIcon from '@mui/icons-material/AccessTimeRounded';
import PermIdentityRoundedIcon from '@mui/icons-material/PermIdentityRounded';
// import FilterAltRoundedIcon from '@mui/icons-material/FilterAltRounded';
// import SortRoundedIcon from '@mui/icons-material/SortRounded';

// import Scrum from 'src/components/scrum';
import AltScrum from 'src/components/scrum/altScrum';
import SearchBar from 'src/components/search';
import Filter from 'src/components/Filter';
import Sort from 'src/components/Sort';

import {color, colorHover} from 'src/style';
import {useContext, useEffect, useState} from 'react';
import axios from 'axios';
import {useLocation} from 'react-router-dom';
import {AppContext} from 'src/Context/AppProvider';
import {AuthContext} from 'src/Context/AuthProvider';

function handleClick(event) {
  event.preventDefault();
  console.info('You clicked a breadcrumb.');
}
// const GrayButton = styled(Button)({
//   backgroundColor: '#cdcdcd',
//   color: 'black',
//   borderRadius: 3,
//   height: 32,
//   '&:hover': {
//     backgroundColor: '#ddd',
//   },
// });
function Board() {
  const location = useLocation();
  const pId = location.pathname.split('/')[2];
  const [lastestSprint, setLastestSprint] = useState({});
  const {project} = useContext(AppContext);
  const {
    user: {uid},
  } = useContext(AuthContext);
  const [fil, setFil] = useState(false);
  const [vals, setVals] = useState({
    status: '',
    type: '',
    priority: '',
  });
  const [srt, setSrt] = useState(false);
  const [srtVal, setSrtVal] = useState('None');

  const fetchLastestSprint = async () => {
    try {
      const res = await axios.get(`http://localhost:8800/lastsprint/${pId}`);
      setLastestSprint(res.data);
      console.log(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchLastestSprint();
  }, []);
  console.log(srtVal);
  return (
    <Box style={{textAlign: 'left'}}>
      <Grid container spacing={2}>
        <Grid item xs={5}>
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
              Board
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
          <Typography
            sx={{
              mx: 1,
              display: 'flex',
              alignItems: 'center',
              fontSize: 14,
              mr: 2,
            }}
          >
            <AccessTimeRoundedIcon />
            {lastestSprint
              ? Math.ceil(
                  Math.abs(new Date(lastestSprint.endDate) - new Date()) /
                    (1000 * 60 * 60 * 24),
                )
              : '0'}{' '}
            days remaining
          </Typography>
          {/* <Button sx={{ ...colorHover.grayBtn, height: 32 }}>
            Complete sprint
          </Button> */}
          <Button
            sx={{
              mx: 1,
              width: '32px !important',
              minWidth: 32,
              height: 32,
              ...colorHover.grayBtn,
            }}
          >
            <MoreHorizIcon />
          </Button>
        </Grid>
      </Grid>
      <Typography variant="h5" sx={{color: color.green03, fontWeight: 700}}>
        {lastestSprint ? lastestSprint.cyclename : 'Board'}
      </Typography>
      <Typography variant="caption" sx={{color: '#555'}}>
        {lastestSprint ? lastestSprint.goal : ''}
      </Typography>

      <Box
        sx={{
          display: 'flex',
          gap: 1,
          gridTemplateColumns: 'repeat(4, 1fr)',
          mt: 2,
        }}
      >
        {/* <SearchBar sx={{width: '250px'}} /> */}
        <Filter vals={vals} setVals={setVals} setFil={setFil} />
        <Sort setSrtVal={setSrtVal} setSrt={setSrt} />
      </Box>
      <AltScrum
        sprint={lastestSprint}
        vals={vals}
        fil={fil}
        setFil={setFil}
        srtVal={srtVal}
        srt={srt}
        setSrt={setSrt}
      />
    </Box>
  );
}

export default Board;
