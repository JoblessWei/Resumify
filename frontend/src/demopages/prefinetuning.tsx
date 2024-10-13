"use client"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useGetResume, useSaveResume } from "@/tooling/db"
import { useState, useEffect } from "react"
import { Progress } from "@/components/ui/progress"
const formSchema = z.object({
    linkedin: z.string().min(2).max(50),
    github: z.string(),
    joblink: z.string(),
    link1: z.union([z.string(), z.undefined()]),
    link2: z.union([z.string(), z.undefined()])
})

const PreFineTuning = () => {
    const resume = useGetResume()
    const saveResume = useSaveResume()
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
    })

    const [uploading, setUploading] = useState(false)
    const [done, setDone] = useState(false)
    const handleUpload = async (val: {
        linkedin: string;
        github: string;
        joblink: string;
        link1?: string | undefined;
        link2?: string | undefined;
    }
    ) => {

        // Create FormData to send the file
        const formData = new FormData();
        formData.append("resume", resume);

        try {
            // Post form data to /compile-resume
            setUploading(true)
            const response = await fetch(`http://localhost:8000/compile-resume?user_prompt=using%20my%20github%20which%20is%20${val.github}%20and%20my%20linkedin%20which%20is%20${val.linkedin}%20as%20sources%20finetune%20my%20resume%20to%20the%20given%20job%20app%20and%20make%20it%20relevant&jobdesc=the%20job%20link%20is%20${val.joblink}%20search%20and%20parse%20it`, {
                method: "POST",
                body: formData,

            });

            if (response.ok) {
                // Convert blob to file
                setUploading(false)
                const blob = await response.blob();

                const pdfFile = new File([blob], "compiled_resume.pdf", {
                    type: "application/pdf",
                });

                console.log("pdf is ");
                console.log(pdfFile);

                saveResume("finetuned", pdfFile)
                setDone(true)
            } else {
                console.error("Failed to compile resume", response.statusText);
            }
        } catch (error) {
            console.error("Error during upload:", error);
        }
    };


    return <div className="relative grow px-48">
        <div>We have saved the job description from the previous page for finetuning.</div>
        <div>Before we can proceed, we will require some data that are important to finetuning.
            For example, your linkedin and your github</div>
        {!done && uploading ? <ProgressDemo /> : <Form {...form} >
            <form onSubmit={form.handleSubmit((val) => {
                handleUpload(val)
            })} className="space-y-8 border py-4 px-8 mt-4">
                <FormField
                    control={form.control}
                    name="linkedin"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Linkedin</FormLabel>
                            <FormControl>
                                <Input placeholder="shadcn" {...field} />
                            </FormControl>
                            <FormDescription>
                                This field is for your linkedin address
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="github"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Github</FormLabel>
                            <FormControl>
                                <Input placeholder="shadcn" {...field} />
                            </FormControl>
                            <FormDescription>
                                This field is for your github address
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="joblink"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Joblink</FormLabel>
                            <FormControl>
                                <Input placeholder="shadcn" {...field} />
                            </FormControl>
                            <FormDescription>
                                This field is for the job application
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="link1"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Link1</FormLabel>
                            <FormControl>
                                <Input placeholder="shadcn" {...field} />
                            </FormControl>
                            <FormDescription>
                                This optional field is for any useful links
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="link2"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Link2</FormLabel>
                            <FormControl>
                                <Input placeholder="shadcn" {...field} />
                            </FormControl>
                            <FormDescription>
                                This optional field is for any useful links
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type="submit">Submit</Button>
            </form>
        </Form>}
        {done && <div className="my-4">The new resume has been compiled and downloaded !!!!!</div>}
    </div>
}

export function ProgressDemo() {
    const [progress, setProgress] = useState(13)

    useEffect(() => {
        const timer = setTimeout(() => setProgress(66), 500)
        return () => clearTimeout(timer)
    }, [])

    return <Progress value={progress} className="w-full" />

}

export default PreFineTuning