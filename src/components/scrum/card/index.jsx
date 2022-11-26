import "./card.scss";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import format from "date-fns/format";
import AccessTimeRoundedIcon from "@mui/icons-material/AccessTimeRounded";
import Chip from "@mui/material/Chip";
import Paper from '@mui/material/Paper'
import DoneRoundedIcon from "@mui/icons-material/DoneRounded";
import FiberManualRecordRoundedIcon from "@mui/icons-material/FiberManualRecordRounded";
import FlagRoundedIcon from "@mui/icons-material/FlagRounded";
import QuestionMarkRoundedIcon from "@mui/icons-material/QuestionMarkRounded";

const Epic = (props) => {
  const colors = (epic) => {
    switch (epic) {
      case "Epic 1":
        return ["#bee8e8", "#3db0d1"];
      case "Epic 2":
        return ["#FFE5E2", "#E93B81"];
      case "Epic 3":
        return ["#DEFBC2", "#459D72"];
      default:
        return ["#ccc", "#3C4048"];
    }
  };
  const [background, text] = colors(props.children);
  return (
    <Chip
      sx={{
        color: text,
        backgroundColor: background,
        display: "inline-flex",
        borderRadius: "2px",
        mr: 1,
      }}
      size="small"
      label={props.children}
    />
  );
};

const IssueIcon = (type) => {
  switch (type) {
    case "task":
      return (
        <DoneRoundedIcon
          sx={{
            backgroundColor: "#A5F1E9",
            color: "white",
            borderRadius: 1,
            width: 18,
            height: 18,
          }}
        />
      );
    case "bug":
      return (
        <FiberManualRecordRoundedIcon
          sx={{
            backgroundColor: "#EF9A53",
            color: "white",
            borderRadius: 1,
            width: 18,
            height: 18,
          }}
        />
      );
    case "story":
      return (
        <FlagRoundedIcon
          sx={{
            backgroundColor: "#82CD47",
            color: "white",
            borderRadius: 1,
            width: 18,
            height: 18,
          }}
        />
      );
    default:
      return (
        <QuestionMarkRoundedIcon
          sx={{
            backgroundColor: "#BAD1C2",
            color: "white",
            borderRadius: 1,
            width: 18,
            height: 18,
          }}
        />
      );
  }
};

const Card = (props) => {
  const task = props.children;
  console.log(task);
  return (
    <Paper className="card">
      <Typography>{task.title}</Typography>
      <div style={{ margin: "10px 0px" }}>
        <Epic>{task.epic}</Epic>
        <Chip
          size="small"
          icon={<AccessTimeRoundedIcon />}
          label={format(new Date(task.due), "dd-MM")}
        />
      </div>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <div
          style={{ fontSize: "13px", display: "flex", alignItems: "center" }}
        >
          <div style={{ marginRight: "5px", display: "inline-block" }}>
            {IssueIcon(task.type)}
          </div>
          {task.code}
        </div>
        <div style={{ display: "inline-flex", alignItems: "flex-end" }}>
          <Chip size="small" label={task.point} />
          <Avatar
            src="X"
            sx={{ width: 32, height: 32, ml: 1 }}
            alt={task.assignee}
          />
        </div>
      </div>
    </Paper>
  );
};

export default Card;
