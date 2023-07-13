import * as React from 'react';
import PropTypes from 'prop-types';
import { useTheme } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';

import Publication from './../publication/index';
import Box from '@mui/material/Box';

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
    'aria-controls': `action-tabpanel-${index}
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
    <div
      style={{
        width: '100%',
        display: 'flex',
      }}
    >
      <Box
        sx={{
          bgcolor: 'background.paper',
          width: '100%',
          position: 'absolute',
          minHeight: 200,
        }}
      >
        <AppBar
          position="static"
          color="default"
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Tabs
            style={{ width: '30%' }}
            value={value}
            onChange={handleChange}
            textColor="primary"
            variant="fullWidth"
            aria-label="action tabs example"
          >
            <Tab style={{ color: '#037199' }} label="Feed" {...a11yProps(0)} />
            <Tab
              style={{ color: '#037199' }}
              label="Item Two"
              {...a11yProps(1)}
            />
            <Tab style={{ color: '#037199' }} label="SEILA" {...a11yProps(2)} />
          </Tabs>
        </AppBar>
        <div
          axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
          index={value}
          onChangeIndex={handleChangeIndex}
        >
          <TabPanel value={value} index={0} dir={theme.direction}>
            <Publication />
          </TabPanel>
          <TabPanel value={value} index={1} dir={theme.direction}>
            Item Two
          </TabPanel>
          <TabPanel value={value} index={2} dir={theme.direction}>
            Item Three
          </TabPanel>
        </div>
      </Box>
    </div>
  );
}
