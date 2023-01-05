import React from 'react';
import {
  Paper,
  Typography,
  Button,
  MenuList,
  MenuItem,
  Popper,
  Grow,
  ClickAwayListener,
} from '@mui/material';
import SortRoundedIcon from '@mui/icons-material/SortRounded';
import {color, colorHover} from 'src/style';

const data = {
  status: 'Status',
  assignee: 'Assignee',
  type: 'Type',
  epci: 'Epic',
  priority: 'Priority',
  due: 'Due Date',
  none: 'None',
};

function Sort() {
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef(null);

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen(false);
  };

  function handleListKeyDown(event) {
    if (event.key === 'Tab') {
      event.preventDefault();
      setOpen(false);
    } else if (event.key === 'Escape') {
      setOpen(false);
    }
  }

  // return focus to the button when we transitioned from !open -> open
  const prevOpen = React.useRef(open);
  React.useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }

    prevOpen.current = open;
  }, [open]);

  return (
    <>
      <Button
        ref={anchorRef}
        id="composition-button"
        aria-controls={open ? 'composition-menu' : undefined}
        aria-expanded={open ? 'true' : undefined}
        aria-haspopup="true"
        onClick={handleToggle}
        sx={{textTransform: 'none', color: '#181818'}}
        startIcon={<SortRoundedIcon />}
      >
        Sort
      </Button>
      <Popper
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        placement="bottom-start"
        transition
        disablePortal
        sx={{zIndex: 5}}
      >
        {({TransitionProps, placement}) => (
          <Grow
            {...TransitionProps}
            style={{
              transformOrigin:
                placement === 'bottom-start' ? 'left top' : 'left bottom',
            }}
          >
            <Paper
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                p: 2,
                gap: 1,
              }}
            >
              <Typography sx={{fontWeight: 700, color: color.green03}}>
                Sort
              </Typography>
              <ClickAwayListener onClickAway={handleClose}>
                <MenuList
                  autoFocusItem={open}
                  id="composition-menu"
                  aria-labelledby="composition-button"
                  onKeyDown={handleListKeyDown}
                >
                  {Object.entries(data).map(([key, value]) => (
                    <MenuItem
                      onClick={handleClose}
                      sx={{
                        width: 200,
                        ...(key === 'none' && {
                          fontWeight: 700,
                          textTransform: 'italic',
                        }),
                      }}
                    >
                      {value}
                    </MenuItem>
                  ))}
                </MenuList>
              </ClickAwayListener>
              <Button
                sx={{...colorHover.greenGradBtn}}
                variant="contained"
                onClick={handleToggle}
              >
                Confirm
              </Button>
            </Paper>
          </Grow>
        )}
      </Popper>
    </>
  );
}

export default Sort;
