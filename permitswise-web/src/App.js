import React, { useState } from 'react';
import { db } from './firebase';
import { collection, addDoc } from 'firebase/firestore';
import './App.css';
import { 
  GovernmentFormHeader, 
  GovernmentFormNavigation, 
  GovernmentPageIndicator 
} from './components/GovernmentFormComponents';
import SectionA from './components/SectionA';
import SectionB from './components/SectionB';
import './styles/GovernmentForm.css';

function App() {
  const [currentView, setCurrentView] = useState('form'); // 'test' or 'form'
  const [testResult, setTestResult] = useState('');
  const [formData, setFormData] = useState({});

  const testFirebase = async () => {
    try {
      const docRef = await addDoc(collection(db, "test"), {
        message: "Firebase is working!",
        timestamp: new Date()
      });
      setTestResult(`✅ Success! Document written with ID: ${docRef.id}`);
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      setTestResult(`❌ Error: ${e.message}`);
      console.error("Error adding document: ", e);
    }
  };

  const handleFormDataChange = (newData) => {
    setFormData(newData);
  };

  const saveFormData = async () => {
    try {
      const docRef = await addDoc(collection(db, "applications"), {
        ...formData,
        timestamp: new Date(),
        status: 'draft'
      });
      alert(`Form saved successfully! Document ID: ${docRef.id}`);
    } catch (e) {
      alert(`Error saving form: ${e.message}`);
    }
  };

  if (currentView === 'test') {
    return (
      <div className="App">
        <header className="App-header">
          <h1>🚦 PermitsWise</h1>
          <p>Firebase Setup Test</p>
          
          <button 
            onClick={testFirebase}
            style={{
              padding: '10px 20px',
              fontSize: '16px',
              backgroundColor: '#007bff',
              color: 'white',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
              margin: '20px'
            }}
          >
            Test Firebase Connection
          </button>
          
          {testResult && (
            <div style={{
              margin: '20px',
              padding: '10px',
              backgroundColor: testResult.includes('✅') ? '#d4edda' : '#f8d7da',
              border: `1px solid ${testResult.includes('✅') ? '#c3e6cb' : '#f5c6cb'}`,
              borderRadius: '5px',
              color: testResult.includes('✅') ? '#155724' : '#721c24'
            }}>
              {testResult}
            </div>
          )}
          
          <p style={{ fontSize: '14px', color: '#666' }}>
            If you see a success message, Firebase is working correctly!
          </p>
          
          <button 
            onClick={() => setCurrentView('form')}
            style={{
              padding: '10px 20px',
              fontSize: '16px',
              backgroundColor: '#28a745',
              color: 'white',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
              margin: '20px'
            }}
          >
            View Government Form
          </button>
        </header>
      </div>
    );
  }

  return (
    <div className="gov-form">
      <GovernmentFormHeader />
      
      <SectionA 
        formData={formData} 
        onFormDataChange={handleFormDataChange} 
      />
      
      <SectionB 
        formData={formData} 
        onFormDataChange={handleFormDataChange} 
      />
      
      <GovernmentFormNavigation
        onPrevious={() => setCurrentView('test')}
        onNext={() => alert('Next section coming soon!')}
        onSave={saveFormData}
        showPrevious={true}
        showNext={true}
        showSave={true}
      />
      
      <GovernmentPageIndicator currentPage={1} totalPages={8} />
      
      <div style={{ marginTop: '20px', textAlign: 'center' }}>
        <button 
          onClick={() => setCurrentView('test')}
          style={{
            padding: '8px 16px',
            fontSize: '12px',
            backgroundColor: '#6c757d',
            color: 'white',
            border: 'none',
            borderRadius: '3px',
            cursor: 'pointer'
          }}
        >
          Back to Firebase Test
        </button>
      </div>
    </div>
  );
}

export default App;
