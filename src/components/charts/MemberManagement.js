import React, {useState} from 'react';
import {
  Box,
  Button,
  ClickAwayListener,
  MenuItem,
  MenuList,
  Popper,
  Avatar,
} from '@mui/material';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import KeyboardArrowDownRoundedIcon from '@mui/icons-material/KeyboardArrowDownRounded';

function MemberManagement({data, scope, setScope}) {
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
        <p className="text-left text-tg-text-color font-bold text-base mt-8 mx-6">
          Member Performance
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
        Manage workload and effort of each member through issues and points.
      </p>

      <div
        className={`flex mt-6 ${
          data.length !== 0 ? 'xl:mb-8 2xl:mb-4' : 'xl:mb-5 2xl:mb-80 2xl:mt-10'
        } overflow-auto ml-6`}
      >
        {data.map((member) => {
          return (
            <div
              className="xl:mb-2 2xl:mb-8 2xl:mt-2 3xl:mt-7 3xl:mb-16"
              key={member.id}
              style={{
                border: '1px solid gray',
                borderRadius: 8,
                minWidth: 190,
                marginRight: 8,
              }}
            >
              <div className="flex xl:mt-4 xl:ml-3 3xl:mt-6">
                <Avatar
                  src={member.photoURL ? member.photoURL : '/'}
                  sx={{
                    width: 32,
                    height: 32,
                    backgroundColor: '#8993A4',
                    marginRight: 1,
                    borderRadius: 1,
                  }}
                  alt={member.username}
                />
                <span className="flex text-sm mt-1.5 pr-3">
                  {member.username}
                </span>
              </div>

              <div className={`flex justify-between ml-2 mr-3 mt-5`}>
                <div className="flex">
                  <FiberManualRecordIcon
                    sx={{
                      color: 'gray',
                      width: 12,
                      height: 12,
                      marginTop: 0.2,
                    }}
                  />
                  <p className="text-xs ml-1">Total issues</p>
                </div>
                <p className="text-xs">
                  {member['To do'][0] +
                    member['In progress'][0] +
                    member['Testing'][0] +
                    member['Done'][0]}{' '}
                  (
                  {member['To do'][1] +
                    member['In progress'][1] +
                    member['Testing'][1] +
                    member['Done'][1]}{' '}
                  points)
                </p>
              </div>

              <div className="flex justify-between ml-2 mr-3 xl:mt-3 3xl:mt-4">
                <div className="flex">
                  <FiberManualRecordIcon
                    sx={{
                      color: '#ff0000',
                      width: 12,
                      height: 12,
                      marginTop: 0.2,
                    }}
                  />
                  <p className="text-xs ml-1">To Do</p>
                </div>
                <p className="text-xs">
                  {member['To do'][0]} ({member['To do'][1]} points)
                </p>
              </div>

              <div className="flex justify-between ml-2 mr-3 xl:mt-3 3xl:mt-4">
                <div className="flex">
                  <FiberManualRecordIcon
                    sx={{
                      color: '#006BA7',
                      width: 12,
                      height: 12,
                      marginTop: 0.2,
                    }}
                  />
                  <p className="text-xs ml-1">In progress</p>
                </div>
                <p className="text-xs">
                  {member['In progress'][0]} ({member['In progress'][0]} points)
                </p>
              </div>

              <div className="flex justify-between ml-2 mr-3 xl:mt-3 3xl:mt-4">
                <div className="flex">
                  <FiberManualRecordIcon
                    sx={{
                      color: '#EC8E00',
                      width: 12,
                      height: 12,
                      marginTop: 0.2,
                    }}
                  />
                  <p className="text-xs ml-1">Testing</p>
                </div>
                <p className="text-xs">
                  {member['Testing'][0]} ({member['Testing'][1]} points)
                </p>
              </div>

              <div className="flex justify-between ml-2 mr-3 xl:mt-3 3xl:mt-4">
                <div className="flex">
                  <FiberManualRecordIcon
                    sx={{
                      color: '#009606',
                      width: 12,
                      height: 12,
                      marginTop: 0.2,
                    }}
                  />
                  <p className="text-xs ml-1">Done</p>
                </div>
                <p className="text-xs">
                  {member['Done'][0]} ({member['Done'][1]} points)
                </p>
              </div>

              <div className="flex mx-2.5 xl:mt-5 3xl:mt-7">
                <p
                  className="h-1.5 border-0"
                  style={{
                    width: `${
                      (member['To do'][0] * 100) /
                      (member['To do'][0] +
                        member['In progress'][0] +
                        member['Testing'][0] +
                        member['Done'][0])
                    }%`,
                    backgroundColor: '#e83a31',
                  }}
                ></p>
                <p
                  className="h-1.5 border-0"
                  style={{
                    width: `${
                      (member['In progress'][0] * 100) /
                      (member['To do'][0] +
                        member['In progress'][0] +
                        member['Testing'][0] +
                        member['Done'][0])
                    }%`,
                    backgroundColor: '#006BA7',
                  }}
                ></p>
                <p
                  className="h-1.5 border-0"
                  style={{
                    width: `${
                      (member['Testing'][0] * 100) /
                      (member['To do'][0] +
                        member['In progress'][0] +
                        member['Testing'][0] +
                        member['Done'][0])
                    }%`,
                    backgroundColor: '#EC8E00',
                  }}
                ></p>
                <p
                  className="h-1.5 border-0"
                  style={{
                    width: `${
                      (member['Done'][0] * 100) /
                      (member['To do'][0] +
                        member['In progress'][0] +
                        member['Testing'][0] +
                        member['Done'][0])
                    }%`,
                    backgroundColor: '#009606',
                  }}
                ></p>
              </div>

              <div className="flex mx-2 mt-1.5 xl:mb-5 3xl:mb-7 justify-between">
                {member['To do'][0] != 0 && (
                  <p
                    className="text-xs font-bold"
                    style={{color: '#ff4040'}}
                  >{`${Math.round(
                    (member['To do'][0] * 100) /
                      (member['To do'][0] +
                        member['In progress'][0] +
                        member['Testing'][0] +
                        member['Done'][0]),
                  )}%`}</p>
                )}
                {member['In progress'][0] != 0 && (
                  <p
                    className="text-xs font-bold"
                    style={{color: '#006BA7'}}
                  >{`${Math.round(
                    (member['In progress'][0] * 100) /
                      (member['To do'][0] +
                        member['In progress'][0] +
                        member['Testing'][0] +
                        member['Done'][0]),
                  )}%`}</p>
                )}
                {member['Testing'][0] != 0 && (
                  <p
                    className="text-xs font-bold"
                    style={{color: '#ffb300'}}
                  >{`${Math.round(
                    (member['Testing'][0] * 100) /
                      (member['To do'][0] +
                        member['In progress'][0] +
                        member['Testing'][0] +
                        member['Done'][0]),
                  )}%`}</p>
                )}
                {member['Done'][0] != 0 && (
                  <p
                    className="text-xs font-bold"
                    style={{color: '#009606'}}
                  >{`${Math.round(
                    (member['Done'][0] * 100) /
                      (member['To do'][0] +
                        member['In progress'][0] +
                        member['Testing'][0] +
                        member['Done'][0]),
                  )}%`}</p>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default MemberManagement;
