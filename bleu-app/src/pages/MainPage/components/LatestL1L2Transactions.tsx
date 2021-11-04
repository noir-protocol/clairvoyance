import React from 'react';
import InfoCard from '../../../components/InfoCard';
import {
  Avatar,
  Box,
  Table,
  TableBody,
  TableCell,
  TableRow,
  Typography,
} from '@mui/material';
import {Loadable, selector, useRecoilValueLoadable} from 'recoil';
import {L1BlockLink, L1TransactionLink, L2TransactionLink} from '../../../components/Link';
import {api} from '../../../utils/urlResolver';

interface L1L2Transaction {
  l1_block_number: string;
  l1_tx_hash: string;
  l2_tx_hash: string;
}

const latestL1L2TransactionsState = selector({
  key: 'LatestL1L2Transactions',
  get: async () => {
    const res = await fetch(api('/tx/l1tol2/latest'));
    return await res.json();
  },
});

const tableRow: Readonly<any> = {
  py: '10px',
  '&: nth-of-type(1)': {
    pt: 0,
  },
};

const tableCell: Readonly<any> = {
  px: '6px',
  py: 'inherit',
};

const tableCellLast: Readonly<any> = {
  ...tableCell,
  borderBottom: 'none',
  pb: '0px',
};

function LatestL1L2Transactions() {
  const latestL1L2Transactions: Loadable<L1L2Transaction[]> = useRecoilValueLoadable(latestL1L2TransactionsState);
  return (
    <InfoCard title='Latest L1→L2 Transactions' buttonProps={{label:'View all L1→L2 transactions',href:'/l1l2txs'}} sx={{height:'500px'}}>
      <Table>
        <TableBody>
          {
            latestL1L2Transactions.state === 'hasValue'
              ? latestL1L2Transactions.contents.map((row, index) => (
                <TableRow key={index} sx={tableRow}>
                  <TableCell sx={(index === latestL1L2Transactions.contents.length - 1) ? tableCellLast : tableCell}>
                    <Box sx={{display:'flex',alignItems:'center',gap:'12px',width:'100%'}}>
                      <Avatar>Tx</Avatar>
                      <Box sx={{flexGrow:1,flexBasis:0,width:0}}>
                        <Box sx={{display:'flex',gap:'4px'}}>
                          <Typography>Block#</Typography>
                          <L1BlockLink blockNumber={row.l1_block_number} />
                        </Box>
                        <Box sx={{display:'flex'}}>
                          <Box sx={{display:'flex',flexGrow:1, gap:'8px'}}>
                            <Typography>L1 Tx#</Typography>
                            <L1TransactionLink sx={{width:0,flexGrow:1,flexBasis:0}} hash={row.l1_tx_hash} />
                          </Box>
                          <Box sx={{display:'flex',flexGrow:1, gap:'8px'}}>
                            <Typography>L2 Tx#</Typography>
                            <L2TransactionLink sx={{width:0,flexGrow:1,flexBasis:0}} hash={row.l2_tx_hash} />
                          </Box>
                        </Box>
                      </Box>
                    </Box>
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

export default LatestL1L2Transactions;
