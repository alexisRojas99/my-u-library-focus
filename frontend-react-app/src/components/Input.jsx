import React from "react";
import TextField from "@mui/material/TextField";

const Input = ({ label, register, onChange, type }) => {
  return (
    <TextField
      // id="outlined-basic"
      label={label}
      variant="outlined"
      inputProps={{ ...register }}
      onChange={onChange}
      type={type}
    />
  );
};

export default Input;
