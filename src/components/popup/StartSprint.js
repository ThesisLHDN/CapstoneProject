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
import DatePicker from 'react-datepicker';

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
  return date.substring(6, 10) + '-' + date.substring(3, 5) + '-' + date.substring(0, 2)
}

function StartSprint() {
  const [open, setOpen] = useState(false);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date(Date.now() + 12096e5));
  
  return (
    <div>
      <GrayButton onClick={() => {setOpen(true)}}>Start Sprint</GrayButton>
      <Dialog 
        open={open} 
        onClose={() => setOpen(false)} 
        PaperProps={{
          sx: {
            minWidth: '32%'
          }
        }}
      >
        <DialogTitle sx={{ color: '#00980F', fontWeight: '900', textAlign: 'center', mt: 1 }}>
          Create project
        </DialogTitle>
        <DialogContent sx={{ pb: 0.5}}>
          <DialogContentText sx={{ color: 'black', fontSize: '12px' }}>
            2 issues will be included in this sprint.
          </DialogContentText>
          <FormControl fullWidth>
            <Typography sx={{ 
              color: 'black', 
              fontSize: '12px', 
              fontWeight: '900',
              mt: 1,
            }}>
              Sprint name
              <span style={{ color: 'red' }}>&nbsp;*</span>
            </Typography>
            <CssTextField
              size='small'
              margin="dense"
              fullWidth
              variant="outlined"
              sx={{ width: '60%', fontSize: '14px' }}
            />
            <Typography sx={{ 
              color: 'black', 
              fontSize: '12px', 
              fontWeight: '900',
              my: 0.75
            }}>
              Duration
              <span style={{ color: 'red' }}>&nbsp;*</span>
            </Typography>
            <Select size='small' sx={{ width: '60%', fontSize: '14px' }}>
              <MenuItem value='scrum'>custom</MenuItem>
              <MenuItem value='kanban'>1 weeks</MenuItem>
              <MenuItem value='kanban'>2 weeks</MenuItem>
              <MenuItem value='kanban'>3 weeks</MenuItem>
              <MenuItem value='kanban'>4 weeks</MenuItem>
            </Select>
            <Typography sx={{ 
              color: 'black', 
              fontSize: '12px', 
              fontWeight: '900',
              my: 1,
            }}>
              Start date
              <span style={{ color: 'red' }}>&nbsp;*</span>
            </Typography>
            <TextField
              size='small'
              type="date"
              defaultValue={formatDate(startDate.toLocaleDateString('en-GB'))}
              sx={{ width: '60%' }}
              InputLabelProps={{
                shrink: true,
              }}
            />
            <Typography sx={{ 
              color: 'black', 
              fontSize: '12px', 
              fontWeight: '900',
              mt: 1,
            }}>
              End date
              <span style={{ color: 'red' }}>&nbsp;*</span>
            </Typography>
            <TextField
              size='small'
              type="date"
              defaultValue={formatDate(endDate.toLocaleDateString('en-GB'))}
              sx={{ width: '60%' }}
              InputLabelProps={{
                shrink: true,
              }}
            />
            <Typography sx={{ 
              color: 'black', 
              fontSize: '12px', 
              fontWeight: '900',
              mt: 1,
            }}>
              Sprint goal
            </Typography>
            <CssTextField
              size='small'
              multiline
              rows={3}
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
            onClick={() => setOpen(false)}
          >
            Create
          </Button> 
          <Button 
            sx={{ color: '#818181', textTransform: 'none', fontWeight: '900', width: '85px' }}
            variant="text"
            onClick={() => setOpen(false)}
          >
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

export default StartSprint