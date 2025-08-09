import React from 'react';

const FormField = ({ 
  label, 
  name, 
  value, 
  onChange, 
  type = "text",
  required = false,
  error = null,
  success = null,
  placeholder = "",
  className = "",
  ...props 
}) => {
  const fieldId = `field-${name}`;
  
  return (
    <div className={`gov-field-group ${className}`}>
      <label 
        htmlFor={fieldId} 
        className={`gov-field-label ${required ? 'required' : ''}`}
      >
        {label}
      </label>
      <input
        id={fieldId}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`gov-text-input ${error ? 'gov-field-error' : ''} ${success ? 'gov-field-success' : ''}`}
        {...props}
      />
      {error && (
        <div className="gov-error-message">{error}</div>
      )}
      {success && (
        <div className="gov-success-message">{success}</div>
      )}
    </div>
  );
};

export default FormField; 