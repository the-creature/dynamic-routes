import React, {Component} from 'react';
import {Link} from 'react-router';

const Navigation = ({ items }) => {
  const links = items.map((item, key) => (
    <li key={key}><Link to={item.href}>{item.label}</Link></li>
  ));

  return (
    <ul>{links}</ul>
  );
};

export default Navigation;
