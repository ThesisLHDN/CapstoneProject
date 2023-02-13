import React, { useState } from 'react'
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
} from '@mui/material'
import { colorHover } from 'src/style'
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import { styled } from '@mui/material/styles';

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
    }
  }
})

function CreateProject() {
  const [open, setOpen] = useState(false);
  const [type, setType] = useState('');

  const handleChangeType = (event) => {
    setType(event.target.value);
  } 

  const handleClose = () => {
    setOpen(false);
    setType('');
  }

  return (
    <div>
      <Button
        sx={{
          width: '155px',
          height: '38px',
          ...colorHover.greenGradBtn,
        }}
        variant="contained"
        startIcon={<AddRoundedIcon />}
        onClick={() => {setOpen(true)}}
      >
        Create project
      </Button> 
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle sx={{ color: '#00980F', fontWeight: '900', textAlign: 'center', mt: 1 }}>Create project</DialogTitle>
        <DialogContent>
          <DialogContentText sx={{ color: 'black', fontSize: '14px' }}>
            You can change these details anytime in your project settings.
          </DialogContentText>
          <FormControl fullWidth>
            <Typography sx={{ 
              color: 'black', 
              fontSize: '14px', 
              fontWeight: '900',
              mt: 2,
              mb: 0.5
            }}>
              Project type
              <span style={{ color: 'red' }}>&nbsp;*</span>
            </Typography>
            <CssSelect
              value={type}
              onChange={handleChangeType}
            >
              <MenuItem value='scrum'>Scrum</MenuItem>
              <MenuItem value='kanban'>Kanban</MenuItem>
            </CssSelect>
            <Typography sx={{ 
              color: 'black', 
              fontSize: '14px', 
              fontWeight: '900',
              mt: 2,
            }}>
              Name
              <span style={{ color: 'red' }}>&nbsp;*</span>
            </Typography>
            <CssTextField
              margin="dense"
              fullWidth
              variant="outlined"
            />
            <Typography sx={{ 
              color: 'black', 
              fontSize: '14px', 
              fontWeight: '900',
              mt: 2,
            }}>
              Key
              <span style={{ color: 'red' }}>&nbsp;*</span>
            </Typography>
            <CssTextField
              margin="dense"
              fullWidth
              variant="outlined"
              sx={{ width: '50%', fontSize: '14px' }}
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

export default CreateProject