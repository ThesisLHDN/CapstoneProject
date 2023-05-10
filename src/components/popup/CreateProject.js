import React, {useContext, useState} from 'react';
import {
  Button,
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContent,
  DialogContentText,
  TextField,
  FormControl,
  Select,
  MenuItem,
  Typography,
} from '@mui/material';
import {colorHover} from 'src/style';
import {styled} from '@mui/material/styles';
import {useNavigate} from 'react-router-dom';
import {AuthContext} from 'src/Context/AuthProvider';
import {AppContext} from 'src/Context/AppProvider';
import axios from 'axios';

export const CssTextField = styled(TextField)({
  '& .MuiOutlinedInput-root': {
    '&.Mui-focused fieldset': {
      borderColor: 'black',
    },
  },
});

const CssSelect = styled(Select)({
  '& .MuiOutlinedInput-root': {
    '&.Mui-focused fieldset': {
      borderColor: 'black',
    },
  },
});

function CreateProject() {
  const [open, setOpen] = useState(true);
  const [type, setType] = useState('');
  const {
    user: {uid},
  } = useContext(AuthContext);
  const {workspace, projects, setProjects} = useContext(AppContext);

  const [project, setProject] = useState({
    pname: '',
    pkey: '',
    createTime: null,
    ownerId: uid,
    workspaceId: workspace.id,
  });

  const navigate = useNavigate();

  const date = new Date();
  // date.setUTCHours(17);

  const handleChangeType = (event) => {
    setType(event.target.value);
  };

  const handleClose = () => {
    navigate(-1);
    setType('');
  };

  const handleChange = (e) => {
    e.preventDefault();
    setProject({
      ...project,
      createTime: date.toISOString().slice(0, 19).replace('T', ' '),
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/project', project);
      setProjects([project, ...projects]);
      navigate(`/workspace-setting/${workspace.id}?user=${uid}`);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle
          sx={{color: '#00980F', fontWeight: '900', textAlign: 'center', mt: 1}}
        >
          Create project
        </DialogTitle>
        <DialogContent sx={{pb: 0}}>
          <DialogContentText sx={{color: 'black', fontSize: '12px'}}>
            You can change these details anytime in your project settings.
          </DialogContentText>
          <FormControl fullWidth>
            <Typography
              sx={{
                color: 'black',
                fontSize: '14px',
                fontWeight: '900',
                mt: 2,
                mb: 0.5,
              }}
            >
              Project type
              <span style={{color: 'red'}}>&nbsp;*</span>
            </Typography>
            <CssSelect size="small" value={type} onChange={handleChangeType}>
              <MenuItem value="scrum">Scrum</MenuItem>
              {/* <MenuItem value="kanban">Kanban</MenuItem> */}
            </CssSelect>
            <Typography
              sx={{
                color: 'black',
                fontSize: '14px',
                fontWeight: '900',
                mt: 2,
              }}
            >
              Name
              <span style={{color: 'red'}}>&nbsp;*</span>
            </Typography>
            <CssTextField
              size="small"
              margin="dense"
              fullWidth
              variant="outlined"
              name="pname"
              onChange={handleChange}
            />
            <Typography
              sx={{
                color: 'black',
                fontSize: '14px',
                fontWeight: '900',
                mt: 2,
              }}
            >
              Key
              <span style={{color: 'red'}}>&nbsp;*</span>
            </Typography>
            <CssTextField
              size="small"
              margin="dense"
              fullWidth
              variant="outlined"
              sx={{width: '50%', fontSize: '14px'}}
              name="pkey"
              onChange={handleChange}
            />
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button
            sx={{...colorHover.greenGradBtn, width: '85px'}}
            variant="contained"
            onClick={handleSubmit}
          >
            Create
          </Button>
          <Button
            sx={{
              color: '#818181',
              textTransform: 'none',
              fontWeight: '900',
              width: '85px',
            }}
            variant="text"
            onClick={handleClose}
          >
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default CreateProject;
