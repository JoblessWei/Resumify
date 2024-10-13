const JobApplication = ({ src, title }: { src: string, title: string }) => {
    return (
        <div className="relative w-screen h-screen flex flex-col">
            <div className="mb-4">
                We will be using this job application
            </div>
            <iframe
                src={src}
                title={title}
                className="w-full h-full"
            // style={{ width: "100%", height: "100%", border: "none" }}
            />
        </div>
    );
}

export default JobApplication