import React, { useState } from 'react';
import { db } from './firebase';
import { collection, addDoc } from 'firebase/firestore';
import './App.css';

function App() {
  const [testResult, setTestResult] = useState('');

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
      </header>
    </div>
  );
}

export default App;
