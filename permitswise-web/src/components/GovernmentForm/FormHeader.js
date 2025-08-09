import React from 'react';

const FormHeader = ({ 
  formTitle = "FORM 1A",
  department = "DEPARTMENT OF TRANSPORT",
  regulator = "National Public Transport Regulator",
  act = "NATIONAL LAND TRANSPORT ACT, 2009 (ACT NO. 5 OF 2009)",
  subtitle = "APPLICATION FOR THE GRANTING, RENEWAL, AMENDMENT, TRANSFER OR CONVERSION OF AN OPERATING LICENCE OR PERMIT FOR INTERPROVINCIAL SERVICES"
}) => {
  return (
    <div className="gov-form-header">
      <h1 className="gov-form-title">{formTitle}</h1>
      <div className="gov-form-department">{department}</div>
      <div className="gov-form-subtitle">{regulator}</div>
      <div className="gov-form-act">{act}</div>
      <div className="gov-form-subtitle">{subtitle}</div>
    </div>
  );
};

export default FormHeader; 