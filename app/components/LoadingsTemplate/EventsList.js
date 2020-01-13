import React from 'react';

import Grid from '@material-ui/core/Grid';

export default function EventsList(props){
  const { lines } = props;
  return(
    <Grid item xs={4}>
      {new Array(lines*3).map((el, k) => (
        <div key={k}>1</div>
      ))}
      2
    </Grid>
  )
}
