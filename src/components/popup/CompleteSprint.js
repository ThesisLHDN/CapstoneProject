import React, {useState} from 'react'
import { 
  Button,
  Dialog, 
  DialogTitle, 
  DialogActions, 
  DialogContent, 
  DialogContentText, 
  FormControl,
  Select,
  MenuItem,
  Typography,
} from '@mui/material';
import {styled} from '@mui/material/styles';
import { colorHover } from 'src/style';

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

function CompleteSprint() {
  const [open, setOpen] = useState(false);
  const [sprint, setSprint] = useState('DFP Sprint 4');

  const handleClose = () => {
    setOpen(false);
  }

  const handleChangeSprint = (event) => {
    setSprint(event.target.value);
  } 
  return (
    <div>
      <GrayButton onClick={() => {setOpen(true)}}>Complete Sprint</GrayButton>
      <Dialog 
        open={open} 
        onClose={handleClose} 
        PaperProps={{
          sx: {
            maxWidth: '32%'
          }
        }}
      >
        <DialogTitle sx={{ color: '#00980F', fontWeight: '900', textAlign: 'center', mt: 1 }}>
          Complete DFP Sprint 2
        </DialogTitle>
        <DialogContent>
          <Typography sx={{ color: 'black', fontSize: '14px', fontWeight: '900' }}>This sprint has</Typography>
          <FormControl fullWidth>
            <Typography sx={{ 
              color: 'black', 
              fontSize: '14px', 
              fontWeight: '900',
              mt: 2,
              mb: 0.5
            }}>
              Move open issues to
            </Typography>
            <Select
              value={sprint}
              onChange={handleChangeSprint}
            >
              <MenuItem value='DFP Sprint 4'>DFP Sprint 4</MenuItem>
              <MenuItem value='DFP Sprint 5'>DFP Sprint 5</MenuItem>
              <MenuItem value='DFP Sprint 6'>DFP Sprint 6</MenuItem>
            </Select>
          </FormControl>
          <DialogContentText sx={{ fontSize: '14px' }}>
            Sub tasks are not included in the total(s) above, 
            and are always included in the same sprint as their parent issue.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            sx={{ ...colorHover.greenGradBtn, width: '108px' }}
            variant="contained"
            onClick={handleClose}
          >
            Complete
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

export default CompleteSprint