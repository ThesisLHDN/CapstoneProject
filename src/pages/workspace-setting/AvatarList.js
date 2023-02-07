import React from 'react';
import {
  Box,
  Button,
  Paper,
  Typography,
  ImageList,
  ImageListItem,
  Avatar,
} from '@mui/material';

const members = [
  'Menaal Bloom',
  'Sam Donald',
  'Celyn Nash',
  'Cecelia Patterson',
  'Weronika Horne',
  'Johnathan Erickson',
  'Mia Freeman',
  'Yu Plant',
  'Dixie Tillman',
  'Hetty Cunningham',
  'Abida Grant',
  'Emelie Sharp',
  'Aysha Delarosa',
  'Lilith Mclean',
  'Christie Bentley',
  'Maverick Foley',
  'Nana Mcintosh',
  'Jamila Lam',
  'Missy Schwartz',
  // 'Susanna Gross',
  // 'Everett Burks',
  // 'Sade Neal',
  // 'Oliver Williamson',
  // 'Marius Marquez',
  // 'Janelle Silva',
  // 'Habib Devine',
  // 'Cain Arnold',
  // 'Lewys Swan',
  // 'Cade Ferry',
  // 'Rory Watt',
];

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

function AvatarList() {
  return (
    <ImageList
      sx={{
        width: 1000,
        // '&::-webkit-scrollbar-track': {background: 'transparent'},
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
        <Box
          key={member.replace(' ', '.').toLowerCase()}
          sx={{
            position: 'relative',
            '&:hover  .memberSelect': {
              display: 'inline-block !important',
            },
            overflowX: 'visible !important',
          }}
        >
          <ImageListItem key={member} sx={{overflowX: 'visible !important'}}>
            <Avatar {...stringAvatar(member)} />
            {/* <Avatar alt={member} className="avatarPic" src="#" /> */}
          </ImageListItem>
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
            <Typography sx={{mb: 1, fontWeight: 700}}>{member}</Typography>
            <Typography sx={{mb: 1, fontStyle: 'italic'}}>
              {member.replace(' ', '.').toLowerCase() + '@gmail.com'}
            </Typography>
            <Button
              variant="outlined"
              color="error"
              sx={{width: '100%', fontSize: 14}}
            >
              Remove member
            </Button>
          </Paper>
        </Box>
      ))}
    </ImageList>
  );
}

export default AvatarList;
