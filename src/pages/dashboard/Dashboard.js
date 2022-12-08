import React, { useState } from 'react';
import {Typography, Grid, Breadcrumbs, Link} from '@mui/material';
import Workload from 'src/components/charts/Workload';
import SprintBurndown from 'src/components/charts/SprintBurndown';
import EpicCompletion from 'src/components/charts/EpicCompletion';
import DelayPrediction from 'src/components/charts/DelayPrediction';
import Bugs from 'src/components/charts/Bugs';
import MemberManagement from 'src/components/charts/MemberManagement';
import { WorkloadData, CompletionData } from "../../components/charts/Data";

function Dashboard() {
  const [workloadData, setWorkloadData] = useState({
    labels: WorkloadData.map((data) => data.label),
    datasets: [{
      label: "Amount",
      data: WorkloadData.map((data) => data.numbers),
      backgroundColor: ["#F1F1F1", "#054077", "#E83800", "#00980F"],
      borderWidth: 0
    }]
  });

  const [completionData, setCompletionData] = useState(CompletionData)

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

      <Grid container sx={{ marginTop: 2}}>
        <Grid item xs={6} sx={{paddingRight: 4, paddingBottom: 4}}><Workload chartData={workloadData} /></Grid>
        <Grid item xs={6} sx={{paddingRight: 4, paddingBottom: 4}}><SprintBurndown chartData={completionData}/></Grid>
        <Grid item xs={6} sx={{paddingRight: 4, paddingBottom: 4}}><EpicCompletion chartData={completionData}/></Grid>
        <Grid item xs={6} sx={{paddingRight: 4, paddingBottom: 4}}><DelayPrediction /></Grid>
        <Grid item xs={6} sx={{paddingRight: 4, paddingBottom: 4}}><Bugs /></Grid>
        <Grid item xs={6} sx={{paddingRight: 4, paddingBottom: 4}}><MemberManagement /></Grid>
      </Grid>
    </div>
  );
}

export default Dashboard;
