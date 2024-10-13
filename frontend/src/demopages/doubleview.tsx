import { Document, Page, pdfjs } from "react-pdf"
import { useGetResume } from "@/tooling/db"
import "react-pdf/dist/esm/Page/TextLayer.css";
import "react-pdf/dist/esm/Page/AnnotationLayer.css"
import NextPageButton from "./components/nextpage";
pdfjs.GlobalWorkerOptions.workerSrc = new URL(
    'pdfjs-dist/build/pdf.worker.min.mjs',
    import.meta.url,
).toString();


const DoubleResumeView = ({ onNextClicked }: { onNextClicked?: () => void, resumeKey?: string }) => {
    const resume = useGetResume()
    const finetuned = useGetResume("finetuned")

    return <div className="relative grow p-4">
        <div className="flex flex-row">
            <div>
                Old resume
                <Document file={resume} className={"border mx-4"} >
                    <Page pageNumber={1} width={400} />
                </Document>
            </div>
            <div>
                New Resume

                <Document file={finetuned} className={"border mx-4"}>
                    <Page pageNumber={1} width={400} />
                </Document>
            </div>
        </div>
        {onNextClicked && <NextPageButton onNextClicked={onNextClicked} />}
    </div>
}

export default DoubleResumeView