import {useState} from 'react';
import {
  Box,
  Paper,
  Typography,
  Button,
  Select,
  MenuItem,
  Dialog,
} from '@mui/material';
import {color} from 'src/style';
// import { Delete } from '@mui/icons-material';
import ReportRoundedIcon from '@mui/icons-material/ReportRounded';

function WarningPopup({
  title,
  content,
  delContent,
  cancelContent,
  icon,
  projectInfo,
  onClose,
  selectedValue,
  open,
}) {
  // const {onClose, selectedValue, open} = props;

  const handleClose = () => {
    onClose(selectedValue);
  };

  const handleListItemClick = (value) => {
    onClose(value);
  };

  const projectName = projectInfo.projectName;
  const projectId = projectInfo.projectId;
  const members = projectInfo.members;
  const [owner, setOwner] = useState(projectInfo.owner);
  return (
    <Dialog onClose={handleClose} open={open}>
      <Paper
        sx={{
          width: 'fix-content',
          minWidth: 300,
          maxWidth: 400,
          p: '10px',
          display: 'flex',
          flexDirection: 'column',
          gap: '10px',
          paddingTop: '5px',
        }}
      >
        <Box
          sx={{
            height: 40,
            paddingTop: '5px',
            textAlign: 'center',
            borderBottom: 'solid black 1px',
          }}
        >
          {/* {icon && icon} */}
          <Typography
            sx={{
              fontSize: 18,
              display: 'flex',
              justifyContent: 'center',
              gap: 1,
              alignItems: 'center',
              fontWeight: '700 !important',
              color: color.red,
              '& *': {fontSize: 18},
            }}
          >
            {/* {icon && <ReportRoundedIcon />}
          {title ? title : 'Untitled Warning'} */}
            Leave <i>{projectName}</i>?
          </Typography>
        </Box>
        <Box sx={{display: 'flex', flexDirection: 'column', gap: 1}}>
          <Typography sx={{fontSize: 14, textAlign: 'justify'}}>
            {/* {content ? content : 'No content'} */}
            Do you really want to leave{' '}
            <i>
              <b>{projectName}</b>
            </i>
            ? You must choose a member to take on responsibility as the project
            owner.
          </Typography>
          <Select
            defaultValue={owner}
            size="small"
            sx={{minWidth: '100%', fontSize: 14}}
          >
            {members.map((member) => (
              <MenuItem value={member.email} sx={{fontSize: 14}}>
                {member.name} (
                <i>{member.email === owner ? 'you' : member.email}</i>)
              </MenuItem>
            ))}
          </Select>
        </Box>

        <Box
          sx={{
            display: 'flex',
            justifyContent: 'flex-end',
            gap: '10px',
            '& button': {
              px: 2,
              fontSize: 14,
              fontWeight: 700,
              textTransform: 'none',
            },
          }}
        >
          <Button
            size="small"
            sx={{
              backgroundColor: color.red,
              color: 'white',
              '&:hover': {backgroundColor: '#FF2424'},
            }}
          >
            {/* {delContent ? delContent : 'Delete'} */}
            Confirm
          </Button>
          <Button
            sx={{
              color: '#818181',
            }}
          >
            {cancelContent ? cancelContent : 'Cancel'}
          </Button>
        </Box>
      </Paper>
    </Dialog>
  );
}

export default WarningPopup;
