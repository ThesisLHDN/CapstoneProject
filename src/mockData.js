import { v4 as uuidv4 } from "uuid";

const mockData = [
  {
    id: uuidv4(),
    title: " 📃 To do",
    tasks: [
      {
        id: uuidv4(),
        title: "Learn JavaScript",
        priority: "High",
        type: "task",
        epic: "Epic 1",
        due: Date("2/1/22"),
        point: 15,
        code: "DWP-1",
        assignee: "Lâm Nguyễn",
      },
      {
        id: uuidv4(),
        title: "Learn Git",
        priority: "High",
        type: "bug",
        epic: "Epic 2",
        due: Date("2/1/22"),
        point: 15,
        code: "DWP-1",
        assignee: "Đăng Nguyễn",
      },
      {
        id: uuidv4(),
        title: "Learn Python",
        priority: "High",
        type: "task",
        epic: "Epic 3",
        due: Date("2/1/22"),
        point: 15,
        code: "DWP-1",
        assignee: "Lâm Nguyễn",
      },
    ],
  },
  {
    id: uuidv4(),
    title: " ✏️ In progress",
    tasks: [
      {
        id: uuidv4(),
        title: "Learn CSS",
        priority: "High",
        type: "story",
        epic: "Epic 4",
        due: Date("2/1/22"),
        point: 15,
        code: "DWP-1",
        assignee: "Đăng Nguyễn",
      },
      {
        id: uuidv4(),
        title: "Learn Golang",
        priority: "High",
        type: "bug",
        epic: "Epic 2",
        due: Date("2/1/22"),
        point: 15,
        code: "DWP-1",
        assignee: "Đăng Nguyễn",
      },
    ],
  },
  {
    id: uuidv4(),
    title: " ✔️ Completed",
    tasks: [
      {
        id: uuidv4(),
        title: "Learn HTML",
        priority: "High",
        type: "task",
        epic: "Epic 1",
        due: Date("2/1/22"),
        point: 15,
        code: "DWP-1",
        assignee: "Lâm Nguyễn",
      },
    ],
  },
];

export default mockData;
