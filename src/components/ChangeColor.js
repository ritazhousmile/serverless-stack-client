import React, { useState } from "react";
import { FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import { CirclePicker } from 'react-color';
import "./ChangeColor.css";

export default function ChangeColor ({
  handler,
  noteColor = noteColor,
  ...props
}){
  return (
    <FormGroup controlId="noteColor">
      <ControlLabel>Select Note Color</ControlLabel>
      <FormControl
        value={noteColor}
        type="hidden"
      />
      <CirclePicker
        color={noteColor}
        onChangeComplete={handler}
       />
    </FormGroup>
  )
}
