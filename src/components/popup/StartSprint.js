import React, {useState} from 'react'
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
import {styled} from '@mui/material/styles';
import { CssTextField } from './CreateProject';
import { colorHover } from 'src/style';
import ReactDatePicker from 'react-datepicker';

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

function StartSprint() {
  const [open, setOpen] = useState(false);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date(Date.now() + 12096e5));

  const handleClose = () => {
    setOpen(false);
  }
  
  return (
    <div>
      <GrayButton onClick={() => {setOpen(true)}}>Start Sprint</GrayButton>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle sx={{ color: '#00980F', fontWeight: '900', textAlign: 'center', mt: 1 }}>Create project</DialogTitle>
        <DialogContent>
          <DialogContentText sx={{ color: 'black', fontSize: '12px' }}>
            You can change these details anytime in your project settings.
          </DialogContentText>
          <FormControl fullWidth>
            <Typography sx={{ 
              color: 'black', 
              fontSize: '14px', 
              fontWeight: '900',
              mt: 2,
            }}>
              Sprint name
              <span style={{ color: 'red' }}>&nbsp;*</span>
            </Typography>
            <CssTextField
              margin="dense"
              fullWidth
              variant="outlined"
              sx={{ width: '50%', fontSize: '14px' }}
            />
            <Typography sx={{ 
              color: 'black', 
              fontSize: '14px', 
              fontWeight: '900',
              mt: 2,
              mb: 0.5
            }}>
              Duration
              <span style={{ color: 'red' }}>&nbsp;*</span>
            </Typography>
            <Select>
              <MenuItem value='scrum'>Scrum</MenuItem>
              <MenuItem value='kanban'>Kanban</MenuItem>
            </Select>
            <Typography sx={{ 
              color: 'black', 
              fontSize: '14px', 
              fontWeight: '900',
              mt: 2,
            }}>
              Start date
              <span style={{ color: 'red' }}>&nbsp;*</span>
            </Typography>

            <ReactDatePicker
              selected={startDate} 
              dateFormat='EEE, MMMM d, yyyy'
              onChange={(date) => setStartDate(date)}
            />

            <Typography sx={{ 
              color: 'black', 
              fontSize: '14px', 
              fontWeight: '900',
              mt: 2,
            }}>
              End date
              <span style={{ color: 'red' }}>&nbsp;*</span>
            </Typography>

            <ReactDatePicker
              selected={endDate} 
              dateFormat='EEE, MMMM d, yyyy'
              onChange={(date) => setEndDate(date)}
            />

            <Typography sx={{ 
              color: 'black', 
              fontSize: '14px', 
              fontWeight: '900',
              mt: 2,
            }}>
              Sprint goal
            </Typography>
            <CssTextField
              margin="dense"
              fullWidth
              variant="outlined"
            />
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button
            sx={{ ...colorHover.greenGradBtn, width: '85px' }}
            variant="contained"
            onClick={handleClose}
          >
            Create
          </Button> 
          <Button 
            sx={{ color: '#818181', textTransform: 'none', fontWeight: '900', width: '85px' }}
            variant="text"
            onClick={handleClose}
          >
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

export default StartSprint