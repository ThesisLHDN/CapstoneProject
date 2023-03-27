import React, {useState} from 'react';
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
  List,
  ListItem,
  ListSubheader,
} from '@mui/material';
import {styled} from '@mui/material/styles';
import {colorHover} from 'src/style';

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
  };

  const handleChangeSprint = (event) => {
    setSprint(event.target.value);
  };
  return (
    <div>
      <GrayButton
        onClick={() => {
          setOpen(true);
        }}
      >
        Complete Sprint
      </GrayButton>
      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          sx: {
            maxWidth: '25%',
          },
        }}
      >
        <DialogTitle sx={{color: '#00980F', textAlign: 'center', mt: 1}}>
          <Typography
            sx={{fontWeight: '900', fontSize: 20, '& *': {fontSize: 20}}}
          >
            Complete <i>DFP Sprint 2</i>
          </Typography>
        </DialogTitle>
        <DialogContent sx={{pb: 1}}>
          <Typography
            sx={{color: 'black', fontSize: '14px', fontWeight: '900'}}
          >
            This sprint has
          </Typography>
          <List sx={{listStyleType: 'disc', pl: 3}}>
            <ListItem sx={{display: 'list-item', pl: 0, py: 0}}>
              1 completed issue
            </ListItem>
            <ListItem sx={{display: 'list-item', pl: 0, py: 0}}>
              4 open issues
            </ListItem>
          </List>
          <FormControl fullWidth>
            <Typography
              sx={{
                color: 'black',
                fontSize: '14px',
                fontWeight: '900',
                mb: 0.5,
              }}
            >
              Move open issues to
            </Typography>
            <Select
              size="small"
              value={sprint}
              onChange={handleChangeSprint}
              sx={{fontSize: '14px', py: 0.25, my: 0.5}}
            >
              <MenuItem value="DFP Sprint 4">DFP Sprint 4</MenuItem>
              <MenuItem value="DFP Sprint 5">DFP Sprint 5</MenuItem>
              <MenuItem value="DFP Sprint 6">DFP Sprint 6</MenuItem>
            </Select>
          </FormControl>
          <DialogContentText sx={{fontSize: '12px'}}>
            Sub tasks are not included in the total(s) above, and are always
            included in the same sprint as their parent issue.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            sx={{...colorHover.greenGradBtn, width: '108px'}}
            variant="contained"
            onClick={handleClose}
          >
            Complete
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

export default CompleteSprint;
