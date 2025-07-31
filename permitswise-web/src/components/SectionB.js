import React from 'react';
import { 
  GovernmentSection, 
  GovernmentTextField, 
  GovernmentCheckboxGrid,
  GovernmentAddressField,
  GovernmentPhoneField,
  GovernmentFileUpload
} from './GovernmentFormComponents';

const SectionB = ({ formData, onFormDataChange }) => {
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    onFormDataChange({
      ...formData,
      [name]: value
    });
  };

  const handleIdentificationTypeChange = (e) => {
    const { value, checked } = e.target;
    let updatedTypes = formData.identificationType || [];
    
    if (checked) {
      updatedTypes = [...updatedTypes, value];
    } else {
      updatedTypes = updatedTypes.filter(type => type !== value);
    }
    
    onFormDataChange({
      ...formData,
      identificationType: updatedTypes
    });
  };

  const identificationOptions = [
    { value: 'rsa_id', label: 'RSA Identity Document' },
    { value: 'temp_cert', label: 'Temporary Identity Certificate' },
    { value: 'passport', label: 'Passport' },
    { value: 'foreign_id', label: 'Foreign Identity Document' },
    { value: 'founding_statement', label: 'Founding Statement' },
    { value: 'certificate_incorporation', label: 'Certificate of Incorporation' },
    { value: 'memorandum_understanding', label: 'Memorandum of Understanding' },
    { value: 'partnership_agreement', label: 'Partnership Agreement' }
  ];

  return (
    <GovernmentSection sectionId="B" title="PARTICULARS OF APPLICANT" required={true}>
      <GovernmentTextField
        label="Name of company, partnership, corporation or other legal entity, or surname in the case of a sole proprietor."
        name="companyName"
        value={formData.companyName || ''}
        onChange={handleInputChange}
        required={true}
      />
      
      <GovernmentTextField
        label="First names, if sole proprietor (not more than 3)"
        name="firstNames"
        value={formData.firstNames || ''}
        onChange={handleInputChange}
      />
      
      <div className="gov-field-group">
        <label className="gov-field-label">Type of identification</label>
        <div className="gov-attachment-note" style={{ marginBottom: '10px' }}>
          *(Attach a certified copy)
        </div>
        <GovernmentCheckboxGrid
          options={identificationOptions}
          selectedValues={formData.identificationType || []}
          onChange={handleIdentificationTypeChange}
          name="identificationType"
        />
      </div>
      
      <GovernmentTextField
        label="Identity no. / passport no. / business registration number"
        name="identityNumber"
        value={formData.identityNumber || ''}
        onChange={handleInputChange}
        required={true}
      />
      
      <GovernmentTextField
        label="Trade name (if applicable)"
        name="tradeName"
        value={formData.tradeName || ''}
        onChange={handleInputChange}
      />
      
      <GovernmentTextField
        label="Type of business"
        name="businessType"
        value={formData.businessType || ''}
        onChange={handleInputChange}
      />
      
      <GovernmentAddressField
        addressLabel="Postal address and code"
        addressValue={formData.postalAddress || ''}
        onAddressChange={handleInputChange}
        postalCodeValue={formData.postalCode || ''}
        onPostalCodeChange={handleInputChange}
        addressName="postalAddress"
        postalCodeName="postalCode"
      />
      
      <GovernmentAddressField
        addressLabel="Street address (if different from postal address)"
        addressValue={formData.streetAddress || ''}
        onAddressChange={handleInputChange}
        postalCodeValue={formData.streetPostalCode || ''}
        onPostalCodeChange={handleInputChange}
        addressName="streetAddress"
        postalCodeName="streetPostalCode"
      />
      
      <GovernmentAddressField
        addressLabel="Domicilium citandi et executandi"
        addressValue={formData.domicilium || ''}
        onAddressChange={handleInputChange}
        postalCodeValue={formData.domiciliumPostalCode || ''}
        onPostalCodeChange={handleInputChange}
        addressName="domicilium"
        postalCodeName="domiciliumPostalCode"
      />
      
      <GovernmentPhoneField
        label="Telephone number (s)"
        codeValue={formData.phoneCode || ''}
        phoneValue={formData.phoneNumber || ''}
        onCodeChange={handleInputChange}
        onPhoneChange={handleInputChange}
        codeName="phoneCode"
        phoneName="phoneNumber"
      />
      
      <GovernmentPhoneField
        label="Facsimile number (if any)"
        codeValue={formData.faxCode || ''}
        phoneValue={formData.faxNumber || ''}
        onCodeChange={handleInputChange}
        onPhoneChange={handleInputChange}
        codeName="faxCode"
        phoneName="faxNumber"
      />
      
      <GovernmentTextField
        label="E-mail address (if any)"
        name="emailAddress"
        value={formData.emailAddress || ''}
        onChange={handleInputChange}
      />
      
      <GovernmentTextField
        label="Income tax registration number"
        name="taxNumber"
        value={formData.taxNumber || ''}
        onChange={handleInputChange}
        required={true}
      />
      
      <GovernmentFileUpload
        label="Tax Clearance Certificate"
        required={true}
        note="Attach original Tax Clearance Certificate"
      />
    </GovernmentSection>
  );
};

export default SectionB;