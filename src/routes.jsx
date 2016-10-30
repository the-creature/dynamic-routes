import React from 'react';
import { Router, browserHistory } from 'react-router';
import { connect } from 'react-redux'
import createRoutes from './routes.json';

let key = 0;

class Routes extends React.Component {
  render() {
    const {role} = this.props;
    const routes = createRoutes(role);

    //workaround for changing roles
    key++;

    return (
      <Router
        key={key}
        history={browserHistory}
        routes={routes}
      />
    );
  }
}

function mapStateToProps(state) {
  return {role: state.loggedAs}
}

export default connect(mapStateToProps)(Routes);