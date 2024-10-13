import { FileCheck } from "lucide-react"
import { useGetResume, useSaveResume } from "../tooling/db"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import NextPageButton from "./components/nextpage"
const Intro = ({ onNextClicked }: { onNextClicked: () => void }) => {
    const resume = useGetResume("base")
    const saveResume = useSaveResume()
    if (resume) {
        console.log(resume);

    }
    const handleFileUpload = (event: any) => {
        const file = event.target.files[0];
        if (file) {
            // Read file content (as text for example)
            const reader = new FileReader();
            reader.onload = () => {
                saveToLocalStorage(file); // Optional: Save file to local storage
            };
            reader.readAsText(file); // You can change this to readAsBinaryString or other formats as needed
        }
    };
    const saveToLocalStorage = (file: any, resumeid: string = "base") => {
        saveResume(resumeid, file)
    };

    return <div className="relative grow flex flex-col justify-center p-48">
        <div className="my-2">Hello, welcome to resumify</div>
        <div className="my-2">This is a tool that helps finetune your resume to job applications</div>
        {resume ? <div>
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

        {resume && <NextPageButton onNextClicked={onNextClicked} />}
    </div>
}

export default Intro