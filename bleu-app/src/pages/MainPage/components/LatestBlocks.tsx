import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import {makeStyles} from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: 7.5,
  },
  title: {
    color: 'red',
    textAlign: 'initial',
    fontSize: 10,
  },
}));

export default function LatestBlocks() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Card>
        <CardHeader classes={{title: classes.title}} title="LatestBlocks" />
        <CardContent>
          LIST...
        </CardContent>
      </Card>
    </div>
  );
}
