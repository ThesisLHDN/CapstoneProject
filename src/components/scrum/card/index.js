import './card.scss';
import format from 'date-fns/format';
import {Link} from 'react-router-dom';

import {Avatar, Typography, Chip, Paper} from '@mui/material';

import AccessTimeRoundedIcon from '@mui/icons-material/AccessTimeRounded';
import DoneRoundedIcon from '@mui/icons-material/DoneRounded';
import FiberManualRecordRoundedIcon from '@mui/icons-material/FiberManualRecordRounded';
import FlagRoundedIcon from '@mui/icons-material/FlagRounded';
import QuestionMarkRoundedIcon from '@mui/icons-material/QuestionMarkRounded';
import {useContext} from 'react';
import {AppContext} from 'src/Context/AppProvider';

const Epic = (props) => {
  const colors = (epic) => {
    switch (epic) {
      case 'Epic 1':
        return ['#bee8e8', '#3db0d1'];
      case 'Epic 2':
        return ['#FFE5E2', '#E93B81'];
      case 'Epic 3':
        return ['#DEFBC2', '#459D72'];
      default:
        return ['#ccc', '#3C4048'];
    }
  };

  const [background, text] = colors(props.children);
  return (
    <Chip
      sx={{
        color: text,
        backgroundColor: background,
        display: 'inline-flex',
        borderRadius: '2px',
        mr: 1,
      }}
      size="small"
      label={props.children}
    />
  );
};

const issueIcon = (type) => {
  switch (type) {
    case 'task':
      return (
        <DoneRoundedIcon
          sx={{
            backgroundColor: '#A5F1E9',
            color: 'white',
            borderRadius: 1,
            width: 18,
            height: 18,
          }}
        />
      );
    case 'bug':
      return (
        <FiberManualRecordRoundedIcon
          sx={{
            backgroundColor: '#EF9A53',
            color: 'white',
            borderRadius: 1,
            width: 18,
            height: 18,
          }}
        />
      );
    case 'story':
      return (
        <FlagRoundedIcon
          sx={{
            backgroundColor: '#82CD47',
            color: 'white',
            borderRadius: 1,
            width: 18,
            height: 18,
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
            width: 18,
            height: 18,
          }}
        />
      );
  }
};

function Card({issue}) {
  const {project} = useContext(AppContext);
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
              {project.pkey + '-' + issue.id}
            </Typography>
          </div>
          <div style={{display: 'inline-flex', alignItems: 'flex-end'}}>
            {issue.estimatePoint && (
              <Chip size="small" label={issue.estimatePoint} />
            )}
            <Avatar
              src="X"
              sx={{width: 32, height: 32, ml: 1}}
              alt={issue.assigneeId}
            />
          </div>
        </div>
      </Paper>
    </Link>
  );
}

export default Card;
