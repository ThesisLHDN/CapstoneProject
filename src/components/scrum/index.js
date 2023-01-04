import './scrum.scss';
import {Button, Box} from '@mui/material';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import {DragDropContext, Draggable, Droppable} from 'react-beautiful-dnd';
import mockData from './mockData';
import {useState} from 'react';
import Card from './card';
import {colorHover} from 'src/style';

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
  // const onDragEnd = (result, columns, setColumns) => {
  //   if (!result.destination) return;
  //   console.log(result);
  //   const {source, destination} = result;
  //   console.log(source, destination);

  //   // if (source.droppableId !== destination.droppableId) {
  //   //   const sourceColumn = columns[source.droppableId];
  //   //   const destColumn = columns[destination.droppableId];
  //   //   const sourceItems = [...sourceColumn.items];
  //   //   const destItems = [...destColumn.items];
  //   //   const [removed] = sourceItems.splice(source.index, 1);
  //   //   destItems.splice(destination.index, 0, removed);
  //   //   setColumns({
  //   //     ...columns,
  //   //     [source.droppableId]: {
  //   //       ...sourceColumn,
  //   //       items: sourceItems,
  //   //     },
  //   //     [destination.droppableId]: {
  //   //       ...destColumn,
  //   //       items: destItems,
  //   //     },
  //   //   });
  //   // }
  //   // else {
  //   //   const column = columns[source.droppableId];
  //   //   const copiedItems = [...column.items];
  //   //   const [removed] = copiedItems.splice(source.index, 1);
  //   //   copiedItems.splice(destination.index, 0, removed);
  //   //   setColumns({
  //   //     ...columns,
  //   //     [source.droppableId]: {
  //   //       ...column,
  //   //       items: copiedItems,
  //   //     },
  //   //   });
  //   // }
  // };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="scrum">
        {data.map((section) => (
          <Droppable key={section.id} droppableId={section.id}>
            {(provided) => (
              <Box
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
      </div>
    </DragDropContext>
  );
};

export default Scrum;
