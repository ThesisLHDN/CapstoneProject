import {useState, useContext} from 'react';
// import {format} from 'date-fns';
import {color} from 'src/style';
import {
  Grid,
  Typography,
  Dialog,
  Paper,
  TextField,
  DialogContentText,
  DialogActions,
  DialogTitle,
  DialogContent,
  Box,
  Avatar,
  FormControl,
  Button,
  styled,
  Select,
} from '@mui/material';
import {colorHover} from 'src/style';

import MoreVertIcon from '@mui/icons-material/MoreVert';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import PersonAddAltRoundedIcon from '@mui/icons-material/PersonAddAltRounded';

import SearchBar from 'src/components/search';
import CreationPopup from 'src/components/popup/Create';
import {addDocument} from 'src/firebase/firestoreServices';

import {ChatContext} from 'src/Context/ChatProvider';

const CssTextField = styled(TextField)({
  '& label.Mui-focused': {
    color: color.green03,
  },
  '& .MuiInput-underline:after': {
    borderBottomColor: color.green03,
  },
  '& .MuiOutlinedInput-root': {
    '&.Mui-focused fieldset': {
      borderColor: color.green03,
    },
  },
});
function ChatSideBar({data, currentUser}) {
  const {selectedRoomId, setSelectedRoomId} = useContext(ChatContext);
  const [open, setOpen] = useState(false);
  const [newRoom, setNewRoom] = useState('');
  const [description, setDescription] = useState('');
  const handleClose = () => {
    setOpen(false);
  };

  const addRoomHandler = () => {
    const newRoomData = {
      name: newRoom,
      description: description,
      adminId: currentUser.uid,
      members: [currentUser.uid],
      coverPicture: '',
    };
    if (newRoom) {
      addDocument('rooms', newRoomData);
    }
    setNewRoom('');
    setDescription('');
    setOpen(false);
  };
  return (
    <>
      <Grid
        container
        sx={{width: '100%', height: '100%', justifyContent: 'center', p: 2}}
      >
        <SearchBar round sx={{borderRadius: '20px !important'}} />{' '}
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
              sx={{...colorHover.greenBtn}}
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
            data.map(({name, id, coverPicture, messages}) => (
              <Box
                sx={{
                  textDecoration: 'none',
                  display: 'block',
                  width: '100%',
                  '&:hover': {backgroundColor: '#efefef'},
                  borderRadius: 3,
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
                      <Avatar src={coverPicture} alt={name} />
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
                        {/* {messages[0].message} */}
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
          <Dialog
            open={open}
            onClose={() => {
              setOpen(false);
            }}
          >
            <Paper sx={{padding: '20px 30px', width: 360}}>
              <Grid
                container
                sx={{display: 'flex', flexDirection: 'row', gap: 4}}
              >
                <Typography sx={{fontSize: 20, fontWeight: 700}}>
                  Create new chat room
                </Typography>{' '}
                <CssTextField
                  label="Name"
                  size="small"
                  placeholder="Enter room's name"
                  onChange={(e) => setNewRoom(e.target.value)}
                  sx={{
                    width: '100%',
                    height: 30,
                    '& ::after': {
                      border: `solid ${color.green03} 2px !important`,
                    },
                  }}
                ></CssTextField>
                <CssTextField
                  label="Description"
                  size="small"
                  placeholder="Enter room's description"
                  onChange={(e) => setDescription(e.target.value)}
                  sx={{
                    width: '100%',
                    height: 30,
                    '& ::after': {
                      border: `solid ${color.green03} 2px !important`,
                    },
                  }}
                ></CssTextField>
                <Box
                  sx={{
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'flex-end',
                    gap: 1,
                  }}
                >
                  <Button
                    sx={{...colorHover.greenBtn}}
                    onClick={(e) => addRoomHandler(e)}
                  >
                    Confirm
                  </Button>
                  <Button
                    sx={{textTransform: 'none', color: '#818181'}}
                    onClick={handleClose}
                  >
                    Cancel
                  </Button>
                </Box>
              </Grid>
            </Paper>
          </Dialog>
        </Box>
      </Grid>
      {/* <Grid container></Grid> */}
    </>
  );
}

export default ChatSideBar;
