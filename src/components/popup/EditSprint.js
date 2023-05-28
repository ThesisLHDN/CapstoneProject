import {useContext, useState} from 'react';
import {
  Button,
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContent,
  TextField,
  FormControl,
  Typography,
} from '@mui/material';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import {styled} from '@mui/material/styles';
import {CssTextField} from './CreateProject';
import {colorHover} from 'src/style';
import {AppContext} from 'src/Context/AppProvider';
import axios from 'axios';

const GrayButton = styled(Button)({
  textTransform: 'none',
  backgroundColor: '#cdcdcd',
  color: 'black',
  borderRadius: 3,
  width: 50,
  height: 24,
  fontSize: '12px',
  '&:hover': {
    backgroundColor: '#ddd',
  },
});

function formatDate(date) {
  return (
    date.substring(6, 10) +
    '-' +
    date.substring(3, 5) +
    '-' +
    date.substring(0, 2)
  );
}

function EditSprint({setTriggerSprint, curSprint, complete}) {
  const [open, setOpen] = useState(false);
  const [sprint, setSprint] = useState({
    cyclename: curSprint.cyclename,
    endDate: formatDate(
      new Date(curSprint?.endDate).toLocaleDateString('en-GB'),
    ),
    goal: curSprint.goal,
  });

  const handleChange = (e) => {
    e.preventDefault();
    setSprint({...sprint, [e.target.name]: e.target.value});
  };

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.put(`/editsprint/${curSprint.id}`, sprint);
      setOpen(false);

      // setIsSprint(true);
    } catch (err) {
      console.log(err);
    }
    setTriggerSprint(false);
  };

  const handleCancel = () => {
    setOpen(false);
    setSprint({
      cyclename: curSprint.cyclename,
      endDate: new Date(curSprint.endDate),
      goal: curSprint.goal,
    });
  };

  return (
    <div>
      {complete && (
        <GrayButton
          onClick={() => {
            setOpen(true);
          }}
          sx={{ml: 1}}
        >
          {/* <EditOutlinedIcon fontSize="small" /> */}
          Update
        </GrayButton>
      )}
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        PaperProps={{
          sx: {
            minWidth: '32%',
          },
        }}
      >
        <DialogTitle
          sx={{color: '#00980F', fontWeight: '900', textAlign: 'center', mt: 1}}
        >
          Update Current Sprint
        </DialogTitle>
        <DialogContent sx={{pb: 0.5}}>
          <FormControl fullWidth>
            <Typography
              sx={{
                color: 'black',
                fontSize: '12px',
                fontWeight: '900',
                mt: 1,
              }}
            >
              Sprint name
            </Typography>
            <CssTextField
              value={sprint.cyclename}
              size="small"
              margin="dense"
              fullWidth
              variant="outlined"
              sx={{width: '60%', fontSize: '14px'}}
              name="cyclename"
              onChange={handleChange}
            />
            {/* <Typography
              sx={{
                color: 'black',
                fontSize: '12px',
                fontWeight: '900',
                my: 0.75,
              }}
            >
              Duration
              <span style={{color: 'red'}}>&nbsp;*</span>
            </Typography>
            <Select size="small" sx={{width: '60%', fontSize: '14px'}}>
              <MenuItem value="scrum">custom</MenuItem>
              <MenuItem value="kanban">1 weeks</MenuItem>
              <MenuItem value="kanban">2 weeks</MenuItem>
              <MenuItem value="kanban">3 weeks</MenuItem>
              <MenuItem value="kanban">4 weeks</MenuItem>
            </Select> */}
            <Typography
              sx={{
                color: 'black',
                fontSize: '12px',
                fontWeight: '900',
                my: 1,
              }}
            >
              Start date
            </Typography>
            <TextField
              size="small"
              type="date"
              defaultValue={formatDate(
                new Date(curSprint.startDate).toLocaleDateString('en-GB'),
              )}
              sx={{width: '60%'}}
              InputLabelProps={{
                shrink: true,
              }}
              name="startDate"
              onChange={handleChange}
            />
            <Typography
              sx={{
                color: 'black',
                fontSize: '12px',
                fontWeight: '900',
                mt: 1,
              }}
            >
              End date
            </Typography>
            <TextField
              size="small"
              type="date"
              defaultValue={formatDate(
                new Date(curSprint.endDate).toLocaleDateString('en-GB'),
              )}
              sx={{width: '60%'}}
              InputLabelProps={{
                shrink: true,
              }}
              name="endDate"
              onChange={handleChange}
            />
            <Typography
              sx={{
                color: 'black',
                fontSize: '12px',
                fontWeight: '900',
                mt: 1,
              }}
            >
              Sprint goal
            </Typography>
            <CssTextField
              value={sprint.goal}
              size="small"
              multiline
              rows={3}
              margin="dense"
              fullWidth
              variant="outlined"
              name="goal"
              onChange={handleChange}
            />
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button
            sx={{...colorHover.greenGradBtn, width: '85px'}}
            variant="contained"
            onClick={handleClick}
          >
            Confirm
          </Button>
          <Button
            sx={{
              color: '#818181',
              textTransform: 'none',
              fontWeight: '900',
              width: '85px',
            }}
            variant="text"
            onClick={handleCancel}
          >
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default EditSprint;
