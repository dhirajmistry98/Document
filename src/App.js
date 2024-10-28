import React, { useState } from 'react';
import { DocumentProvider } from './context/DocumentContext';
import DocumentUpload from './components/DocumentUpload';
import Dashboard from './components/Dashboard';
import './App.css';

const App = () => {
    const [showUpload, setShowUpload] = useState(false);

    return (
        <DocumentProvider>
            <div className="App">
                
                {/* Toggle for Document Upload */}
                {showUpload && <DocumentUpload />}
                
                <Dashboard setShowUpload={setShowUpload} />
        
            </div>
        </DocumentProvider>
    );
};

export default App;
