import React from 'react';
import './DocumentList.css';

const DocumentList = ({ documents }) => {
    return (
        <div className="document-list-container">
            <h2 className="document-list-header">Uploaded Documents</h2>
            <ul className="document-list">
                {documents.length > 0 ? (
                    documents.map(doc => (
                        <li key={doc.id} className="document-item">
                            <a 
                                href={`https://your-storage-bucket-url/documents/${doc.fileName}`} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="document-link"
                            >
                                {doc.title}
                            </a>
                            <span className="document-category"> - {doc.category}</span>
                        </li>
                    ))
                ) : (
                    <li className="no-documents">No documents uploaded yet.</li>
                )}
            </ul>
        </div>
    );
};

export default DocumentList;
