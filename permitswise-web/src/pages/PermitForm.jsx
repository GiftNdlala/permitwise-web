import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import { MdArrowForward, MdArrowBack, MdPerson, MdLocationOn, MdDescription, MdDirectionsCar, MdAssessment, MdAssignment, MdNotifications, MdInfo } from 'react-icons/md';
import fieldMatrix from '../config/fieldMatrix.json';
import './PermitForm.css';

const PermitForm = ({ mode = 'admin', presetType } ) => {
  const { type } = useParams();
  const [currentStep, setCurrentStep] = useState(0);
  const [applicationType, setApplicationType] = useState('');
  const [serviceType, setServiceType] = useState('');
  const [applyingAs, setApplyingAs] = useState('');
  // kept for future dynamic behaviours; field is controlled via react-hook-form only
  const { register, formState: { errors } } = useForm();

  // Normalize URL param to matrix value
  useEffect(() => {
    const normalizedUrl = String(type || '').toLowerCase();
    const normalizedProp = String(presetType || '').toLowerCase();
    const map = {
      new: 'New',
      renewal: 'Renewal',
      transfer: 'Transfer',
      conversion: 'Conversion',
      amendment: 'Amendment'
    };

    // Applicant: derive from URL param
    if (mode === 'applicant' && type && map[normalizedUrl]) {
      setApplicationType(map[normalizedUrl]);
      return;
    }

    // Admin: allow preset from route via prop
    if (mode === 'admin' && presetType && map[normalizedProp]) {
      setApplicationType(map[normalizedProp]);
      return;
    }
  }, [mode, type, presetType]);

  const formSteps = [
    {
      id: 'applicant-data',
      title: 'Applicant Data',
      icon: MdPerson,
      sections: ['A', 'B', 'C']
    },
    {
      id: 'address-info',
      title: 'Address Info',
      icon: MdLocationOn,
      sections: ['B']
    },
    {
      id: 'documentation',
      title: 'Documentation',
      icon: MdDescription,
      sections: ['B', 'C']
    },
    {
      id: 'vehicle-data',
      title: 'Vehicle Data',
      icon: MdDirectionsCar,
      sections: ['L']
    },
    {
      id: 'audit',
      title: 'Audit',
      icon: MdAssessment,
      sections: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L']
    },
    {
      id: 'workflows',
      title: 'Workflows',
      icon: MdAssignment,
      sections: []
    },
    {
      id: 'notifications',
      title: 'Notifications',
      icon: MdNotifications,
      sections: []
    },
    {
      id: 'status',
      title: 'Status',
      icon: MdInfo,
      sections: []
    }
  ];

  const isSectionRequired = (sectionKey) => {
    if (!applicationType) return false;
    return (fieldMatrix[sectionKey]?.required || []).includes(applicationType);
  };

  const getVisibleSteps = () => {
    const stepsBase = formSteps.filter(step => {
      if (step.sections.length === 0) return true;
      return step.sections.some(section => isSectionRequired(section));
    });
    // Applicants do not see admin-only steps
    if (mode === 'applicant') {
      return stepsBase.filter(s => s.id !== 'workflows' && s.id !== 'notifications');
    }
    // Admin sees all steps regardless of required sections
    return formSteps;
  };

  const visibleSteps = getVisibleSteps();

  const nextStep = () => {
    if (currentStep < visibleSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const renderStepContent = () => {
    const currentStepData = visibleSteps[currentStep];
    
    switch (currentStepData.id) {
      case 'applicant-data':
        return (
          <div className="form-section">
            <h3 className="section-title">Header</h3>
            
            <div className="form-row">
              <div className="form-field">
                <label className="field-label">Date:</label>
                <input
                  type="text"
                  value="5 August 2025"
                  readOnly
                  className="form-input readonly"
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-field">
                <label className="field-label">
                  Application Type <span className="required">*</span>
                </label>
                <select
                  {...register('applicationType', { required: true })}
                  className="form-input"
                  value={applicationType}
                  onChange={(e) => setApplicationType(e.target.value)}
                  disabled={mode === 'applicant'}
                >
                  <option value="">-- Select application type --</option>
                  <option value="New">New operating licence</option>
                  <option value="Renewal">Renewal of operating licence</option>
                  <option value="Transfer">Transfer of operating licence</option>
                  <option value="Conversion">Conversion of operating licence</option>
                  <option value="Amendment">Amendment of operating licence</option>
                </select>
                {errors.applicationType && (
                  <span className="error-message">Application type is required</span>
                )}
              </div>

              <div className="form-field">
                <label className="field-label">
                  Service Type <span className="required">*</span>
                </label>
                <select
                  {...register('serviceType', { required: true })}
                  className="form-input"
                  disabled={!applicationType}
                  onChange={(e) => setServiceType(e.target.value)}
                >
                  <option value="">-- Select from the list --</option>
                  {applicationType && (
                    <>
                      <option value="e-hailing">E-hailing</option>
                      <option value="metered-taxi">Metered Taxi Service</option>
                      <option value="minibus">Minibus taxi-type service</option>
                      <option value="scheduled-bus">Scheduled bus service</option>
                      <option value="staff-service">Staff Service</option>
                      <option value="charter">Charter Service</option>
                      <option value="courtesy">Courtesy Service</option>
                      <option value="scholar">Scholar Service</option>
                      <option value="other">Other Service</option>
                    </>
                  )}
                </select>
                {!applicationType && (
                  <span className="helper-text">Please select an Application Type first.</span>
                )}
                {errors.serviceType && (
                  <span className="error-message">Service type is required</span>
                )}
              </div>
            </div>

            <div className="form-row">
              <div className="form-field">
                <label className="field-label">
                  Applying As <span className="required">*</span>
                </label>
                <select
                  {...register('applyingAs', { required: true })}
                  className="form-input"
                  disabled={!serviceType}
                  onChange={(e) => setApplyingAs(e.target.value)}
                >
                  <option value="">-- Select from the list --</option>
                  {serviceType && (
                    <>
                      <option value="individual">Individual</option>
                      <option value="company">Company / Legal Entity</option>
                    </>
                  )}
                </select>
                {!serviceType && (
                  <span className="helper-text">Please select a Service Type first.</span>
                )}
                {errors.applyingAs && (
                  <span className="error-message">Applying as is required</span>
                )}
              </div>

              <div className="form-field">
                <label className="field-label">
                  Affiliated With <span className="required">*</span>
                </label>
                <select
                  {...register('affiliatedWith', { required: true })}
                  className="form-input"
                  disabled={!applyingAs}
                >
                  <option value="">-- Select affiliate --</option>
                  {applyingAs && (
                    <>
                      <option value="eaziride">EaziRide</option>
                      <option value="uber">Uber</option>
                      <option value="bolt">Bolt</option>
                      <option value="indrive">InDrive</option>
                    </>
                  )}
                </select>
                {!applyingAs && (
                  <span className="helper-text">Please select Applying As first.</span>
                )}
                {errors.affiliatedWith && (
                  <span className="error-message">Affiliated with is required</span>
                )}
              </div>
            </div>

            <div className="form-row">
              <div className="form-field">
                <label className="field-label">
                  Identification Type <span className="required">*</span>
                </label>
                <select
                  {...register('identificationType', { required: true })}
                  className="form-input"
                >
                  <option value="">-- Select from the list --</option>
                  <option value="sa-id">SA ID Card</option>
                  <option value="sa-passport">SA Passport</option>
                  <option value="foreign-passport">Foreign Passport</option>
                </select>
                {errors.identificationType && (
                  <span className="error-message">Identification type is required</span>
                )}
              </div>
            </div>

            {applyingAs === 'individual' && (
              <>
                <h4 className="subsection-title">Identity Data</h4>
                <div className="form-row">
                  <div className="form-field">
                    <label className="field-label">
                      Full Name <span className="required">*</span>
                    </label>
                    <input
                      type="text"
                      {...register('fullName', { required: true })}
                      placeholder="Enter full name"
                      className="form-input"
                    />
                    {errors.fullName && (
                      <span className="error-message">Full name is required</span>
                    )}
                  </div>
                  
                  <div className="form-field">
                    <label className="field-label">
                      SA ID Number <span className="required">*</span>
                    </label>
                    <input
                      type="text"
                      {...register('saIdNumber', { required: true })}
                      placeholder="Enter SA ID Number"
                      className="form-input"
                    />
                    {errors.saIdNumber && (
                      <span className="error-message">SA ID number is required</span>
                    )}
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-field">
                    <label className="field-label">
                      Upload Certified SA ID Copy <span className="required">*</span>
                    </label>
                    <input
                      type="file"
                      {...register('saIdCopy', { required: true })}
                      className="form-input file-input"
                    />
                    {errors.saIdCopy && (
                      <span className="error-message">SA ID copy is required</span>
                    )}
                  </div>
                  
                  <div className="form-field">
                    <label className="field-label">
                      Driver's Licence Number <span className="required">*</span>
                    </label>
                    <input
                      type="text"
                      {...register('driversLicence', { required: true })}
                      placeholder="Enter driver's licence number"
                      className="form-input"
                    />
                    {errors.driversLicence && (
                      <span className="error-message">Driver's licence number is required</span>
                    )}
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-field">
                    <label className="field-label">
                      Upload Driver's licence with Pdp <span className="required">*</span>
                    </label>
                    <input
                      type="file"
                      {...register('driversLicenceCopy', { required: true })}
                      className="form-input file-input"
                    />
                    {errors.driversLicenceCopy && (
                      <span className="error-message">Driver's licence copy is required</span>
                    )}
                  </div>
                </div>
              </>
            )}

            {applyingAs === 'company' && (
              <>
                <h4 className="subsection-title">Company Documents</h4>
                <div className="form-row">
                  <div className="form-field">
                    <label className="field-label">
                      Applying As <span className="required">*</span>
                    </label>
                    <select
                      {...register('companyType', { required: true })}
                      className="form-input"
                    >
                      <option value="">-- Select from the list --</option>
                      <option value="company">Company / Legal Entity</option>
                    </select>
                  </div>
                  
                  <div className="form-field">
                    <label className="field-label">
                      Affiliated With <span className="required">*</span>
                    </label>
                    <select
                      {...register('companyAffiliate', { required: true })}
                      className="form-input"
                    >
                      <option value="">-- Select affiliate --</option>
                      <option value="eaziride">EaziRide</option>
                    </select>
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-field">
                    <label className="field-label">
                      Memorandum of Understanding <span className="required">*</span>
                    </label>
                    <input
                      type="file"
                      {...register('memorandum', { required: true })}
                      className="form-input file-input"
                    />
                  </div>
                  
                  <div className="form-field">
                    <label className="field-label">
                      Certificate of Incorporation <span className="required">*</span>
                    </label>
                    <input
                      type="file"
                      {...register('incorporation', { required: true })}
                      className="form-input file-input"
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-field">
                    <label className="field-label">
                      Founding Statement <span className="required">*</span>
                    </label>
                    <input
                      type="file"
                      {...register('foundingStatement', { required: true })}
                      className="form-input file-input"
                    />
                  </div>
                </div>

                <h4 className="subsection-title">Company Details</h4>
                <div className="form-row">
                  <div className="form-field">
                    <label className="field-label">
                      Company Name / Legal Entity Name <span className="required">*</span>
                    </label>
                    <input
                      type="text"
                      {...register('companyName', { required: true })}
                      placeholder="e.g. ABC Transport (Pty) Ltd"
                      className="form-input"
                    />
                  </div>
                  
                  <div className="form-field">
                    <label className="field-label">
                      Company Registration Number <span className="required">*</span>
                    </label>
                    <input
                      type="text"
                      {...register('companyRegNumber', { required: true })}
                      placeholder="Enter Company Registration Number"
                      className="form-input"
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-field">
                    <label className="field-label">
                      Upload Company Registration Document <span className="required">*</span>
                    </label>
                    <input
                      type="file"
                      {...register('companyRegDoc', { required: true })}
                      className="form-input file-input"
                    />
                  </div>
                  
                  <div className="form-field">
                    <label className="field-label">
                      Trade name (if different from registered name) <span className="required">*</span>
                    </label>
                    <input
                      type="text"
                      {...register('tradeName', { required: true })}
                      placeholder="e.g. Speedy Deliveries"
                      className="form-input"
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-field">
                    <label className="field-label">
                      Type of business <span className="required">*</span>
                    </label>
                    <input
                      type="text"
                      {...register('businessType', { required: true })}
                      placeholder="e.g. Passenger Transport, Logistics"
                      className="form-input"
                    />
                  </div>
                </div>
              </>
            )}

            <h4 className="subsection-title">Tax Data</h4>
            <div className="form-row">
              <div className="form-field">
                <label className="field-label">
                  Income Tax Registration Number <span className="required">*</span>
                </label>
                <input
                  type="text"
                  {...register('taxRegNumber', { required: true })}
                  placeholder="Enter income tax registration number"
                  className="form-input"
                />
                {errors.taxRegNumber && (
                  <span className="error-message">Tax registration number is required</span>
                )}
              </div>
              
              <div className="form-field">
                <label className="field-label">
                  Upload Tax Clearance Certificate <span className="required">*</span>
                </label>
                <input
                  type="file"
                  {...register('taxClearance', { required: true })}
                  className="form-input file-input"
                />
                {errors.taxClearance && (
                  <span className="error-message">Tax clearance certificate is required</span>
                )}
              </div>
            </div>
          </div>
        );

      case 'documentation':
        return (
          <div className="form-section">
            <h3 className="section-title">Documentation</h3>
            <p className="section-description">
              Upload additional supporting documents and annexures.
            </p>
            
            <div className="form-row">
              <div className="form-field">
                <label className="field-label">
                  Sample Annexure Field 1 <span className="required">*</span>
                </label>
                <input
                  type="file"
                  {...register('annexure1', { required: true })}
                  className="form-input file-input"
                />
                {errors.annexure1 && (
                  <span className="error-message">This field is required</span>
                )}
              </div>
            </div>
            
            <div className="form-row">
              <div className="form-field">
                <label className="field-label">
                  Proof of Address <span className="required">*</span>
                </label>
                <input
                  type="file"
                  {...register('proofOfAddress', { required: true })}
                  className="form-input file-input"
                />
                {errors.proofOfAddress && (
                  <span className="error-message">Proof of address is required</span>
                )}
              </div>
              <div className="form-field">
                <label className="field-label">
                  Bank Statement (3 months)
                </label>
                <input
                  type="file"
                  {...register('bankStatement')}
                  className="form-input file-input"
                />
              </div>
            </div>
          </div>
        );

      case 'vehicle-data':
        return (
          <div className="form-section">
            <h3 className="section-title">Vehicle Data</h3>
            <p className="section-description">
              Provide details about the vehicle(s) to be used for the service.
            </p>
            
            <div className="form-row">
              <div className="form-field">
                <label className="field-label">
                  Vehicle Registration Number <span className="required">*</span>
                </label>
                <input
                  type="text"
                  {...register('vehicleRegistration', { required: true })}
                  placeholder="Enter vehicle registration"
                  className="form-input"
                />
                {errors.vehicleRegistration && (
                  <span className="error-message">Vehicle registration is required</span>
                )}
              </div>
            </div>
            
            <div className="form-row">
              <div className="form-field">
                <label className="field-label">
                  Vehicle Type <span className="required">*</span>
                </label>
                <select
                  {...register('vehicleType', { required: true })}
                  className="form-input"
                >
                  <option value="">-- Select type --</option>
                  <option value="sedan">Sedan</option>
                  <option value="minibus">Minibus</option>
                  <option value="bus">Bus</option>
                  <option value="truck">Truck</option>
                </select>
                {errors.vehicleType && (
                  <span className="error-message">Vehicle type is required</span>
                )}
              </div>
              <div className="form-field">
                <label className="field-label">
                  Capacity (seats)
                </label>
                <input
                  type="number"
                  {...register('capacity')}
                  className="form-input"
                />
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="permit-form-container">
      {/* Breadcrumbs */}
      <div className="breadcrumbs">
        <span>Permits</span>
        <span className="breadcrumb-separator">{'>'}</span>
        <span>New</span>
      </div>

      {/* Multi-step tabs */}
      <div className="form-tabs">
        {visibleSteps.map((step, index) => {
          const Icon = step.icon;
          return (
            <div
              key={step.id}
              className={`form-tab ${currentStep === index ? 'active' : ''}`}
              onClick={() => setCurrentStep(index)}
            >
              <Icon className="tab-icon" />
              <span className="tab-label">{step.title}</span>
            </div>
          );
        })}
      </div>

      {/* Form content */}
      <div className="form-content">
        {renderStepContent()}
      </div>

      {/* Action buttons */}
      <div className="form-actions">
        <button
          type="button"
          className="btn btn-secondary"
          onClick={prevStep}
          disabled={currentStep === 0}
        >
          <MdArrowBack className="btn-icon" />
          Cancel
        </button>
        
        <button
          type="button"
          className="btn btn-primary"
          onClick={nextStep}
          disabled={currentStep === visibleSteps.length - 1}
        >
          Proceed
          <MdArrowForward className="btn-icon" />
        </button>
      </div>
    </div>
  );
};

export default PermitForm; 