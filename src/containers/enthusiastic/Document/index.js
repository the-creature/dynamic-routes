import React from 'react';
import Navigation from '../../../components/Navigation';

const menu = [
  {label: "Phase 1", href: "/enthusiastic/document/phase1"},
  {label: "Phase 2", href: "/enthusiastic/document/phase2"},
];

export default ({children}) => (
  <div>
    <h2>Documents</h2>
    <Navigation items={menu}/>
    {children || <h3>Index</h3>}
  </div>
);