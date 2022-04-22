import * as React from "react";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";

const ButtonComponent = ({ label, type, onClick }) => {
  return (
    <Stack spacing={2} direction="row">
      <Button variant="contained" type={type} onClick={onClick}>
        {label}
      </Button>
    </Stack>
  );
};

export default ButtonComponent;
