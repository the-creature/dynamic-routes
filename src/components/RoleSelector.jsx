import React from 'react';

class RoleSelector extends React.Component {
  render() {
    const {onChange} = this.props;

    return (
      <select onChange={(e) => {onChange(e.target.value)}}>
        <option value="enthusiastic">Enthusiastic</option>
        <option value="artist">Artist</option>
        <option value="admin">Admin</option>
      </select>
    );
  }
}

export default RoleSelector;