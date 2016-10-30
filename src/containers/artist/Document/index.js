import React from 'react';
import Navigation from '../../../components/Navigation';

const menu = [
  {label: "Phase 1", href: "/artist/document/phase1"},
  {label: "Phase 2", href: "/artist/document/phase2"},
];

export default ({children}) => (
  <div>
    <h2>Documents</h2>
    <Navigation items={menu}/>
    {children||''}
  </div>
);