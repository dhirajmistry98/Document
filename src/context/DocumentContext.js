import React, { createContext, useState, useEffect } from 'react';
import { db } from '../firebase/firebaseConfig';
import { collection, getDocs } from 'firebase/firestore';

export const DocumentContext = createContext();

export const DocumentProvider = ({ children }) => {
    const [documents, setDocuments] = useState([]);

    useEffect(() => {
        const fetchDocuments = async () => {
            const docsCollection = collection(db, 'documents');
            const docSnapshot = await getDocs(docsCollection);
            const docList = docSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setDocuments(docList);
        };

        fetchDocuments();
    }, []);

    return (
        <DocumentContext.Provider value={{ documents }}>
            {children}
        </DocumentContext.Provider>
    );
};
