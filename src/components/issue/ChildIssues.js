import React, { useState } from 'react'
import { 
  Typography,
  ClickAwayListener,
  Box,
  Select,
  MenuItem,
  TextField
} from '@mui/material'
import { IssueIcon } from '../backlog/TaskCard';
import TaskCard from '../backlog/TaskCard';
import Sort from '../Sort';

function ChildIssues({ 
  childIssue, 
  setChildIssue, 
  createChild,
  setCreateChild, 
  tasks,
}) {
  const [task, setTask] = useState(tasks)
  const [issueType, setIssueType] = useState('task')

  const handleIssueType = (event) => {
    setIssueType(event.target.value);
  };

  const handleClickAway = () => {
    if (task.length == 0) {
      setChildIssue(false)
    }
    setCreateChild(false)
  }

  const addIssue = (event) => {
    if (event.target.value !== "") {
      setTask([...task, {
        id: 'SCR' + (Math.floor(Math.random() * 10)).toString(),
        name: event.target.value,
        status: 'To do',
        type: issueType,
        epic: '',
        due: '',
        point: 0,
        assignee: '',
      }])
      event.target.value = "";
    }
    setCreateChild(false);
    setIssueType('task');
	};

  return (
    <div>
      {(childIssue || task.length > 0) && (
        <div>
          <div className='flex justify-between'>
            <Typography sx={{ marginTop: 3, fontSize: 16, fontWeight: 700 }}>
              Child Issues
            </Typography>
            <div className="pt-4 inline-flex align-baseline">
              <Sort />
            </div>
          </div>

          {task.length > 0 && (
            <div className='flex mt-1 mb-4'>
              <div className='flex mx-0 mt-2 w-10/12'>
                <p className="h-2 border-0 rounded-l" style={{ width: `${2*100 / (2 + 1 + 1)}%`, backgroundColor: "#00980F" }}></p>
                <p className="h-2 border-0" style={{ width: `${1*100 / (2 + 1 + 1)}%`, backgroundColor: "#0060B9" }}></p>
                <p className="h-2 border-0 rounded-r" style={{ width: `${1*100 / (2 + 1 + 1)}%`, backgroundColor: "#D9D9D9" }}></p>
              </div>
              <p className='ml-5'>{2*100 / (2 + 1 + 1)}% Done</p>
            </div>
          )}

          {task.map((item) => {
            return (
              <TaskCard item={item} isChild={true} />
            )
          })}

          {createChild && (
            <ClickAwayListener mouseEvent='onMouseUp' onClickAway={handleClickAway}>
              <Box sx={{ border: '1px solid gray', backgroundColor: 'white', mt: 1.5 }}>
                <Select
                  variant="standard"
                  value={issueType}
                  onChange={handleIssueType}
                  sx={{ backgroundColor: 'white', border: 'none', p: 0.75, pl: 1.5}}
                  disableUnderline
                >
                  <MenuItem value='bug'>{IssueIcon('bug')}</MenuItem>
                  <MenuItem value='task'>{IssueIcon('task')}</MenuItem>
                </Select>
                <TextField
                  variant="standard"
                  size="medium"
                  sx={{ width: '85%', height: "45px", fontSize: 14, background: 'white', p: 1, pl: 2 }}
                  InputProps={{ disableUnderline: true, style: { fontSize: 14 }}}
                  onKeyUp={event => event.key === "Enter" ? addIssue(event) : null}
                />
              </Box>
            </ClickAwayListener>
          )}
        </div>
      )}
    </div>
  )
}

export default ChildIssues