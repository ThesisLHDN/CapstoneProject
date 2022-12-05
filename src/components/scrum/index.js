import './scrum.scss';
import Paper from '@mui/material/Paper';
import {DragDropContext, Draggable, Droppable} from 'react-beautiful-dnd';
import mockData from '../../mockData';
import {useState} from 'react';
import Card from './card';

const Scrum = () => {
  const [data, setData] = useState(mockData);

  const onDragEnd = (result) => {
    if (!result.destination) return;
    const {source, destination} = result;

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
                sx={{backgroundColor: '#e8e8e8'}}
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
      </div>
    </DragDropContext>
  );
};

export default Scrum;
