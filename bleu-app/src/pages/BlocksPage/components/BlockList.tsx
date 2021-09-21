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

export default function BlockList() {
  return (
    <Card sx={root}>
      <CardContent>
        <Box sx={cardHeader}>
          <Box sx={cardHeaderC1}>
            <Typography>More than &#62; 1,290,012,988 transactions found</Typography>
            <Typography>(Showing the last 500k records)</Typography>
          </Box>
          <Box>
            <Button variant='contained'>First</Button>
            <Button variant='contained'>&#60;</Button>
            <Button variant='contained'>Page 1  of 10000</Button>
            <Button variant='contained'>&#62;</Button>
            <Button variant='contained'>Last</Button>
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
