import React, {useContext, useEffect, useState} from 'react';
import {
  IconButton,
  Button,
  Avatar,
  Popper,
  ClickAwayListener,
  Box,
  MenuList,
  MenuItem,
} from '@mui/material';

import DoneRoundedIcon from '@mui/icons-material/DoneRounded';
import FiberManualRecordRoundedIcon from '@mui/icons-material/FiberManualRecordRounded';
import FlagRoundedIcon from '@mui/icons-material/FlagRounded';
import QuestionMarkRoundedIcon from '@mui/icons-material/QuestionMarkRounded';
import AccessTimeRoundedIcon from '@mui/icons-material/AccessTimeRounded';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {NavLink, Link} from 'react-router-dom';
import {AppContext} from 'src/Context/AppProvider';
import axios from 'axios';
import ClearRoundedIcon from '@mui/icons-material/ClearRounded';
import WarningPopup from 'src/components/popup/Warning';

export const IssueIcon = (type) => {
  switch (type) {
    case 'task':
      return (
        <DoneRoundedIcon
          sx={{
            backgroundColor: '#4856D7',
            color: 'white',
            borderRadius: 1,
            width: 24,
            height: 24,
            padding: 0.25,
          }}
        />
      );
    case 'bug':
      return (
        <FiberManualRecordRoundedIcon
          sx={{
            backgroundColor: 'red',
            color: 'white',
            borderRadius: 1,
            width: 24,
            height: 24,
            padding: 0.25,
          }}
        />
      );
    case 'story':
      return (
        <FlagRoundedIcon
          sx={{
            backgroundColor: '#00980F',
            color: 'white',
            borderRadius: 1,
            width: 24,
            height: 24,
            padding: 0.25,
          }}
        />
      );
    default:
      return (
        <QuestionMarkRoundedIcon
          sx={{
            backgroundColor: '#BAD1C2',
            color: 'white',
            borderRadius: 1,
            width: 24,
            height: 24,
            padding: 0.25,
          }}
        />
      );
  }
};

const epicColor = (epic) => {
  switch (epic) {
    case 'Epic 1':
      return ['#bee8e8', '#3db0d1'];
    case 'Epic 2':
      return ['#FFE5E2', '#E93B81'];
    case 'Epic 3':
      return ['#DEFBC2', '#459D72'];
    default:
      return ['#FF95E6', '#3C4048'];
  }
};

function convertDate(d) {
  const date = new Date(d);
  return date.getDate() + ' ' + date.toLocaleString('en-us', {month: 'short'});
}

function TaskCard({issue, setTrigger, isChild = false}) {
  // console.log(issue);
  const {project} = useContext(AppContext);
  const [status, setStatus] = useState(issue.issuestatus);
  const [anchorEl, setAnchorEl] = useState(null);
  const [assignee, setAssignee] = useState({});
  const [openDelPopup, setOpenDelPopup] = useState(false);

  const getAssignee = async () => {
    try {
      const res = await axios.get(
        `http://localhost:8800/user/${issue.assigneeId}`,
      );
      setAssignee(res.data);
      // console.log(res);
    } catch (err) {
      console.log(err);
    }
  };

  const handleChange = (event, element) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
    setStatus(element);
    updateIssue(element);
  };

  const handleClick = (event) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popper' : undefined;

  const updateIssue = async (element) => {
    try {
      const res = await axios.put(`http://localhost:8800/issue/${issue.id}`, {
        cId: issue.cycleId,
        status: element,
      });
      setTrigger(true);
      console.log(res);
      // setIssues([...res.data]);
    } catch (err) {
      console.log(err);
    }
  };

  const deleteIssueHandler = (confirm) => {
    if (confirm) {
      console.log('Issue deleted', issue);
    }
    setOpenDelPopup(false);
  };

  useEffect(() => {
    if (issue.assigneeId) {
      getAssignee();
    }
  }, [issue]);

  return (
    <Box
      className={`flex justify-between hover:cursor-pointer ${
        isChild ? 'my-2' : ''
      }`}
      sx={{
        '&:hover .deleteBtn': {
          visibility: 'visible',
        },
      }}
    >
      <Link to={`/issue/${project.id}/${issue.id}`}>
        <div
          className={`${
            isChild ? 'ml-1 md:pr-20 2xl:pr-24' : 'ml-3 md:pr-80 2xl:pr-96'
          } flex`}
        >
          <div>{IssueIcon(issue.issueType)}</div>
          <div className="ml-3 font-bold text-sm pt-0.5">
            {project.pkey + '-' + issue.issueindex}
          </div>
          <div className="ml-3 font-medium text-sm pt-0.5">
            {issue.issuename}
          </div>
        </div>
      </Link>

      <div className="inline-flex align-baseline">
        <span className="flex px-1.5 py-1 rounded-xl bg-gray-400 text-xs mr-2">
          <AccessTimeRoundedIcon
            sx={{height: 14, width: 14, marginRight: 0.5, marginTop: 0.1}}
          />
          {issue.dueDate ? <p>{convertDate(issue.dueDate)}</p> : <p>-</p>}
        </span>

        <span
          className={`px-1.5 py-1 rounded-xl text-white text-xs mr-2
        ${
          status === 'Done'
            ? 'bg-done-color'
            : status === 'In progress'
            ? 'bg-in-progress-color'
            : 'bg-to-do-color'
        }`}
        >
          {issue.estimatePoint ? <>{issue.estimatePoint}</> : <p>-</p>}
        </span>

        <Button
          style={{
            display: 'flex',
            textTransform: 'none',
            height: 24,
            borderRadius: 3,
            marginRight: 2,
            zIndex: 1,
            backgroundColor: `${
              status === 'Done'
                ? '#A4E7AB'
                : status === 'In progress'
                ? '#9AD1EF'
                : '#EDCBB9'
            }`,
            color: `${
              status === 'Done'
                ? '#009606'
                : status === 'In progress'
                ? '#006BA7'
                : '#EC6F28'
            }`,
          }}
          onClick={handleClick}
        >
          {status}
          <ExpandMoreIcon />
        </Button>

        <Popper id={id} open={open} anchorEl={anchorEl} sx={{zIndex: 5}}>
          <ClickAwayListener onClickAway={handleClick}>
            <Box
              sx={{
                backgroundColor: 'white',
                borderRadius: 1,
                right: status === 'In progress' ? -60 : -40,
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
                {['To do', 'In progress', 'Done']
                  .filter((element) => {
                    return element != status;
                  })
                  .map((element) => {
                    return (
                      <MenuItem
                        key={element}
                        sx={{
                          py: 1,
                          fontSize: 14,
                          fontWeight: 900,
                          color: `${
                            element === 'Done'
                              ? '#009606'
                              : element === 'In progress'
                              ? '#006BA7'
                              : '#EC6F28'
                          }`,
                        }}
                        onClick={(e) => handleChange(e, element)}
                      >
                        {element}
                      </MenuItem>
                    );
                  })}
              </MenuList>
            </Box>
          </ClickAwayListener>
        </Popper>

        <Avatar
          src={assignee.photoURL}
          sx={{
            width: 24,
            height: 24,
            ml: 1,
            backgroundColor: '#8993A4',
            marginRight: 1,
          }}
          alt={assignee ? assignee.username : ''}
        />
        <IconButton
          className={'deleteBtn'}
          sx={{width: 24, height: 24, visibility: 'hidden'}}
          onClick={() => setOpenDelPopup(true)}
        >
          <ClearRoundedIcon />{' '}
        </IconButton>
      </div>
      <WarningPopup
        title={'Delete Issue'}
        open={openDelPopup}
        onClose={() => setOpenDelPopup(false)}
        handleSubmit={deleteIssueHandler}
        content={
          `Do you really want to delete this Issue? This cannot be undone`
        }
      />
    </Box>
  );
}

export default TaskCard;
