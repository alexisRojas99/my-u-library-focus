import React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

const SelectBasic = ({ ROLES, Labelname, register }) => {
  const [role, setRoles] = React.useState("");

  const handleChange = (event) => {
    setRoles(event.target.value);
  };

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">{Labelname}</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={role}
          label="role"
          onChange={handleChange}
          inputProps={{ ...register }}
        >
          {ROLES.map((item, i) => {
            return (
              <MenuItem key={i} value={i + 1}>
                {item}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
    </Box>
  );
};

export default SelectBasic;
