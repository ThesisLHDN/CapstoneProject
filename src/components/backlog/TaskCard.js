import React, { useState } from 'react'
import { Button, Avatar, Popper, ClickAwayListener, Box, MenuList, MenuItem } from "@mui/material"

import DoneRoundedIcon from "@mui/icons-material/DoneRounded"
import FiberManualRecordRoundedIcon from "@mui/icons-material/FiberManualRecordRounded"
import FlagRoundedIcon from "@mui/icons-material/FlagRounded"
import QuestionMarkRoundedIcon from "@mui/icons-material/QuestionMarkRounded"
import AccessTimeRoundedIcon from "@mui/icons-material/AccessTimeRounded"
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import { NavLink } from 'react-router-dom'

export const IssueIcon = (type) => {
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
  const [status, setStatus] = useState(props.item.status)
  const [anchorEl, setAnchorEl] = useState(null)

  const handleChange = (event, element) => {
    setAnchorEl(anchorEl ? null : event.currentTarget)
    setStatus(element)
  }

  const handleClick = (event) => {
    setAnchorEl(anchorEl ? null : event.currentTarget)
  };

  const open = Boolean(anchorEl)
  const id = open ? 'simple-popper' : undefined

  return (
    <div className='flex justify-between hover:cursor-pointer'>
      <NavLink to="/issue">
        <div className='flex ml-3 md:pr-md 2xl:pr-lg'>
          <div>
            {IssueIcon(props.item.type)}
          </div>
          <div className='ml-3 font-bold text-sm pt-0.5'>
            {props.item.id}
          </div>
          <div className='ml-3 font-medium text-sm pt-0.5'>
            {props.item.name}
          </div>
          {props.item.epic && (
            <div 
              className='ml-3 text-sm h-6 pt-0.5 px-4 rounded-sm' 
              style={{ backgroundColor: `${epicColor(props.item.epic)[0]}`, color: `${epicColor(props.item.epic)[1]}` }}
            >
              {props.item.epic}
            </div>
          )}
        </div>
      </NavLink>

      <div className='inline-flex align-baseline'>
        <span className="flex px-1.5 py-1 rounded-xl bg-gray-400 text-xs mr-2">
          <AccessTimeRoundedIcon sx={{ height: 14, width: 14, marginRight: 0.5, marginTop: 0.1 }}/>
          {props.item.due ? (<p>{convertDate(props.item.due)}</p>) : (<p>-</p>)}
        </span>

        <span className={`px-1.5 py-1 rounded-xl text-white text-xs mr-2
        ${status === "Done" ? "bg-done-color" : (status === "In progress" ? "bg-in-progress-color" : "bg-to-do-color")}`}>
          {props.item.due ? (<>{props.item.point}</>) : (<p>-</p>)}
        </span>

        <Button 
          style={{ 
            display: "flex",
            textTransform: "none",
            height: 24,
            borderRadius: 3,
            marginRight: 2,
            zIndex: 5,
            backgroundColor: `${status === "Done" ? "#A4E7AB" : (status === "In progress" ? "#9AD1EF" : "#EDCBB9")}`,
            color: `${status === "Done" ? "#009606" : (status === "In progress" ? "#006BA7" : "#EC6F28")}`
          }} 
          onClick={handleClick}>
          {status}
          <ExpandMoreIcon />
        </Button>

        <Popper id={id} open={open} anchorEl={anchorEl} sx={{zIndex: 5, }}>
          <ClickAwayListener onClickAway={handleClick}>
            <Box
              sx={{
                backgroundColor: 'white',
                borderRadius: 1,
                right: status === "In progress" ? -60 : -40,
                marginTop: '5px',
                border: 'solid 1px #ECEDF0',
                boxShadow: '2px 2px 5px #00000020',
                display: 'flex',
                flexDirection: 'column',
                position: 'absolute',
                width: 120,
              }}
            >
              <MenuList sx={{px: 0, width: '100%'}}>
                {['To do', 'In progress', 'Done'].filter((element) => {return element != status}).map((element) => {
                  return (
                  <MenuItem 
                    sx={{ 
                      py: 1, 
                      fontSize: 14,
                      fontWeight: 900,
                      color: `${element === "Done" ? "#009606" : (element === "In progress" ? "#006BA7" : "#EC6F28")}` 
                    }} 
                    onClick={(e) => handleChange(e, element)}
                  >{element}</MenuItem>)
                })}
              </MenuList>
            </Box>
          </ClickAwayListener>
        </Popper>

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