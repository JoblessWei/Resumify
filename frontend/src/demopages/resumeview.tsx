import { Document, Page, pdfjs } from "react-pdf"
import { useGetResume } from "@/tooling/db"
import "react-pdf/dist/esm/Page/TextLayer.css";
import "react-pdf/dist/esm/Page/AnnotationLayer.css"
import NextPageButton from "./components/nextpage";
pdfjs.GlobalWorkerOptions.workerSrc = new URL(
    'pdfjs-dist/build/pdf.worker.min.mjs',
    import.meta.url,
).toString();


const ResumeView = ({ onNextClicked, resumeKey = "base" }: { onNextClicked?: () => void, resumeKey?: string }) => {
    const resume = useGetResume(resumeKey)
    return <div className="relative grow px-48">
        <div className="my-4">This should be the uploaded resume</div>
        <Document file={resume} className={"border"} >
            <Page pageNumber={1} />
        </Document>
        {onNextClicked && <NextPageButton onNextClicked={onNextClicked} />}
    </div>
}

export default ResumeView