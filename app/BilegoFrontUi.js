import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { inject, observer } from 'mobx-react';
import routes from './routes';

@inject('globalStore')
@observer
class BilegoFrontUi extends React.Component{
  render(){
    const {globalStore:{baseNameForRouting}} = this.props;
    const routs = routes(baseNameForRouting, false);

    return(
      <Switch>
        {routs.map(props => (
          <Route {...props} />
        ))}
      </Switch>
    );
  }
}

export default BilegoFrontUi;
