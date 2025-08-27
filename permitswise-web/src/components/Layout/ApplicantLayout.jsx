import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import ApplicantSidebar from './ApplicantSidebar';
import './ApplicantLayout.css';

const ApplicantLayout = () => {
  return (
    <div className="layout-container">
      <ApplicantSidebar />
      <div className="main-content">
        <Header />
        <Outlet />
      </div>
    </div>
  );
};

export default ApplicantLayout;