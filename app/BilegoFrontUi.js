import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { inject, observer } from 'mobx-react';
import routes from './routes/client';
import { withCookies } from './cookie';

@inject('globalStore')
@observer
class BilegoFrontUi extends React.Component{
  render(){
    const { globalStore:{ baseNameForRouting }, setCookie } = this.props,
      routs = routes(baseNameForRouting);
    setCookie('_bilego_start_city', baseNameForRouting);

    return(
      <Switch>
        {routs.map(props => (
          <Route {...props} />
        ))}
      </Switch>
    );
  }
}

export default withCookies(BilegoFrontUi);
