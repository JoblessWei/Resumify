import React, { useState } from 'react';
import { saveResume } from './tooling/db';
function ResumeUploader() {
    const [resumeFile, setResumeFile] = useState(null); // To store resume in memory
    const [resumeText, setResumeText] = useState("");   // Optional: Processed resume content

    // Handle file upload
    const handleFileUpload = (event: any) => {
        const file = event.target.files[0];
        if (file) {
            setResumeFile(file);

            // Read file content (as text for example)
            const reader = new FileReader();
            reader.onload = (e: any) => {
                const text = e.target.result;
                setResumeText(text); // Process the file content here
                saveToLocalStorage(file); // Optional: Save file to local storage
            };
            reader.readAsText(file); // You can change this to readAsBinaryString or other formats as needed
        }
    };

    // Save file in local storage (optional)
    const saveToLocalStorage = (file: any, resumeid: string = "base") => {
        saveResume(resumeid, file)
    };

    // Function to send resume to the server
    const sendToServer = async () => {
        if (resumeFile) {
            const formData = new FormData();
            formData.append('resume', resumeFile);

            // Send file to server
            try {
                const response = await fetch('https://your-server-url.com/upload', {
                    method: 'POST',
                    body: formData
                });
                if (response.ok) {
                    alert('Resume uploaded successfully');
                } else {
                    alert('Error uploading resume');
                }
            } catch (error) {
                console.error('Error:', error);
            }
        }
    };

    return (
        <div>
            <h1>Upload Your Resume</h1>
            <input type="file" onChange={handleFileUpload} accept=".pdf" />
            <button onClick={sendToServer}>Submit Resume</button>

            {/* Optional: Display processed resume content */}
            {resumeText && (
                <div>
                    <h2>Processed Resume Content</h2>
                    <pre>{resumeText}</pre>
                </div>
            )}
        </div>
    );
}

export default ResumeUploader;
