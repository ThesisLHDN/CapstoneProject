import React from "react";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";
import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp";
import MuiAccordion from "@mui/material/Accordion";
import MuiAccordionSummary from "@mui/material/AccordionSummary";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import ProjectTable from "src/components/project-list/ProjectTable";
import Avatar from "@mui/material/Avatar";
import AvatarList from "./AvatarList";

const StyledTypo = styled(Typography)({
  color: "green",
  fontWeight: "bold",
});

const GradButton = styled(Button)({
  my: 1,
  backgroundImage:
    "radial-gradient(farthest-corner at -100% 200%, #ffff00, #008000)",
  transition: "background 2s",
  "&:hover": {
    backgroundImage:
      "radial-gradient(farthest-corner at -100% 200%, #ffff22, #228822)",
  },
});

const Accordion = styled((props) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  //   border: `1px solid ${theme.palette.divider}`,
  "&:not(:last-child)": {
    borderBottom: 0,
  },
  "&:before": {
    display: "none",
  },
}));

// const SettingPart = styled(Typography);

const AccordionSummary = styled((props) => (
  <MuiAccordionSummary
    expandIcon={
      <ArrowForwardIosSharpIcon sx={{ fontSize: "0.9rem", color: "green" }} />
    }
    {...props}
  />
))(({ theme }) => ({
  backgroundColor: "rgba(0, 0, 0, 0)",
  // theme.palette.mode === "dark"
  //   ? "rgba(255, 255, 255, .05)"
  //   : "rgba(0, 0, 0, .03)",
  flexDirection: "row-reverse",
  "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
    transform: "rotate(90deg)",
  },
  "& .MuiAccordionSummary-content": {
    marginLeft: theme.spacing(1),
  },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  //   borderTop: "1px solid rgba(0, 0, 0, .125)",
}));

function WorkspaceSetting() {
  const [expanded, setExpanded] = React.useState("panel1");

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };
  return (
    <div style={{ textAlign: "left" }}>
      <Typography variant="h5" sx={{ color: "green", fontWeight: 700 }}>
        Workspace Setting
      </Typography>
      <Box sx={{ my: 2 }}>
        <Accordion
          expanded={expanded === "panel1"}
          onChange={handleChange("panel1")}
        >
          <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
            <StyledTypo>Workspace details</StyledTypo>
          </AccordionSummary>
          <AccordionDetails>
            <Grid container spacing={2}>
              <Grid item xs={2}>
                <Typography sx={{ my: 2 }}>Rename</Typography>
              </Grid>
              <Grid item xs={5}>
                <TextField
                  value="HaiDang's Workspace"
                  size="small"
                  sx={{
                    width: "100%",
                    border: "0px",
                    backgroundColor: "lightgray",
                  }}
                ></TextField>
              </Grid>
              <Grid item xs={5}>
                <GradButton variant="contained" size="medium">
                  Save
                </GradButton>
              </Grid>
            </Grid>

            <Typography sx={{ my: 2 }}>Workspace description</Typography>
            <TextField
              sx={{ width: "100%" }}
              multiline
              rows={4}
              value="Lorem ipsum dolor sit amet, consectetur adipiscing elit. In quis lacus sit amet arcu imperdiet suscipit. Quisque ultrices lorem in enim ultrices hendrerit. Cras accumsan, augue id rhoncus fringilla, odio ipsum fringilla mauris, eu molestie dolor libero sit amet odio. Ut vestibulum viverra eros, quis laoreet nibh varius sed. In hac habitasse platea dictumst. Aliquam turpis libero, aliquam vitae ipsum a, pellentesque tempus massa. Suspendisse eu tellus sapien. Donec egestas eu mi consectetur porta. Vivamus mattis magna quis est porttitor egestas. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Sed mollis aliquet urna, at finibus ante vulputate non. Vestibulum facilisis pharetra est, sit amet faucibus urna consequat id."
            ></TextField>
          </AccordionDetails>
        </Accordion>
        <Accordion
          expanded={expanded === "panel2"}
          onChange={handleChange("panel2")}
        >
          <AccordionSummary aria-controls="panel2d-content" id="panel2d-header">
            <StyledTypo>Projects</StyledTypo>{" "}
          </AccordionSummary>
          <AccordionDetails sx={{ position: "relative" }}>
            <GradButton
              sx={{ right: "0px" }}
              variant="contained"
              startIcon={<AddRoundedIcon />}
            >
              Create project
            </GradButton>
            <ProjectTable />
          </AccordionDetails>
        </Accordion>
        <Accordion
          expanded={expanded === "panel3"}
          onChange={handleChange("panel3")}
        >
          <AccordionSummary aria-controls="panel3d-content" id="panel3d-header">
            <StyledTypo>People</StyledTypo>
          </AccordionSummary>
          <AccordionDetails>
            <Grid container spacing={2}>
              <Grid item xs={2}>
                <Typography sx={{ my: 2 }}>Administrator</Typography>
              </Grid>
              <Grid item xs={10} sx={{ display: "flex", alignItems: "center" }}>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <Avatar
                    alt="Remy Sharp"
                    src="https://www.google.com/url?sa=i&url=https%3A%2F%2Fpixabay.com%2Fimages%2Fsearch%2Fuser%2F&psig=AOvVaw0e1RIJA45TGu2j_9Fe_yc0&ust=1669364184669000&source=images&cd=vfe&ved=0CBAQjRxqFwoTCLDouaywxvsCFQAAAAAdAAAAABAE"
                  />
                  <Typography sx={{ mx: 2 }}>
                    {" "}
                    Nguyễn Trường Hải Đăng
                  </Typography>
                </div>
              </Grid>
            </Grid>
            <Typography sx={{ my: 2 }}>Members</Typography>
            <AvatarList />
          </AccordionDetails>
        </Accordion>
        <Accordion
          expanded={expanded === "panel4"}
          onChange={handleChange("panel4")}
        >
          <AccordionSummary aria-controls="panel3d-content" id="panel3d-header">
            <StyledTypo>Dashboard</StyledTypo>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque
              pellentesque justo quam, eget mattis nisl pellentesque sed. In
              odio urna, laoreet mattis tempor quis, consectetur ut massa.
              Phasellus pharetra finibus tortor, ut dapibus nunc pretium in.
              Pellentesque pellentesque et tellus vel sollicitudin. Pellentesque
              fermentum mattis nunc a condimentum. Suspendisse potenti. Nulla
              vitae diam nec turpis pharetra fermentum sodales interdum dui.
            </Typography>
          </AccordionDetails>
        </Accordion>
      </Box>
    </div>
  );
}

export default WorkspaceSetting;
