import './card.scss';
import format from 'date-fns/format';
import {Link} from 'react-router-dom';

import {Avatar, Typography, Chip, Paper} from '@mui/material';

import AccessTimeRoundedIcon from '@mui/icons-material/AccessTimeRounded';
import DoneRoundedIcon from '@mui/icons-material/DoneRounded';
import FiberManualRecordRoundedIcon from '@mui/icons-material/FiberManualRecordRounded';
import FlagRoundedIcon from '@mui/icons-material/FlagRounded';
import QuestionMarkRoundedIcon from '@mui/icons-material/QuestionMarkRounded';
import {useContext, useEffect, useState} from 'react';
import {AppContext} from 'src/Context/AppProvider';
import axios from 'src/hooks/axios';

// const Epic = (props) => {
//   const colors = (epic) => {
//     switch (epic) {
//       case 'Epic 1':
//         return ['#bee8e8', '#3db0d1'];
//       case 'Epic 2':
//         return ['#FFE5E2', '#E93B81'];
//       case 'Epic 3':
//         return ['#DEFBC2', '#459D72'];
//       default:
//         return ['#ccc', '#3C4048'];
//     }
//   };

//   const [background, text] = colors(props.children);
//   return (
//     <Chip
//       sx={{
//         color: text,
//         backgroundColor: background,
//         display: 'inline-flex',
//         borderRadius: '2px',
//         mr: 1,
//       }}
//       size="small"
//       label={props.children}
//     />
//   );
// };

export const issueIcon = (type) => {
  switch (type) {
    case 'task':
      return (
        <DoneRoundedIcon
          sx={{
            backgroundColor: '#4856D7',
            color: 'white',
            borderRadius: 1,
            width: 24,
            height: 24,
            padding: 0.25,
          }}
        />
      );
    case 'bug':
      return (
        <FiberManualRecordRoundedIcon
          sx={{
            backgroundColor: 'red',
            color: 'white',
            borderRadius: 1,
            width: 24,
            height: 24,
            padding: 0.25,
          }}
        />
      );
    case 'story':
      return (
        <FlagRoundedIcon
          sx={{
            backgroundColor: '#00980F',
            color: 'white',
            borderRadius: 1,
            width: 24,
            height: 24,
            padding: 0.25,
          }}
        />
      );
    default:
      return (
        <QuestionMarkRoundedIcon
          sx={{
            backgroundColor: '#BAD1C2',
            color: 'white',
            borderRadius: 1,
            width: 24,
            height: 24,
            padding: 0.25,
          }}
        />
      );
  }
};

function Card({issue}) {
  const [assignee, setAssignee] = useState({});
  const {project} = useContext(AppContext);

  const getAssignee = async () => {
    try {
      const res = await axios.get(`/user/${issue.assigneeId}`);
      setAssignee(res.data);
      // console.log(res);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (issue.assigneeId) {
      getAssignee();
    }
  }, [issue]);

  return (
    <Link to={`/issue/${project.id}/${issue.id}`}>
      {' '}
      <Paper elevation={1} className="card">
        <Typography>{issue.issuename}</Typography>
        <div style={{margin: '10px 0px'}}>
          {/* <Epic>{'Some epic'}</Epic> */}
          {issue.dueDate && (
            <Chip
              size="small"
              icon={<AccessTimeRoundedIcon />}
              label={format(
                new Date(issue.dueDate ? issue.dueDate : ''),
                'dd-MM',
              )}
            />
          )}
        </div>
        <div style={{display: 'flex', justifyContent: 'space-between'}}>
          <div
            style={{
              fontSize: '13px',
              display: 'flex',
              alignItems: 'center',
              gap: 1,
            }}
          >
            {issueIcon(issue.issueType)}
            <Typography variant="subtitle" sx={{ml: '5px'}}>
              {project.pkey + '-' + issue.issueindex}
            </Typography>
          </div>
          <div style={{display: 'inline-flex', alignItems: 'flex-end'}}>
            {issue.estimatePoint && (
              <Chip size="small" label={issue.estimatePoint} />
            )}
            <Avatar
              src={`${assignee.photoURL}`}
              sx={{
                width: 24,
                height: 24,
                ml: 1,
                backgroundColor: '#8993A4',
                marginRight: 1,
              }}
              alt={assignee ? assignee.username : ''}
            ></Avatar>
          </div>
        </div>
      </Paper>
    </Link>
  );
}

export default Card;
