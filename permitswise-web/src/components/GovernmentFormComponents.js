import React from 'react';
import '../styles/GovernmentForm.css';

// Government Form Header Component
export const GovernmentFormHeader = () => (
  <div className="gov-form-header">
    <div className="gov-form-title">FORM 1A</div>
    <div className="gov-department">DEPARTMENT OF TRANSPORT</div>
    <div className="gov-subtitle">National Public Transport Regulator</div>
    <div className="gov-act-reference">
      NATIONAL LAND TRANSPORT ACT, 2009 (ACT NO. 5 OF 2009)
    </div>
    <div className="gov-form-description">
      APPLICATION FOR THE GRANTING, RENEWAL, AMENDMENT, TRANSFER OR CONVERSION OF AN OPERATING LICENCE
      <br />
      OR PERMIT FOR INTERPROVINCIAL SERVICES
    </div>
  </div>
);

// Government Section Container
export const GovernmentSection = ({ sectionId, title, children, required = false }) => (
  <div className="gov-section">
    <div className="gov-section-header">
      SECTION {sectionId} {required && '(Compulsory for all application types)'}
    </div>
    {title && <div className="gov-section-title">{title}</div>}
    {children}
  </div>
);

// Government Text Input Field
export const GovernmentTextField = ({ label, name, value, onChange, required = false, note = null }) => (
  <div className="gov-field-group">
    <label className="gov-field-label" htmlFor={name}>
      {label} {required && '*'}
    </label>
    <input
      type="text"
      id={name}
      name={name}
      value={value}
      onChange={onChange}
      className="gov-field-input"
    />
    {note && <div className="gov-attachment-note">{note}</div>}
  </div>
);

// Government Checkbox Grid (for multiple choice options)
export const GovernmentCheckboxGrid = ({ options, selectedValues, onChange, name }) => (
  <div className="gov-checkbox-grid">
    {options.map((option, index) => (
      <div key={index} className="gov-checkbox-item">
        <input
          type="checkbox"
          id={`${name}-${index}`}
          name={name}
          value={option.value}
          checked={selectedValues.includes(option.value)}
          onChange={onChange}
        />
        <label htmlFor={`${name}-${index}`}>{option.label}</label>
      </div>
    ))}
  </div>
);

// Government Radio Button Grid
export const GovernmentRadioGrid = ({ options, selectedValue, onChange, name }) => (
  <div className="gov-checkbox-grid">
    {options.map((option, index) => (
      <div key={index} className="gov-checkbox-item">
        <input
          type="radio"
          id={`${name}-${index}`}
          name={name}
          value={option.value}
          checked={selectedValue === option.value}
          onChange={onChange}
        />
        <label htmlFor={`${name}-${index}`}>{option.label}</label>
      </div>
    ))}
  </div>
);

// Government Address Field Group
export const GovernmentAddressField = ({ 
  addressLabel, 
  addressValue, 
  onAddressChange,
  postalCodeValue,
  onPostalCodeChange,
  addressName,
  postalCodeName
}) => (
  <div className="gov-field-group">
    <label className="gov-field-label">{addressLabel}</label>
    <div className="gov-address-group">
      <input
        type="text"
        name={addressName}
        value={addressValue}
        onChange={onAddressChange}
        className="gov-field-input"
      />
      <div>
        <label className="gov-field-label">Postal Code</label>
        <input
          type="text"
          name={postalCodeName}
          value={postalCodeValue}
          onChange={onPostalCodeChange}
          className="gov-field-input gov-postal-code"
        />
      </div>
    </div>
  </div>
);

// Government Phone Field Group
export const GovernmentPhoneField = ({ 
  label, 
  codeValue, 
  phoneValue, 
  onCodeChange, 
  onPhoneChange,
  codeName,
  phoneName
}) => (
  <div className="gov-field-group">
    <label className="gov-field-label">{label}</label>
    <div className="gov-phone-group">
      <div>
        <label className="gov-field-label">Code</label>
        <input
          type="text"
          name={codeName}
          value={codeValue}
          onChange={onCodeChange}
          className="gov-field-input gov-code-input"
          placeholder="011"
        />
      </div>
      <input
        type="text"
        name={phoneName}
        value={phoneValue}
        onChange={onPhoneChange}
        className="gov-field-input"
        placeholder="1234567"
      />
    </div>
  </div>
);

// Government Application Type Table
export const GovernmentApplicationTable = ({ selectedType, onChange }) => {
  const applicationTypes = [
    { value: 'new', label: 'New operating licence', sections: 'A, B, C, F, G, H, K, L' },
    { value: 'transfer', label: 'Transfer of an operation licence or permit', sections: 'A, B, C, D, E, F, G, H, K, L' },
    { value: 'amendment', label: 'Amendment of an operating licence or permit', sections: 'A, B, C, D, F, G, H, K, L' },
    { value: 'renewal', label: 'Renewal of an operating licence or permit', sections: 'A, B, C, D, F, G, H, K, L' },
    { value: 'conversion', label: 'Conversion of a permit to an operating licence', sections: 'A, B, C, D, F, G, H, K, L' }
  ];

  return (
    <div className="gov-field-group">
      <div className="gov-required-text">
        Compulsory sections to be completed by applicant:
      </div>
      <table className="gov-application-table">
        <tbody>
          {applicationTypes.map((type, index) => (
            <tr key={type.value}>
              <td className="app-type">
                <label className="gov-checkbox-item">
                  <input
                    type="radio"
                    name="applicationType"
                    value={type.value}
                    checked={selectedType === type.value}
                    onChange={onChange}
                  />
                  {index + 1}) {type.label}
                </label>
                {type.value === 'amendment' && (
                  <div style={{ marginLeft: '20px', marginTop: '5px', fontSize: '10px' }}>
                    a) Additional authority<br/>
                    b) Amendment of route or area<br/>
                    c) Change of particulars<br/>
                    e) Amendment of timetables, tariffs or other conditions<br/>
                    f) Replace existing vehicle<br/>
                    g) OL for recapitalized vehicle
                  </div>
                )}
              </td>
              <td className="required-sections">{type.sections}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

// Government File Upload Field
export const GovernmentFileUpload = ({ label, required = false, note = null }) => (
  <div className="gov-field-group">
    <label className="gov-field-label">
      {label} {required && '*'}
    </label>
    <input
      type="file"
      className="gov-field-input"
      style={{ padding: '8px' }}
    />
    {note && <div className="gov-attachment-required">{note}</div>}
  </div>
);

// Government Form Navigation
export const GovernmentFormNavigation = ({ 
  onPrevious, 
  onNext, 
  onSave,
  showPrevious = true,
  showNext = true,
  showSave = true,
  nextDisabled = false
}) => (
  <div className="gov-form-navigation">
    <div>
      {showPrevious && (
        <button type="button" className="gov-nav-button" onClick={onPrevious}>
          Previous
        </button>
      )}
    </div>
    <div>
      {showSave && (
        <button type="button" className="gov-nav-button" onClick={onSave}>
          Save Draft
        </button>
      )}
      {showNext && (
        <button 
          type="button" 
          className="gov-nav-button" 
          onClick={onNext}
          disabled={nextDisabled}
        >
          Next
        </button>
      )}
    </div>
  </div>
);

// Government Page Indicator
export const GovernmentPageIndicator = ({ currentPage, totalPages }) => (
  <div className="gov-page-indicator">
    FORM 1A - PAGE {currentPage} of {totalPages}
  </div>
);