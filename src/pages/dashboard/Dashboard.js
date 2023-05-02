import React, {useContext, useState} from 'react';
import {color} from 'src/style';
import {Typography, Grid, Breadcrumbs, Link} from '@mui/material';
import Workload from 'src/components/charts/Workload';
import SprintBurndown from 'src/components/charts/SprintBurndown';
import EpicCompletion from 'src/components/charts/EpicCompletion';
import DelayPrediction from 'src/components/charts/DelayPrediction';
import Bugs from 'src/components/charts/Bugs';
import MemberManagement from 'src/components/charts/MemberManagement';
import {
  WorkloadData,
  CompletionData,
  BurndownData,
  BugsData,
  DelayData,
  PerformceData,
} from '../../components/charts/Data';
import {AppContext} from 'src/Context/AppProvider';
import {AuthContext} from 'src/Context/AuthProvider';

function convertDate(d) {
  const date = new Date(d);
  return date.getDate() + ' ' + date.toLocaleString('en-us', {month: 'short'});
}

function Dashboard() {
  const {
    user: {uid},
  } = useContext(AuthContext);
  const {project} = useContext(AppContext);
  const [workloadData, setWorkloadData] = useState({
    labels: WorkloadData.map((data) => data.label),
    datasets: [
      {
        label: 'Amount',
        data: WorkloadData.map((data) => data.numbers),
        backgroundColor: ['#F1F1F1', '#054077', '#E83800', '#00980F'],
        borderWidth: 0,
      },
    ],
  });

  const [burndownData, setBurndownData] = useState({
    labels: BurndownData['Remaining Values'].map((data) =>
      convertDate(data.date),
    ),
    datasets: [
      {
        label: 'Remaining Values',
        data: BurndownData['Remaining Values'].map((data) => data.estimate),
        backgroundColor: 'red',
        borderColor: 'red',
        borderWidth: 2,
      },
      {
        label: 'Guidelines',
        data: BurndownData['Guidelines'].map((data) => data.estimate),
        backgroundColor: 'gray',
        borderColor: 'gray',
        borderWidth: 2,
      },
    ],
  });

  const [bugsData, setBugsData] = useState({
    labels: BugsData['Epic 01'].map((data) => data.date),
    datasets: [
      {
        label: 'Epic 01',
        data: BugsData['Epic 01'].map((data) => data.bugs),
        backgroundColor: '#04BF00',
      },
      {
        label: 'Epic 02',
        data: BugsData['Epic 02'].map((data) => data.bugs),
        backgroundColor: '#59D44E',
      },
      {
        label: 'Epic 03',
        data: BugsData['Epic 03'].map((data) => data.bugs),
        backgroundColor: '#A4E7AB',
      },
    ],
  });

  const [delayData, setDelayData] = useState({
    labels: DelayData.map((data) => data.id),
    datasets: [
      {
        label: 'Delay',
        data: DelayData.map((data) => data.delay),
        backgroundColor: ['#03AA00', '#E9B500', '#E71515', '#E87D00'],
        borderWidth: 0,
        borderRadius: Number.MAX_VALUE,
      },
    ],
  });

  const [completionData, setCompletionData] = useState(CompletionData);
  const [performanceData, setPerformanceData] = useState(PerformceData);

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
              Dashboard
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
        Dashboard
      </Typography>

      <Grid container sx={{marginTop: 2}}>
        <Grid item xs={6}>
          <Grid item sx={{paddingRight: 1, paddingBottom: 2}}>
            <Workload chartData={workloadData} />
          </Grid>
          <Grid item sx={{paddingRight: 1, paddingBottom: 2}}>
            <EpicCompletion chartData={completionData} />
          </Grid>
          <Grid item sx={{paddingRight: 1, paddingBottom: 2}}>
            <Bugs chartData={bugsData} />
          </Grid>
        </Grid>

        <Grid item xs={6}>
          <Grid item sx={{paddingLeft: 1, paddingBottom: 2}}>
            <SprintBurndown chartData={burndownData} />
          </Grid>
          <Grid item sx={{paddingLeft: 1, paddingBottom: 2}}>
            <DelayPrediction chartData={delayData} />
          </Grid>
          <Grid item sx={{paddingLeft: 1, paddingBottom: 2}}>
            <MemberManagement data={performanceData} />
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}

export default Dashboard;
