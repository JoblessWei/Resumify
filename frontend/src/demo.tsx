import { FileCheck } from "lucide-react"
import { Button } from "./components/ui/button"
import { useGetResume, useSaveResume } from "./tooling/db"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

const Demo = () => {
    const [resume] = useGetResume()
    if (resume) {
        console.log(resume);

    }
    const handleFileUpload = (event: any) => {
        const file = event.target.files[0];
        if (file) {
            // Read file content (as text for example)
            const reader = new FileReader();
            reader.onload = (e: any) => {
                saveToLocalStorage(file); // Optional: Save file to local storage
            };
            reader.readAsText(file); // You can change this to readAsBinaryString or other formats as needed
        }
    };
    const saveToLocalStorage = (file: any, resumeid: string = "base") => {
        // saveResume(resumeid, file)
    };

    return <div className="flex flex-row  h-screen">
        <div className="flex-none border">
            <Button variant={"outline"}>
                How it works
            </Button>
        </div>
        <div className="grow flex flex-col justify-center p-48">
            <div className="">Hello, welcome to resumify</div>
            <div>This is a tool that helps finetune your resume to job applications</div>
            {null ? <div>
                <div>
                    <Alert>
                        <FileCheck className="h-4 w-4" />
                        <AlertTitle>{resume.name}</AlertTitle>
                        <AlertDescription>
                            uploaded {(new Date(resume.lastModifiedDate)).toString()}
                        </AlertDescription>
                    </Alert>

                </div>
                <div>
                    It looks like we already have a resume uploaded
                    Lets see how you can fine tune the resume ➡️
                </div>

            </div> : <div>
                You don't have a resume uploaded. Why don't you upload a resume
                <input type="file" onChange={handleFileUpload} accept=".pdf" className="bg-white text-black" />
                {/* <Button><Upload className="h-4 w-4" /></Button> */}
            </div>}
        </div>
    </div>
}

export default Demo