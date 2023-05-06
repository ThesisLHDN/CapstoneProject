import {useContext, useEffect, useState} from 'react';
import {DragDropContext, Draggable, Droppable} from 'react-beautiful-dnd';
import ClickAwayListener from '@mui/base/ClickAwayListener';
import {styled} from '@mui/material/styles';
import MuiAccordion from '@mui/material/Accordion';
import MuiAccordionSummary from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import {
  Button,
  Box,
  TextField,
  FormControl,
  Select,
  MenuItem,
} from '@mui/material';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import SprintHeader from './SprintHeader';
import TaskCard from './TaskCard';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import AddIcon from '@mui/icons-material/Add';
import {IssueIcon} from './TaskCard';
import StartSprint from '../popup/StartSprint';
import CompleteSprint from '../popup/CompleteSprint';
import {useLocation} from 'react-router-dom';
import axios from 'axios';
import {AuthContext} from 'src/Context/AuthProvider';

const columnsFromBackend = [
  {
    id: '1',
    cyclename: 'Backlog',
    startDate: '',
    endDate: '',
    cstatus: '-1',
    goal: '',
    ownerId: '',
    projectId: '',
  },
];

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

const Accordion = styled((props) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(() => ({
  borderRadius: '5px',
}));

const AccordionSummary = styled((props) => (
  <MuiAccordionSummary
    expandIcon={
      <ArrowForwardIosSharpIcon
        sx={{color: 'black', fontSize: '15px', fontWeight: 900}}
      />
    }
    {...props}
  />
))(({theme}) => ({
  flexDirection: 'row-reverse',
  '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
    transform: 'rotate(90deg)',
  },
  '& .MuiAccordionSummary-content': {
    marginLeft: theme.spacing(1),
  },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({theme}) => ({
  padding: theme.spacing(2),
}));

function TaskList({hide, vals, fil, setFil, srtVal, srt, setSrt}) {
  const location = useLocation();
  const pId = location.pathname.split('/')[2];
  const {
    user: {uid},
  } = useContext(AuthContext);
  const [triggerSprint, setTriggerSprint] = useState(true);
  const [triggerIssue, setTriggerIssue] = useState(true);
  const [columns, setColumns] = useState(columnsFromBackend);
  const [createIssueCurSprint, setCreateIssueCurSprint] = useState(false);
  const [createIssueBacklog, setCreateIssueBacklog] = useState(false);
  const [issueType, setIssueType] = useState('story');
  const [issues, setIssues] = useState([]);
  const [issue, setIssue] = useState({
    issuename: '',
    createTime: '',
    reporterId: uid,
    projectId: pId,
    issuestatus: 'To do',
    cycleId: '',
    issueType: issueType,
    epicId: 1,
    estimatePoint: '',
    assigneeId: '',
  });
  // const [isCreate, setIsCreate] = useState(false);

  const fetchSprintsData = async () => {
    try {
      const res = await axios.get(`http://localhost:8800/sprints/${pId}`);
      setColumns([...res.data, ...columns]);
      setTriggerSprint(false);
      // console.log(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const fetchIssuesData = async () => {
    try {
      const res = await axios.get(`http://localhost:8800/issues/${pId}`);
      setIssues([...res.data]);
      setTriggerIssue(false);
      // console.log(issues);
    } catch (err) {
      console.log(err);
    }
  };

  const updateIssue = async (cId, id, status, destination, source, pId) => {
    // console.log('$$$$$$$$$$$$$$$', status);
    try {
      const res = await axios.put(`http://localhost:8800/issue/${id}`, {
        cId: cId,
        status: status,
        destination: destination,
        source: source,
        pId: pId,
      });
      // setIssues([...res.data]);
      setTriggerIssue(true);
      // console.log('###########', res);
    } catch (err) {
      console.log(err);
    }
  };

  const handleIssueType = (event) => {
    setIssueType(event.target.value);
    setIssue({...issue, issueType: event.target.value});
    // console.log(issue);
  };

  const handleChangeName = (event) => {
    setIssue({...issue, issuename: event.target.value});
    // console.log(issue);
  };

  const addIssue = async (event, columnId) => {
    try {
      if (event.target.value !== '') {
        const res = await axios.post('http://localhost:8800/issue', {
          ...issue,
          createTime: new Date().toISOString().slice(0, 19).replace('T', ' '),
          cycleId: columnId,
        });
        setTriggerIssue(true);
        // console.log(res);
        event.target.value = '';
      }
      setCreateIssueCurSprint(false);
      setCreateIssueBacklog(false);
      setIssueType('story');
    } catch (err) {
      console.log(err);
    }
  };

  const filterIssue = async () => {
    setFil(false);
    try {
      const res = await axios.post(`http://localhost:8800/filter/${pId}`, vals);
      setIssues([...res.data]);
      setTriggerIssue(false);
      console.log('AAAAAAAAAA', res);
    } catch (err) {
      console.log(err);
    }
  };

  const sortIssue = async () => {
    setSrt(false);
    try {
      const res = await axios.post(`http://localhost:8800/sort/${pId}`, {
        sort: srtVal,
      });
      setIssues([...res.data]);
      setTriggerIssue(false);
      console.log('AAAAAAAAAA', res);
    } catch (err) {
      console.log(err);
    }
  };

  const onDragEnd = (result, columns, issues) => {
    // console.log('AAAAAAAAAAAAAAA');
    if (!result.destination) return;
    const {source, destination} = result;

    if (source.droppableId != destination.droppableId) {
      // Get data of source sprint
      const sourceColumn = columns.filter((column) => {
        return column.id == source.droppableId;
      });
      // Get data of destination sprint
      const destColumn = columns.filter((column) => {
        return column.id == destination.droppableId;
      });
      // Get issues in source sprint
      const sourceIssues = issues
        .filter((issue) => {
          return issue.cycleId == sourceColumn[0].id;
        })
        .sort((a, b) => {
          return a.issueorder < b.issueorder
            ? -1
            : a.issueorder > b.issueorder
            ? 1
            : 0;
        });
      // Get issue being drag
      const [removed] = sourceIssues.splice(source.index, 1);
      // Update issue with destination
      updateIssue(
        destColumn[0].id,
        removed.id,
        removed.issuestatus,
        destination,
        source,
        pId,
      );
      setTriggerIssue(true);
    } else {
      // Get the sprint
      const column = columns.filter((column) => {
        return column.id == source.droppableId;
      });
      // Get the issues of sprint
      const copiedIssues = issues
        .filter((issue) => {
          return issue.cycleId == column[0].id;
        })
        .sort((a, b) => {
          return a.issueorder < b.issueorder
            ? -1
            : a.issueorder > b.issueorder
            ? 1
            : 0;
        });
      // Get issue being drag
      const [removed] = copiedIssues.splice(source.index, 1);
      updateIssue(
        column[0].id,
        removed.id,
        removed.issuestatus,
        destination,
        source,
        pId,
      );
      setTriggerIssue(true);
    }
  };

  useEffect(() => {
    if (triggerIssue) {
      fetchIssuesData();
    }
    if (triggerSprint) {
      fetchSprintsData();
    }
    if (fil) {
      filterIssue();
    }
    if (srt) {
      sortIssue();
    }
  }, [triggerIssue, triggerSprint, fil, srt]);

  return (
    <div>
      <DragDropContext
        onDragEnd={(result) => onDragEnd(result, columns, issues)}
      >
        {columns.map((column) => {
          return (
            <div key={column.id}>
              {/* hide if id of column is backlog's id or lastest sprint's id  */}
              {!hide || ['1', columns[0].id].includes(column.id) ? (
                <div className="align-center mb-4" key={column.id}>
                  <Accordion
                    defaultExpanded={
                      column.cstatus == '1' || column.cstatus == '-1'
                        ? true
                        : false
                    }
                    sx={{backgroundColor: '#f2f2f2'}}
                  >
                    <div className="flex">
                      <AccordionSummary>
                        <SprintHeader col={column} />
                      </AccordionSummary>

                      {['1', columns[0].id].includes(column.id) ? (
                        <div className="flex absolute right-2 my-2">
                          <div className="my-0 mr-2">
                            {issues.filter((x) => {
                              return (
                                x.issuestatus === 'To do' &&
                                x.cycleId === column.id
                              );
                            }).length > 0 ? (
                              <span className="px-1.5 py-1 rounded-xl text-white bg-to-do-color my-10 mr-1 text-xs">
                                {issues
                                  .filter((x) => {
                                    return x.issuestatus == 'To do';
                                  })
                                  .reduce((sum, a) => sum + a.estimatePoint, 0)}
                              </span>
                            ) : (
                              <></>
                            )}

                            {issues.filter((x) => {
                              return (
                                x.issuestatus === 'In progress' &&
                                x.cycleId === column.id
                              );
                            }).length > 0 ? (
                              <span className="px-1.5 py-1 rounded-xl text-white bg-in-progress-color my-10 mr-1 text-xs">
                                {issues
                                  .filter((x) => {
                                    return x.issuestatus == 'In progress';
                                  })
                                  .reduce((sum, a) => sum + a.estimatePoint, 0)}
                              </span>
                            ) : (
                              <></>
                            )}

                            {issues.filter((x) => {
                              return (
                                x.issuestatus === 'Done' &&
                                x.cycleId === column.id
                              );
                            }).length > 0 ? (
                              <span className="px-1.5 py-1 rounded-xl text-white bg-done-color my-10 mr-1 text-xs">
                                {issues
                                  .filter((x) => {
                                    return x.issuestatus == 'Done';
                                  })
                                  .reduce((sum, a) => sum + a.estimatePoint, 0)}
                              </span>
                            ) : (
                              <></>
                            )}
                          </div>

                          {column.cyclename == 'Backlog' ? (
                            columns.length == 1 || columns[0].cstatus == '0' ? (
                              <StartSprint
                                setTriggerSprint={setTriggerSprint}
                              />
                            ) : (
                              <></>
                            )
                          ) : column.cstatus == '1' ? (
                            <CompleteSprint
                              setTriggerIssue={setTriggerIssue}
                              sprintId={column.id}
                            />
                          ) : (
                            <></>
                          )}
                          <GrayButton
                            sx={{mx: 1, width: '24px !important', minWidth: 24}}
                          >
                            <MoreHorizIcon />
                          </GrayButton>
                        </div>
                      ) : (
                        <></>
                      )}
                    </div>

                    <AccordionDetails>
                      <div className="-mt-2 mb-2">
                        <Droppable
                          droppableId={column.id?.toString()}
                          key={column.id}
                        >
                          {(provided, snapshot) => {
                            return (
                              <div
                                {...provided.droppableProps}
                                ref={provided.innerRef}
                              >
                                {issues
                                  .filter((issue) => {
                                    return issue.cycleId == column.id;
                                  })
                                  .sort((a, b) => {
                                    if (srtVal == 'None') {
                                      return a.issueorder < b.issueorder
                                        ? -1
                                        : a.issueorder > b.issueorder
                                        ? 1
                                        : 0;
                                    }
                                  })
                                  .map((issue, index) => {
                                    return (
                                      <Draggable
                                        key={issue.id}
                                        draggableId={issue.id?.toString()}
                                        index={index}
                                      >
                                        {(provided, snapshot) => {
                                          return (
                                            <Box
                                              ref={provided.innerRef}
                                              {...provided.draggableProps}
                                              {...provided.dragHandleProps}
                                              className="select-none h-10 mb-0.5 text-sm"
                                              sx={{
                                                borderRadius: 1,
                                                backgroundColor:
                                                  snapshot.isDragging
                                                    ? '#D6D6D6'
                                                    : '#00000000',
                                                color: 'black',
                                                ...provided.draggableProps
                                                  .style,
                                                paddingTop: '8px',
                                                paddingBottom: '8px',
                                                opacity: snapshot.isDragging
                                                  ? 0.8
                                                  : 1,
                                                '&:hover': {
                                                  backgroundColor: '#ddd',
                                                },
                                              }}
                                            >
                                              <TaskCard
                                                issue={issue}
                                                setTrigger={setTriggerIssue}
                                              />
                                            </Box>
                                          );
                                        }}
                                      </Draggable>
                                    );
                                  })}
                                {provided.placeholder}
                              </div>
                            );
                          }}
                        </Droppable>
                      </div>

                      {column.id == columns[0].id ? (
                        <div>
                          {!createIssueBacklog ? (
                            <Button
                              variant="text"
                              startIcon={<AddIcon />}
                              sx={{
                                color: 'black',
                                fontSize: '14px',
                                textTransform: 'none',
                              }}
                              onClick={() => {
                                setCreateIssueBacklog(true);
                              }}
                            >
                              Create new issue
                            </Button>
                          ) : (
                            <ClickAwayListener
                              mouseEvent="onMouseUp"
                              onClickAway={() => {
                                setCreateIssueBacklog(false);
                              }}
                            >
                              <Box
                                style={{
                                  border: '1px solid gray',
                                  backgroundColor: 'white',
                                }}
                              >
                                <Select
                                  variant="standard"
                                  value={issueType}
                                  onChange={handleIssueType}
                                  sx={{
                                    backgroundColor: 'white',
                                    border: 'none',
                                    p: 0.75,
                                    pl: 1.5,
                                  }}
                                  disableUnderline
                                >
                                  <MenuItem value="story">
                                    {IssueIcon('story')}
                                  </MenuItem>
                                  <MenuItem value="bug">
                                    {IssueIcon('bug')}
                                  </MenuItem>
                                  <MenuItem value="task">
                                    {IssueIcon('task')}
                                  </MenuItem>
                                </Select>
                                <TextField
                                  variant="standard"
                                  size="medium"
                                  sx={{
                                    width: '85%',
                                    height: '45px',
                                    fontSize: 14,
                                    background: 'white',
                                    p: 1,
                                    pl: 2,
                                  }}
                                  onChange={handleChangeName}
                                  InputProps={{
                                    disableUnderline: true,
                                    style: {fontSize: 14},
                                  }}
                                  onKeyUp={(event) =>
                                    event.key === 'Enter'
                                      ? addIssue(event, column.id)
                                      : null
                                  }
                                ></TextField>
                              </Box>
                            </ClickAwayListener>
                          )}
                        </div>
                      ) : column.cyclename == 'Backlog' ? (
                        <div>
                          {!createIssueCurSprint ? (
                            <Button
                              variant="text"
                              startIcon={<AddIcon />}
                              sx={{
                                color: 'black',
                                fontSize: '14px',
                                textTransform: 'none',
                              }}
                              onClick={() => {
                                setCreateIssueCurSprint(true);
                              }}
                            >
                              Create new issue
                            </Button>
                          ) : (
                            <ClickAwayListener
                              mouseEvent="onMouseUp"
                              onClickAway={() => {
                                setCreateIssueCurSprint(false);
                              }}
                            >
                              <Box
                                style={{
                                  border: '1px solid gray',
                                  backgroundColor: 'white',
                                }}
                              >
                                <Select
                                  variant="standard"
                                  value={issueType}
                                  onChange={handleIssueType}
                                  sx={{
                                    backgroundColor: 'white',
                                    border: 'none',
                                    p: 0.75,
                                    pl: 1.5,
                                  }}
                                  disableUnderline
                                >
                                  <MenuItem value="story">
                                    {IssueIcon('story')}
                                  </MenuItem>
                                  <MenuItem value="bug">
                                    {IssueIcon('bug')}
                                  </MenuItem>
                                  <MenuItem value="task">
                                    {IssueIcon('task')}
                                  </MenuItem>
                                </Select>
                                <TextField
                                  variant="standard"
                                  size="medium"
                                  sx={{
                                    width: '85%',
                                    height: '45px',
                                    fontSize: 14,
                                    background: 'white',
                                    p: 1,
                                    pl: 2,
                                  }}
                                  onChange={handleChangeName}
                                  InputProps={{
                                    disableUnderline: true,
                                    style: {fontSize: 14},
                                  }}
                                  onKeyUp={(event) =>
                                    event.key === 'Enter'
                                      ? addIssue(event, column.id)
                                      : null
                                  }
                                ></TextField>
                              </Box>
                            </ClickAwayListener>
                          )}
                        </div>
                      ) : (
                        <></>
                      )}
                    </AccordionDetails>
                  </Accordion>
                </div>
              ) : (
                <></>
              )}
            </div>
          );
        })}
      </DragDropContext>
    </div>
  );
}

export default TaskList;
