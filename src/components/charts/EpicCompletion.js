import React from 'react';
import { LinearProgress } from '@mui/material';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import CircleIcon from '@mui/icons-material/Circle';

function EpicCompletion({chartData}) {
  return (
    <div style={{  border: "1px solid #787878", borderRadius: 16, paddingBottom: 16 }} >
      <div className="flex">
        <p className="text-left text-tg-text-color font-bold text-base mt-6 mx-6">Completion</p>
        <SettingsOutlinedIcon sx={{ marginTop: 3 }}/>
      </div>
      <p className="text-sm italic ml-6 mt-3">Short description</p>

      {chartData.map((epic) => {
        return (
          <div className='mt-3 mb-3'>
            <div className='flex justify-between'>
              <div className='flex'>
                <CircleIcon fontSize='small' sx={{ marginTop: 1.5, marginLeft: 2, color: "#04BF00" }}/>
                <p className="text-sm italic ml-3 mt-3">{epic.name}</p>
              </div>
              <p className="text-sm italic mr-6 mt-3">{epic.complete + "%"}</p>
            </div>
            <div className='mx-5'>
              <LinearProgress 
                variant="determinate" 
                value={epic.complete}
                color="inherit"
                sx={{ 
                  color: "#04BF00", 
                  marginTop: 2, 
                  width: "100%", 
                  height: 8, 
                  borderRadius: 4,
                }}
              />
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default EpicCompletion