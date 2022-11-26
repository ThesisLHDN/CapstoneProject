import React from "react";
import logo from "src/assets/images/logo.png";
import Box from "@mui/material/Box";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
// import Stack from "@mui/material/Stack";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import PersonAddOutlinedIcon from "@mui/icons-material/PersonAddOutlined";

import Avatar from "@mui/material/Avatar";

import SearchBar from "src/components/search";
import { Link } from "react-router-dom";
// import BottomNavigation from "@mui/material/BottomNavigation";
// import BottomNavigationAction from "@mui/material/BottomNavigationAction";

// function LinkTab(props) {
//   return (
//     <Tab
//       component="a"
//       onClick={(event) => {
//         event.preventDefault();
//       }}
//       {...props}
//     />
//   );
// }

export default function Header() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box
      sx={{
        backgroundColor: "white",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        boxShadow: "2px 2px 5px rgba(0, 0, 0, 0.2)",
        padding: "0px 20px",
      }}
    >
      <Link to="/">
        <img src={logo} width="150" alt="Logo" />
      </Link>
      <Tabs
        value={value}
        onChange={handleChange}
        aria-label="nav tabs example"
        sx={{
          mx: 2,
          "& .MuiTab-root.Mui-selected": { color: "green", fontWeight: "bold" },
          "& .MuiTabs-indicator": {
            backgroundColor: "green",
            height: "3px",
          },
        }}
      >
        <Tab label="Home" to="/" component={Link} />
        {/* <Tab label="Dashboard" to="/dashboard" component={Link} /> */}
        {/* <Tab label="Project Setting" to="/project-setting" component={Link} /> */}
        <Tab label="Board" to="/board" component={Link} />
        <Tab label="Workspace Setting" to="/workspace-setting" component={Link} />
      </Tabs>

      <SearchBar value={value}></SearchBar>
      <Button
        variant="contained"
        sx={{
          backgroundImage:
            "radial-gradient(farthest-corner at -100% 200%, #ffff00, #008000)",
          transition: "background 2s",
          "&:hover": {
            backgroundImage:
              "radial-gradient(farthest-corner at -100% 200%, #ffff22, #228822)",
          },
        }}
        startIcon={<PersonAddOutlinedIcon />}
      >
        Add member
      </Button>
      <IconButton
        color="primary"
        aria-label="no notification"
        sx={{ color: "green" }}
      >
        <NotificationsNoneIcon />
      </IconButton>
      <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
      {/* <img
        src="https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909__340.png"
        width="20px"
        alt="avatar"
      >
        {" "}
      </img> */}
    </Box>
  );
}

// return (
//   <Box
//     sx={{
//       backgroundColor: "white",
//       height: 60,
//       display: "flex",
//       alignItems: "center",
//       boxShadow: "2px 2px 5px rgba(0, 0, 0, 0.2)",
//       padding: "10px",
//     }}
//   >
//     <img src={logo} width="150" alt="Logo" />
//     {/* <Box sx={{ width: 500 }}>
//       <BottomNavigation
//         showLabels
//         value={value}
//         onChange={(event, newValue) => {
//           setValue(newValue);
//         }}
//       >
//         <BottomNavigationAction label="Your works" />
//         <BottomNavigationAction label="Projects" />
//       </BottomNavigation>
//     </Box>
//     <nav>
//       <Link to="/">Home Page</Link>
//       <Link to="/project-setting">Project setting Page</Link>
//       <Link to="/dashboard">Dashboard</Link>
//     </nav> */}
//   </Box>
// );
// }

// export default Header;
