import { useContext, useState } from 'react';
import {
  Button,
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContent, TextField,
  FormControl, Typography
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { CssTextField } from './CreateProject';
import { colorHover } from 'src/style';
import { AppContext } from 'src/Context/AppProvider';
import axios from 'axios';

const GrayButton = styled(Button)({
  textTransform: 'none',
  backgroundColor: '#cdcdcd',
  color: 'black',
  borderRadius: 3,
  height: 24,
  fontSize: 12,
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

function StartSprint({setTriggerSprint}) {
  const {project} = useContext(AppContext);
  const [open, setOpen] = useState(false);
  const [display, setDisplay] = useState(true);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date(Date.now() + 12096e5));
  const [sprint, setSprint] = useState({
    cyclename: '',
    startDate: formatDate(startDate.toLocaleDateString('en-GB')),
    endDate: formatDate(endDate.toLocaleDateString('en-GB')),
    cstatus: 1,
    goal: '',
    ownerId: project.ownerId,
    projectId: project.id,
  });

  const handleChange = (e) => {
    e.preventDefault();
    setSprint({...sprint, [e.target.name]: e.target.value});
  };

  const handleClick = async (e) => {
    e.preventDefault();
    setDisplay(false);
    try {
      await axios.post('http://localhost:8800/sprint', sprint);
      setOpen(false);
      setTriggerSprint(true);
      // setIsSprint(true);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      {display && (
        <GrayButton
          onClick={() => {
            setOpen(true);
          }}
        >
          Start Sprint
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
          Start A New Sprint
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
              <span style={{color: 'red'}}>&nbsp;*</span>
            </Typography>
            <CssTextField
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
              <span style={{color: 'red'}}>&nbsp;*</span>
            </Typography>
            <TextField
              size="small"
              type="date"
              defaultValue={formatDate(startDate.toLocaleDateString('en-GB'))}
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
              <span style={{color: 'red'}}>&nbsp;*</span>
            </Typography>
            <TextField
              size="small"
              type="date"
              defaultValue={formatDate(endDate.toLocaleDateString('en-GB'))}
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
            onClick={() => setOpen(false)}
          >
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default StartSprint;
