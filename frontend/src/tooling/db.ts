import { ResumeIcon } from "@radix-ui/react-icons";
import { useEffect, useState } from "react";

// let db: any;
// const request = indexedDB.open('ResumeDB', 1);

// request.onupgradeneeded = (event: any) => {
//     db = event.target.result;
//     // Create an object store for resumes, with 'id' as the keyPath
//     const store = db.createObjectStore('resumes', { keyPath: 'id' });

//     // Optionally create an index on last edited time or other metadata
//     store.createIndex('lastEdited', 'lastEdited', { unique: false });
// };

// request.onsuccess = (event: any) => {
//     db = event.target.result;
// };

// // Handle error
// request.onerror = (event) => {
//     console.error('Error opening IndexedDB', event);
// };

function useIndexedDB() {
    const [db, setDb] = useState<any>(null);

    useEffect(() => {
        const request = indexedDB.open('ResumeDB', 1);

        request.onupgradeneeded = (event: any) => {
            const db = event.target.result;
            const store = db.createObjectStore('resumes', { keyPath: 'id' });
            store.createIndex('lastEdited', 'lastEdited', { unique: false });
        };

        request.onsuccess = (event: any) => {
            setDb(event.target.result);  // Update the state with the database
        };

        request.onerror = (event) => {
            console.error('Error opening IndexedDB', event);
        };
    }, []);  // Only runs once on component mount

    return db;
}


function saveResume(db: any, id: string, resumeFile: any) {
    const transaction = db.transaction(['resumes'], 'readwrite');
    const store = transaction.objectStore('resumes');

    const resumeData = {
        id,             // e.g., "base", "aws", "embedded systems"
        file: resumeFile,
        lastEdited: new Date() // Optional: store last edited time
    };

    const request = store.put(resumeData);

    request.onsuccess = () => {
        alert('Resume saved successfully!');
    };

    request.onerror = () => {
        alert('Error saving resume');
    };
}

const useSaveResume = () => {
    return []
}

function getResume(db: any, id: string, callback: (resume: any) => void) {
    const transaction = db.transaction(['resumes'], 'readonly');
    const store = transaction.objectStore('resumes');

    const request = store.get(id);

    request.onsuccess = () => {
        if (request.result) {
            callback(request.result.file);  // Pass the file content to the callback
        } else {
            callback(null)
            alert('Resume not found');
        }
    };

    request.onerror = () => {
        alert('Error fetching resume');
    };
}

function deleteResume(db: any, id: string) {
    const transaction = db.transaction(['resumes'], 'readwrite');
    const store = transaction.objectStore('resumes');

    const request = store.delete(id);

    request.onsuccess = () => {
        alert(`Resume with id ${id} deleted successfully!`);
    };

    request.onerror = () => {
        alert('Error deleting resume');
    };
}

function listIndexes(db: any, callback: (keys: any) => void) {
    if (!db) return;  // Make sure db is available
    const transaction = db.transaction(['resumes'], 'readonly');
    const store = transaction.objectStore('resumes');

    const request = store.getAllKeys();

    request.onsuccess = () => {
        const keys = request.result;  // List of keys like ['base', 'aws', 'embedded systems']
        callback(keys);
    };

    request.onerror = () => {
        console.error('Error fetching resume keys');
    };
}


const getResumeKeyList = () => {
    const [keylist, setKeyList] = useState<string[]>([]);
    // const [loading, setloading] = use
    const db = useIndexedDB();  // Get the db from the custom hook

    useEffect(() => {
        if (db) {
            listIndexes(db, (keys) => {
                setKeyList(keys);
            });
        }
    }, [db]);  // Now the effect depends on db changes

    return keylist;
}

const useGetResume = (key: string = "base") => {
    const [resume, setResume] = useState<any>(null);
    const [resumekey, setResumeKey] = useState(key)

    const db = useIndexedDB();

    useEffect(() => {
        if (db && resumekey) {
            getResume(db, resumekey, (resume) => {
                if (resume) {
                    setResume(resume); // Set resume if found
                } else {
                    setResume(null);  // Handle case where resume is not found
                }
            });
        } else {
            setResume(null);  // Handle case where no key is provided
        }
    }, [db, resumekey]);

    return [resume, resumekey, setResumeKey];

}

export { saveResume, listIndexes, deleteResume, useGetResume, getResumeKeyList, useSaveResume }