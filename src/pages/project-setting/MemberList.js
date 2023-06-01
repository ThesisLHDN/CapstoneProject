import {useContext, useEffect, useState} from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Typography,
  FormControl,
  MenuItem,
  Select,
  Avatar,
} from '@mui/material';
import {AppContext} from 'src/Context/AppProvider';
import axios from 'src/hooks/axios';
import {useLocation} from 'react-router-dom';
import WarningPopup from 'src/components/popup/Warning';
import {AuthContext} from 'src/Context/AuthProvider';
import GroupsIcon from '@mui/icons-material/Groups';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';

function MemberList() {
  const [openDelPopup, setOpenDelPopup] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const {project, members, setMembers} = useContext(AppContext);
  const [ownerId, setOwnerId] = useState(project.ownerId);
  const location = useLocation();
  const pId = location.pathname.split('/')[2];
  const {
    user: {uid},
  } = useContext(AuthContext);

  const handleClick = (event) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };

  // const handleSetOwner = (event, ownerId) => {
  //   setAnchorEl(anchorEl ? null : event.currentTarget);
  //   setOwner(ownerId);
  // };

  const fetchProjectMember = async () => {
    try {
      // TODO get memberlist
      const res = await axios.get(`/pmembers/${pId}`);
      setMembers(res.data);
      console.log(members);
    } catch (err) {
      console.log(err);
    }
  };

  const setOwner = async (ownerId) => {
    try {
      const res = await axios.put(`/project/${pId}`, {
        pname: project.pname,
        pkey: project.pkey,
        ownerId: ownerId,
      });
      setOwnerId(ownerId);
      console.log(res);
    } catch (err) {
      console.log(err);
    }
  };

  const handleRemove = async (uid) => {
    try {
      await axios.delete(`/pmember/${pId}?uid=${uid}`);
      setOpenDelPopup(false);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchProjectMember();
  }, [openDelPopup]);

  // const open = Boolean(anchorEl);
  // const id = open ? 'simple-popper' : undefined;
  return (
    <div style={{width: '95%'}}>
      <Typography
        sx={{
          display: 'flex',
          color: 'green',
          marginTop: 2,
          marginLeft: 1,
          fontSize: 16,
          fontWeight: 700,
        }}
      >
        <PersonOutlineIcon sx={{marginRight: 2, width: 24, height: 24}} />
        Project Owner
      </Typography>
      <FormControl
        fullWidth
        size="small"
        sx={{
          marginLeft: 6,
          marginTop: 1,
          marginBottom: 3,
          width: '25%',
          backgroundColor: '#ECECEC',
        }}
      >
        <Select
          value={ownerId}
          onChange={(event) => setOwner(event.target.value)}
          disabled={uid === project.adminId ? false : true}
        >
          {members.map((member) => (
            <MenuItem value={member.id} key={member.id} sx={{marginY: 0.5}}>
              <div className="flex">
                <Avatar
                  src={member.photoURL}
                  sx={{
                    width: 24,
                    height: 24,
                    ml: 1,
                    backgroundColor: '#8993A4',
                    marginRight: 1,
                  }}
                  alt={member.username}
                ></Avatar>
                {member.username}
              </div>
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <Typography
        sx={{
          display: 'flex',
          color: 'green',
          marginTop: 2,
          marginLeft: 1,
          fontSize: 16,
          fontWeight: 700,
        }}
      >
        <GroupsIcon sx={{marginRight: 2, width: 24, height: 24}} />
        Project Members
      </Typography>
      <TableContainer component={Paper} sx={{marginLeft: 6, marginY: 2}}>
        <Table sx={{minWidth: 650}} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell sx={{fontWeight: 700}}>Name</TableCell>
              <TableCell sx={{fontWeight: 700}}>Email</TableCell>
              <TableCell align="right" sx={{fontWeight: 700}}>
                Role
              </TableCell>
              {uid == project.adminId && (
                <TableCell align="right" sx={{fontWeight: 700}}></TableCell>
              )}
            </TableRow>
          </TableHead>
          <TableBody>
            {members.map((member) => (
              <TableRow key={member.id}>
                <TableCell component="th" scope="row">
                  {member.username}
                </TableCell>
                <TableCell component="th" scope="row">
                  {member.email}
                </TableCell>
                <TableCell align="right">
                  <Button
                    style={{
                      display: 'inline-flex',
                      textTransform: 'none',
                      height: 40,
                      width: 165,
                      borderRadius: 3,
                      backgroundColor: '#ECECEC',
                      color: 'black',
                      justifyContent: 'space-between',
                    }}
                    onClick={
                      [project.adminId, project.ownerId].includes(member.id)
                        ? null
                        : handleClick
                    }
                  >
                    {member.id === project.adminId ? (
                      <span className="pl-5">Administrator</span>
                    ) : member.id === project.ownerId &&
                      member.id !== project.adminId ? (
                      <span className="pl-5">Project Owner</span>
                    ) : (
                      <span className="pl-5">Project Member</span>
                    )}
                    {/* {![project.adminId, project.ownerId].includes(
                      member.id,
                    ) && (
                      <ExpandMoreIcon
                        style={{display: 'inline-flex', alignItems: 'flex-end'}}
                      />
                    )} */}
                  </Button>

                  {/* {uid == project.adminId && (
                    <Popper
                      id={id}
                      open={open}
                      anchorEl={anchorEl}
                      sx={{zIndex: 5}}
                    >
                      <ClickAwayListener onClickAway={handleClick}>
                        <Box
                          sx={{
                            backgroundColor: 'white',
                            borderRadius: 1,
                            marginTop: '5px',
                            border: 'solid 1px #ECEDF0',
                            boxShadow: '2px 2px 5px #00000020',
                            display: 'flex',
                            flexDirection: 'column',
                            width: 160,
                          }}
                        >
                          <MenuList sx={{px: 0, width: '100%'}}>
                            <MenuItem
                              sx={{px: 4, py: 1, fontSize: 14}}
                              onClick={(event) =>
                                handleSetOwner(event, member.id)
                              }
                            >
                              Project Owner
                            </MenuItem>
                          </MenuList>
                        </Box>
                      </ClickAwayListener>
                    </Popper>
                  )} */}
                </TableCell>
                {[project.adminId, project.ownerId].includes(uid) && (
                  <TableCell align="right">
                    {![project.adminId, project.ownerId].includes(uid) && (
                      <>
                        <Button
                          onClick={() => setOpenDelPopup(true)}
                          variant="text"
                          sx={{
                            color: 'red',
                            textTransform: 'none',
                            fontSize: 16,
                            fontWeight: 700,
                            marginTop: 1,
                          }}
                        >
                          Remove
                        </Button>
                        <WarningPopup
                          title={'Remove Member'}
                          open={openDelPopup}
                          onClose={() => setOpenDelPopup(false)}
                          handleSubmit={() => handleRemove(member.id)}
                          content={`Do you really want to remove this member? This cannot be undone`}
                        />
                      </>
                    )}
                  </TableCell>
                )}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default MemberList;
