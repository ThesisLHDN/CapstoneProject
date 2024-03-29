import {useContext, useEffect, useState} from 'react';
import {color} from 'src/style';
import {Typography, Grid, Breadcrumbs, Link} from '@mui/material';
import Workload from 'src/components/charts/Workload';
import SprintBurndown from 'src/components/charts/SprintBurndown';
import MemberManagement from 'src/components/charts/MemberManagement';
import CumulativeFlow from 'src/components/charts/CumulativeFlow';
import {AppContext} from 'src/Context/AppProvider';
import {AuthContext} from 'src/Context/AuthProvider';
import axios from 'src/hooks/axios';

function Dashboard() {
  // Context
  const {
    user: {uid},
  } = useContext(AuthContext);
  const {project} = useContext(AppContext);

  // Handle Workload data
  const [workloadScope, setWorkloadScope] = useState('Sprint');
  const WorkloadData = {'To do': 0, 'In progress': 0, Testing: 0, Done: 0};
  const [workloadData, setWorkloadData] = useState({
    labels: [],
    datasets: [{}],
  });
  const fetchWorkloadData = async (pId, scope) => {
    try {
      const res =
        scope == 'Project'
          ? await axios.get(`/workload/${pId}`)
          : await axios.get(`/workload/${pId}?sprint=${true}`);
      for (let i = 0; i < res.data.length; i++)
        WorkloadData[res.data[i]?.issuestatus] = res.data[i]?.numbers;
      setWorkloadData({
        labels: Object.keys(WorkloadData).slice(0, 4),
        datasets: [
          {
            label: 'Amount',
            data: Object.values(WorkloadData),
            backgroundColor: ['#e83a31', '#006BA7', '#ffb300', '#009606'],
            borderWidth: 0,
          },
        ],
      });
    } catch (err) {
      console.log(err);
    }
  };

  // Handle Burndown data
  const [burndownData, setBurndownData] = useState({
    labels: [],
    datasets: [
      {
        label: 'Remaining Points',
        data: [],
        backgroundColor: 'red',
        borderColor: 'red',
        borderWidth: 2,
      },
      {
        label: 'Guidelines',
        data: [],
        backgroundColor: 'gray',
        borderColor: 'gray',
        borderWidth: 2,
      },
    ],
  });
  const fetchBurndownData = async (pId) => {
    try {
      const res = await axios.get(`/burndown/${pId}`);
      setBurndownData({
        labels: res.data[0],
        datasets: [
          {
            label: 'Remaining Points',
            data: res.data[2],
            backgroundColor: 'red',
            borderColor: 'red',
            borderWidth: 2,
          },
          {
            label: 'Guidelines',
            data: res.data[1],
            backgroundColor: 'gray',
            borderColor: 'gray',
            borderWidth: 2,
          },
        ],
      });
    } catch (err) {
      console.log(err);
    }
  };

  // Handle Cumulative Flow
  const [cumulativeScope, setCumulativeScope] = useState('Sprint');
  const [cumulative, setCumulative] = useState({
    labels: [],
    datasets: [
      {
        label: 'Done',
        data: [],
        backgroundColor: '#A4E7AB',
        borderColor: '#009606',
        borderWidth: 1,
        fill: true,
      },
      {
        label: 'Testing',
        data: [],
        backgroundColor: '#FFE663',
        borderColor: '#EC8E00',
        borderWidth: 1,
        fill: true,
      },
      {
        label: 'In progress',
        data: [],
        backgroundColor: '#9AD1EF',
        borderColor: '#006BA7',
        borderWidth: 1,
        fill: true,
      },
      {
        label: 'To Do',
        data: [],
        backgroundColor: '#ff8787',
        borderColor: '#ff4040',
        borderWidth: 1,
        fill: true,
      },
    ],
  });
  const fetchCumulativeData = async (pId, scope) => {
    try {
      const res =
        scope == 'Project'
          ? await axios.get(`/cumulative/${pId}`)
          : await axios.get(`/cumulative/${pId}?sprint=${true}`);
      setCumulative({
        labels: res.data[0],
        datasets: [
          {
            label: 'Done',
            data: res.data[4],
            backgroundColor: '#A4E7AB',
            borderColor: '#009606',
            borderWidth: 1,
            fill: true,
          },
          {
            label: 'Testing',
            data: res.data[3],
            backgroundColor: '#FFE663',
            borderColor: '#EC8E00',
            borderWidth: 1,
            fill: true,
          },
          {
            label: 'In progress',
            data: res.data[2],
            backgroundColor: '#9AD1EF',
            borderColor: '#006BA7',
            borderWidth: 1,
            fill: true,
          },
          {
            label: 'To Do',
            data: res.data[1],
            backgroundColor: '#ff8787',
            borderColor: '#ff4040',
            borderWidth: 1,
            fill: true,
          },
        ],
      });
    } catch (err) {
      console.log(err);
    }
  };

  // Handle Performance data
  const [performanceScope, setPerformanceScope] = useState('Sprint');
  const [performanceData, setPerformanceData] = useState([]);
  const fetchPerformance = async (pId, scope) => {
    try {
      const res =
        scope == 'Project'
          ? await axios.get(`/performance/${pId}`)
          : await axios.get(`/performance/${pId}?sprint=${true}`);
      setPerformanceData(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  // Just useEffect
  useEffect(() => {
    fetchWorkloadData(project.id, workloadScope);
    fetchBurndownData(project.id);
    fetchCumulativeData(project.id, cumulativeScope);
    fetchPerformance(project.id, performanceScope);
  }, [project.id, workloadScope, cumulativeScope, performanceScope]);

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
            <Workload
              chartData={workloadData}
              scope={workloadScope}
              setScope={setWorkloadScope}
            />
          </Grid>
          <Grid item sx={{paddingRight: 1, paddingBottom: 2}}>
            <CumulativeFlow
              chartData={cumulative}
              scope={cumulativeScope}
              setScope={setCumulativeScope}
            />
          </Grid>
        </Grid>

        <Grid item xs={6}>
          <Grid item sx={{paddingLeft: 1, paddingBottom: 2}}>
            <SprintBurndown chartData={burndownData} />
          </Grid>
          <Grid item sx={{paddingLeft: 1, paddingBottom: 2}}>
            <MemberManagement
              data={performanceData}
              scope={performanceScope}
              setScope={setPerformanceScope}
            />
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}

export default Dashboard;
