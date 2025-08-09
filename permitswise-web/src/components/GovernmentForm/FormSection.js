import React from 'react';

const FormSection = ({ 
  sectionId, 
  sectionTitle, 
  children, 
  className = "" 
}) => {
  return (
    <div className={`gov-section ${className}`}>
      <div className="gov-section-header">
        {sectionId && `${sectionId} `}{sectionTitle}
      </div>
      <div className="gov-section-content">
        {children}
      </div>
    </div>
  );
};

export default FormSection; 