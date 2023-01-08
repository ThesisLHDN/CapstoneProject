import {useState} from 'react';
import {format} from 'date-fns';
import {color} from 'src/style';
import {
  Grid,
  Typography,
  IconButton,
  Divider,
  Box,
  Avatar,
} from '@mui/material';

import MoreVertIcon from '@mui/icons-material/MoreVert';
import PersonAddAltRoundedIcon from '@mui/icons-material/PersonAddAltRounded';

import SearchBar from 'src/components/search';

const dummyData = [
  {
    id: 1,
    name: 'Channel1',
    lastMessage: 'Hello',
    time: new Date(),
    photoURL: '#',
  },
  {
    id: 2,
    name: 'Channel2',
    lastMessage: 'Good morning!',
    time: new Date(),
    photoURL: '#',
  },
  {
    id: 3,
    name: 'Channel3',
    lastMessage: 'Have you done yet?',
    time: new Date(),
    photoURL: '#',
  },
  {
    id: 3,
    name: 'Channel3',
    lastMessage: 'Have you done yet?',
    time: new Date(),
    photoURL: '#',
  },
  {
    id: 3,
    name: 'Channel3',
    lastMessage: 'Have you done yet?',
    time: new Date(),
    photoURL: '#',
  },
  {
    id: 3,
    name: 'Channel3',
    lastMessage: 'Have you done yet?',
    time: new Date(),
    photoURL: '#',
  },
  {
    id: 3,
    name: 'Channel3',
    lastMessage: 'Have you done yet?',
    time: new Date(),
    photoURL: '#',
  },
  {
    id: 3,
    name: 'Channel3',
    lastMessage: 'Have you done yet?',
    time: new Date(),
    photoURL: '#',
  },
  {
    id: 3,
    name: 'Channel3',
    lastMessage: 'Have you done yet?',
    time: new Date(),
    photoURL: '#',
  },
  {
    id: 3,
    name: 'Channel3',
    lastMessage: 'Have you done yet?',
    time: new Date(),
    photoURL: '#',
  },
  {
    id: 3,
    name: 'Channel3',
    lastMessage: 'Have you done yet?',
    time: new Date(),
    photoURL: '#',
  },
];

function ChatSideBar(props) {
  const data = props.data;
  const [channelId, setChannelId] = useState('');
  return (
    <>
      <Grid
        container
        sx={{width: '100%', height: '100%', justifyContent: 'center', p: 2}}
      >
        <SearchBar round sx={{borderRadius: '20px !important'}} />
        <Grid container sx={{width: '100%', my: 2}}>
          <Grid item xs={5}>
            <Typography variant="h5">Channels</Typography>
          </Grid>
          <Grid item xs={5}></Grid>
          <Grid
            item
            xs={2}
            sx={{justifyContent: 'flex-end', display: 'inline-flex'}}
          >
            <IconButton sx={{color: color.green03, width: 32, height: 32}}>
              <MoreVertIcon />
            </IconButton>
          </Grid>
        </Grid>
        <Box
          sx={{
            width: '100%',
            height: 'calc(100% - 104px)',
            overflowY: 'scroll',
            scrollbarGutter: 'stable',
          }}
        >
          {data.map(({name, id, picture, messages}) => (
            <Box
              sx={{
                textDecoration: 'none',
                display: 'block',
                width: '100%',
                '&:hover': {backgroundColor: '#efefef'},
                borderRadius: 3,
              }}
              onClick={()=>props.onSelect(id)}
            >
              <Box sx={{padding: 1}}>
                <Grid container sx={{alignItems: 'center'}}>
                  <Grid item xs={3}>
                    <Avatar src={picture} alt={name} />
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="body2" sx={{fontWeight: 'bold'}}>
                      {name}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{
                        overflow: 'clip',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                      }}
                    >
                      {/* {lastMessage} */}
                    </Typography>
                  </Grid>
                  <Grid item xs={3}>
                    <Typography variant="subtitle2">
                      {/* {format(time, 'dd-MM, hh:mm')} */}
                    </Typography>
                  </Grid>
                </Grid>
              </Box>
              {/* <Divider></Divider> */}
            </Box>
          ))}
        </Box>
      </Grid>
      <Grid container></Grid>
    </>
  );
}

export default ChatSideBar;
