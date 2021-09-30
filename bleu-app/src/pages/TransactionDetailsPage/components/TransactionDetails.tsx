import React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
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
  maxHeight: '2400px',
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

const indexButtonBox = {
};

const indexButton: Readonly<any> = {
  bgcolor: '#e7f5fa',
  color: '#0077ce',
  '&:hover, &:active': {
    bgcolor: '#0077ce',
    color: '#fefefe',
  },
  fontSize: '0.65rem',
  minWidth: '0px',
  margin: '0px 0px 0px 5px',
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

export default function TransactionDetails() {
  const [value, setValue] = useRecoilState(atom({
    key: 'value',
    default: 0,
  }));
  const handleChange = (event: any, newValue: any) => {
    setValue(newValue);
  };

  return (
    <Card sx={root}>
      <Box sx={cardHeader}>
        <Box sx={cardHeaderC1}>
          <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
            <Tab label="Overview" {...a11yProps(0)} />
            <Tab label="Internal Txns" {...a11yProps(1)} />
            <Tab label="Logs" {...a11yProps(2)} />
            <Tab label="Access List" {...a11yProps(3)} />
            <Tab label="State" {...a11yProps(4)} />
            <Tab label="Comments" {...a11yProps(5)} />
          </Tabs>
        </Box>
      </Box>
    </Card>
  );
}
