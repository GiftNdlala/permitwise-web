import React from 'react';

const FileUpload = ({ 
  label, 
  name, 
  onChange, 
  required = false,
  attachmentNote = "",
  error = null,
  className = "" 
}) => {
  const fieldId = `file-${name}`;
  
  return (
    <div className={`gov-field-group ${className}`}>
      <label 
        htmlFor={fieldId} 
        className={`gov-field-label ${required ? 'required' : ''}`}
      >
        {label}
      </label>
      <div className="gov-file-upload">
        <input
          id={fieldId}
          name={name}
          type="file"
          onChange={onChange}
          className={`gov-file-input ${error ? 'gov-field-error' : ''}`}
        />
        {attachmentNote && (
          <div className="gov-attachment-note">
            {attachmentNote}
          </div>
        )}
      </div>
      {error && (
        <div className="gov-error-message">{error}</div>
      )}
    </div>
  );
};

export default FileUpload; 