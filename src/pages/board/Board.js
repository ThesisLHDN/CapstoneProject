import React from "react";
import "src/App.scss";
import Typography from "@mui/material/Typography";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
// import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";

import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import AccessTimeRoundedIcon from "@mui/icons-material/AccessTimeRounded";

import Scrum from "src/components/scrum";

function handleClick(event) {
  event.preventDefault();
  console.info("You clicked a breadcrumb.");
}

const GrayButton = styled(Button)({
  backgroundColor: "#cdcdcd",
  color: "black",
  borderRadius: 3,
  height: 32,
  "&:hover": {
    backgroundColor: "#ddd",
  },
});
function Board() {
  return (
    // <Scrum />
    <div style={{ textAlign: "left" }}>
      <Grid container spacing={2}>
        <Grid item xs={5}>
          <Breadcrumbs separator="›" aria-label="breadcrumb" sx={{ mb: 2 }}>
            [
            <Link
              underline="hover"
              key="1"
              color="inherit"
              href="/"
              onClick={handleClick}
            >
              Dang's Workspace
            </Link>
            ,
            <Link
              underline="hover"
              key="2"
              color="inherit"
              href="/material-ui/getting-started/installation/"
              onClick={handleClick}
            >
              First Scrum Project
            </Link>
            ,
            <Typography key="3" color="text.primary">
              Board
            </Typography>
            , ]
          </Breadcrumbs>
        </Grid>
        <Grid
          item
          xs={7}
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",
          }}
        >
          <Typography sx={{ mx: 1 }}>
            <AccessTimeRoundedIcon />
            10 days remaining
          </Typography>
          <GrayButton variant="contained">Complete sprint</GrayButton>
          <GrayButton
            variant="contained"
            sx={{ mx: 1, width: "32px !important", minWidth: 32 }}
          >
            <MoreHorizIcon />
          </GrayButton>
        </Grid>
      </Grid>
      <Typography variant="h5" sx={{ color: "green", fontWeight: 700 }}>
        Board
      </Typography>
      <Scrum />
    </div>
  );
}

export default Board;
