import React from "react";
import TextField from "@mui/material/TextField";

const Input = ({ label, register, onChange }) => {
  return (
    <TextField
      // id="outlined-basic"
      label={label}
      variant="outlined"
      inputProps={{ ...register }}
      onChange={onChange}
    />
  );
};

export default Input;
