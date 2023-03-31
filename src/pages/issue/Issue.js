import React from 'react';
import {Grid, Breadcrumbs, Typography, Link} from '@mui/material';
import ElectricBoltIcon from '@mui/icons-material/ElectricBolt';
import FiberManualRecordRoundedIcon from '@mui/icons-material/FiberManualRecordRounded';
import LeftIssueDetail from 'src/components/issue/LeftIssueDetail';
import RightIssueDetail from 'src/components/issue/RightIssueDetail';
import {useLocation} from 'react-router-dom';

function Issue() {
  const location = useLocation();
  const issueId = location.pathname.split('/')[3];

  return (
    <div>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <Breadcrumbs separator="›" aria-label="breadcrumb" sx={{mb: 2}}>
            <Link
              underline="hover"
              key="1"
              color="inherit"
              href="/workspace-setting"
              onClick={() => {}}
              sx={{fontFamily: 'Open Sans, sans-serif'}}
            >
              Dang's Workspace
            </Link>
            <Link
              underline="hover"
              key="2"
              color="inherit"
              href="/roadmap"
              onClick={() => {}}
              sx={{fontFamily: 'Open Sans, sans-serif'}}
            >
              First Scrum Project
            </Link>
            <Typography key="3" color="text.primary" sx={{fontSize: 'inherit'}}>
              DWP-11
            </Typography>
          </Breadcrumbs>
        </Grid>
      </Grid>

      <Grid container spacing={2}>
        <Grid item xs={6}>
          <Breadcrumbs separator="›" aria-label="breadcrumb" sx={{mb: 4}}>
            <Link
              underline="hover"
              key="1"
              color="inherit"
              href="/workspace-setting"
              onClick={() => {}}
              sx={{fontFamily: 'Open Sans, sans-serif'}}
            >
              <ElectricBoltIcon
                sx={{
                  backgroundColor: 'purple',
                  color: 'white',
                  borderRadius: 1,
                  width: 24,
                  height: 24,
                  padding: 0.25,
                  marginRight: 1,
                }}
              />
              Dang's Workspace
            </Link>
            <Typography
              key="3"
              color="text.primary"
              sx={{fontFamily: 'Open Sans, sans-serif'}}
            >
              <FiberManualRecordRoundedIcon
                sx={{
                  backgroundColor: 'red',
                  color: 'white',
                  borderRadius: 1,
                  width: 24,
                  height: 24,
                  padding: 0.25,
                  marginRight: 1,
                }}
              />
              DWP-11
            </Typography>
          </Breadcrumbs>
        </Grid>
      </Grid>

      <Grid container spacing={2}>
        <Grid item xs={7}>
          <LeftIssueDetail issueId={issueId} />
        </Grid>

        <Grid item xs={5}>
          <RightIssueDetail issueId={issueId} />
        </Grid>
      </Grid>
    </div>
  );
}

export default Issue;
