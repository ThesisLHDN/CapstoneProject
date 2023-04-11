export const WorkloadData = [
  {id: 1, label: 'To do', numbers: 29},
  {id: 2, label: 'In Progress', numbers: 17},
  {id: 3, label: 'Testing', numbers: 23},
  {id: 4, label: 'Done', numbers: 11},
];

export const CompletionData = [
  {id: 1, name: 'Epic 01', complete: 100},
  {id: 2, name: 'Epic 02', complete: 90},
  {id: 3, name: 'Epic 03', complete: 40},
];

export const BurndownData = {
  'Remaining Values': [
    {date: '2022-10-26', estimate: 36},
    {date: '2022-10-29', estimate: 29},
    {date: '2022-11-01', estimate: 0},
    {date: '2022-11-04', estimate: 15},
    {date: '2022-11-07', estimate: 15},
    {date: '2022-11-10', estimate: 15},
    {date: '2022-11-13', estimate: 15},
  ],
  Guidelines: [
    {date: '2022-10-26', estimate: 36},
    {date: '2022-10-29', estimate: 32},
    {date: '2022-11-01', estimate: 26},
    {date: '2022-11-04', estimate: 20},
    {date: '2022-11-07', estimate: 11},
    {date: '2022-11-10', estimate: 6},
    {date: '2022-11-13', estimate: 0},
  ],
};

export const BugsData = {
  'Epic 01': [
    {date: 'Mon', bugs: 1},
    {date: 'Tue', bugs: 3},
    {date: 'Wed', bugs: 4},
    {date: 'Thu', bugs: 2},
    {date: 'Fri', bugs: 1},
  ],
  'Epic 02': [
    {date: 'Mon', bugs: 4},
    {date: 'Tue', bugs: 5},
    {date: 'Wed', bugs: 10},
    {date: 'Thu', bugs: 3},
    {date: 'Fri', bugs: 6},
  ],
  'Epic 03': [
    {date: 'Mon', bugs: 7},
    {date: 'Tue', bugs: 6},
    {date: 'Wed', bugs: 4},
    {date: 'Thu', bugs: 2},
    {date: 'Fri', bugs: 0},
  ],
};

export const DelayData = [
  {id: 'DWP-1', epic: 'Epic 01', delay: 2},
  {id: 'DWP-2', epic: 'Epic 01', delay: 4},
  {id: 'DWP-3', epic: 'Epic 01', delay: 6},
  {id: 'DWP-4', epic: 'Epic 01', delay: 3},
  {id: 'DWP-5', epic: 'Epic 01', delay: 3},
  {},
  {id: 'DWP-11', epic: 'Epic 02', delay: 2},
  {id: 'DWP-12', epic: 'Epic 02', delay: 4},
  {id: 'DWP-13', epic: 'Epic 02', delay: 6},
  {id: 'DWP-14', epic: 'Epic 02', delay: 3},
  {id: 'DWP-15', epic: 'Epic 02', delay: 3},
  // {},
  // {id: 'DWP-21', epic: 'Epic 03', delay: 2},
  // {id: 'DWP-22', epic: 'Epic 03', delay: 4},
  // {id: 'DWP-23', epic: 'Epic 03', delay: 6},
  // {id: 'DWP-24', epic: 'Epic 03', delay: 3},
  // {id: 'DWP-25', epic: 'Epic 03', delay: 3},
];

export const PerformceData = [
  {
    id: 1,
    name: 'Lam Nguyen',
    doneInTime: 9,
    doneInDue: 2,
    overdue: 1,
  },
  {
    id: 2,
    name: 'Dang Nguyen',
    doneInTime: 13,
    doneInDue: 1,
    overdue: 2,
  },
  // {
  //   id: 3,
  //   name: "Someone",
  //   doneInTime: 20,
  //   doneInDue: 30,
  //   overdue: 50,
  // },
  // {
  //   id: 1,
  //   name: "Lam Nguyen",
  //   doneInTime: 9,
  //   doneInDue: 2,
  //   overdue: 1,
  // },
  // {
  //   id: 2,
  //   name: "Dang Nguyen",
  //   doneInTime: 13,
  //   doneInDue: 1,
  //   overdue: 2,
  // },
  // {
  //   id: 3,
  //   name: "Someone",
  //   doneInTime: 20,
  //   doneInDue: 30,
  //   overdue: 50,
  // },
];
