
import React, { useState } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { v4 as uuid } from "uuid";
import Card from './card'
import './scrum.scss';
import {
    Button,
    Box,
    Typography,
} from '@mui/material';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import { colorHover } from 'src/style';

const mockData = [
    {
        id: uuid(),
        title: 'To do',
        items: [
            {
                id: uuid(),
                title: 'Learn JavaScript',
                priority: 'High',
                type: 'task',
                epic: 'Epic 1',
                due: Date('2/1/22'),
                point: 15,
                code: 'DWP-1',
                assignee: 'Lâm Nguyễn',
            },
            {
                id: uuid(),
                title: 'Learn Git',
                priority: 'High',
                type: 'bug',
                epic: 'Epic 2',
                due: Date('2/1/22'),
                point: 15,
                code: 'DWP-1',
                assignee: 'Đăng Nguyễn',
            },
            {
                id: uuid(),
                title: 'Learn Python',
                priority: 'High',
                type: 'task',
                epic: 'Epic 3',
                due: Date('2/1/22'),
                point: 15,
                code: 'DWP-1',
                assignee: 'Lâm Nguyễn',
            },
        ],
    },
    {
        id: uuid(),
        title: 'In progress',
        items: [
            {
                id: uuid(),
                title: 'Learn CSS',
                priority: 'High',
                type: 'story',
                epic: 'Epic 4',
                due: Date('2/1/22'),
                point: 15,
                code: 'DWP-1',
                assignee: 'Đăng Nguyễn',
            },
            {
                id: uuid(),
                title: 'Learn Golang',
                priority: 'High',
                type: 'bug',
                epic: 'Epic 2',
                due: Date('2/1/22'),
                point: 15,
                code: 'DWP-1',
                assignee: 'Đăng Nguyễn',
            },
        ],
    },
    {
        id: uuid(),
        title: 'Completed',
        items: [
            {
                id: uuid(),
                title: 'Learn HTML',
                priority: 'High',
                type: 'task',
                epic: 'Epic 1',
                due: Date('2/1/22'),
                point: 15,
                code: 'DWP-1',
                assignee: 'Lâm Nguyễn',
            },
        ],
    },
];


// const itemsFromBackend = [
//     { id: uuid(), content: "First task" },
//     { id: uuid(), content: "Second task" },
//     { id: uuid(), content: "Third task" },
//     { id: uuid(), content: "Fourth task" },
//     { id: uuid(), content: "Fifth task" }
// ];

// const columnsFromBackend = {
//     [uuid()]: {
//         name: "Requested",
//         items: itemsFromBackend
//     },
//     [uuid()]: {
//         name: "To do",
//         items: []
//     },
//     [uuid()]: {
//         name: "In Progress",
//         items: []
//     },
//     [uuid()]: {
//         name: "Done",
//         items: []
//     }
// };

const onDragEnd = (result, columns, setColumns) => {
    if (!result.destination) return;
    const { source, destination } = result;

    if (source.droppableId !== destination.droppableId) {
        const sourceColumn = columns[source.droppableId];
        const destColumn = columns[destination.droppableId];
        const sourceItems = [...sourceColumn.items];
        const destItems = [...destColumn.items];
        const [removed] = sourceItems.splice(source.index, 1);
        destItems.splice(destination.index, 0, removed);
        setColumns({
            ...columns,
            [source.droppableId]: {
                ...sourceColumn,
                items: sourceItems
            },
            [destination.droppableId]: {
                ...destColumn,
                items: destItems
            }
        });
    } else {
        const column = columns[source.droppableId];
        const copiedItems = [...column.items];
        const [removed] = copiedItems.splice(source.index, 1);
        copiedItems.splice(destination.index, 0, removed);
        setColumns({
            ...columns,
            [source.droppableId]: {
                ...column,
                items: copiedItems
            }
        });
    }
};

function Scrum() {
    const [columns, setColumns] = useState(mockData);
    return (
        <Box style={{ display: "flex", justifyContent: "flex-start", height: "100%", marginTop: 10 }}>
            <DragDropContext
                onDragEnd={result => onDragEnd(result, columns, setColumns)}
            >
                {Object.entries(columns).map(([columnId, column], index) => {
                    return (
                        <div
                            style={{
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center"
                            }}
                            key={columnId}
                        >

                            <Box style={{ marginRight: 8 }}>
                                <Droppable droppableId={columnId} key={columnId}>
                                    {(provided, snapshot) => {
                                        return (
                                            <Box>
                                                <Box
                                                    {...provided.droppableProps}
                                                    ref={provided.innerRef}
                                                    style={{
                                                        background: snapshot.isDraggingOver
                                                            ? "#ccf2ff"
                                                            : "#e8e8e8",
                                                        padding: 8,
                                                        width: 300,
                                                        minHeight: 500,
                                                        borderRadius: 5,
                                                    }}
                                                >
                                                    <Typography sx={{ fontWeight: 700, mb: 1 }}>
                                                        {column.title}{' '}
                                                        <Typography
                                                            variant="subtitle2"
                                                            sx={{ display: 'inline' }}
                                                            className="scrum__section__title__num"
                                                        >
                                                            {column.items.length + (column.items.length > 1 ? " issues" : ' issue')}
                                                        </Typography>
                                                    </Typography>
                                                    {column.items.map((item, index) => {
                                                        return (
                                                            <Draggable
                                                                key={item.id}
                                                                draggableId={item.id}
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
                                                                                userSelect: "none",
                                                                                margin: "0 0 8px 0",
                                                                                minHeight: "50px",
                                                                                opacity: snapshot.isDragging ? '0.7' : '1',
                                                                            }}
                                                                        >
                                                                            <Card>{item}</Card>
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
            <Button
                sx={{
                    height: 40,
                    width: 40,
                    minWidth: 40,
                    ...colorHover.grayBtn,
                }}
            >
                <AddRoundedIcon />
            </Button>
        </Box>
    );
}

export default Scrum;
