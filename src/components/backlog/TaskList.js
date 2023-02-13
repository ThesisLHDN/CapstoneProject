import  {useState} from 'react';
import {DragDropContext, Draggable, Droppable} from 'react-beautiful-dnd';
import ClickAwayListener from '@mui/base/ClickAwayListener';
import {styled} from '@mui/material/styles';
import MuiAccordion from '@mui/material/Accordion';
import MuiAccordionSummary from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import {Button, Box, TextField, FormControl, Select, MenuItem} from '@mui/material';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import SprintHeader from './SprintHeader';
import TaskCard from './TaskCard';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import AddIcon from '@mui/icons-material/Add'
import { IssueIcon } from './TaskCard';
import StartSprint from '../popup/StartSprint';
import CompleteSprint from '../popup/CompleteSprint';

const tasks = [
  {
    id: 'SCR1',
    name: 'First task',
    status: 'To do',
    type: 'story',
    epic: 'Epic 1',
    due: '2022-02-01',
    point: 15,
    assignee: 'Đăng Nguyễn',
  },
  {
    id: 'SCR2',
    name: 'Second task',
    status: 'To do',
    type: 'task',
    epic: 'Epic 1',
    due: '2022-02-01',
    point: 10,
    assignee: 'Lâm Nguyễn',
  },
  {
    id: 'SCR3',
    name: 'Third task',
    status: 'Done',
    type: 'bug',
    epic: 'Epic 2',
    due: '2022-02-01',
    point: 5,
    assignee: 'Đăng Nguyễn',
  },
  {
    id: 'SCR4',
    name: 'Fourth task',
    status: 'Done',
    type: 'bug',
    epic: 'Epic 2',
    due: '2022-02-01',
    point: 15,
    assignee: 'Lâm Nguyễn',
  },
  {
    id: 'SCR5',
    name: 'Fix UI/UX main page',
    status: 'In progress',
    type: 'bug',
    epic: 'UI/UX',
    due: '2022-02-01',
    point: 7,
    assignee: 'Đăng Nguyễn',
  },
];

const columnsFromBackend = {
  1: {
    name: 'Sprint 03',
    startDate: '2022-11-26',
    endDate: '2022-12-03',
    items: [tasks[4]],
  },
  2: {
    name: 'Sprint 02',
    startDate: '2022-11-26',
    endDate: '2022-12-03',
    items: [tasks[3]],
  },
  3: {
    name: 'Sprint 01',
    startDate: '2022-11-26',
    endDate: '2022-12-03',
    items: [tasks[2]],
  },
  4: {
    name: 'Backlog',
    startDate: '2022-11-26',
    endDate: '2022-12-03',
    items: [tasks[0], tasks[1]],
  },
};

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

const onDragEnd = (result, columns, setColumns) => {
  if (!result.destination) return;
  const {source, destination} = result;

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
        items: sourceItems,
      },
      [destination.droppableId]: {
        ...destColumn,
        items: destItems,
      },
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
        items: copiedItems,
      },
    });
  }
};

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

function TaskList(props) {
  const [columns, setColumns] = useState(columnsFromBackend);
  const [createIssueCurSprint, setCreateIssueCurSprint] = useState(false);
  const [createIssueBacklog, setCreateIssueBacklog] = useState(false);
  const [issueType, setIssueType] = useState('story');
  // const [isCreate, setIsCreate] = useState(false);

  const handleIssueType = (event) => {
    setIssueType(event.target.value);
  };

  const addIssue = (event, columnId) => {
		if (event.target.value !== "") {
			setColumns({
        ...columns,
        [columnId]: {
          ...columns[columnId],
          items: [...columns[columnId].items, {
            id: 'SCR' + (Math.floor(Math.random() * 10)).toString(),
            name: event.target.value,
            status: 'To do',
            type: issueType,
            epic: '',
            due: '',
            point: 0,
            assignee: '',
          },]
        }
      })
			event.target.value = "";
		}
    // setIsCreate(false)
    setCreateIssueCurSprint(false);
    setCreateIssueBacklog(false);
    setIssueType('story');
	};

  return (
    <div>
      <DragDropContext
        onDragEnd={(result) => onDragEnd(result, columns, setColumns)}
      >
        {Object.entries(columns).map(([columnId, column], index) => {
          return (
            <div key={columnId}>
              {!props.hide || ['1', '4'].includes(columnId) ? (
                <div className="align-center mb-4" key={columnId}>
                  <Accordion
                    defaultExpanded={
                      ['1', '4'].includes(columnId) ? true : false
                    }
                    sx={{backgroundColor: '#f2f2f2'}}
                  >
                    <div className="flex">
                      <AccordionSummary>
                        <SprintHeader col={column} />
                      </AccordionSummary>

                      {['1', '4'].includes(columnId) ? (
                        <div className="flex absolute right-2 my-2">
                          <div className="my-0 mr-2">
                            {column.items.filter((x) => {
                              return x.status === 'To do';
                            }).length > 0 ? (
                              <span className="px-1.5 py-1 rounded-xl text-white bg-to-do-color my-10 mr-1 text-xs">
                                {column.items
                                  .filter((x) => {
                                    return x.status === 'To do';
                                  })
                                  .reduce((sum, a) => sum + a.point, 0)}
                              </span>
                            ) : (
                              <></>
                            )}

                            {column.items.filter((x) => {
                              return x.status === 'In progress';
                            }).length > 0 ? (
                              <span className="px-1.5 py-1 rounded-xl text-white bg-in-progress-color my-10 mr-1 text-xs">
                                {column.items
                                  .filter((x) => {
                                    return x.status === 'In progress';
                                  })
                                  .reduce((sum, a) => sum + a.point, 0)}
                              </span>
                            ) : (
                              <></>
                            )}

                            {column.items.filter((x) => {
                              return x.status === 'Done';
                            }).length > 0 ? (
                              <span className="px-1.5 py-1 rounded-xl text-white bg-done-color my-10 mr-1 text-xs">
                                {column.items
                                  .filter((x) => {
                                    return x.status === 'Done';
                                  })
                                  .reduce((sum, a) => sum + a.point, 0)}
                              </span>
                            ) : (
                              <></>
                            )}
                          </div>

                          {column.name === 'Backlog' ? <StartSprint /> : <CompleteSprint />}

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
                        <Droppable droppableId={columnId} key={columnId}>
                          {(provided, snapshot) => {
                            return (
                              <div
                                {...provided.droppableProps}
                                ref={provided.innerRef}
                              >
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
                                            className="select-none h-10 mb-0.5 text-sm"
                                            sx={{
                                              borderRadius: 1,
                                              backgroundColor:
                                                snapshot.isDragging
                                                  ? '#D6D6D6'
                                                  : '#00000000',
                                              color: 'black',
                                              ...provided.draggableProps.style,
                                              paddingTop: '8px',
                                              paddingBottom: '8px',
                                              opacity: snapshot.isDragging
                                                ? 0.8
                                                : 1,
                                              '&:hover': {
                                                backgroundColor: '#ddd',
                                              },
                                            }}
                                            onMouseOver
                                          >
                                            <TaskCard item={item} />
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

                      {columnId === '4' ? (
                        <div>
                          {!createIssueBacklog ? (
                            <Button
                              variant="text"
                              startIcon={<AddIcon />}
                              sx={{ color: 'black', fontSize: '14px', textTransform: 'none', }}
                              onClick={() => {setCreateIssueBacklog(true)}}
                            >
                              Create new issue
                            </Button>
                            ) : (
                            <ClickAwayListener mouseEvent='onMouseUp' onClickAway={() => {setCreateIssueBacklog(false)}}>
                              <Box style={{ border: '1px solid gray', backgroundColor: 'white'}}>
                                <Select
                                  variant="standard"
                                  value={issueType}
                                  onChange={handleIssueType}
                                  sx={{ backgroundColor: 'white', border: 'none', p: 0.75, pl: 1.5}}
                                  disableUnderline
                                >
                                  <MenuItem value='story'>{IssueIcon('story')}</MenuItem>
                                  <MenuItem value='bug'>{IssueIcon('bug')}</MenuItem>
                                  <MenuItem value='task'>{IssueIcon('task')}</MenuItem>
                                </Select>
                                <TextField
                                  variant="standard"
                                  size="medium"
                                  sx={{ width: '85%', height: "45px", fontSize: 14, background: 'white', p: 1, pl: 2 }}
                                  InputProps={{ disableUnderline: true, style: { fontSize: 14 }}}
                                  onKeyUp={event => event.key === "Enter" ? addIssue(event, columnId) : null}
                                ></TextField>
                              </Box>
                            </ClickAwayListener>
                          )}
                        </div>
                      ) : (
                        <div>
                          {!createIssueCurSprint ? (
                            <Button
                              variant="text"
                              startIcon={<AddIcon />}
                              sx={{ color: 'black', fontSize: '14px', textTransform: 'none', }}
                              onClick={() => {setCreateIssueCurSprint(true)}}
                            >
                              Create new issue
                            </Button>
                            ) : (
                            <ClickAwayListener mouseEvent='onMouseUp' onClickAway={() => {setCreateIssueCurSprint(false)}}>
                              <Box style={{ border: '1px solid gray', backgroundColor: 'white'}}>
                                <Select
                                  variant="standard"
                                  value={issueType}
                                  onChange={handleIssueType}
                                  sx={{ backgroundColor: 'white', border: 'none', p: 0.75, pl: 1.5}}
                                  disableUnderline
                                >
                                  <MenuItem value='story'>{IssueIcon('story')}</MenuItem>
                                  <MenuItem value='bug'>{IssueIcon('bug')}</MenuItem>
                                  <MenuItem value='task'>{IssueIcon('task')}</MenuItem>
                                </Select>
                                <TextField
                                  variant="standard"
                                  size="medium"
                                  sx={{ width: '85%', height: "45px", fontSize: 14, background: 'white', p: 1, pl: 2 }}
                                  InputProps={{ disableUnderline: true, style: { fontSize: 14 }}}
                                  onKeyUp={event => event.key === "Enter" ? addIssue(event, columnId) : null}
                                ></TextField>
                              </Box>
                            </ClickAwayListener>
                          )}
                        </div>
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
