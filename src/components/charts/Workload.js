import React from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';

function Workload({ chartData }) {
  return (
    <div style={{  border: "1px solid #787878", borderRadius: 16 }} >
      <div className="flex">
        <p className="text-left text-tg-text-color font-bold text-base mt-6 mx-6">Workload</p>
        <SettingsOutlinedIcon sx={{ marginTop: 3 }}/>
      </div>
      <p className="text-sm italic ml-6 mt-3">Short description</p>
      <div className="chart-container" style={{ width: "90%", height: "90%", marginLeft: "5%", marginTop: -30, marginBottom: -30}}>
        <Pie
          data={chartData}
          options={{
            plugins: {
              legend: {
                display: true,
                position: 'right',
                labels: {
                  padding: 15
                }
              }
            }
          }}
        />
      </div>
    </div>
  )
}
export default Workload;