# Use an official Python runtime as a parent image
FROM python:3.9-slim

# Set the working directory
WORKDIR /code

# Copy the requirements file into the container
COPY requirements.txt /code/requirements.txt

# Install the dependencies
RUN pip install --no-cache-dir -r /code/requirements.txt

# Copy the FastAPI app into the container
COPY app.py /code/app.py

# Command to run the app using uvicorn
CMD ["fastapi", "dev", "app.py", "--port", "80", "--host", "127.0.0.1"]
