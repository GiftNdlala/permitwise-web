import React from 'react';
import { Outlet } from 'react-router-dom';
import MECSidebar from './MECSidebar';
import Header from './Header';
import './Layout.css';

const MECLayout = () => {
  return (
    <div className="layout">
      <MECSidebar />
      <div className="content-area">
        <Header />
        <main className="main-content">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default MECLayout;

