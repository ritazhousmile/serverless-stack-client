import React, { useState } from "react";
import { CirclePicker } from 'react-color';
import "./ChangeColor.css";

export default function ChangeColor (){

  const [noteColor, setNoteColor] = useState('#FFFFFF');

  // useEffect(
  //   () => {
  //     document.body.style.background = noteColor
  //   }
  // )

  function handleColorChangeComplete (color, event) {


    setNoteColor(color.hex)
  }



  return (

      <CirclePicker

      onClick={handleColorChangeComplete}
       />

  )
}
