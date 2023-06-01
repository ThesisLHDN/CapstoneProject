import React, {useState, useEffect, useRef, useContext} from 'react';
import {
  Avatar,
  IconButton,
  Popper,
  ClickAwayListener,
  Grow,
  Typography,
  MenuList,
  MenuItem,
  Box,
} from '@mui/material';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import {color} from 'src/style';
import {SocketContext} from 'src/Context/SocketProvider';
import axios from 'src/hooks/axios';
import {AuthContext} from 'src/Context/AuthProvider';
import KeyboardDoubleArrowUpRoundedIcon from '@mui/icons-material/KeyboardDoubleArrowUpRounded';
import ExpandLessRoundedIcon from '@mui/icons-material/ExpandLessRounded';
import DragHandleRoundedIcon from '@mui/icons-material/DragHandleRounded';
import KeyboardArrowDownRoundedIcon from '@mui/icons-material/KeyboardArrowDownRounded';

function handleCreateTime(time) {
  const t = new Date(time);
  const a = t.toString().split(' ');
  const dt = a[4].split(':');
  return (
    a[0] + ', ' + a[1] + ' ' + a[2] + ', ' + a[3] + ' at ' + dt[0] + ':' + dt[1]
  );
}

function handleDueDate(time) {
  const a = time.split(' ');
  return a[0];
}

function Notification() {
  const [open, setOpen] = useState(false);
  const anchorRef = useRef(null);
  const {
    user: {uid, photoURL},
  } = useContext(AuthContext);
  const {socket} = useContext(SocketContext);
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    socket.on('getNotification', (data) => {
      setNotifications((prev) => [data, ...prev]);
      console.log('AAAAAAA', data);
      addNoti(data);
    });
  }, [socket]);

  useEffect(() => {
    fetchNotiData();
  }, []);

  const fetchNotiData = async () => {
    try {
      const res = await axios.get(`/noti/${uid}`);
      setNotifications(
        res.data.filter((noti) => noti.senderAvatar != photoURL),
      );
    } catch (err) {
      console.log(err);
    }
  };

  const addNoti = async (data) => {
    try {
      const res = await axios.post('/noti', data);
      console.log('AAAAAAA', res);
    } catch (err) {
      console.log(err);
    }
  };

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen(false);
  };

  // return focus to the button when we transitioned from !open -> open
  const prevOpen = useRef(open);
  useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }
    prevOpen.current = open;
  }, [open]);

  return (
    <>
      <IconButton
        color="primary"
        aria-label="no notification"
        ref={anchorRef}
        id="composition-button"
        aria-controls={open ? 'composition-menu' : undefined}
        aria-expanded={open ? 'true' : undefined}
        aria-haspopup="true"
        onClick={handleToggle}
        sx={{color: color.green03, textTransform: 'none'}}
      >
        <NotificationsNoneIcon />
      </IconButton>

      <Popper
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        placement="bottom-start"
        transition
        disablePortal
        sx={{zIndex: 5}}
      >
        {({TransitionProps, placement}) => (
          <ClickAwayListener onClickAway={handleClose}>
            <Grow
              {...TransitionProps}
              style={{
                transformOrigin:
                  placement === 'bottom-start' ? 'right bottom' : 'right top',
              }}
            >
              <div>
                <Box
                  elevation={2}
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    backgroundColor: '#F5F5F5',
                    boxShadow: '0px 0px 20px #00000020; 0px 0px 20px #00000020',
                    width: 400,
                    height: 500,
                    pt: 1,
                    overflow: 'scroll',
                  }}
                >
                  <div className="border-b" style={{marginBottom: -8}}>
                    <div className="flex justify-between ml-2">
                      <div className="flex">
                        <Typography
                          sx={{fontWeight: 600, fontSize: 16, ml: 1, my: 0.5}}
                        >
                          Notifications
                        </Typography>
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-between">
                    <MenuList>
                      {notifications.map((noti) => (
                        <MenuItem
                          sx={{
                            pt: 1.5,
                            pb: 1.5,
                            fontSize: 14,
                            borderBottom: '1px #E5E7EB solid',
                            whiteSpace: 'normal',
                          }}
                        >
                          <div className="flex">
                            <Avatar
                              src={noti.senderAvatar}
                              sx={{
                                width: 24,
                                height: 24,
                                mt: 0.5,
                                backgroundColor: '#8993A4',
                              }}
                              alt="Lam Nguyen"
                            />
                            <div className="ml-3">
                              <div className="mt-1 text-justify">
                                <span className="font-semibold">
                                  {noti.senderName}
                                </span>{' '}
                                just updated {noti.type} of issue{' '}
                                <span className="font-semibold">
                                  {noti.projectKey}-{noti.updatedIssue}
                                </span>{' '}
                                {['due date', 'assignee'].includes(
                                  noti.type,
                                ) ? (
                                  <>
                                    to{' '}
                                    <span className="font-semibold">
                                      {noti.type == 'due date'
                                        ? handleDueDate(noti.newState)
                                        : noti.newState}
                                    </span>
                                  </>
                                ) : noti.type == 'status' ? (
                                  <>
                                    to{' '}
                                    <span
                                      style={{
                                        color: `${
                                          noti.newState === 'Done'
                                            ? '#009606'
                                            : noti.newState === 'In progress'
                                            ? '#006BA7'
                                            : noti.newState === 'Testing'
                                            ? '#EC8E00'
                                            : '#EC6F28'
                                        }`,
                                        fontWeight: 600,
                                      }}
                                    >
                                      {noti.newState}
                                    </span>
                                  </>
                                ) : noti.type == 'priority' ? (
                                  <>
                                    to{' '}
                                    <span>
                                      {noti.newState == 'Critical' ? (
                                        <KeyboardDoubleArrowUpRoundedIcon
                                          sx={{color: 'red'}}
                                        />
                                      ) : noti.newState == 'High' ? (
                                        <ExpandLessRoundedIcon
                                          sx={{color: 'coral'}}
                                        />
                                      ) : noti.newState == 'Medium' ? (
                                        <DragHandleRoundedIcon
                                          sx={{color: 'orange'}}
                                        />
                                      ) : (
                                        <KeyboardArrowDownRoundedIcon
                                          sx={{color: 'green'}}
                                        />
                                      )}{' '}
                                      {noti.newState}
                                    </span>
                                  </>
                                ) : (
                                  <></>
                                )}
                              </div>
                              <div className="text-gray-500 mt-3">
                                {handleCreateTime(noti.dateUpdate)}
                              </div>
                            </div>
                          </div>
                        </MenuItem>
                      ))}
                    </MenuList>
                  </div>
                </Box>
              </div>
            </Grow>
          </ClickAwayListener>
        )}
      </Popper>
    </>
  );
}

export default Notification;
