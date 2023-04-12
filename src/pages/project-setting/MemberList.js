import React, {useContext, useEffect, useState} from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Popper,
  ClickAwayListener,
  MenuItem,
  MenuList,
  Box,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {AppContext} from 'src/Context/AppProvider';
import axios from 'axios';
import {useLocation} from 'react-router-dom';

function createData(name, email, role) {
  return {name, email, role};
}


function MemberList() {
  const [anchorEl, setAnchorEl] = useState(null);
  const [role, setRole] = useState('');
  const {admin, project} = useContext(AppContext);
  const [members, setMembers] = useState([admin]);
  const location = useLocation();
  const pId = location.pathname.split('/')[2];
  // console.log(workspace);
  const handleClick = (event) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };

  console.log(members);

  const fetchProjectMember = async () => {
    try {
      const res = await axios.get(`http://localhost:8800/pmembers/${pId}`);
      // console.log(res.data);
      setMembers([...members, ...res.data]);
      console.log(members);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchProjectMember();
    // fetchProjectMember();
  }, []);

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popper' : undefined;
  return (
    <div style={{width: '95%'}}>
      <TableContainer component={Paper} sx={{marginLeft: 6, marginY: 2}}>
        <Table sx={{minWidth: 650}} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell sx={{fontWeight: 700}}>Name</TableCell>
              <TableCell sx={{fontWeight: 700}}>Email</TableCell>
              <TableCell align="right" sx={{fontWeight: 700}}>
                Role
              </TableCell>
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
                    onClick={handleClick}
                  >
                    {member.id == admin.id ? (
                      <span className="pl-5">Administrator</span>
                    ) : member.id == project.ownerId &&
                      member.id !== admin.id ? (
                      <span className="pl-5">Project Owner</span>
                    ) : (
                      <span className="pl-5">Project Member</span>
                    )}
                    {/* <ExpandMoreIcon
                      style={{display: 'inline-flex', alignItems: 'flex-end'}}
                    /> */}
                  </Button>

                  {/* <Popper
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
                          {['Project Owner', 'Team Member']
                            .filter((element) => {
                              return element != role;
                            })
                            .map((element) => {
                              return (
                                <MenuItem
                                  sx={{px: 4, py: 1, fontSize: 14}}
                                  onClick={handleClick}
                                >
                                  {element}
                                </MenuItem>
                              );
                            })}
                        </MenuList>
                      </Box>
                    </ClickAwayListener>
                  </Popper> */}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default MemberList;
