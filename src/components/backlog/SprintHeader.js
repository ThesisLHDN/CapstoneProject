import React from 'react'
import { Button } from "@mui/material"
import { styled } from "@mui/material/styles"

function convertDate(d) {
  const date = new Date(d)
  return date.getDate() + " " + date.toLocaleString('en-us', { month: 'short' })
}

const GrayButton = styled(Button)({
  backgroundColor: "#cdcdcd",
  color: "black",
  borderRadius: 3,
  height: 20,
  "&:hover": {
    backgroundColor: "#ddd",
  },
});

function SprintHeader(props) {
  const time = convertDate(props.col.startDate) + " - " + convertDate(props.col.endDate)
  return (
    <div className='flex text-sm'>
      <div className='font-bold'>
        {props.col.name}
      </div>
      
      {props.col.name != "Backlog" ? (
        <div className='ml-2 text-gray-600'>
          {time}
        </div>
      ) : <></>}
      
      <div className='ml-2 text-gray-600'>
        {props.col.items.length > 1 ? "(" + props.col.items.length + " issues)" : "(" + props.col.items.length + " issue)"}
      </div>
    </div>
  )
}

export default SprintHeader