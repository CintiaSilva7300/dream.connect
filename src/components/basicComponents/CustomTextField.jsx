import React from "react";
import TextField from "@mui/material/TextField";

import styles from "./styles";

const CustomTextField = ({ label, id, type, ...props }) => {
  return (
    <TextField
      label={label}
      variant="outlined"
      autocomplete="off"
      type={type}
      id={id}
      style={styles.mytextField}
      {...props}
    />
  );
};

export default CustomTextField;
