import React from 'react';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { style } from '../../theme';

export default function Top8() {
  return (
    <React.Fragment>
      <div style={{marginTop: style.sizes.xxl}} />
      <Grid container spacing={4}>
        <Grid item xs={4} />
        <Grid item xs={4} />
        <Grid item xs={4}>
          <a href={`/files/bilego_logo.zip`}><Typography variant="subtitle1" component="div">Скачать логотипы</Typography></a>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
