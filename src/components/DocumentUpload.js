import React, { useState } from 'react';
import { storage, db } from '../firebase/firebaseConfig';
import { ref, uploadBytes } from 'firebase/storage';
import { collection, addDoc } from 'firebase/firestore';
import './DocumentUpload.css';

const DocumentUpload = ({ onUploadComplete }) => {
    const [file, setFile] = useState(null);
    const [title, setTitle] = useState('');
    const [category, setCategory] = useState(''); // Default state
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    // Predefined categories for the dropdown
    const categories = ['Reports', 'Invoices', 'Presentations', 'Other'];

    const handleUpload = async (e) => {
        e.preventDefault();
        setError(''); // Reset error message before upload
        setSuccess(''); // Reset success message before upload

        // Validate file type and size (optional)
        if (!file) {
            setError('Please select a file.');
            return;
        }

        const allowedTypes = [
            'application/pdf',
            'application/vnd.ms-excel',
            'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
        ];
        if (!allowedTypes.includes(file.type)) {
            setError('Please upload a valid file (PDF, XLS, or XLSX).');
            return;
        }

        // Start loading state
        setLoading(true);

        try {
            const storageRef = ref(storage, `documents/${file.name}`);
            await uploadBytes(storageRef, file);
            
            // Create a new document reference in Firestore
            const docRef = await addDoc(collection(db, 'documents'), { 
                title, 
                category, 
                fileName: file.name 
            });

            // Prepare the uploaded document data
            const uploadedDocument = {
                id: docRef.id, // Get the Firestore document ID
                title,
                category,
                fileName: file.name
            };

            // Clear inputs on successful upload
            setTitle('');
            setCategory('');
            setFile(null);
            setSuccess('Document uploaded successfully!');

            // Notify the Dashboard that upload is complete
            if (onUploadComplete) {
                onUploadComplete(uploadedDocument);
            }
        } catch (err) {
            console.error("Error uploading document: ", err);
        } finally {
            // End loading state
            setLoading(false);
        }
    };

    return (
        <div className="upload-container">
            <h2 className="upload-header">Upload Document</h2>
            <form onSubmit={handleUpload} className="upload-form">
                <input 
                    type="text" 
                    placeholder="Document Title" 
                    value={title} 
                    onChange={(e) => setTitle(e.target.value)} 
                    required 
                    className="form-input"
                />
                <select 
                    value={category} 
                    onChange={(e) => setCategory(e.target.value)} 
                    required 
                    className="form-select"
                >
                    <option value="" disabled>Select Category</option>
                    {categories.map((cat) => (
                        <option key={cat} value={cat}>{cat}</option>
                    ))}
                </select>
                <input 
                    type="file" 
                    onChange={(e) => setFile(e.target.files[0])} 
                    required 
                    className="file-input"
                />
                <button type="submit" disabled={loading} className="upload-button">
                    {loading ? <span className="loading-spinner">🔄</span> : 'Upload Document'}
                </button>
            </form>
            {error && <p className="error-message">{error}</p>}
            {success && <p className="success-message">{success}</p>}
        </div>
    );
};

export default DocumentUpload;
