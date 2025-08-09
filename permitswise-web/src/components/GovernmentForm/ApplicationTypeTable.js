import React from 'react';

const ApplicationTypeTable = ({ 
  selectedType, 
  onTypeChange, 
  className = "" 
}) => {
  const applicationTypes = [
    {
      id: 1,
      type: "New operating licence",
      sections: ["A", "B", "C", "F", "G", "H", "K", "L"]
    },
    {
      id: 2,
      type: "Transfer of an operation licence or permit",
      sections: ["A", "B", "C", "D", "E", "F", "G", "H", "K", "L"]
    },
    {
      id: 3,
      type: "Amendment of an operating licence or permit",
      sections: ["A", "B", "C", "D", "F", "G", "H", "K", "L"],
      subItems: [
        "a) Additional authority",
        "b) Amendment of route or area",
        "c) Change of particulars",
        "e) Amendment of timetables, tariffs or other conditions",
        "f) Replace existing vehicle",
        "g) OL for recapitalized vehicle"
      ]
    }
  ];

  return (
    <div className={`gov-field-group ${className}`}>
      <label className="gov-field-label required">
        Application Type
      </label>
      <table className="gov-application-table">
        <thead>
          <tr>
            <th>Application Type</th>
            <th>Required Sections</th>
          </tr>
        </thead>
        <tbody>
          {applicationTypes.map((appType) => (
            <tr key={appType.id}>
              <td>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                  <input
                    type="radio"
                    name="applicationType"
                    id={`type-${appType.id}`}
                    value={appType.id}
                    checked={selectedType === appType.id}
                    onChange={(e) => onTypeChange(parseInt(e.target.value))}
                  />
                  <div>
                    <label htmlFor={`type-${appType.id}`}>
                      {appType.id}) {appType.type}
                    </label>
                    {appType.subItems && (
                      <div className="gov-application-subitem">
                        {appType.subItems.map((subItem, index) => (
                          <div key={index}>{subItem}</div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </td>
              <td>{appType.sections.join(", ")}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ApplicationTypeTable; 