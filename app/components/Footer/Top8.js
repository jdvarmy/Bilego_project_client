import React from 'react';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { style } from '../../theme';

export default function Top8() {
  const downloadEmployeeData = () => {
    fetch('/files/bilego_logo.zip')
      .then(response => {
        response.blob().then(blob => {
          let url = window.URL.createObjectURL(blob);
          let a = document.createElement('a');
          a.href = url;
          a.download = 'bilego_logo.zip';
          a.click();
        });
      });
  };

  return (
    <React.Fragment>
      <div style={{marginTop: style.sizes.xxl}} />
      <Grid container spacing={4}>
        <Grid item xs={4} />
        <Grid item xs={4} />
        <Grid item xs={4}>
          <a onClick={downloadEmployeeData}><Typography variant="subtitle1" component="div">Скачать логотипы</Typography></a>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
