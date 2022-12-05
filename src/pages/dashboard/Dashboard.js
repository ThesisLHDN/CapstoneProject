import React from 'react';
import {Typography, Grid, Breadcrumbs, Link} from '@mui/material';
// import SortRoundedIcon from "@mui/icons-material/SortRounded"

function Dashboard() {
  return (
    <div>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <Breadcrumbs separator="›" aria-label="breadcrumb" sx={{mb: 2}}>
            <Link
              underline="hover"
              key="1"
              color="inherit"
              href="/"
              onClick={() => {}}
              sx={{fontFamily: 'Open Sans, sans-serif'}}
            >
              Dang's Workspace
            </Link>
            <Link
              underline="hover"
              key="2"
              color="inherit"
              href="/backlog"
              onClick={() => {}}
              sx={{fontFamily: 'Open Sans, sans-serif'}}
            >
              First Scrum Project
            </Link>
            <Typography
              key="3"
              color="text.primary"
              sx={{fontFamily: 'Open Sans, sans-serif'}}
            >
              Dashboard
            </Typography>
          </Breadcrumbs>
        </Grid>
      </Grid>

      <Typography
        variant="h5"
        sx={{
          color: 'green',
          fontWeight: 700,
          fontFamily: 'Open Sans, sans-serif',
        }}
      >
        Dashboard
      </Typography>
    </div>
  );
}

export default Dashboard;
