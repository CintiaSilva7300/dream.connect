import * as React from "react";
import PropTypes from "prop-types";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import Tabs from "@mui/material/Tabs";
import AppBar from "@mui/material/AppBar";
import FeedIcon from "@mui/icons-material/Feed";
import { useTheme } from "@mui/material/styles";
import GradeIcon from "@mui/icons-material/Grade";
import Typography from "@mui/material/Typography";

import styles from "./style";
import PublicationLiked from "../publicationLiked";
import Publication from "./../publication/index";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`action-tabpanel-${index}`}
      aria-labelledby={`action-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </Typography>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `action-tab-${index}`,
    "aria-controls": `action-tabpanel-${index}
    `,
  };
}

export default function FloatingActionButton() {
  const theme = useTheme();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };

  return (
    <div style={styles.container}>
      <Box sx={styles.box}>
        <AppBar position="static" color="default" style={styles.appBar}>
          <Tabs
            style={{ width: "30%" }}
            value={value}
            onChange={handleChange}
            textColor="primary"
            variant="fullWidth"
            aria-label="action tabs example"
          >
            <Tab label={<FeedIcon />} {...a11yProps(0)} />
            <Tab label={<GradeIcon />} {...a11yProps(0)} />
            {/* <Tab style={{ color: BLUE }} label="SEILA" {...a11yProps(2)} /> */}
          </Tabs>
        </AppBar>
        <div
          axis={theme.direction === "rtl" ? "x-reverse" : "x"}
          index={value}
          onChangeIndex={handleChangeIndex}
        >
          <TabPanel value={value} index={0} dir={theme.direction}>
            <Publication />
          </TabPanel>
          <TabPanel value={value} index={1} dir={theme.direction}>
            <PublicationLiked />
          </TabPanel>
          <TabPanel value={value} index={2} dir={theme.direction}>
            Item Three
          </TabPanel>
        </div>
      </Box>
    </div>
  );
}
