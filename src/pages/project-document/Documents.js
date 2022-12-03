import React from 'react'
import { Typography, Box, Button, Grid, Breadcrumbs, Link } from '@mui/material'
import SearchBar from 'src/components/search'
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined'
import SortRoundedIcon from "@mui/icons-material/SortRounded"

function Document() {
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
              Documents
            </Typography>
          </Breadcrumbs>
        </Grid>
      </Grid>

      {/* <Typography variant="h5" sx={{ color: "green", fontWeight: 700, fontFamily: "Open Sans, sans-serif" }}>
        Documents
      </Typography> */}

      <Box sx={{ display: "flex", gap: 1, gridTemplateColumns: "repeat(4, 1fr)" }}>
        <SearchBar sx={{width:"210px"}}/>
        <Button
          variant="text"
          startIcon={<SortRoundedIcon />}
          sx={{ color: "#181818", textTransform: "none", fontFamily: "Open Sans, sans-serif" }}
        >
          Sort
        </Button>
        <Button
          variant="text"
          startIcon={<VisibilityOutlinedIcon />}
          sx={{ color: "#181818", textTransform: "none", fontFamily: "Open Sans, sans-serif" }}
        >
          View
        </Button>
      </Box>
    </div>
  )
}

export default Document