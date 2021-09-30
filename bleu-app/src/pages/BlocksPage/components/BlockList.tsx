import React from 'react';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import Typography from '@mui/material/Typography';

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

export default function BlockList() {
  return (
    <Card sx={root}>
      <CardContent>
        <Box sx={cardHeader}>
          <Box sx={cardHeaderC1}>
            <Typography>More than &#62; 1,290,012,988 transactions found</Typography>
            <Typography>(Showing the last 500k records)</Typography>
          </Box>
          <Box sx={indexButtonBox}>
            <Button variant='text' sx={indexButton}>First</Button>
            <Button variant='text' sx={indexButton}>&#60;</Button>
            <Button variant='text' sx={indexButton}>Page 1  of 10000</Button>
            <Button variant='text' sx={indexButton}>&#62;</Button>
            <Button variant='text' sx={indexButton}>Last</Button>
          </Box>
        </Box>
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
