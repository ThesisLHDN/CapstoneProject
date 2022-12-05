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
  'Susanna Gross',
  'Everett Burks',
  'Sade Neal',
  'Oliver Williamson',
  'Marius Marquez',
  'Janelle Silva',
  'Habib Devine',
  'Cain Arnold',
  'Lewys Swan',
  'Cade Ferry',
  'Rory Watt',
];

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
      cols={9}
      rowHeight={50}
      // sx={{}}
    >
      {members.map((member) => (
        <Box
          sx={{
            position: 'relative',
            '&:hover  .memberSelect': {
              display: 'inline-block !important',
            },
            overflowX: 'visible !important',
          }}
        >
          <ImageListItem
            key={member}
            sx={{overflowX: 'visible !important'}}
            // sx={{
            //   '&:hover + .memberSelect': {
            //     display: 'inline-block !important',
            //   },
            // }}
          >
            <Avatar alt={member} className="avatarPic" src="#" />
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
              width: 180,
            }}
          >
            <Typography sx={{mb: 1}}>{member}</Typography>
            <Button
              variant="outlined"
              color="error"
              sx={{width: '100%', fontSize: 14}}
            >
              Delete member
            </Button>
          </Paper>
        </Box>
      ))}
    </ImageList>
  );
}

export default AvatarList;
