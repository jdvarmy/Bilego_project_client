import React from 'react';
import styled from 'styled-components';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';

const Padding = styled.div`
  padding-top:48px;
`;

export default function EventsList(props){
  return (
    <Grid container spacing={4} style={{padding: '20px'}}>
      <Grid item xs={12}>
        <Divider />
        <Padding />
        <Typography component="h2" variant="h2">
          {props.item.title}
        </Typography>
        <div style={{marginTop: '1em'}}/>
        <Typography className="bilego-event-content" component="div" variant="body1">
          <span dangerouslySetInnerHTML={{ __html: props.item.content }} />
        </Typography>
      </Grid>
    </Grid>
  )
}