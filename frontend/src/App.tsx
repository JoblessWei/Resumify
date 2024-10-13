import './App.css'
import ResumeUploader from './ResumePage'
import { useGetAllResumes, useGetResume } from './tooling/db'
import { pdfjs, Document, Page } from 'react-pdf'
import "react-pdf/dist/esm/Page/TextLayer.css";
import "react-pdf/dist/esm/Page/AnnotationLayer.css"
import { Button } from "@/components/ui/button"
import { useState } from 'react';

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.mjs',
  import.meta.url,
).toString();

function App() {
  // const [hasResume, setHasResume] = useState(false)

  // listIndexes()
  const resumes = useGetAllResumes()
  // const pagenumber = useState(1)
  const [resumeKey, changekey] = useState(resumes.length > 0 ? resumes[0] : null);

  // Call useGetResume hook conditionally, but ensure it's called in every render
  const resume = useGetResume(resumeKey || "base");

  return (

    <>
      {resumes.length > 0 ? <>
        <div>
          Your resume
        </div>
        <Document file={resume} className={"border"}>
          <Page pageNumber={1} />
        </Document>
        <div>
          {resumeKey} resume
        </div>
        You have a resume
        <div>
          See your other resumes
        </div>
        <div>
          {resumes.filter((val) => {
            val != resumeKey
          }).map((key) => <Button variant={"outline"} className='w-full flex justify-start my-2'>
            {key} Resume
          </Button>)
          }

          <Button variant={"outline"} className='w-full flex justify-start my-2' onClick={() => changekey("hel")}>
            OpenAi Resume
          </Button>
          <Button variant={"outline"} className='w-full flex justify-start my-2'>
            Google Resume
          </Button>
          <Button variant={"outline"} className='w-full flex justify-start my-2'>
            Embedded sys Resume
          </Button>
          <Button variant={"outline"} className='w-full flex justify-start my-2'>
            etc
          </Button>
          <Button variant={"outline"} className='w-full flex justify-start my-2'>
            etc
          </Button>
          <Button>
            Demo!
          </Button>
        </div>
      </> : <ResumeUploader />}
    </>
  )
}

export default App
