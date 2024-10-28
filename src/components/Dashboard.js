

import React, { useContext, useState, useEffect, useCallback } from 'react';
import { DocumentContext } from '../context/DocumentContext';
import { Search, Upload, X } from 'lucide-react';
import DocumentUpload from './DocumentUpload';
import { debounce } from '../utils/debounce';
import './Dashboard.css';

export default function Dashboard() {
  const { documents, isLoading, addDocument } = useContext(DocumentContext);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredDocuments, setFilteredDocuments] = useState(documents);
  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const [viewingDocument, setViewingDocument] = useState(null);

  const debouncedSearch = useCallback(
    debounce((term) => {
      const filtered = documents.filter(
        (doc) =>
          doc.title.toLowerCase().includes(term.toLowerCase()) ||
          doc.category.toLowerCase().includes(term.toLowerCase())
      );
      setFilteredDocuments(filtered);
    }, 300),
    [documents]
  );

  useEffect(() => {
    debouncedSearch(searchTerm);
  }, [searchTerm, debouncedSearch]);

  const handleUploadComplete = (newDocument) => {
    addDocument(newDocument);
    setIsUploadOpen(false);
  };

  const handleViewDocument = (document) => {
    console.log("Viewing Document:", document); // Debugging log
    setViewingDocument(document);
  };

  const handleCloseViewer = () => {
    setViewingDocument(null);
  };

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <h1>Document Dashboard</h1>
        <p>Manage and view your uploaded documents</p>
      </header>

      <div className="dashboard-controls">
        <div className="search-bar">
          <Search className="search-icon" />
          <input
            type="text"
            placeholder="Search documents..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <button onClick={() => setIsUploadOpen(!isUploadOpen)} className="upload-button">
          <Upload className="icon" /> Upload Document
        </button>
      </div>

      {isUploadOpen && (
        <div className="upload-modal">
          <h2>Upload New Document</h2>
          <DocumentUpload onUploadComplete={handleUploadComplete} />
        </div>
      )}

      {isLoading ? (
        <div className="loading-spinner"></div>
      ) : filteredDocuments.length > 0 ? (
        <div className="document-list">
          {filteredDocuments.map((doc) => (
            <div className="document-card" key={doc.id}>
              <h3>{doc.title}</h3>
              <span className="document-category">{doc.category}</span>
              <p>{doc.description || 'No description available.'}</p>
              <button className="view-button" onClick={() => handleViewDocument(doc)}>
                View Document
              </button>
            </div>
          ))}
        </div>
      ) : (
        <div className="no-documents">
          <X className="no-documents-icon" />
          <h3>No documents found</h3>
          <p>Try adjusting your search or upload a new document.</p>
        </div>
      )}

      {/* Document Viewer Modal */}
      {viewingDocument && (
        <div className="document-viewer">
          <div className="viewer-header">
            <h2>{viewingDocument.title}</h2>
            <button onClick={handleCloseViewer}>Close</button>
          </div>
          <iframe
            src={`https://drive.google.com/viewerng/viewer?embedded=true&url=${viewingDocument.fileName}`}
            title={viewingDocument.title}
            className="document-frame"
          />
        </div>
      )}
    </div>
  );
}
