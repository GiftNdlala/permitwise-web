import React from 'react';

const PermitWiseHeader = ({ 
  tagline = "Streamlining Permit Applications",
  showTagline = true 
}) => {
  return (
    <div className="permitwise-header">
      <div className="permitwise-logo">🚦 PermitWise</div>
      {showTagline && (
        <div className="permitwise-tagline">{tagline}</div>
      )}
    </div>
  );
};

export default PermitWiseHeader; 