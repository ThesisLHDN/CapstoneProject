import React, {useContext, useEffect, useState} from 'react';
import {
  Typography,
  Grid,
  LinearProgress,
  TextField,
  Avatar,
  Button,
  Popper,
  MenuList,
  MenuItem,
  Box,
  ClickAwayListener,
} from '@mui/material';
import TagsInput from './tags-input/TagsInput';
import axios from 'axios';
import {AppContext} from 'src/Context/AppProvider';
import {useLocation} from 'react-router-dom';

function RightIssueDetail({issue, setIssue, trigger, setTrigger}) {
  const location = useLocation();
  const pId = location.pathname.split('/')[2];
  const [tags, setTags] = useState([]);
  const [reporter, setReporter] = useState({});
  const [assignee, setAssignee] = useState({});
  const [open, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const {project} = useContext(AppContext);
  const [members, setMembers] = useState([]);

  const id = open ? 'simple-popper' : undefined;

  const getTags = async () => {
    try {
      const res = await axios.get(`http://localhost:8800/tags/${issue.id}`);
      setTags(res.data.map((tag) => tag.tagname));
      // console.log(res.data.map((tag) => tag.tagname));
    } catch (err) {
      console.log(err);
    }
  };

  const getReporter = async () => {
    try {
      const res = await axios.get(
        `http://localhost:8800/user/${issue.reporterId}`,
      );
      setReporter(res.data);
      // console.log(res);
    } catch (err) {
      console.log(err);
    }
  };

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

  const fetchProjectMember = async () => {
    try {
      const res = await axios.get(`http://localhost:8800/pmembers/${pId}`);
      // console.log(res.data);
      setMembers([...res.data]);
    } catch (err) {
      console.log(err);
    }
  };

  const updatePoint = (event) => {
    updateIssue({point: event.target.value});
    event.target.value = '';
  };

  const updateIssue = async ({status, due, priority, assignee, point} = {}) => {
    console.log('################', point);
    try {
      const res = await axios.put(`http://localhost:8800/issue/${issue.id}`, {
        issuestatus: status ? status : issue.issuestatus,
        descript: issue.descript,
        dueDate: due
          ? due
          : issue.dueDate
          ? new Date(issue.dueDate).toISOString().slice(0, 19).replace('T', ' ')
          : new Date().toISOString().slice(0, 19).replace('T', ' '),
        priority: priority ? priority : issue.priority,
        assigneeId: assignee ? assignee : issue.assigneeId,
        estimatePoint: point ? point : issue.estimatePoint,
      });
      setTrigger(true);
      // console.log('#############3', res);
      // setIssues([...res.data]);
    } catch (err) {
      console.log(err);
    }
  };

  const handleChange = (event, element) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
    // setStatus(element);
    setIssue({...issue, assigneeId: element.id});
    setOpen(!open);
    updateIssue({assignee: element.id});
  };

  const handleClick = (event) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
    setOpen(!open);
  };

  useEffect(() => {
    getReporter();
    getTags();
    fetchProjectMember();
    if (issue.assigneeId) {
      getAssignee();
    }
  }, [issue, trigger]);

  return (
    <div className="pl-5">
      <Typography
        variant="h5"
        sx={{fontWeight: 700, fontFamily: 'Open Sans, sans-serif'}}
      >
        Details
      </Typography>

      <Grid
        container
        spacing={2}
        sx={{marginTop: 3, border: 'solid 1px #B4B4B4', borderRadius: 1}}
      >
        <Grid container sx={{marginTop: 2}}>
          <Grid item xs={5}>
            <Typography
              sx={{marginTop: 1, marginLeft: 2, fontSize: 14, fontWeight: 700}}
            >
              Time Tracking
            </Typography>
          </Grid>
          <Grid item xs={6.5}>
            <LinearProgress
              variant="determinate"
              value={`${
                issue.dueDate
                  ? Math.ceil(
                      Math.abs(
                        ((new Date() - new Date(issue.createTime)) /
                          (new Date(issue.dueDate) -
                            new Date(issue.createTime))) *
                          100,
                      ),
                    )
                  : '0'
              }`}
              color="success"
              sx={{
                marginTop: 2,
                marginBottom: 3,
                fontSize: 14,
                fontWeight: 700,
                width: '100%',
              }}
            />
          </Grid>
        </Grid>

        <Grid container sx={{marginTop: 1}}>
          <Grid item xs={5}>
            <Typography
              sx={{
                marginTop: 0.5,
                marginBottom: 1,
                marginLeft: 2,
                fontSize: 14,
                fontWeight: 700,
              }}
            >
              Assignee
            </Typography>
          </Grid>
          <Grid item xs={6.5}>
            <div className="flex">
              <Button
                style={{
                  textTransform: 'none',
                  height: assignee.username ? '' : 20,
                  width: 'fit-content',
                  backgroundColor: assignee.username ? '#fff' : '#F5F5F5',
                  marginTop: assignee.username ? -10 : 5,
                }}
                onClick={handleClick}
              >
                {assignee.username ? (
                  <div className="flex">
                    <Avatar
                      src={assignee.photoURL}
                      sx={{width: 32, height: 32, backgroundColor: '#8993A4'}}
                      alt={assignee.username}
                    />
                    <span className="mt-1 ml-2 text-sm text-black">
                      {assignee.username ? assignee.username : ''}
                    </span>
                  </div>
                ) : (
                  <></>
                )}
              </Button>
            </div>
            <Popper id={id} open={open} anchorEl={anchorEl} sx={{zIndex: 5}}>
              <ClickAwayListener onClickAway={handleClick}>
                <Box
                  sx={{
                    backgroundColor: 'white',
                    borderRadius: 1,
                    right: -120,
                    marginTop: '5px',
                    border: 'solid 1px #ECEDF0',
                    boxShadow: '2px 2px 5px #00000020',
                    display: 'flex',
                    flexDirection: 'column',
                    position: 'absolute',
                    width: 240,
                    overflow: 'hidden',
                  }}
                >
                  <MenuList sx={{px: 0, width: '100%'}}>
                    {members.map((element) => {
                      return (
                        <MenuItem
                          key={element.username}
                          sx={{
                            py: 1,
                            fontSize: 14,
                            fontWeight: 900,
                          }}
                          onClick={(e) => handleChange(e, element)}
                        >
                          {element.username}
                        </MenuItem>
                      );
                    })}
                  </MenuList>
                </Box>
              </ClickAwayListener>
            </Popper>
          </Grid>
        </Grid>

        <Grid container sx={{marginTop: 1}}>
          <Grid item xs={5}>
            <Typography
              sx={{marginTop: 2, marginLeft: 2, fontSize: 14, fontWeight: 700}}
            >
              Tags
            </Typography>
          </Grid>
          <Grid item xs={6.5}>
            <div className="mt-3">
              <TagsInput tags={tags} issueId={issue.id} />
            </div>
          </Grid>
        </Grid>

        <Grid container sx={{marginTop: 1}}>
          <Grid item xs={5}>
            <Typography
              sx={{
                marginTop: 2.4,
                marginLeft: 2,
                fontSize: 14,
                fontWeight: 700,
              }}
            >
              Story Point Estimate
            </Typography>
          </Grid>
          <Grid item xs={6.5}>
            <div className="flex ml-1">
              {issue.estimatePoint && (
                <span className="mt-5 mr-5">{issue.estimatePoint}</span>
              )}
              <TextField
                variant="standard"
                placeholder="Update point"
                size="small"
                sx={{marginTop: 2.4, width: '100%'}}
                InputProps={{disableUnderline: true, style: {fontSize: 14}}}
                onKeyUp={(event) =>
                  event.key === 'Enter' ? updatePoint(event) : null
                }
              ></TextField>
            </div>
          </Grid>
        </Grid>

        <Grid container sx={{marginTop: 1, marginBottom: 2}}>
          <Grid item xs={5}>
            <Typography
              sx={{
                marginTop: 2.5,
                marginLeft: 2,
                fontSize: 14,
                fontWeight: 700,
              }}
            >
              Reporter
            </Typography>
          </Grid>
          <Grid item xs={6.5}>
            <div className="flex mt-3">
              <Avatar
                src={reporter.photoURL}
                sx={{width: 32, height: 32, backgroundColor: '#8993A4'}}
                alt={reporter.username}
              />
              <span className="mt-2 ml-2 text-sm">{reporter.username}</span>
            </div>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}

export default RightIssueDetail;
