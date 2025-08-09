import React, { useState } from 'react';
import {
  PermitWiseHeader,
  FormHeader,
  FormSection,
  FormField,
  CheckboxGrid,
  ApplicationTypeTable,
  FileUpload,
  FormNavigation
} from '../components/GovernmentForm';
import '../styles/GovernmentForm.css';

const PermitApplication = () => {
  const [formData, setFormData] = useState({
    applicationType: null,
    companyName: '',
    registrationNumber: '',
    identityDocuments: [],
    address: '',
    postalCode: '',
    phoneAreaCode: '',
    phoneNumber: '',
    email: '',
    taxClearance: null
  });

  const [currentPage, setCurrentPage] = useState(1);
  const [isSaving, setIsSaving] = useState(false);

  const handleInputChange = (name, value) => {
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileChange = (name, event) => {
    const file = event.target.files[0];
    setFormData(prev => ({
      ...prev,
      [name]: file
    }));
  };

  const handleSaveDraft = async () => {
    setIsSaving(true);
    // Simulate saving to Firebase
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsSaving(false);
    alert('Draft saved successfully!');
  };

  const handleNext = () => {
    if (currentPage < 3) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const identityDocumentOptions = [
    { value: 'rsa-id', label: 'RSA Identity Document' },
    { value: 'temp-id', label: 'Temporary Identity Certificate' },
    { value: 'passport', label: 'Passport' },
    { value: 'foreign-id', label: 'Foreign Identity Document' },
    { value: 'founding-statement', label: 'Founding Statement' },
    { value: 'certificate-incorporation', label: 'Certificate of Incorporation' },
    { value: 'mou', label: 'Memorandum of Understanding' },
    { value: 'partnership-agreement', label: 'Partnership Agreement' }
  ];

  const renderPage1 = () => (
    <>
      <FormHeader />
      
      <FormSection 
        sectionId="A" 
        sectionTitle="(Compulsory for all application types)"
      >
        <ApplicationTypeTable
          selectedType={formData.applicationType}
          onTypeChange={(type) => handleInputChange('applicationType', type)}
        />
        
        <div className="gov-two-column">
          <FormField
            label="Company Name"
            name="companyName"
            value={formData.companyName}
            onChange={(e) => handleInputChange('companyName', e.target.value)}
            required
          />
          <FormField
            label="Registration Number"
            name="registrationNumber"
            value={formData.registrationNumber}
            onChange={(e) => handleInputChange('registrationNumber', e.target.value)}
            required
          />
        </div>

        <CheckboxGrid
          label="Identity Documents"
          options={identityDocumentOptions}
          selectedValues={formData.identityDocuments}
          onChange={(values) => handleInputChange('identityDocuments', values)}
          required
        />
      </FormSection>
    </>
  );

  const renderPage2 = () => (
    <>
      <FormSection 
        sectionId="B" 
        sectionTitle="Contact Information"
      >
        <div className="gov-address-group">
          <div className="gov-address-field">
            <FormField
              label="Address"
              name="address"
              value={formData.address}
              onChange={(e) => handleInputChange('address', e.target.value)}
              required
            />
          </div>
          <div className="gov-postal-field">
            <FormField
              label="Postal Code"
              name="postalCode"
              value={formData.postalCode}
              onChange={(e) => handleInputChange('postalCode', e.target.value)}
              required
            />
          </div>
        </div>

        <div className="gov-phone-group">
          <div className="gov-area-code">
            <FormField
              label="Area Code"
              name="phoneAreaCode"
              value={formData.phoneAreaCode}
              onChange={(e) => handleInputChange('phoneAreaCode', e.target.value)}
              required
            />
          </div>
          <div className="gov-phone-number">
            <FormField
              label="Phone Number"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={(e) => handleInputChange('phoneNumber', e.target.value)}
              required
            />
          </div>
        </div>

        <FormField
          label="Email Address"
          name="email"
          type="email"
          value={formData.email}
          onChange={(e) => handleInputChange('email', e.target.value)}
          required
        />
      </FormSection>
    </>
  );

  const renderPage3 = () => (
    <>
      <FormSection 
        sectionId="C" 
        sectionTitle="Required Documents"
      >
        <FileUpload
          label="Tax Clearance Certificate"
          name="taxClearance"
          onChange={(e) => handleFileChange('taxClearance', e)}
          required
          attachmentNote="Attach original Tax Clearance Certificate"
        />
      </FormSection>
    </>
  );

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 1:
        return renderPage1();
      case 2:
        return renderPage2();
      case 3:
        return renderPage3();
      default:
        return renderPage1();
    }
  };

  return (
    <div className="permitwise-form-container">
      <PermitWiseHeader />
      
      {renderCurrentPage()}
      
      <FormNavigation
        onPrevious={handlePrevious}
        onSaveDraft={handleSaveDraft}
        onNext={handleNext}
        canGoPrevious={currentPage > 1}
        canGoNext={currentPage < 3}
        isSaving={isSaving}
      />
      
      <div className="gov-page-indicator">
        Page {currentPage} of 3
      </div>
    </div>
  );
};

export default PermitApplication; 