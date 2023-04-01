import React, {useContext, useState} from 'react';
import {color} from 'src/style';
import {Typography, Box, Button, Grid, Breadcrumbs, Link} from '@mui/material';
import SearchBar from 'src/components/search';
// import FilterAltRoundedIcon from '@mui/icons-material/FilterAltRounded';
// import SortRoundedIcon from '@mui/icons-material/SortRounded';
import PermIdentityRoundedIcon from '@mui/icons-material/PermIdentityRounded';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';
import TaskList from 'src/components/backlog/TaskList';
import Filter from 'src/components/Filter';
import Sort from 'src/components/Sort';
import { AppContext } from 'src/Context/AppProvider';

function Backlog() {
  const [isHide, setIsHide] = useState(true);
  const {workspace, project} = useContext(AppContext);

  return (
    <div>
      <Grid container spacing={2}>
        <Grid item xs={5}>
          <Breadcrumbs separator="›" aria-label="breadcrumb" sx={{mb: 2}}>
            <Link
              underline="hover"
              key="1"
              color="inherit"
              href={`/workspace-setting/${workspace.id}`}
              onClick={() => {}}
              sx={{fontFamily: 'Open Sans, sans-serif'}}
            >
              {workspace.wsname}
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
        <SearchBar sx={{width: '210px'}} />
        <Filter />
        <Sort />
        {/* <Button
          variant="text"
          startIcon={<PermIdentityRoundedIcon />}
          sx={{
            color: '#181818',
            textTransform: 'none',
            fontFamily: 'Open Sans, sans-serif',
          }}
        >
          Me
        </Button> */}
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
        <TaskList hide={isHide} />
      </div>
    </div>
  );
}

export default Backlog;
