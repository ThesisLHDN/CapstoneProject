import './scrum.scss';
import {
  Button,
  Box,
  // Paper,
  Typography,
} from '@mui/material';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import mockData from './mockData';
import { useState } from 'react';
import Card from './card';
import { colorHover } from 'src/style';

const Scrum = () => {
  const [data, setData] = useState(mockData);

  const onDragEnd = (result) => {
    if (!result.destination) return;
    const {source, destination} = result;
    console.log(source, destination);

    if (source.droppableId !== destination.droppableId) {
      const sourceColIndex = data.findIndex((e) => e.id === source.droppableId);
      const destinationColIndex = data.findIndex(
        (e) => e.id === destination.droppableId,
      );

      const sourceCol = data[sourceColIndex];
      const destinationCol = data[destinationColIndex];

      const sourceTask = [...sourceCol.tasks];
      const destinationTask = [...destinationCol.tasks];

      const [removed] = sourceTask.splice(source.index, 1);
      destinationTask.splice(destination.index, 0, removed);

      data[sourceColIndex].tasks = sourceTask;
      data[destinationColIndex].tasks = destinationTask;

      setData(data);
    }
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Box className="scrum">
        {data.map((section) => (
          <Droppable key={section.id} droppableId={section.id}>
            {(provided) => (
              <Box
                {...provided.droppableProps}
                className="scrum__section"
                ref={provided.innerRef}
                // sx={{backgroundColor: '#efefef'}}
                sx={{
                  width: 300,
                  backgroundColor: '#e8e8e8',
                  p: 1,
                  borderRadius: 2,
                }}
              >
                <Typography sx={{fontWeight: 700, mb: 1}}>
                  {section.title}{' '}
                  <Typography
                    variant="subtitle2"
                    sx={{display: 'inline'}}
                    className="scrum__section__title__num"
                  >
                    {section.tasks.length} issues
                  </Typography>
                </Typography>
                <div className="scrum__section__content">
                  {section.tasks.map((task, index) => (
                    <Draggable
                      key={task.id}
                      draggableId={task.id}
                      index={index}
                    >
                      {(provided, snapshot) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          style={{
                            ...provided.draggableProps.style,
                            opacity: snapshot.isDragging ? '0.5' : '1',
                          }}
                        >
                          <Card>{task}</Card>
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              </Box>
            )}
          </Droppable>
        ))}
        <Button
          sx={{
            height: 40,
            width: 40,
            minWidth: 40,
            ml: 2,
            ...colorHover.grayBtn,
          }}
        >
          <AddRoundedIcon />
        </Button>
      </Box>
    </DragDropContext>
  );
};

