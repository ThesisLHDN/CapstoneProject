import {useContext, useEffect, useState} from 'react';
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
import ReportIcon from '@mui/icons-material/Report';
import {Link} from 'react-router-dom';
import {AppContext} from 'src/Context/AppProvider';
import axios from 'src/hooks/axios';
import ClearRoundedIcon from '@mui/icons-material/ClearRounded';
import WarningPopup from 'src/components/popup/Warning';
import Priority from 'src/components/priorities';
import {SocketContext} from 'src/Context/SocketProvider';
import {AuthContext} from 'src/Context/AuthProvider';

function stringToColor(string) {
  let hash = 0;
  let i;

  /* eslint-disable no-bitwise */
  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = '#';

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }
  /* eslint-enable no-bitwise */

  return color;
}

const colors = [
  '#FF7F7F',
  '#FF8E5D',
  '#FFCE6E',
  '#CAFF74',
  '#9DFFA1',
  '#89E8E2',
  '#73B2FD',
  '#9E8EFF',
  '#DB8EFF',
  '#FF8ABB',
];

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

function convertDate(d) {
  const date = new Date(d);
  return date.getDate() + ' ' + date.toLocaleString('en-us', {month: 'short'});
}

function TaskCard({issue, setTrigger, isChild = false}) {
  const {
    user: {uid, displayName, photoURL},
  } = useContext(AuthContext);
  const {project, setReload} = useContext(AppContext);
  const {socket} = useContext(SocketContext);

  const [status, setStatus] = useState(issue.issuestatus);
  const [anchorEl, setAnchorEl] = useState(null);
  const [assignee, setAssignee] = useState({});
  const [openDelPopup, setOpenDelPopup] = useState(false);
  const [tags, setTags] = useState([]);
  const [totalTags, setTotalTags] = useState([]);

  const getAssignee = async () => {
    try {
      const res = await axios.get(`/user/${issue.assigneeId}`);
      setAssignee(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleChange = (event, element) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
    setStatus(element);
    updateIssue(element);
    // setReload(true);
    socket.emit('updateIssue', {
      senderId: uid,
      senderName: displayName,
      senderAvatar: photoURL,
      issueId: issue.id,
      updatedIssue: issue.issueindex,
      projectId: project.pId,
      projectKey: project.pkey,
      receiverId:
        issue.assigneeId && issue.assigneeId != issue.reporterId
          ? [issue.reporterId, issue.assigneeId]
          : [issue.reporterId],
      type: 'status',
      newState: element,
      dateUpdate: new Date(),
    });
  };

  const handleClick = (event) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popper' : undefined;

  const updateIssue = async (element) => {
    try {
      const res = await axios.put(`/issue/${issue.id}`, {
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

  const getTags = async () => {
    try {
      const res = await axios.get(`/tags/${issue.id}`);
      setTags(res.data[0].reverse().slice(0, 3));
      setTotalTags(
        res.data[1]
          .filter((item, pos) => {
            return res.data[1].indexOf(item) == pos;
          })
          .map((tag) => tag.tagname),
      );
      // console.log(totalTags);
    } catch (err) {
      console.log(err);
    }
  };

  const deleteIssueHandler = async (e) => {
    e.preventDefault();
    setOpenDelPopup(false);
    try {
      await axios.delete(`/issue/${issue.id}?pId=${project.id}`);
      setTrigger(true);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (issue.assigneeId) {
      getAssignee();
    }
    getTags();
  }, [issue]);

  const diff = new Date(issue.dueDate) - new Date();

  return (
    <Box
      className={` hover:cursor-pointer ${isChild ? 'my-2' : ''}`}
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        width: '100%',
        '&:hover .deleteBtn': {
          visibility: 'visible',
        },
      }}
    >
      <Link
        to={`/issue/${project.id}/${issue.id}`}
        onClick={() => setReload(true)}
      >
        <div
          className={`${
            isChild ? 'ml-1 md:pr-20 2xl:pr-24' : 'ml-3 md:pr-60 2xl:pr-96'
          } flex`}
        >
          <div>{IssueIcon(issue.issueType)}</div>
          <div className="ml-3 font-bold text-sm pt-0.5">
            {project.pkey + '-' + issue.issueindex}
          </div>
          <div className="ml-3 font-medium text-sm pt-0.5">
            {issue.issuename}
          </div>
          <div className="ml-3 font-medium text-sm  flex">
            {tags.map((tag) => (
              <div
                className="ml-2 px-3 py-0.5 rounded bg-slate-400"
                style={{
                  backgroundColor: colors[totalTags.indexOf(tag.tagname)],
                }}
              >
                {tag.tagname}
              </div>
            ))}
          </div>
        </div>
      </Link>

      <div className="inline-flex align-baseline">
        {!issue.dueDate ? (
          <span className="flex px-1.5 py-1 rounded-xl bg-gray-400 text-xs mr-2">
            <AccessTimeRoundedIcon
              sx={{height: 14, width: 14, marginRight: 0.5, marginTop: 0.1}}
            />
            {issue.dueDate ? <p>{convertDate(issue.dueDate)}</p> : <p>-</p>}
          </span>
        ) : diff < 0 ? (
          <div className="flex">
            <ReportIcon
              color="error"
              fontSize="small"
              sx={{mt: 0.25, mr: 0.25}}
            />
            <div className="font-bold pt-0.5 mr-2" style={{color: '#DB0000'}}>
              Overdue
            </div>
            <span
              className="flex px-1.5 py-1 rounded-xl text-white text-xs mr-2"
              style={{backgroundColor: '#DB0000'}}
            >
              <AccessTimeRoundedIcon
                sx={{height: 14, width: 14, marginRight: 0.5, marginTop: 0.1}}
              />
              {issue.dueDate ? <p>{convertDate(issue.dueDate)}</p> : <p>-</p>}
            </span>
          </div>
        ) : diff < 86400000 ? (
          <div className="flex">
            <ReportIcon
              fontSize="small"
              sx={{mt: 0.25, mr: 0.25, color: '#FF6B00'}}
            />
            <div className="font-bold pt-0.5 mr-2" style={{color: '#FF6B00'}}>
              Due soon
            </div>
            <span
              className="flex px-1.5 py-1 rounded-xl text-white text-xs mr-2"
              style={{backgroundColor: '#FF6B00'}}
            >
              <AccessTimeRoundedIcon
                sx={{height: 14, width: 14, marginRight: 0.5, marginTop: 0.1}}
              />
              {issue.dueDate ? <p>{convertDate(issue.dueDate)}</p> : <p>-</p>}
            </span>
          </div>
        ) : (
          <span className="flex px-1.5 py-1 rounded-xl bg-gray-400 text-xs mr-2">
            <AccessTimeRoundedIcon
              sx={{height: 14, width: 14, marginRight: 0.5, marginTop: 0.1}}
            />
            {issue.dueDate ? <p>{convertDate(issue.dueDate)}</p> : <p>-</p>}
          </span>
        )}

        <span
          className={`px-1.5 py-1 rounded-xl text-white text-xs mr-2
        ${
          status === 'Done'
            ? 'bg-done-color'
            : status === 'In progress'
            ? 'bg-in-progress-color'
            : status === 'Testing'
            ? 'bg-testing-color'
            : 'bg-to-do-color'
        }`}
        >
          {issue.estimatePoint ? <>{issue.estimatePoint}</> : <p>-</p>}
        </span>

        <Button
          size="small"
          style={{
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
                : status === 'Testing'
                ? '#FFE663'
                : '#EDCBB9'
            }`,
            color: `${
              status === 'Done'
                ? '#009606'
                : status === 'In progress'
                ? '#006BA7'
                : status === 'Testing'
                ? '#EC8E00'
                : '#EC6F28'
            }`,
          }}
          onClick={handleClick}
          endIcon={<ExpandMoreIcon />}
        >
          {status}
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
                {['To do', 'In progress', 'Testing', 'Done']
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
                          fontWeight: 600,
                          color: `${
                            element === 'Done'
                              ? '#009606'
                              : element === 'In progress'
                              ? '#006BA7'
                              : element === 'Testing'
                              ? '#EC8E00'
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

        <Priority priority={issue.priority} />

        <Avatar
          src={`${assignee.photoURL}`}
          sx={{
            width: 24,
            height: 24,
            ml: 1,
            backgroundColor: '#8993A4',
            marginRight: 1,
          }}
          alt={assignee ? assignee.username : ''}
        ></Avatar>
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
        content={`Do you really want to delete this Issue? This cannot be undone`}
      />
    </Box>
  );
}

export default TaskCard;
