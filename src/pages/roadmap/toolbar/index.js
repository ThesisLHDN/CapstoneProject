import React from 'react';
import './Toolbar.css';
import { Radio, RadioGroup, FormControlLabel } from '@mui/material';
import { color } from 'src/style'

function Toolbar(props) {
  const handleZoomChange = (e) => {
    if (props.onZoomChange) {
      props.onZoomChange(e.target.value);
    }
  };
  const zoomRadios = ['Hours', 'Days', 'Months'].map((value) => {
    return (
      <FormControlLabel
        value={value}
        control={<Radio />}
        label={value}
        onChange={handleZoomChange}
      />
    );
  });

  return (
    <div className="tool-bar">
      <b>Zooming: </b>
      <RadioGroup
        row
        aria-labelledby="demo-row-radio-buttons-group-label"
        name="row-radio-buttons-group"
        sx={{
          display: 'inline-block',
          ml: 2,
          '& .MuiButtonBase-root.MuiRadio-root.Mui-checked': { color: `${color.green03} !important` },
        }}
        defaultValue="Days"
      >
        {zoomRadios}
      </RadioGroup>
    </div>
  );
}
export default Toolbar;
