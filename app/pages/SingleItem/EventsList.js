import React from 'react';
import styled from 'styled-components';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import css from '../../theme/style';

const Padding = styled.div`
  padding-top:48px;
`;
const Wrap = styled.div`
  .MuiTypography-body2{
    color: ${css.$second}!important;
  }
  .MuiTypography-subtitle1{
    margin-bottom: ${css.sizes.xs}!important;
  }
  .MuiTypography-subtitle2{
    margin-bottom: ${css.sizes.xs}!important;
  }
`;
const Dot = styled.span`
  display: inline-block;
  margin: 0 5px 1px 15px;
  vertical-align: middle;
  border-radius: 50%;
  background-color: ${css.$red};
  width: 8px;
  height: 8px;
`;

export default function EventsList(props){
  const { item } = props;
  return (
    <Grid container spacing={4} style={{padding: '20px'}}>
      <Grid item xs={12}>
        <Divider />
        <Padding />
        <Wrap>
          <Typography component="span" variant="subtitle1">{item.categories && item.categories[0] && item.categories[0].name} {item.title}</Typography>
          <Typography component="p" variant="subtitle2">{item.address} {
            item.metro && item.metro.length > 0 &&
            item.metro.map( m => <React.Fragment key={m.number}><Dot/>{m.number}</React.Fragment>)
          }</Typography>
          {item.meta.telephone && <Typography component="p" variant="body2">{item.meta.telephone}</Typography>}
          {item.meta.web && <Typography component="p" variant="body2">{item.meta.web}</Typography>}
        </Wrap>
      </Grid>
      <Grid item xs={12}>
        <Divider />
        <Padding />
        <Typography component="h2" variant="h2">
          {item.title}
        </Typography>
        <div style={{marginTop: '1em'}}/>
        <Typography className="bilego-event-content" component="div" variant="body1">
          <span dangerouslySetInnerHTML={{ __html: item.content }} />
        </Typography>
      </Grid>
    </Grid>
  )
}
