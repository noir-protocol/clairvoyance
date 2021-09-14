import React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Divider from '@mui/material/Divider';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import {useTranslation} from 'react-i18next';

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
  height: '500px',
};

const header = {
  textAlign: 'left',
  fontSize: '1rem',
  fontWeight: 500,
};

const body = {
  height: '440px',
  overflow: 'auto',
  paddingTop: 0,
};

export default function LatestBlocks() {
  const {t} = useTranslation('', {useSuspense: false});
  return (
    <Card sx={root}>
      <CardHeader title={t('latest_blocks')} titleTypographyProps={{textAlign: 'left', fontSize: '1rem', fontWeight: 500}} />
      <Divider />
      <CardContent sx={body}>
        <Box>
          <Table>
            <TableBody>
              {
                data.map((row, index) => (
                  <TableRow key={index}>
                    <TableCell>{row[0]}</TableCell>
                    <TableCell>{row[1]}</TableCell>
                    <TableCell>{row[2]}</TableCell>
                  </TableRow>
                ))
              }
            </TableBody>
          </Table>
        </Box>
      </CardContent>
    </Card>
  );
}
