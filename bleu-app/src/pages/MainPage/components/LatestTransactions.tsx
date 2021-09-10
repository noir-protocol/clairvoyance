import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import {makeStyles} from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: 7.5,
  },
}));

export default function LatestBlocks() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Card>
        <CardContent>
          LatestTransactions
        </CardContent>
        <CardContent>
          List...
        </CardContent>
      </Card>
    </div>
  );
}
