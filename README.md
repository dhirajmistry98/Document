# Document Dashboard

## Overview

The Document Dashboard is a web application that allows users to manage, view, and upload documents efficiently. It features a user-friendly interface for searching documents and a straightforward upload process.

## Features

- **Search Functionality:** Quickly find documents by title or category.
- **Document Upload:** Easily upload new documents to the dashboard.
- **Responsive Design:** Optimized for various screen sizes, ensuring a smooth user experience.

## Technologies Used

- **Frontend:** React.js
- **Backend:** Firebase Firestore
- **Styling:** CSS

## Getting Started

### Prerequisites

Make sure you have the following installed:

- **Node.js** (LTS version recommended)
- **npm** (comes with Node.js)
- **Firebase account** (to access Firebase services)

### Installation

1. **Clone the repository:**

   ```bash
   git clone <repository-url>

**Running the Application**
npm start
**Search Functionality**
The search feature allows users to filter documents based on their titles or categories. Here’s how it works:

**Input Field:** A search bar is provided at the top of the dashboard.
**Real-Time Search:** As you type in the search bar, the document list updates in real-time, showing only the documents that match your search criteria.
**Case Insensitivity:**The search is case-insensitive, making it easier to find documents.
**How to Use the Search**
Simply enter a keyword or phrase into the search bar, and the document list will automatically filter to display matching results.
**Document Upload**
Uploading documents to the dashboard is simple and user-friendly. Here’s how to do it:

**Upload Button:** Click the "Upload" button located within the dashboard controls.
Select Document: A file selection dialog will appear, allowing you to choose the document you wish to upload from your device.
**Upload Process:**
Once you select the file, the upload process begins automatically.
A loading indicator may appear while the document is being uploaded.
**Confirmation:** After a successful upload, the new document will appear in the document list, and you can search for it using the search functionality.
**Supported Document Types**
The application supports the following document formats:

PDF
DOCX
TXT
Images (JPG, PNG)
**Data Storage in Firebase**
**Firestore:** All document metadata (title, category, URL) is stored in Firestore, allowing for easy querying and retrieval.
Firebase Storage: Actual document files are stored in Firebase Storage, with URLs saved in Firestore for easy access.

### Instructions to Use:

1. **Copy the above text.**
2. **Create a new file named `README.md` in the root of your project directory.**
3. **Paste the copied text into the `README.md` file.**
4. **Customize any sections as necessary to better fit your specific project.**

This README provides a comprehensive guide on how to set up and use your Document Dashboard application, covering installation, features, functionality, and data management with Firebase. Let me know if you need any further modifications!
