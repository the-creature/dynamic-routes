import React, {Component} from 'react';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import RoleSelector from '../components/RoleSelector';
import Navigation from '../components/Navigation';

const menu = {
  enthusiastic: [
    {label: 'Overview', href: 'enthusiastic/overview'},
    {label: 'Exposure', href: 'enthusiastic/exposure'},
    {label: 'Documents', href: 'enthusiastic/document'},
  ],
  artist: [
    {label: 'Overview', href: 'artist/overview'},
    {label: 'Exposure', href: 'artist/exposure'},
    {label: 'Documents', href: '/artist/document'},
  ],
  admin: [
    {label: 'Import', href: 'admin/import'},
    {label: 'Update', href: 'admin/update'},
    {label: 'Bulk', href: 'admin/bulk'}
  ]
};

class App extends Component {

  changeRole(role){
    this.props.login(role)
  }

  render() {
    const role = this.props.role;
    const items = menu[role];

    return (
      <div>
        Login as:
        <RoleSelector role={role} onChange={this.changeRole.bind(this)}/>
        <h1>App</h1>
        <Navigation items={items} />
        {this.props.children || <h2>Please select one of the pages</h2>}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {role: state.loggedAs}
}

function mapDispatchToProps(dispatch) {
  return {
    login: bindActionCreators((login) => ({
      type: 'LOGIN_AS',
      login
    }), dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)