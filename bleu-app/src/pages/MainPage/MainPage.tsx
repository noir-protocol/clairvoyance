import React from 'react';
import Grid from '@material-ui/core/Grid';
import {makeStyles} from '@material-ui/core/styles';
import LatestBlocks from './components/LatestBlocks';
import LatestTransactions from './components/LatestTransactions';
import Overview from './components/Overview';

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

function MainPage() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Grid container className={classes.contents} spacing={2}>
        <Grid item lg={12} md={12} sm={12} xs={12}>
          <Grid container justifyContent='center'>
            <Grid item className={classes.top} lg={12} md={12} sm={12} xs={12}>
              <Overview />
            </Grid>
            <Grid item className={classes.left} lg={6} md={6} sm={12} xs={12}>
              <LatestBlocks />
            </Grid>
            <Grid item className={classes.right} lg={6} md={6} sm={12} xs={12}>
              <LatestTransactions />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}

export default MainPage;
