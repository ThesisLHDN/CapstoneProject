import React, {useContext, useEffect, useState} from 'react';
import {Grid, Breadcrumbs, Typography, Link} from '@mui/material';
import ElectricBoltIcon from '@mui/icons-material/ElectricBolt';
import FiberManualRecordRoundedIcon from '@mui/icons-material/FiberManualRecordRounded';
import LeftIssueDetail from 'src/components/issue/LeftIssueDetail';
import RightIssueDetail from 'src/components/issue/RightIssueDetail';
import {useLocation} from 'react-router-dom';
import axios from 'axios';
import {AppContext} from 'src/Context/AppProvider';
import {AuthContext} from 'src/Context/AuthProvider';

function Issue() {
  const {
    user: {uid},
  } = useContext(AuthContext);
  const {project} = useContext(AppContext);
  const location = useLocation();
  const issueId = location.pathname.split('/')[3];
  const [issue, setIssue] = useState({});
  const [trigger, setTrigger] = useState(false);

  const fetchIssueData = async () => {
    try {
      const res = await axios.get(`/issue/${issueId}`);
      setIssue(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchIssueData();
  }, [trigger]);

  return (
    <div>
      <Grid container spacing={2}>
        <Grid item xs={6}>
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
              {project.pkey + '-' + issueId}
            </Typography>
          </Breadcrumbs>
        </Grid>
      </Grid>

      <Grid container spacing={2}>
        <Grid item xs={7}>
          <LeftIssueDetail
            issue={issue}
            setIssue={setIssue}
            trigger={trigger}
            setTrigger={setTrigger}
          />
        </Grid>

        <Grid item xs={5}>
          <RightIssueDetail
            issue={issue}
            setIssue={setIssue}
            trigger={trigger}
            setTrigger={setTrigger}
          />
        </Grid>
      </Grid>
    </div>
  );
}

export default Issue;
