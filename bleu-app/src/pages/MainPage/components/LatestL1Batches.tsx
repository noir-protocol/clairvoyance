import React from 'react';
import InfoCard from '../../../components/InfoCard';
import {timeSince} from '../../../utils/time';
import {api} from '../../../utils/urlResolver';
import {
  Avatar,
  Box,
  Grid,
  Link,
  Table,
  TableBody,
  TableCell,
  TableRow,
  Typography,
} from '@mui/material';
import {Loadable, selector, useRecoilValueLoadable} from 'recoil';
import {L2BlockLink, L1TransactionLink} from '../../../components/Link';

interface BatchState {
  batch_index: string;
  l1_tx_hash: string;
  batch_size: string;
  batch_timestamp: string;
};

const latestL1BatchesState = selector({
  key: 'LatestL1Batches',
  get: async () => {
    const res = await fetch(api('/tx-batch/latest'));
    const batches = await res.json();
    return batches;
  },
});

const tableRow: Readonly<any> = {
  py: '10px',
  '&: nth-of-type(1)': {
    pt: 0,
  },
};

const tableCell: Readonly<any> = {
  px: '4px',
  py: 'inherit',
};

const tableCellLast: Readonly<any> = {
  ...tableCell,
  borderBottom: 'none',
  pb: '0px',
};

const content: Readonly<any> = {
  display: 'flex',
  flexDirection: 'column',
};

function LatestL1Batches() {
  const latestL1Batches: Loadable<BatchState[]> = useRecoilValueLoadable(latestL1BatchesState);
  return (
    <InfoCard title='Latest L1 Batches' buttonProps={{label: 'View all Transaction batches',href:'/blocks'}} sx={{height:'500px'}}>
      <Table>
        <TableBody>
          {
            latestL1Batches.state === 'hasValue'
            ? latestL1Batches.contents.map((row, index) => (
              <TableRow key={index} sx={tableRow}>
                <TableCell sx={(index === latestL1Batches.contents.length - 1) ? tableCellLast : tableCell}>
                  <Grid container spacing={1}>
                    <Grid item lg={6} md={6} sm={12} xs={12} sx={content}>
                      <Box sx={{display:'flex', alignItems:'center',gap:'12px'}}>
                        <Avatar variant='rounded'>Ba</Avatar>
                        <Grid container>
                          <Grid item lg={12} md={12} sm={2} xs={2}>
                            <L2BlockLink blockNumber={row.batch_index} />
                          </Grid>
                          <Grid item lg={12} md={12} sm={10} xs={10}>
                            <Typography variant='body2' color='text.secondary'>{timeSince(row.batch_timestamp)}</Typography>
                          </Grid>
                        </Grid>
                      </Box>
                    </Grid>
                    <Grid item lg={6} md={6} sm={12} xs={12} sx={content}>
                      <Box sx={{display:'flex', p:'0px', gap: '8px'}}>
                        <Typography>Hash</Typography>
                        <L1TransactionLink sx={{width:0,flexGrow:1,flexBasis:0}} hash={row.l1_tx_hash} />
                      </Box>
                      <Link variant='body2' underline='none' href={`/txs?blockNum=${row.batch_index}`}>{row.batch_size} txns</Link>
                    </Grid>
                  </Grid>
                </TableCell>
              </TableRow>
            ))
            : null
          }
        </TableBody>
      </Table>
    </InfoCard>
  );
}

export default LatestL1Batches;