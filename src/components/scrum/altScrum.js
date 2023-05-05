import React, {useEffect, useState} from 'react';
import {DragDropContext, Draggable, Droppable} from 'react-beautiful-dnd';
import {v4 as uuid} from 'uuid';
import Card from './card/index.js';
import './scrum.scss';
import {Button, Box, Typography} from '@mui/material';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import {colorHover} from 'src/style';
import axios from 'axios';
import {useLocation} from 'react-router-dom';

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
    title: 'Done',
  },
];

function Scrum({sprint, pathname}) {
  const [issues, setIssues] = useState([]);
  const [triggerBoard, setTriggerBoard] = useState(false);

  const fetchIssuesData = async () => {
    try {
      const res = await axios.get(
        `http://localhost:8800/sprintissue/${sprint.id}`,
      );
      setIssues(res.data);
      setTriggerBoard(false);
    } catch (err) {
      console.log(err);
    }
  };

  // const updateIssue = async (cId, id, status) => {
  //   try {
  //     const res = await axios.put(`http://localhost:8800/issue/${id}`, {
  //       cId: cId,
  //       status: status,
  //     });
  //     // setIssues([...res.data]);
  //     console.log(res);
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  const updateIssue = async (cId, id, status, startDate, dueDate) => {
    try {
      const res = await axios.put(`http://localhost:8800/issue/${id}`, {
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
        return column.title == source.droppableId;
      });
      const destColumn = columns.filter((column) => {
        return column.title == destination.droppableId;
      });
      const sourceIssues = issues
        .filter((issue) => {
          return issue.issuestatus == sourceColumn[0].title;
        })
        .sort((a, b) => {
          return a.issueorder < b.issueorder
            ? -1
            : a.issueorder > b.issueorder
            ? 1
            : 0;
        });
      const destIssues = issues.filter((issue) => {
        return issue.issuestatus == destColumn[0].title;
      });
      const [removed] = sourceIssues.splice(source.index, 1);
      destIssues.splice(destination.index, 0, removed);
      updateIssue(removed.cycleId, removed.id, destColumn[0].title, removed.createTime, removed.dueDate);
      setTriggerBoard(true);
    } else {
      const column = columns.filter((column) => {
        return column.title == source.droppableId;
      });
      const copiedItems = issues.filter((issue) => {
        return issue.issuestatus == column[0].title;
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

  useEffect(() => {
    fetchIssuesData();
  }, [sprint, triggerBoard]);

  return (
    <Box
      style={{
        display: 'flex',
        justifyContent: 'flex-start',
        height: '100%',
        marginTop: 10,
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
                            width: 300,
                            minHeight: 500,
                            borderRadius: 5,
                          }}
                        >
                          {/* {console.log('###########', issues)} */}
                          <Typography sx={{fontWeight: 700, mb: 1}}>
                            {column.title}{' '}
                            {/* <Typography
                              variant="subtitle2"
                              sx={{display: 'inline'}}
                              className="scrum__section__title__num"
                            >
                              {column.items.length +
                                (column.items.length > 1
                                  ? ' issues'
                                  : ' issue')}
                            </Typography> */}
                          </Typography>
                          {issues
                            .filter((issue) => {
                              return issue.issuestatus == column.title;
                            })
                            .sort((a, b) => {
                              return a.issueorder < b.issueorder
                                ? -1
                                : a.issueorder > b.issueorder
                                ? 1
                                : 0;
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
      {/* <Button
        sx={{
          height: 40,
          width: 40,
          minWidth: 40,
          ...colorHover.grayBtn,
        }}
      >
        <AddRoundedIcon />
      </Button> */}
    </Box>
  );
}

export default Scrum;
