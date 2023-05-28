import {useState, useContext} from 'react';
// import {format} from 'date-fns';
import {color} from 'src/style';
import {
  Grid,
  Typography,
  Dialog,
  Paper,
  TextField,
  Box,
  Avatar,
  Button,
  styled,
} from '@mui/material';
import {colorHover} from 'src/style';

import CreationPopup from 'src/components/popup/Create';

// import MoreVertIcon from '@mui/icons-material/MoreVert';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
// import PersonAddAltRoundedIcon from '@mui/icons-material/PersonAddAltRounded';

import {addDocument} from 'src/firebase/firestoreServices';

import {ChatContext} from 'src/Context/ChatProvider';

function ChatSideBar({data, projectId}) {
  const {setSelectedRoomId, selectedRoom, uid} = useContext(ChatContext);
  const [open, setOpen] = useState(false);
  // const handleClose = () => {
  //   setOpen(false);
  // };
  const addRoomHandler = (name) => {
    if (name) {
      const newRoomData = {
        projectId: projectId,
        name: name,
        adminId: uid,
        members: [uid],
        allmembers: [uid],
        coverPicture: '',
      };
      addDocument('rooms', newRoomData);
    }
    setOpen(false);
  };
  return (
    <>
      <Grid
        container
        sx={{width: '100%', height: '100%', justifyContent: 'center', p: 2}}
      >
        {/* <SearchBar round sx={{borderRadius: '20px !important'}} />{' '} */}
        <Grid container sx={{width: '100%', my: 2}}>
          <Grid item xs={7}>
            <Typography variant="h5">Channels</Typography>
          </Grid>
          <Grid
            item
            xs={5}
            sx={{justifyContent: 'flex-end', display: 'inline-flex'}}
          >
            <Button
              variant="contained"
              sx={{...colorHover.greenGradBtn, height: 36}}
              endIcon={<AddRoundedIcon />}
              onClick={() => {
                setOpen(true);
              }}
            >
              Create
            </Button>
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
          {data &&
            data.map(({name, id, coverPicture, lastMessage}) => (
              <Box
                sx={{
                  textDecoration: 'none',
                  display: 'block',
                  width: '100%',

                  '&:hover': {backgroundColor: '#efefef'},
                  borderRadius: 3,
                  // TODO set style of selected Room
                  ...(id === (selectedRoom ? selectedRoom.id : '')
                    ? {backgroundColor: '#efefef'}
                    : {}),
                }}
                onClick={() => {
                  setSelectedRoomId(id);
                  console.log(id);
                }}
                // onClick={() => props.onSelect(id)}
              >
                <Box sx={{padding: 1}}>
                  <Grid container sx={{alignItems: 'center'}}>
                    <Grid item xs={3}>
                      <Avatar
                        src={coverPicture ? coverPicture : '/'}
                        alt={name}
                      />
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
                        {lastMessage ? lastMessage.body : ''}
                      </Typography>
                    </Grid>
                    <Grid item xs={3}>
                      <Typography variant="subtitle2">
                        {/* {format(time, 'dd-MM, hh:mm')} */}
                      </Typography>
                    </Grid>
                  </Grid>
                </Box>
              </Box>
            ))}
          {/* <CreatePopup></CreatePopup> */}
          <CreationPopup
            title="Create new room"
            fieldLabel={"Please room's name"}
            open={open}
            onClose={() => setOpen(false)}
            onSubmit={addRoomHandler}
            confirmContent={'Create'}
          ></CreationPopup>
        </Box>
      </Grid>
    </>
  );
}

export default ChatSideBar;
