import React from "react";
import TextField from "@mui/material/TextField";

const Input = ({ label, register }) => {
  return (
    <TextField
      // id="outlined-basic"
      label={label}
      variant="outlined"
      inputProps={{ ...register }}
    />
  );
};

export default Input;
