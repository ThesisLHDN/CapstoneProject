import * as React from 'react';
import {Button, Box} from '@mui/material';
import Dialog from '@mui/material/Dialog';
import Typography from '@mui/material/Typography';
import Slide from '@mui/material/Slide';
import {color, colorHover} from 'src/style';
import {Grid, Paper, TextField} from '@mui/material';
import {AuthContext} from 'src/Context/AuthProvider';
import axios from 'src/hooks/axios';
import {useNavigate} from 'react-router-dom';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function CreateWorkspace() {
  const {
    user: {uid},
  } = React.useContext(AuthContext);
  const [open, setOpen] = React.useState(true);
  const [workspace, setWorkspace] = React.useState({
    wsname: '',
    createTime: null,
    adminId: uid,
  });

  const [lastWorkspace, setLastWorkspace] = React.useState('');
  const date = new Date();
  const navigate = useNavigate();

  const handleClose = () => {
    navigate(`/workspace-setting/${lastWorkspace}?user=${uid}`);
  };

  const onChangeHandler = (e) => {
    e.preventDefault();
    setWorkspace({
      ...workspace,
      createTime: date.toISOString().slice(0, 19).replace('T', ' '),
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`http://localhost:8800/workspace`, workspace);
      console.log('AAAAAAAAAAAAAAAAAAAAA', res.data.id);
      navigate(`/workspace-setting/${res.data.id}?user=${uid}`);
    } catch (err) {
      console.log(err);
    }
  };

  const getLastestWorkspace = async () => {
    try {
      const res = await axios.get(`http://localhost:8800/lastworkspace/${uid}`);
      setLastWorkspace(res.data.id);
    } catch (err) {
      console.log(err);
    }
  };

  React.useEffect(() => {
    getLastestWorkspace();
  }, []);

  return (
    <div>
      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
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
                name="wsname"
                sx={{
                  width: '100%',
                  height: 30,
                  '& *': {fontSize: 24},
                  '& ::after': {
                    border: `solid ${color.green03} 2px !important`,
                  },
                }}
                onChange={onChangeHandler}
                onKeyUp={(event) =>
                  event.key === 'Enter' ? handleSubmit(event) : null
                }
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
                <Button
                  sx={{...colorHover.greenGradBtn}}
                  onClick={handleSubmit}
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
        </Box>
      </Dialog>
    </div>
  );
}
