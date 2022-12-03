import React from 'react'
import { Typography, Box, Button, Grid, Breadcrumbs, Link, TextField } from '@mui/material'
import { styled } from "@mui/material/styles"
import SortRoundedIcon from "@mui/icons-material/SortRounded"

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

function Dashboard() {
  return (
    <div>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <Breadcrumbs separator="›" aria-label="breadcrumb" sx={{ mb: 2 }}>
            <Link
              underline="hover"
              key="1"
              color="inherit"
              href="/"
              onClick={() => {}}
              sx = {{ fontFamily: "Open Sans, sans-serif" }}
            >
              Dang's Workspace
            </Link>
            <Link
              underline="hover"
              key="2"
              color="inherit"
              href="/backlog"
              onClick={() => {}}
              sx = {{ fontFamily: "Open Sans, sans-serif" }}
            >
              First Scrum Project
            </Link>
            <Typography key="3" color="text.primary" sx = {{ fontFamily: "Open Sans, sans-serif" }}>
              Dashboard
            </Typography>
          </Breadcrumbs>
        </Grid>
      </Grid>

      <Typography variant="h5" sx={{ color: "green", fontWeight: 700, fontFamily: "Open Sans, sans-serif" }}>
        Dashboard
      </Typography>
    </div>
  )
}

export default Dashboard