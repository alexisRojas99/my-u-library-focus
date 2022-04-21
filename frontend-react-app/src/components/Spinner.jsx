import React from "react";
import style from "./css/Spinner.module.css";

const Spinner = ({ fatherClassName, childrenClassName }) => {
  return (
    <div className={style.containerSpinner + " " + fatherClassName}>
      <div className={style.spinner + " " + childrenClassName}></div>
    </div>
  );
};

export default Spinner;
