import React, {Component} from 'react';
import './Toolbar.css';
import {Radio, RadioGroup, FormControlLabel} from '@mui/material';

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
        sx={{display: 'inline-block', ml: 2}}
      >
        {zoomRadios}
      </RadioGroup>
    </div>
  );
}
export default Toolbar;
