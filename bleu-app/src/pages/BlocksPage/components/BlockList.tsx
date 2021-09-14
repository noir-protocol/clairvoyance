import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';

const root = {
  height: '2400px',
};

export default function BlockList() {
  return (
    <Card sx={root}>
      <CardHeader title="Blocks" />
      <CardContent>
        LIST...
      </CardContent>
    </Card>
  );
}
