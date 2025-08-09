import React from 'react';

const CheckboxGrid = ({ 
  label, 
  options, 
  selectedValues = [], 
  onChange, 
  required = false,
  error = null,
  className = "" 
}) => {
  const handleCheckboxChange = (value) => {
    const newSelected = selectedValues.includes(value)
      ? selectedValues.filter(v => v !== value)
      : [...selectedValues, value];
    onChange(newSelected);
  };

  return (
    <div className={`gov-field-group ${className}`}>
      {label && (
        <label className={`gov-field-label ${required ? 'required' : ''}`}>
          {label}
        </label>
      )}
      <div className="gov-checkbox-grid">
        {options.map((option, index) => (
          <div key={index} className="gov-checkbox-item">
            <input
              type="checkbox"
              id={`checkbox-${option.value}`}
              checked={selectedValues.includes(option.value)}
              onChange={() => handleCheckboxChange(option.value)}
            />
            <label htmlFor={`checkbox-${option.value}`}>
              {option.label}
            </label>
          </div>
        ))}
      </div>
      {error && (
        <div className="gov-error-message">{error}</div>
      )}
    </div>
  );
};

export default CheckboxGrid; 