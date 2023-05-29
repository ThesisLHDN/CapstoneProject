import {useContext, useEffect, useState} from 'react';
import {DragDropContext, Draggable, Droppable} from 'react-beautiful-dnd';
import Card from './card/index.js';
import './scrum.scss';
import {Box, Typography} from '@mui/material';
// import AddRoundedIcon from '@mui/icons-material/AddRounded';
// import {colorHover} from 'src/style';
import axios from 'src/hooks/axios';
import {AppContext} from 'src/Context/AppProvider.js';
import {AuthContext} from 'src/Context/AuthProvider.js';

const columns = [
  {
    id: '1',
    title: 'To do',
  },
  {
    id: '2',
    title: 'In progress',
  },
  {
    id: '3',
    title: 'Testing',
  },
  {
    id: '4',
    title: 'Done',
  },
];

function Scrum({me, sprint, vals, fil, setFil, srtVal, srt, setSrt, input}) {
  const [issues, setIssues] = useState([]);
  const [tempIssues, setTempIssues] = useState([]);
  const [triggerBoard, setTriggerBoard] = useState(false);
  const {project} = useContext(AppContext);
  const {
    user: {uid},
  } = useContext(AuthContext);

  const fetchIssuesData = async () => {
    try {
      const res = await axios.get(`/sprintissue/${sprint.id}`);
      setIssues(res.data);
      setTempIssues(res.data);
    } catch (err) {
      console.log(err);
    }
    setTriggerBoard(false);
  };

  const updateIssue = async (cId, id, status, startDate, dueDate) => {
    try {
      const res = await axios.put(`/issue/${id}`, {
        cId: cId,
        status: status,
        startDate: new Date(startDate)
          .toISOString()
          .slice(0, 19)
          .replace('T', ' '),
        dueDate: dueDate
          ? new Date(dueDate).toISOString().slice(0, 19).replace('T', ' ')
          : null,
      });
      // setIssues([...res.data]);
      console.log(res);
    } catch (err) {
      console.log(err);
    }
  };

  const onDragEnd = (result, columns, setColumns) => {
    if (!result.destination) return;
    const {source, destination} = result;

    if (source.droppableId !== destination.droppableId) {
      const sourceColumn = columns.filter((column) => {
        return column.title === source.droppableId;
      });
      const destColumn = columns.filter((column) => {
        return column.title === destination.droppableId;
      });
      const sourceIssues = issues
        .filter((issue) => {
          return issue.issuestatus === sourceColumn[0].title;
        })
        .sort((a, b) => {
          return a.issueorder < b.issueorder
            ? -1
            : a.issueorder > b.issueorder
            ? 1
            : 0;
        });
      const destIssues = issues.filter((issue) => {
        return issue.issuestatus === destColumn[0].title;
      });
      const [removed] = sourceIssues.splice(source.index, 1);
      destIssues.splice(destination.index, 0, removed);
      updateIssue(
        removed.cycleId,
        removed.id,
        destColumn[0].title,
        removed.createTime,
        removed.dueDate,
      );
      setTriggerBoard(true);
    } else {
      const column = columns.filter((column) => {
        return column.title === source.droppableId;
      });
      const copiedItems = issues.filter((issue) => {
        return issue.issuestatus === column[0].title;
      });
      const [removed] = copiedItems.splice(source.index, 1);
      copiedItems.splice(destination.index, 0, removed);
      updateIssue(
        removed.cycleId,
        removed.id,
        column[0].title,
        removed.createTime,
        removed.dueDate,
      );
      setTriggerBoard(true);
    }
  };

  const filterIssue = async () => {
    setFil(false);
    try {
      const res = await axios.post(
        `/filter/${project.id}?sprint=${sprint.id}`,
        vals,
      );
      setIssues([...res.data]);
      setTempIssues(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const sortIssue = async () => {
    setSrt(false);
    try {
      const res = await axios.post(`/sort/${project.id}?sprint=${sprint.id}`, {
        sort: srtVal,
      });
      setIssues([...res.data]);
      setTempIssues(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const searchIssue = () => {
    const temp = tempIssues;
    const findIssue = temp.filter((issue) =>
      issue.issuename.toLowerCase().includes(input.toLowerCase()),
    );
    setIssues(findIssue);
  };

  useEffect(() => {
    if (triggerBoard === false && sprint && input === '') {
      fetchIssuesData();
    } else if (triggerBoard === true) {
      fetchIssuesData();
    }
    if (fil) {
      filterIssue();
    }
    if (srt) {
      sortIssue();
    }
    searchIssue();
    // console.log(triggerBoard);
  }, [sprint, triggerBoard, fil, srt, input]);

  // console.log(triggerBoard);

  return (
    <Box
      style={{
        display: 'flex',
        justifyContent: 'flex-start',
        height: '100%',
        marginTop: 10,
        height: 'fit-content',
      }}
    >
      <DragDropContext onDragEnd={(result) => onDragEnd(result, columns)}>
        {columns.map((column) => {
          return (
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                height: '100%',
              }}
              key={column.id}
            >
              <Box style={{marginRight: 8}}>
                <Droppable droppableId={column.title} key={column.id}>
                  {(provided, snapshot) => {
                    return (
                      <Box>
                        <Box
                          {...provided.droppableProps}
                          ref={provided.innerRef}
                          style={{
                            background: snapshot.isDraggingOver
                              ? '#ccf2ff'
                              : '#e8e8e8',
                            padding: 8,
                            width: '19vw',
                            minHeight: 700,
                            height: '100%',
                            borderRadius: 5,
                          }}
                        >
                          <Typography sx={{fontWeight: 700, mb: 1}}>
                            {column.title}{' '}
                          </Typography>
                          {issues
                            .filter((issue) => {
                              return issue.issuestatus === column.title;
                            })
                            .sort((a, b) => {
                              if (srtVal === 'None') {
                                return a.issueorder < b.issueorder
                                  ? -1
                                  : a.issueorder > b.issueorder
                                  ? 1
                                  : 0;
                              }
                            })
                            .map((issue, index) => {
                              return (
                                <div>
                                  {!me || issue.assigneeId === uid ? (
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
                                            style={{
                                              ...provided.draggableProps.style,
                                              userSelect: 'none',
                                              margin: '0 0 8px 0',
                                              minHeight: '50px',
                                              opacity: snapshot.isDragging
                                                ? '0.7'
                                                : '1',
                                            }}
                                          >
                                            <Card issue={issue} />
                                          </Box>
                                        );
                                      }}
                                    </Draggable>
                                  ) : (
                                    <></>
                                  )}
                                </div>
                              );
                            })}
                          {provided.placeholder}
                        </Box>
                      </Box>
                    );
                  }}
                </Droppable>
              </Box>
            </div>
          );
        })}
      </DragDropContext>
    </Box>
  );
}

export default Scrum;
