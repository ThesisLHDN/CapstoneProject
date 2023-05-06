import React, {useContext, useState} from 'react';
import {color} from 'src/style';
import {Typography, Box, Button, Grid, Breadcrumbs, Link} from '@mui/material';
import SearchBar from 'src/components/search';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';
import TaskList from 'src/components/backlog/TaskList';
import Filter from 'src/components/Filter';
import Sort from 'src/components/Sort';
import {AppContext} from 'src/Context/AppProvider';
import {AuthContext} from 'src/Context/AuthProvider';

function Backlog() {
  const [isHide, setIsHide] = useState(true);
  const {project} = useContext(AppContext);
  const [fil, setFil] = useState(false);
  const [vals, setVals] = useState({
    status: '',
    type: '',
    priority: '',
  });
  const [srt, setSrt] = useState(false);
  const [srtVal, setSrtVal] = useState('None');
  const {
    user: {uid},
  } = useContext(AuthContext);

  return (
    <div>
      <Grid container spacing={2}>
        <Grid item xs={5}>
          <Breadcrumbs separator="›" aria-label="breadcrumb" sx={{mb: 2}}>
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
            <Typography key="3" color="text.primary" sx={{fontSize: 'inherit'}}>
              Backlog
            </Typography>
          </Breadcrumbs>
        </Grid>
      </Grid>

      <Typography
        variant="h5"
        sx={{
          color: color.green03,
          fontWeight: 700,
          fontFamily: 'Open Sans, sans-serif',
        }}
      >
        Backlog
      </Typography>

      <Box
        sx={{
          display: 'flex',
          gap: 1,
          gridTemplateColumns: 'repeat(4, 1fr)',
          mt: 2,
        }}
      >
        {/* <SearchBar sx={{width: '210px'}} /> */}
        <Filter vals={vals} setVals={setVals} setFil={setFil} />
        <Sort setSrtVal={setSrtVal} setSrt={setSrt} />
        {isHide ? (
          <Button
            variant="text"
            startIcon={<VisibilityOffOutlinedIcon />}
            sx={{
              color: '#181818',
              textTransform: 'none',
              fontFamily: 'Open Sans, sans-serif',
            }}
            onClick={() => setIsHide(!isHide)}
          >
            Unhide Completed Sprint
          </Button>
        ) : (
          <Button
            variant="text"
            startIcon={<VisibilityOutlinedIcon />}
            sx={{
              color: '#181818',
              textTransform: 'none',
              fontFamily: 'Open Sans, sans-serif',
            }}
            onClick={() => setIsHide(!isHide)}
          >
            Hide Completed Sprint
          </Button>
        )}
      </Box>

      <div className="mt-5">
        <TaskList
          hide={isHide}
          vals={vals}
          fil={fil}
          setFil={setFil}
          srtVal={srtVal}
          srt={srt}
          setSrt={setSrt}
        />
      </div>
    </div>
  );
}

export default Backlog;
