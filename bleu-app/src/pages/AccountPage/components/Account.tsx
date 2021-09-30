import React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import Typography from '@mui/material/Typography';
import {atom, useRecoilState} from 'recoil';

const data = [
  [1, 2, 3],
  [2, 2, 3],
  [3, 2, 3],
  [4, 2, 3],
  [5, 2, 3],
  [6, 2, 3],
  [7, 2, 3],
  [8, 2, 3],
  [9, 2, 3],
  [10, 2, 3],
  [11, 2, 3],
];

const root = {
};

const cardHeader: Readonly<any> = {
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  height: '50px',
};

const cardHeaderC1: Readonly<any> = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'start',
};

const tab: Readonly<any> = {
  textTransform: 'none',
};

function TabPanel(props: any) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function Account() {
  const [value, setValue] = useRecoilState(atom({
    key: 'value',
    default: 0,
  }));
  const handleChange = (event: any, newValue: any) => {
    setValue(newValue);
  };

  return (
    <Grid container spacing={2}>
      <Grid item lg={6} md={6} sm={12} xs={12}>
        <Card sx={root}>
          <Box sx={cardHeader}>
            <Box sx={cardHeaderC1}>
            </Box>
          </Box>
        </Card>
      </Grid>
      <Grid item lg={6} md={6} sm={12} xs={12}>
        <Card sx={root}>
          <Box sx={cardHeader}>
            <Box sx={cardHeaderC1}>
            </Box>
          </Box>
        </Card>
      </Grid>
      <Grid item lg={12} md={12} sm={12} xs={12}>
        <Card sx={root}>
          <Box sx={cardHeader}>
            <Box sx={cardHeaderC1}>
              <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                <Tab sx={tab} label="Transactions" {...a11yProps(0)} />
                <Tab sx={tab} label="Internal Txns" {...a11yProps(1)} />
                <Tab sx={tab} label="ERC20 Token Txns" {...a11yProps(2)} />
                <Tab sx={tab} label="Loans" {...a11yProps(3)} />
                <Tab sx={tab} label="Analytics" {...a11yProps(4)} />
                <Tab sx={tab} label="Comments" {...a11yProps(5)} />
              </Tabs>
            </Box>
          </Box>
        </Card>
      </Grid>
    </Grid>
  );
}
