import React from 'react'
import { Button } from "@mui/material"
import DoneRoundedIcon from "@mui/icons-material/DoneRounded"
import FiberManualRecordRoundedIcon from "@mui/icons-material/FiberManualRecordRounded"
import FlagRoundedIcon from "@mui/icons-material/FlagRounded"
import QuestionMarkRoundedIcon from "@mui/icons-material/QuestionMarkRounded"
import AccessTimeRoundedIcon from "@mui/icons-material/AccessTimeRounded"
import Avatar from "@mui/material/Avatar"
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'

const IssueIcon = (type) => {
  switch (type) {
    case "task":
      return (
        <DoneRoundedIcon
          sx={{
            backgroundColor: "#4856D7",
            color: "white",
            borderRadius: 1,
            width: 24,
            height: 24,
            padding: 0.25
          }}
        />
      );
    case "bug":
      return (
        <FiberManualRecordRoundedIcon
          sx={{
            backgroundColor: "red",
            color: "white",
            borderRadius: 1,
            width: 24,
            height: 24,
            padding: 0.25
          }}
        />
      );
    case "story":
      return (
        <FlagRoundedIcon
          sx={{
            backgroundColor: "#00980F",
            color: "white",
            borderRadius: 1,
            width: 24,
            height: 24,
            padding: 0.25
          }}
        />
      );
    default:
      return (
        <QuestionMarkRoundedIcon
          sx={{
            backgroundColor: "#BAD1C2",
            color: "white",
            borderRadius: 1,
            width: 24,
            height: 24,
            padding: 0.25
          }}
        />
      );
  }
};

const epicColor = (epic) => {
  switch (epic) {
    case "Epic 1":
      return ["#bee8e8", "#3db0d1"];
    case "Epic 2":
      return ["#FFE5E2", "#E93B81"];
    case "Epic 3":
      return ["#DEFBC2", "#459D72"];
    default:
      return ["#FF95E6", "#3C4048"];
  }
};

function convertDate(d) {
  const date = new Date(d)
  return date.getDate() + " " + date.toLocaleString('en-us', { month: 'short' })
}

function TaskCard(props) {
  return (
    <div className='flex justify-between'>
      <div className='flex ml-3'>
        <div>
          {IssueIcon(props.item.type)}
        </div>
        <div className='ml-3 font-bold text-sm pt-0.5'>
          {props.item.id}
        </div>
        <div className='ml-3 font-medium text-sm pt-0.5'>
          {props.item.name}
        </div>
        <div 
          className='ml-3 text-sm h-6 pt-0.5 px-4 rounded-sm' 
          style={{ backgroundColor: `${epicColor(props.item.epic)[0]}`, color: `${epicColor(props.item.epic)[1]}` }}
        >
          {props.item.epic}
        </div>
      </div>

      <div className='inline-flex items-end'>
        <span className="flex px-1.5 py-1 rounded-xl bg-gray-400 text-xs mr-2">
          <AccessTimeRoundedIcon sx={{ height: 14, width: 14, marginRight: 0.5, marginTop: 0.1 }}/>
          {convertDate(props.item.due)}
        </span>

        <span className={`px-1.5 py-1 rounded-xl text-white text-xs mr-2
        ${props.item.status === "Done" ? "bg-done-color" : (props.item.status === "In progress" ? "bg-in-progress-color" : "bg-to-do-color")}`}>
          {props.item.point}
        </span>

        <Button 
          style={{ 
            display: "flex",
            textTransform: "none",
            height: 24,
            borderRadius: 3,
            marginRight: 2,
            backgroundColor: `${props.item.status === "Done" ? "#A4E7AB" : (props.item.status === "In progress" ? "#9AD1EF" : "#EDCBB9")}`,
            color: `${props.item.status === "Done" ? "#009606" : (props.item.status === "In progress" ? "#006BA7" : "#EC6F28")}`
          }} >
          {props.item.status}
          <ExpandMoreIcon />
        </Button>

        <Avatar
          src="X"
          sx={{ width: 24, height: 24, ml: 1, backgroundColor: "#8993A4", marginRight: 1 }}
          alt={props.item.assignee}
        />
      </div>
    </div>
  )
}

export default TaskCard