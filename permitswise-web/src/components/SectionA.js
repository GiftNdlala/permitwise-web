import React, { useState } from 'react';
import { GovernmentSection, GovernmentApplicationTable } from './GovernmentFormComponents';

const SectionA = ({ formData, onFormDataChange }) => {
  const handleApplicationTypeChange = (e) => {
    onFormDataChange({
      ...formData,
      applicationType: e.target.value
    });
  };

  return (
    <GovernmentSection sectionId="A" title="TYPE OF APPLICATION" required={true}>
      <div className="gov-field-group">
        <div className="gov-field-label" style={{ fontWeight: 'bold', marginBottom: '10px' }}>
          This application is for
        </div>
        <div className="gov-field-label" style={{ fontWeight: 'bold', marginBottom: '15px' }}>
          Application type:
        </div>
        
        <GovernmentApplicationTable 
          selectedType={formData.applicationType || ''}
          onChange={handleApplicationTypeChange}
        />
      </div>
    </GovernmentSection>
  );
};

export default SectionA;