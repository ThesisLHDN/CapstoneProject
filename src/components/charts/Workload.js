import React, {useState} from 'react';
import {Pie} from 'react-chartjs-2';
import {Chart as ChartJS} from 'chart.js/auto';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import KeyboardArrowDownRoundedIcon from '@mui/icons-material/KeyboardArrowDownRounded';
import {
  Box,
  Button,
  ClickAwayListener,
  MenuItem,
  MenuList,
  Popper,
} from '@mui/material';

function Workload({chartData, scope, setScope}) {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleChange = (event, element) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
    setScope(element);
  };

  const handleClick = (event) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popper' : undefined;

  return (
    <div style={{border: '1px solid #787878', borderRadius: 16}}>
      <div className="flex justify-between">
        <p className="text-left text-tg-text-color font-bold text-base mt-8 ml-6">
          Workload
        </p>
        <div>
          <SettingsOutlinedIcon sx={{marginTop: '34px'}} />
          <Button
            style={{
              textTransform: 'none',
              height: 20,
              width: 'fit-content',
              backgroundColor: '#fff',
              marginTop: '34px',
              marginRight: '24px',
              color: 'black',
              fontWeight: 600,
              fontSize: 14,
            }}
            onClick={handleClick}
          >
            {scope}
            <KeyboardArrowDownRoundedIcon />
          </Button>
        </div>

        <Popper id={id} open={open} anchorEl={anchorEl} sx={{zIndex: 5}}>
          <ClickAwayListener onClickAway={handleClick}>
            <Box
              sx={{
                backgroundColor: 'white',
                borderRadius: 1,
                right: -45,
                marginTop: '5px',
                border: 'solid 1px #ECEDF0',
                boxShadow: '2px 2px 5px #00000020',
                display: 'flex',
                flexDirection: 'column',
                position: 'absolute',
                width: 90,
              }}
            >
              <MenuList sx={{px: 0, width: '100%'}}>
                {['Sprint', 'Project'].map((element) => {
                  return (
                    <MenuItem
                      key={element}
                      sx={{
                        py: 1,
                        fontSize: 14,
                        fontWeight: 600,
                      }}
                      onClick={(e) => handleChange(e, element)}
                    >
                      {element}
                    </MenuItem>
                  );
                })}
              </MenuList>
            </Box>
          </ClickAwayListener>
        </Popper>
      </div>
      <p className="text-sm italic ml-6 mt-4">
        Track and manage the workload based on the number of issues by status.
      </p>
      <div
        className="chart-container"
        style={{
          width: '72%',
          marginLeft: '10%',
          marginTop: -30,
          marginBottom: -40,
        }}
      >
        <Pie
          data={chartData}
          options={{
            plugins: {
              legend: {
                display: true,
                position: 'right',
                labels: {
                  padding: 30,
                },
              },
            },
          }}
        />
      </div>
    </div>
  );
}
export default Workload;
