import React, {useEffect} from 'react';
import {useParams} from 'react-router-dom';
import PropTypes from 'prop-types';
import {useRecoilState} from 'recoil';
import {
  Box,
  Divider,
  Tab,
  Tabs,
  Typography,
} from '@mui/material';
import InfoCard from '../../../components/InfoCard';
import Overview from './Overview';
import {options} from './state';

const cardHeaderC1: Readonly<any> = {
  borderBottom: 1,
  borderColor: 'divider',
};

function TabPanel(props: any) {
  const { children, value, index, ...other } = props;

  return (
    <Box
      role='tabpanel'
      hidden={value !== index}
      id={`block-details-tabpanel-${index}`}
      aria-labelledby={`block-details-tab-${index}`}
      {...other}
      sx={{px:'12px', pb:'12px'}}
    >
      {value === index && (
        <React.Fragment>
          {children}
        </React.Fragment>
      )}
    </Box>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index: number) {
  return {
    id: `block-details-tab-${index}`,
    'aria-controls': `block-details-tabpanel-${index}`,
  };
}

const header: Readonly<any> = {
  display: 'flex',
  px: '16px',
  py: '12px',
  gap: '8px',
  flexShrink: 0,
};

function Header(props: any) {
  return (
    <React.Fragment>
      <Box sx={header}>
        <Typography variant='h6'>{props.title}</Typography>
        <Typography variant='h6' color='text.secondary' sx={{fontWeight:'normal'}}>#{props.blockNumber}</Typography>
      </Box>
      <Divider />
    </React.Fragment>
  );
}

function BlockDetails(props: any) {
  const {blockNumber}: any = useParams();
  const [opts, setOpts] = useRecoilState(options);

  useEffect(() => {
    if (opts.blockNumber !== blockNumber) {
      setOpts({
        ...opts,
        blockNumber: blockNumber,
      });
    }
  });

  const handleChange = (event: any, newValue: any) => {
    setOpts({
      ...opts,
      index: newValue,
    });
  };

  return (
    <InfoCard head={<Header title='Transaction Batches' blockNumber={blockNumber} />} contentProps={{m:0}}>
      <Box sx={cardHeaderC1}>
        <Tabs value={opts.index} onChange={handleChange} aria-label='block-details-tabs'>
          <Tab label='Overview' {...a11yProps(0)} />
        </Tabs>
      </Box>
      <TabPanel value={opts.index} index={0}>
        <Overview />
      </TabPanel>
    </InfoCard>
  );
}

export default BlockDetails;