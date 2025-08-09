import React from 'react';

const FormNavigation = ({ 
  onPrevious, 
  onSaveDraft, 
  onNext, 
  canGoPrevious = true,
  canGoNext = true,
  isSaving = false,
  className = "" 
}) => {
  return (
    <div className={`gov-navigation ${className}`}>
      <button
        type="button"
        onClick={onPrevious}
        disabled={!canGoPrevious}
        className="gov-button"
      >
        Previous
      </button>
      
      <button
        type="button"
        onClick={onSaveDraft}
        disabled={isSaving}
        className="gov-button"
      >
        {isSaving ? 'Saving...' : 'Save Draft'}
      </button>
      
      <button
        type="button"
        onClick={onNext}
        disabled={!canGoNext}
        className="gov-button gov-button-primary"
      >
        Next
      </button>
    </div>
  );
};

export default FormNavigation; 