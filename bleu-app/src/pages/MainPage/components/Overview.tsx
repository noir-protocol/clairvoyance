import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import {makeStyles} from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: 7.5,
  },
}));

export default function Overview() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
        <Card>
          <CardContent>
            <Grid container>
              <Grid item lg={4} md={4} sm={6} xs={12}>
                "Alice"
              </Grid>
              <Grid item lg={4} md={4} sm={6} xs={12}>
                "in the"
              </Grid>
              <Grid item lg={4} md={4} sm={6} xs={12}>
                "Wonderland"
              </Grid>
            </Grid>
          </CardContent>
        </Card>
    </div>
  );
}
