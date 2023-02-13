import * as React from 'react';
import {Button, Box} from '@mui/material';
// import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import ListItemText from '@mui/material/ListItemText';
import ListItem from '@mui/material/ListItem';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import {color, colorHover} from 'src/style';
import AddIcon from '@mui/icons-material/Add';
import {Grid, Paper, TextField} from '@mui/material';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function FullScreenDialog() {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button
        onClick={handleClickOpen}
        variant="contained"
        sx={{
          height: 36,
          ...colorHover.greenGradBtn,
        }}
        startIcon={<AddIcon />}
      >
        Create workspace
      </Button>
      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
        // sx={{backgroundColor: 'red'}}
      >
        {/* <AppBar sx={{position: 'relative', backgroundColor: color.green03}}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography sx={{ml: 2, flex: 1}} variant="h6" component="div">
              Create a new workspace
            </Typography>
            <Button autoFocus color="inherit" onClick={handleClose}>
              save
            </Button>
          </Toolbar>
        </AppBar> */}
        {/* <List>
          <ListItem button>
            <ListItemText primary="Phone ringtone" secondary="Titania" />
          </ListItem>
          <Divider />
          <ListItem button>
            <ListItemText
              primary="Default notification ringtone"
              secondary="Tethys"
            />
          </ListItem>
        </List> */}
        <Box
          sx={{
            width: '100%',
            height: '100%',
            backgroundColor: color.green03,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Paper sx={{padding: '20px 30px', width: 400}}>
            <Grid
              container
              sx={{display: 'flex', flexDirection: 'row', gap: 4}}
            >
              <Typography sx={{fontSize: 20, fontWeight: 700}}>
                Name your workspace
              </Typography>{' '}
              <TextField
                variant="standard"
                placeholder="Enter workspace's name"
                sx={{width: '100%', height: 30, '& *': {fontSize: 24}}}
              ></TextField>
              <Box
                sx={{
                  width: '100%',
                  display: 'flex',
                  justifyContent: 'flex-end',
                  gap: 1,
                  '& button': {
                    px: 2,
                    fontWeight: 700,
                    fontSize: 16,
                  },
                }}
              >
                <Button sx={{...colorHover.greenGradBtn}} onClick={handleClose}>
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

            {/* <Typography>Enter workspace's name</Typography> */}
          </Paper>
        </Box>
      </Dialog>
    </div>
  );
}
