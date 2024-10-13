import { useState, useEffect } from "react";

// Initialize IndexedDB with 'ResumeDB' and version 1
const useIndexedDB = () => {
    const [db, setDb] = useState<IDBDatabase | null>(null);

    useEffect(() => {
        const request = indexedDB.open("ResumeDB", 1);

        request.onupgradeneeded = (event: any) => {
            const db = event.target.result;
            if (!db.objectStoreNames.contains("resumes")) {
                const store = db.createObjectStore("resumes", { keyPath: "id" });
                store.createIndex("lastEdited", "lastEdited", { unique: false });
            }
        };

        request.onsuccess = (event: any) => {
            setDb(event.target.result);
        };

        request.onerror = (event) => {
            console.error("Error opening IndexedDB", event);
        };
    }, []);

    return db;
};

// Hook to get all resume keys
const useGetAllResumes = () => {
    const [resumes, setResumes] = useState<string[]>([]);
    const db = useIndexedDB();

    useEffect(() => {
        if (db) {
            const transaction = db.transaction("resumes", "readonly");
            const store = transaction.objectStore("resumes");
            const request = store.getAllKeys();

            request.onsuccess = () => {
                setResumes(request.result);
            };

            request.onerror = () => {
                console.error("Error fetching resume keys");
            };
        }
    }, [db]);

    return resumes;
};

// Hook to get a specific resume by key
const useGetResume = (key: string | null = "base") => {
    const [resume, setResume] = useState<any>(null);
    const db = useIndexedDB();

    useEffect(() => {
        if (db && key) {
            const transaction = db.transaction("resumes", "readonly");
            const store = transaction.objectStore("resumes");
            const request = store.get(key);

            request.onsuccess = () => {
                if (request.result) {
                    setResume(request.result.file);
                } else {
                    setResume(null); // Resume not found
                }
            };

            request.onerror = () => {
                console.error("Error fetching resume");
            };
        } else {
            setResume(null);
        }
    }, [db, key]);

    return resume;
};

// Hook to save or update a resume
const useSaveResume = () => {
    const db = useIndexedDB();

    const saveResume = (id: string, resumeFile: any) => {
        if (db) {
            const transaction = db.transaction("resumes", "readwrite");
            const store = transaction.objectStore("resumes");
            const resumeData = {
                id,
                file: resumeFile,
                lastEdited: new Date(),
            };

            const request = store.put(resumeData);

            request.onsuccess = () => {
                alert("Resume saved successfully!");
            };

            request.onerror = () => {
                alert("Error saving resume");
            };
        }
    };

    return saveResume;
};

// Hook to delete a resume by key
const useDeleteResume = () => {
    const db = useIndexedDB();

    const deleteResume = (id: string) => {
        if (db) {
            const transaction = db.transaction("resumes", "readwrite");
            const store = transaction.objectStore("resumes");
            const request = store.delete(id);

            request.onsuccess = () => {
                alert(`Resume with id ${id} deleted successfully!`);
            };

            request.onerror = () => {
                alert("Error deleting resume");
            };
        }
    };

    return deleteResume;
};

export { useGetAllResumes, useDeleteResume, useGetResume, useSaveResume, }