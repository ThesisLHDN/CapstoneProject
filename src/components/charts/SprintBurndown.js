import React from "react";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';

function SprintBurndown({ chartData }) {
  return (
    <div style={{  border: "1px solid #787878", borderRadius: 16 }} >
      <div className="flex">
        <p className="text-left text-tg-text-color font-bold text-base mt-6 mx-6">Sprint Burndown</p>
        <SettingsOutlinedIcon sx={{ marginTop: 3 }}/>
      </div>
      <p className="text-sm italic ml-6 mt-3">Short description</p>
      <div className="chart-container" style={{ width: "90%", height: "90%", marginLeft: "7%", marginTop: 20, marginBottom: 30}}>
        <Line data={chartData}/>
      </div>
    </div>
  )
}
export default SprintBurndown;