import React, { useState } from "react";
import { Button, Radio, RadioGroup, FormControl, FormControlLabel, Typography } from "@mui/material";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import CircleOutlinedIcon from '@mui/icons-material/CircleOutlined';
import RadioButtonCheckedIcon from '@mui/icons-material/RadioButtonChecked';

function Bugs({ chartData }) {
  const [activeAllBtn, setActiveAllBtn] = useState(false);
  const [activeCommentBtn, setActiveCommentBtn] = useState(true);
  const [activeHistoryBtn, setActiveHistoryBtn] = useState(false);
  const [activeAllCategories, setActiveAllCategories] = useState(false);

  return (
    <div style={{  border: "1px solid #787878", borderRadius: 16 }} >
      <div className="flex">
        <p className="text-left text-tg-text-color font-bold text-base mt-6 mx-6">Bugs</p>
        <SettingsOutlinedIcon sx={{ marginTop: 3 }}/>
      </div>

      <div className="flex justify-between">
        <p className="text-sm italic ml-6 mt-3">Short description</p>
        <div className="flex mr-4">
          <Button 
            style={{
              textTransform: "none",
              fontSize: 12,
              height: 32,
              minWidth: 30,
              paddingLeft: 10,
              paddingRight: 30,
              borderRadius: 20,
              marginRight: -25,
              border: "1px solid white",
              color: !activeAllBtn ? "black" : "white",
              backgroundColor: !activeAllBtn ? "#EFEFEF" : "green",
            }} 
            onClick={() => {
              setActiveAllBtn(true);
              setActiveCommentBtn(false);
              setActiveHistoryBtn(false);
            }}
          >Daily</Button>
          <Button 
            style={{
              textTransform: "none",
              fontSize: 12,
              height: 32,
              minWidth: 30,
              paddingLeft: 10,
              paddingRight: 10,
              borderRadius: 20,
              marginRight: -25,
              zIndex: 2,
              border: "1px solid white",
              color: !activeCommentBtn ? "black" : "white",
              backgroundColor: !activeCommentBtn ? "#EFEFEF" : "green",
            }} 
            onClick={() => {
              setActiveAllBtn(false);
              setActiveCommentBtn(true);
              setActiveHistoryBtn(false);
            }}
          >Weekly</Button>
          <Button 
            style={{
              textTransform: "none",
              fontSize: 12,
              height: 32,
              minWidth: 30,
              paddingLeft: 30,
              paddingRight: 10,
              borderRadius: 20,
              marginRight: 10,
              zIndex: 1,
              border: "1px solid white",
              color: !activeHistoryBtn ? "black" : "white",
              backgroundColor: !activeHistoryBtn ? "#EFEFEF" : "green",
            }} 
            onClick={() => {
              setActiveAllBtn(false);
              setActiveCommentBtn(false);
              setActiveHistoryBtn(true);
            }}
          >Month</Button>
        </div>
      </div>
      
      <div className="chart-container" style={{ width: "90%", height: "90%", marginLeft: "5%", marginTop: 20, marginBottom: 20}}>
        <Bar data={chartData} />
      </div>

      <div className="flex mb-4">
        <div className="my-10 mx-10">
          <Button 
            startIcon={activeAllCategories ? <RadioButtonCheckedIcon /> : <CircleOutlinedIcon />}
            style={{
              textTransform: "none",
              fontSize: 12,
              height: 32,
              minWidth: 30,
              paddingLeft: 10,
              paddingRight: 10,
              borderRadius: 20,
              marginRight: -25,
              zIndex: 2,
              border: "1px solid green",
              color: "green",
              backgroundColor: "#EFEFEF",
            }}
            onClick={() => setActiveAllCategories(!activeAllCategories)}
          >All Categories</Button>
        </div>

        <div>
          <FormControl>
            <RadioGroup
              aria-labelledby="demo-radio-buttons-group-label"
              name="radio-buttons-group"
            >
              {chartData.datasets.map((item) => {
                return (
                  <FormControlLabel 
                    disabled={activeAllCategories ? true : false}
                    value={activeAllCategories ? "" : item.label} 
                    control={<Radio size="small" sx={{ color: "green", '&.Mui-checked': { color: "green" } }}/>} 
                    label={<div className="flex justify-between max-w-full">
                      <Typography sx={{ fontSize: 12, marginRight: 3 }}>{item.label}</Typography>
                      <Typography sx={{ fontSize: 12, color: "#9291A5" }}>+30%</Typography>
                    </div>}
                  />
                )
              })}
            </RadioGroup>
          </FormControl>
        </div>
      </div>
    </div>
  )
}

export default Bugs