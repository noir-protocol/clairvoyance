import React from 'react';
import Grid from '@material-ui/core/Grid';
import {makeStyles} from '@material-ui/core/styles';
import BlockList from './components/BlockList';

const useStyles = makeStyles((theme) => ({
  root: {
    //backgroundColor: 'blue',
    width: '100%',
    maxWidth: 1400,
    fontSize: '0.875rem',
  },
  contents: {
    flexGrow: 1,
  },
  top: {
    //backgroundColor: 'yellow',
  },
  left: {
    //backgroundColor: 'green',
    //width: '100%',
  },
  right: {
    //backgroundColor: 'red',
    //width: '100%',
  }
}));

function BlocksPage() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Grid container className={classes.contents} spacing={2}>
        <Grid item lg={12} md={12} sm={12} xs={12}>
          <BlockList />
        </Grid>
      </Grid>
    </div>
  );
}

export default BlocksPage;
