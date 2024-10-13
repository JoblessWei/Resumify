import { useState } from "react"
import { Button } from "./components/ui/button"
import Intro from "./demopages/intro"
import ResumeView from "./demopages/resumeview"
import JobApplication from "./demopages/jobapplication"
import PreFineTuning from "./demopages/prefinetuning"

const Demo = () => {
    const [index, setIndex] = useState(0)
    const pages = [
        <Intro onNextClicked={() => setIndex(1)} />,
        <ResumeView onNextClicked={() => setIndex(2)} />,
        <JobApplication src="https://jobs.lever.co/spotify/934ede25-003a-4af6-84ee-a8dc5555f243" title="Junior Backend Engineer, Content Catalog" />,
        <PreFineTuning />,
        <ResumeView resumeKey="finetuned" />
    ]

    return <div className="flex flex-row">
        <div className="flex flex-col justify-stretch flex-none w-1/6 border">
            <div className="h-16">
                DEMO!!!
            </div>
            <Button variant={"outline"} className="mx-4 my-2" onClick={() => setIndex(0)}>
                How it works
            </Button>
            <Button variant={"outline"} className="mx-4 my-2" onClick={() => setIndex(1)}>
                View your Resume
            </Button>

            <Button variant={"outline"} className="mx-4 my-2" onClick={() => setIndex(2)}>
                Demo Job Application
            </Button>

            <Button variant={"outline"} className="mx-4 my-2" onClick={() => setIndex(3)}>
                Resume Finetuning
            </Button>

            <Button variant={"outline"} className="mx-4 my-2" onClick={() => setIndex(4)}>
                View finetuned resume
            </Button>

            <Button variant={"outline"} className="mx-4 my-2" onClick={() => setIndex(3)}>
                View Both
            </Button>

        </div>
        {pages.length > index && pages[index]}
    </div>
}


export default Demo