import React, {useState, useContext, useMemo} from 'react';
import DatePicker from 'react-datepicker';
import {
  Grid,
  Typography,
  Button,
  TextField,
  ClickAwayListener,
  MenuItem,
  MenuList,
  IconButton,
  Popper,
  Box,
  Snackbar,
  Alert,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import 'react-datepicker/dist/react-datepicker.css';
import Comments from './comment/Comments';
import CloseIcon from '@mui/icons-material/Close';
import {colorHover} from 'src/style';

import {storage} from 'src/firebase/config';
import {getDownloadURL, ref, uploadBytesResumable} from 'firebase/storage';
import {addDocument} from 'src/firebase/firestoreServices';
import {AuthContext} from 'src/Context/AuthProvider';
import Attachments from './Attachments';
import Priority from 'src/components/priorities';
import axios from 'src/hooks/axios';
import {AppContext} from 'src/Context/AppProvider';
import {SocketContext} from 'src/Context/SocketProvider';

function handleCreateTime(time) {
  const t = new Date(time);
  const a = t.toString().split(' ');
  a.splice(4, 4);
  return a[0] + ', ' + a[1] + ' ' + a[2] + ', ' + a[3];
}

function LeftIssueDetail({issue, setIssue, trigger, setTrigger}) {
  const {user} = useContext(AuthContext);
  const {project} = useContext(AppContext);
  const {socket} = useContext(SocketContext);

  const [open, setOpen] = useState(false);
  const [openPriority, setOpenPriority] = useState(false);

  // function handleClose() {
  //   setOpen(false);
  // }

  const CommentArea = useMemo(
    () => <Comments currentUser={user} issueId={issue.id} />,
    [issue.id],
  );

  const AttachmentArea = useMemo(
    () => <Attachments issueId={issue.id} />,
    [issue.id],
  );

  // const [startDate, setStartDate] = useState(new Date());
  // const [status, setStatus] = useState(issue.issuestatus);
  const [anchorEl, setAnchorEl] = useState(null);
  const [anchorElPriority, setAnchorElPriority] = useState(null);
  // const [childIssue, setChildIssue] = useState(false);
  // const [createChild, setCreateChild] = useState(false);
  const [snackbarContent, setSnackbarContent] = useState();
  const [changeDescription, setChangeDescription] = useState(false);

  const updateIssue = async ({status, due, priority, assignee, point} = {}) => {
    try {
      await axios.put(`/issue/${issue.id}`, {
        issuestatus: status ? status : issue.issuestatus,
        descript: issue.descript,
        dueDate: due
          ? due
          : issue.dueDate
          ? new Date(issue.dueDate).toISOString().slice(0, 19).replace('T', ' ')
          : new Date().toISOString().slice(0, 19).replace('T', ' '),
        priority: priority ? priority : issue.priority,
        assigneeId: issue.assigneeId,
        estimatePoint: issue.estimatePoint,
      });
      setTrigger(true);
      // setIssues([...res.data]);
    } catch (err) {
      console.log(err);
    }
  };

  const handleChange = (event, element) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
    // setStatus(element);
    setIssue({...issue, issuestatus: element});
    setOpen(!open);
    updateIssue({status: element});
    socket.emit('updateIssue', {
      senderId: user.uid,
      senderName: user.displayName,
      senderAvatar: user.photoURL,
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

  const handleChangePriority = (event, element) => {
    setAnchorElPriority(anchorElPriority ? null : event.currentTarget);
    // setStatus(element);
    setIssue({...issue, priority: element});
    setOpenPriority(!openPriority);
    updateIssue({priority: element});
    socket.emit('updateIssue', {
      senderId: user.uid,
      senderName: user.displayName,
      senderAvatar: user.photoURL,
      issueId: issue.id,
      updatedIssue: issue.issueindex,
      projectId: project.pId,
      projectKey: project.pkey,
      receiverId:
        issue.assigneeId && issue.assigneeId != issue.reporterId
          ? [issue.reporterId, issue.assigneeId]
          : [issue.reporterId],
      type: 'priority',
      newState: element,
      dateUpdate: new Date(),
    });
  };

  const handleChangeDescription = (event) => {
    setChangeDescription(true);
    setIssue({...issue, [event.target.name]: event.target.value});
  };

  const onChangeDate = (date) => {
    setIssue({
      ...issue,
      dueDate: date,
    });
    updateIssue({due: date});
    socket.emit('updateIssue', {
      senderId: user.uid,
      senderName: user.displayName,
      senderAvatar: user.photoURL,
      issueId: issue.id,
      updatedIssue: issue.issueindex,
      projectId: project.pId,
      projectKey: project.pkey,
      receiverId:
        issue.assigneeId && issue.assigneeId != issue.reporterId
          ? [issue.reporterId, issue.assigneeId]
          : [issue.reporterId],
      type: 'due date',
      newState: date,
      dateUpdate: new Date(),
    });
  };

  const handleUpdate = (event) => {
    updateIssue();
    setChangeDescription(false);
    socket.emit('updateIssue', {
      senderId: user.uid,
      senderName: user.displayName,
      senderAvatar: user.photoURL,
      issueId: issue.id,
      updatedIssue: issue.issueindex,
      projectId: project.pId,
      projectKey: project.pkey,
      receiverId:
        issue.assigneeId && issue.assigneeId != issue.reporterId
          ? [issue.reporterId, issue.assigneeId]
          : [issue.reporterId],
      type: 'description',
      newState: '',
      dateUpdate: new Date(),
    });
  };

  const handleClick = (event) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
    setOpen(!open);
  };

  const handleClickPriority = (event) => {
    setAnchorElPriority(anchorElPriority ? null : event.currentTarget);
    setOpenPriority(!openPriority);
  };

  const id = open ? 'simple-popper' : undefined;
  const idPriority = openPriority ? 'simple-popper-priority' : undefined;

  // const handleChildIssue = () => {
  //   if (tasks.length === 0) {
  //     setChildIssue(true);
  //   }
  //   setCreateChild(true);
  // };

  const uploadHandler = (files) => {
    if (files) {
      let file = files[0];
      console.log('Updating');
      if (file) {
        console.log(file);
        let refPath = `attachments/${new Date().getTime() + file.name}`;
        const fileRef = ref(storage, refPath);
        const upLoadTask = uploadBytesResumable(fileRef, file);
        upLoadTask.on(
          'state_changed',
          (snapshot) => {
            const progress = Math.round(
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100,
            );
            setSnackbarContent('Upload is ' + progress + '% done');
          },
          (err) => {
            console.log(err);
          },
          () => {
            getDownloadURL(upLoadTask.snapshot.ref).then(async (url) => {
              let downloadURL = url;
              if (downloadURL) {
                const newDocData = {
                  authorId: user.uid,
                  name: file.name,
                  type: file.type,
                  downloadURL: downloadURL,
                  storagePath: refPath,
                };
                const path = `issues/${issue.id}/documents`;
                console.log('Add ', newDocData, ` to ${path}`);
                addDocument(path, newDocData);
              }
            });
          },
        );
      }
    }
    return;
  };
  const action = (
    <React.Fragment>
      <Button
        color="secondary"
        size="small"
        onClick={() => {
          setSnackbarContent(false);
        }}
      >
        UNDO
      </Button>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={() => {
          setSnackbarContent(false);
        }}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  );

  return (
    <div className="pr-10">
      <Typography
        variant="h5"
        sx={{fontWeight: 700, fontFamily: 'Open Sans, sans-serif'}}
      >
        {issue.issuename}
      </Typography>

      <Grid container sx={{display: 'flex', marginTop: 3}}>
        <Button
          style={{
            display: 'flex',
            textTransform: 'none',
            height: 34,
            borderRadius: 3,
            backgroundColor: `${
              issue.issuestatus === 'Done'
                ? '#A4E7AB'
                : issue.issuestatus === 'In progress'
                ? '#9AD1EF'
                : issue.issuestatus === 'To do'
                ? '#EDCBB9'
                : '#FFE663'
            }`,
            color: `${
              issue.issuestatus === 'Done'
                ? '#009606'
                : issue.issuestatus === 'In progress'
                ? '#006BA7'
                : issue.issuestatus === 'To do'
                ? '#EC6F28'
                : '#EC8E00'
            }`,
          }}
          onClick={handleClick}
        >
          {issue.issuestatus}
          <ExpandMoreIcon />
        </Button>

        <Popper id={id} open={open} anchorEl={anchorEl} sx={{zIndex: 5}}>
          <ClickAwayListener onClickAway={handleClick}>
            <Box
              sx={{
                backgroundColor: 'white',
                borderRadius: 1,
                right: issue.issuestatus === 'In progress' ? -60 : -80,
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
                    return element !== issue.issuestatus;
                  })
                  .map((element) => {
                    return (
                      <MenuItem
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

        <Button
          component="label"
          style={{
            display: 'flex',
            textTransform: 'none',
            height: 34,
            borderRadius: 3,
            marginLeft: '20px',
            backgroundColor: '#EFEFEF',
            color: 'black',
          }}
        >
          <AttachFileIcon sx={{rotate: '45deg', marginRight: 1}} />
          Attach
          <input
            hidden
            accept="*"
            multiple
            type="file"
            onClick={(e) => (e.target.value = null)}
            onChange={(event) => {
              uploadHandler(event.target.files);
            }}
          />
        </Button>

        {/* <Button
          style={{
            display: 'flex',
            textTransform: 'none',
            height: 34,
            borderRadius: 3,
            marginLeft: '20px',
            backgroundColor: '#EFEFEF',
            color: 'black',
          }}
          onClick={handleChildIssue}
        >
          <LibraryAddIcon sx={{marginRight: 1}} />
          Add Child Issue
        </Button> */}
      </Grid>

      <Typography sx={{mt: 3, mb: 1, fontSize: 16, fontWeight: 700}}>
        Description
      </Typography>

      <TextField
        hiddenLabel
        sx={{
          width: '100%',
          scrollbarGutter: 'stable',
          textAlign: 'justify',
          '& textarea': {
            textAlign: 'justify',
          },
        }}
        onChange={handleChangeDescription}
        name="descript"
        multiline
        rows={2}
        value={issue.descript ? issue.descript : ''}
      ></TextField>
      {changeDescription && (
        <Button
          variant="contained"
          size="medium"
          sx={{mt: 2, ...colorHover.greenGradBtn}}
          onClick={handleUpdate}
        >
          Update description
        </Button>
      )}

      {/* <Typography sx={{marginTop: 1, fontSize: 14, textAlign: 'justify'}}>
        {issue.descript}
      </Typography> */}

      <Grid container spacing={2} sx={{marginTop: 1}}>
        <Grid item xs={3}>
          <Typography sx={{fontSize: 14, fontWeight: 700}}>
            Create Date
          </Typography>
          <Typography sx={{marginTop: 2, fontSize: 14, fontWeight: 700}}>
            Due Date
          </Typography>
          <Typography sx={{marginTop: 2, fontSize: 14, fontWeight: 700}}>
            Priority
          </Typography>
          {/* <Typography sx={{marginTop: 2, fontSize: 14, fontWeight: 700}}>
            Time Estimate
          </Typography> */}
        </Grid>

        <Grid item xs={5}>
          <Typography sx={{marginLeft: 3, fontSize: 14}}>
            {handleCreateTime(issue.createTime)}
          </Typography>
          <div
            className="mt-4 mb-0 ml-6 text-sm"
            style={{fontFamily: 'Roboto, Helvetica, Arial,sans-serif'}}
          >
            <DatePicker
              selected={issue.dueDate ? new Date(issue.dueDate) : new Date()}
              dateFormat="EEE, MMM dd, yyyy"
              onChange={(date) =>
                onChangeDate(
                  new Date(date).toISOString().slice(0, 19).replace('T', ' '),
                )
              }
            />
          </div>
          <div className="mt-4 mb-0 ml-4 text-sm">
            <Button
              aria-label="priority"
              style={{
                textTransform: 'none',
                height: 20,
                // color: `${
                //   issue.priority === 'High'
                //     ? 'red'
                //     : issue.priority === 'Medium'
                //     ? 'orange'
                //     : 'green'
                // }`,
              }}
              onClick={handleClickPriority}
            >
              {issue.priority ? (
                <Priority priority={issue.priority} text />
              ) : (
                'Select'
              )}
            </Button>
            <Popper
              id={idPriority}
              open={openPriority}
              anchorEl={anchorElPriority}
              sx={{zIndex: 5}}
            >
              <ClickAwayListener onClickAway={handleClickPriority}>
                <Box
                  sx={{
                    backgroundColor: 'white',
                    borderRadius: 1,
                    right: issue.issuestatus === 'In progress' ? -60 : -80,
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
                    {['Critical', 'High', 'Medium', 'Low']
                      .filter((element) => {
                        return element !== issue.priority;
                      })
                      .map((element) => {
                        return (
                          <MenuItem
                            sx={{
                              py: 1,
                              fontSize: 14,
                              fontWeight: 600,
                            }}
                            onClick={(e) => handleChangePriority(e, element)}
                          >
                            <Priority priority={element} text></Priority>
                          </MenuItem>
                        );
                      })}
                  </MenuList>
                </Box>
              </ClickAwayListener>
            </Popper>
          </div>
          {/* <TextField
            variant="standard"
            placeholder="None"
            size="small"
            sx={{marginLeft: 3, marginTop: 2, width: '100%'}}
            InputProps={{disableUnderline: true, style: {fontSize: 14}}}
          ></TextField> */}
        </Grid>
      </Grid>

      {/* <ChildIssues
        childIssue={childIssue}
        setChildIssue={setChildIssue}
        createChild={createChild}
        setCreateChild={setCreateChild}
        tasks={tasks}
      />
       */}
      {AttachmentArea}

      <Typography sx={{marginTop: 3, fontSize: 16, fontWeight: 700}}>
        Comments
      </Typography>
      <Snackbar
        open={snackbarContent}
        autoHideDuration={3000}
        onClose={() => {
          setSnackbarContent(false);
        }}
        action={action}
      >
        <Alert
          onClose={() => setSnackbarContent(false)}
          severity="success"
          sx={{width: '100%'}}
        >
          {snackbarContent}
        </Alert>
      </Snackbar>
      {CommentArea}
    </div>
  );
}

export default LeftIssueDetail;
