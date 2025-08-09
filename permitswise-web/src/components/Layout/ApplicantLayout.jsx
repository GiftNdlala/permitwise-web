import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import ApplicantSidebar from './ApplicantSidebar';
import './Layout.css';

const ApplicantLayout = () => {
  return (
    <div className="layout">
      <ApplicantSidebar />
      <Header />
      <main className="main-content">
        <Outlet />
      </main>
    </div>
  );
};

export default ApplicantLayout;