import React, { useState, useEffect } from "react";

import "../css/XoBox.css";

export default function XoBox(props) {

  const [clickable, setClickable] = useState(true);
  const [state, setState] = useState('')

  useEffect(() => {
    if (props.win.length !== 0) {
      setClickable(false);
    }
  }, [props.win])


  const setValue = () => {

    if (clickable) {
      props.provideValue(props.id, props.xo)
      setState(props.xo)
      setClickable(false);
    }
  }

  return (
    <>
      <div className="box" onClick={setValue}>
        <SelectImg xo={state} state={state} />
      </div>
    </>
  );
}

const SelectImg = ({ xo, state }) => {

  if (state.length !== 0) {
    if (xo === "x") {
      return <img src="./images/x-img.png" alt="....x" width={"100%"} />;
    } else {
      return <img src="./images/o-img.png" alt="....o" width={"100%"} />;
    }
  }
  else {
    return <div >{xo}</div>
  }
};
