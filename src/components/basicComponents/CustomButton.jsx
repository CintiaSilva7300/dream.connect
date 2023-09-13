import React from "react";
import Button from "@mui/material/Button";

import styles from "./styles";

const CustomButton = ({ label, id, ...props }) => {
  return (
    <Button
      variant="contained"
      style={styles.mybutton}
      id={id}
      type="text"
      {...props}
    ></Button>
  );
};

export default CustomButton;
