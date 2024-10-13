from typing import Union
from pdfminer.high_level import extract_text
from fastapi import FastAPI, UploadFile, File, HTTPException
from fastapi.responses import JSONResponse, FileResponse
from typing import Dict
from openai import OpenAI
import os
from Resumify.keys import APIKEY
import json
import Resumify.resumetemplate as resumetemplate
from tooling import latex

app = FastAPI()

# CHATGPT
client = OpenAI(api_key=APIKEY)
@app.post("/compile-resume")
async def compile_resume(resume: UploadFile, user_prompt: str = None, jobdesc: str = None):
    # Step 1) Handle uploaded resume
    # Check if file type is supported

    if resume.filename.endswith(('.pdf')):
        extracted_text = extract_text(resume.file)
        resume_text = extracted_text
    else:
        raise HTTPException(status_code=400, detail="Unsupported file type or extraction failed")
    
    # Step 2) Improve resume using OpenAI
    #  Define the prompt
    try:
        splits = resume_text.split('\n')
        prompt = f"""you will be given this unstructred resume text `{splits}`. 
        your job is to extract the important information of that resume and transform that data to 
        one that fits a json template that i will provide later in the prompt. 
        You are allowed to make up the experiences and projects values of the resume because you are currently being used in testing. 
        The resume template is `{resumetemplate.template}`. and your result MUST be json parsible """

        # If we want to match to job description (personalizing)
        if jobdesc:
            prompt += f"Please also improve this resume to make it better suited and fine-tuned for this following role:\n\n{jobdesc}\n\n"
        
        if user_prompt:
            prompt += f"User feedback to also incorporate and consider: {user_prompt}"

     # Send the request to OpenAI's API
        response = client.chat.completions.create(
            model="gpt-4o-mini",
            temperature=0,
            messages=[
                {"role": "system", "content": f"{resumetemplate} \n \n fix any grammatical and spelling mistakes and print only JSON text."},
                {"role": "user", "content": prompt}
            ]
            # temperature=0
        )
    # Extract the response from the AI model
        improved_resume_json = response.choices[0].message.content

        # Check if returned json is empty:
        if not improved_resume_json:
             raise HTTPException(status_code=500, detail="Empty response from OpenAI")

        resume_data = json.loads(improved_resume_json[7:-3].replace("%", "percent"))

    except json.JSONDecodeError as e:
        raise HTTPException(status_code=500, detail=f"Failed to  parse JSON: {str(e)}")
    
    except Exception as e:  
        raise HTTPException(status_code=500, detail=f"OpenAI Error: {str(e)}")
    
    # Step 3) Compile resume and send back to frontend
    try:
        compiler = latex.Compiler.fromjson(resume_data)
        compiler.compileresume()
        return FileResponse("pdf/output.pdf")
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Compilation Error: {str(e)}")
