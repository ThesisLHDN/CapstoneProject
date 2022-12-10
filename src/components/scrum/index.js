import './scrum.scss';
import {Paper, Button} from '@mui/material';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import {DragDropContext, Draggable, Droppable} from 'react-beautiful-dnd';
import mockData from './mockData';
import {useState} from 'react';
import Card from './card';

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
      <div className="scrum">
        {data.map((section) => (
          <Droppable key={section.id} droppableId={section.id}>
            {(provided) => (
              <Paper
                {...provided.droppableProps}
                className="scrum__section"
                ref={provided.innerRef}
                sx={{backgroundColor: '#efefef'}}
              >
                <div className="scrum__section__title">
                  {section.title}{' '}
                  <span className="scrum__section__title__num">
                    {section.tasks.length} issues
                  </span>
                </div>
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
              </Paper>
            )}
          </Droppable>
        ))}
        <Button
          sx={{
            backgroundColor: '#cdcdcd',
            color: 'black',
            borderRadius: '3 !important',
            height: 40,
            width: 40,
            minWidth: 40,
            '&:hover': {
              backgroundColor: '#efefef',
            },
            ml: 2,
          }}
        >
          <AddRoundedIcon />
        </Button>
      </div>
    </DragDropContext>
  );
};

export default Scrum;
