// import React from "react";
import {Bar} from 'react-chartjs-2';
import {Chart as ChartJS} from 'chart.js/auto';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';

function DelayPrediction({chartData}) {
  return (
    <div style={{border: '1px solid #787878', borderRadius: 16}}>
      <div className="flex">
        <p className="text-left text-tg-text-color font-bold text-base mt-6 mx-6">
          Delay
        </p>
        <SettingsOutlinedIcon sx={{marginTop: 3}} />
      </div>
      <p className="text-sm italic ml-6 mt-3">Short description</p>
      <div
        className="chart-container"
        style={{
          width: '90%',
          height: '90%',
          marginLeft: '5%',
          marginTop: 30,
          marginBottom: 30,
        }}
      >
        <Bar
          data={chartData}
          options={{
            indexAxis: 'y',
            plugins: {
              legend: {
                display: false,
              },
            },
            scales: {
              y: {
                ticks: {
                  autoSkip: false,
                },
              },
            },
          }}
        />
      </div>
    </div>
  );
}
export default DelayPrediction;
