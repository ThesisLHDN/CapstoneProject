import React, {useContext, useEffect} from 'react';
import {
  Box,
  Button,
  Paper,
  Typography,
  ImageList,
  ImageListItem,
  Avatar,
} from '@mui/material';
import WarningPopup from 'src/components/popup/Warning';
import {useState} from 'react';
import {useLocation} from 'react-router-dom';
import axios from 'axios';
import {AppContext} from 'src/Context/AppProvider';
import {AuthContext} from 'src/Context/AuthProvider';

// const members = [
//   'Menaal Bloom',
//   'Sam Donald',
//   'Celyn Nash',
//   'Cecelia Patterson',
//   'Weronika Horne',
//   'Johnathan Erickson',
//   'Mia Freeman',
//   'Yu Plant',
//   'Dixie Tillman',
//   'Hetty Cunningham',
//   'Abida Grant',
//   'Emelie Sharp',
//   'Aysha Delarosa',
//   'Lilith Mclean',
//   'Christie Bentley',
//   'Maverick Foley',
//   'Nana Mcintosh',
//   'Jamila Lam',
//   'Missy Schwartz',
//   // 'Susanna Gross',
//   // 'Everett Burks',
//   // 'Sade Neal',
//   // 'Oliver Williamson',
//   // 'Marius Marquez',
//   // 'Janelle Silva',
//   // 'Habib Devine',
//   // 'Cain Arnold',
//   // 'Lewys Swan',
//   // 'Cade Ferry',
//   // 'Rory Watt',
// ];

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

function stringAvatar(name) {
  return {
    sx: {
      bgcolor: stringToColor(name),
    },
    children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`,
  };
}

function ImageIndividual({member, workspace, uid}) {
  const [open, setOpen] = useState(false);

  function handleClose(result) {
    setOpen(false);
    // setNewOwner(email);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.delete(
        `http://localhost:8800/wsmember/${member.id}?wsId=${workspace.id}`,
      );
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Box
      key={member.id}
      sx={{
        position: 'relative',
        '&:hover  .memberSelect': {
          display: 'inline-block !important',
        },
        overflowX: 'visible !important',
      }}
    >
      <ImageListItem key={member.id} sx={{overflowX: 'visible !important'}}>
        <Avatar
          alt={member.username ? member.username : member.email}
          src="/static/images/avatar/1.jpg"
          // {...stringAvatar(member.username ? member.username : member.email)}
        />
        {/* <Avatar alt={member} className="avatarPic" src="#" /> */}
      </ImageListItem>
      {uid == workspace.adminId && (
        <Paper
          elevation={3}
          className="memberSelect"
          sx={{
            display: 'none',
            p: 1,
            position: 'absolute',
            top: 0,
            left: 50,
            zIndex: '5',
            minWidth: 180,
          }}
        >
          <Typography sx={{mb: 1, fontWeight: 700}}>
            {member.username}
          </Typography>
          <Typography sx={{mb: 1, fontStyle: 'italic'}}>
            {member.email}
          </Typography>
          <Button
            variant="outlined"
            color="error"
            sx={{width: '100%', fontSize: 14}}
            onClick={() => setOpen(true)}
          >
            Remove member
          </Button>
          <WarningPopup
            onClose={handleClose}
            open={open}
            title={
              <p>
                Remove{' '}
                <i>{member.username ? member.username : member.email}?</i>
              </p>
            }
            content={
              <p>
                Remove{' '}
                <i>
                  <b>{member.username ? member.username : member.email}</b>
                </i>{' '}
                from{' '}
                <i>
                  <b>{workspace.wsname}</b>
                </i>
                ? This will remove this member's access to all resources of the
                current project.
              </p>
            }
            delContent={'Remove'}
            handleSubmit={handleSubmit}
          />
        </Paper>
      )}
    </Box>
  );
}

function AvatarList() {
  const [members, setMembers] = useState([]);
  const {workspace} = useContext(AppContext);
  const {
    user: {uid},
  } = useContext(AuthContext);
  const location = useLocation();
  const wsId = location.pathname.split('/')[2];

  const fetchWorkspaceMember = async () => {
    try {
      const res = await axios.get(`http://localhost:8800/wsmember/${wsId}`);
      // console.log(res.data);
      setMembers(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchWorkspaceMember();
  }, [wsId]);

  return (
    <ImageList
      sx={{
        width: 1000,
        scrollbarGutter: 'stable',
        scrollbarWidth: 'thin',
        overflowX: 'unset !important',
        overflowY: 'unset !important',
      }}
      cols={12}
      rowHeight={50}
      // sx={{}}
    >
      {members.map((member) => (
        <ImageIndividual
          member={member}
          workspace={workspace}
          uid={uid}
        ></ImageIndividual>
      ))}
    </ImageList>
  );
}

export default AvatarList;
