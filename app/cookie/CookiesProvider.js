import React from 'react';
import CookiesContext from './CookiesContext';
import ClientManager from './ClientManager';

export default class CookiesProvider extends React.Component {
  static defaultProps = {
    manager: new ClientManager()
  };

  render() {
    const { manager, children } = this.props;

    return (
      <CookiesContext.Provider value={manager}>
        {children}
      </CookiesContext.Provider>
    );
  }
}
