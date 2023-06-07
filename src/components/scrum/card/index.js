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
import Priority from 'src/components/priorities';

const colors = [
  '#FF7F7F',
  '#FF8E5D',
  '#FFCE6E',
  '#CAFF74',
  '#9DFFA1',
  '#89E8E2',
  '#73B2FD',
  '#9E8EFF',
  '#DB8EFF',
  '#FF8ABB',
];

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
  const {project, setReload} = useContext(AppContext);
  const [tags, setTags] = useState([]);
  const [totalTags, setTotalTags] = useState([]);

  const getAssignee = async () => {
    try {
      const res = await axios.get(`/user/${issue.assigneeId}`);
      setAssignee(res.data);
      // console.log(res);
    } catch (err) {
      console.log(err);
    }
  };

  const getTags = async () => {
    try {
      const res = await axios.get(`/tags/${issue.id}`);
      setTags(res.data[0].reverse().slice(0, 3));
      setTotalTags(
        res.data[1]
          .filter((item, pos) => {
            return res.data[1].indexOf(item) == pos;
          })
          .map((tag) => tag.tagname),
      );
      // console.log(totalTags);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (issue.assigneeId) {
      getAssignee();
    }
    getTags();
  }, [issue]);

  return (
    <Link
      to={`/issue/${project.id}/${issue.id}`}
      onClick={() => setReload(true)}
    >
      {' '}
      <Paper elevation={1} className="card">
        <Typography>{issue.issuename}</Typography>
        <div className="mt-2 mb-2 flex flex-wrap">
          <div className="font-medium text-sm flex">
            {tags.map((tag) => (
              <div
                className="mr-2 mb-2 px-3 py-0.5 rounded bg-slate-400"
                style={{
                  backgroundColor: colors[totalTags.indexOf(tag.tagname)],
                }}
              >
                {tag.tagname}
              </div>
            ))}
          </div>

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
              <Chip size="small" label={issue.estimatePoint} sx={{mr: 0.5}} />
            )}
            <Priority priority={issue.priority}></Priority>
            <Avatar
              src={`${assignee.photoURL}`}
              sx={{
                width: 24,
                height: 24,
                ml: 0.5,
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
