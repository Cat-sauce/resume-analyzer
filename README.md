
# Resume Analyzer

[(<2025-06-29 23 45 18.png>)](https://drive.google.com/file/d/1hfjtlS6oDH8Z3_xEvbhzV9nPAuDYREQu/view?usp=drive_link)


## Table Of Content

- About The Project

- Features

- Technologies Used

- Getting Started

    - Prerequisites

    - Backend Setup

    - Frontend Setup

- Usage

- Project Structure

- License

- Contact
## About The Project
The Resume Analyzer is a web application designed to help job seekers optimize their resumes for specific job roles and descriptions. By leveraging advanced text analysis techniques, it provides valuable insights into how well a resume aligns with a target job field and a provided Job Description (JD). Users receive a comprehensive score, along with actionable suggestions for improvement, helping them tailor their applications more effectively.

This tool aims to bridge the gap between candidate qualifications and employer expectations, increasing the chances of resumes passing initial screening stages.
## Features
- **Resume Upload:** Supports PDF, DOCX, and TXT formats for resume submission.

- **Job Field Selection:** Allows users to select from a predefined list of common job fields.

- **Optional Job Description (JD) Upload:** Users can optionally upload a specific JD for a more targeted analysis.

- **Field Match Score:** Calculates the similarity of the resume against a bank of sample resumes for the chosen job field.

- **JD Match Score:** (If JD is provided) Calculates the direct similarity between the resume and the uploaded Job Description.

- **Dynamic Score Remarks:** Provides immediate, clear remarks (e.g., "Outstanding!", "Needs Work") next to the percentage scores.

- **Actionable Suggestions:** Offers a list of keywords and concepts that are missing from the resume but are highly relevant to the target job field, along with their descriptions.

- **User-Friendly Interface:** Clean, intuitive design with responsive elements and clear loading indicators.
## Technologies Used
#### *Frontend:*

`React:` A JavaScript library for building user interfaces.

`Axios:` Promise-based HTTP client for making API requests.

`CSS3:` For styling and visual presentation.

`Google Fonts (Poppins):` For typography.

#### *Backend:*

`Python 3.x:` Core programming language.

`Flask:` A lightweight WSGI web application framework.

`Flask-CORS:` Enables Cross-Origin Resource Sharing.

`PyMuPDF (fitz):` For PDF text extraction.

`python-docx:` For DOCX text extraction.

`Scikit-learn:` For text vectorization (TF-IDF) and cosine similarity calculations.

`KeyBERT:` For keyword extraction from text using BERT embeddings.

`spaCy:` For natural language processing (used by KeyBERT for tokenization/POS tagging).

`Requests:` For making HTTP requests (e.g., fetching data from Cloudinary).

`Cloudinary:` For storing and serving keyword banks and sample resumes.
## Getting Started
Follow these instructions to set up and run the project locally on your machine.

#### **Prerequisites**

Before you begin, ensure you have the following installed:

- **Node.js & npm/Yarn:** For the React frontend.

    - Node.js (includes npm)

    - Yarn (optional)

- **Python 3.x:** For the Flask backend.

    - Python

- **pip:** Python package installer (usually comes with Python).

#### **Backend Setup**
#### 1. Clone the repository:

```http
    git clone <your-repository-url>
    cd resume-analyzer/backend
```

#### 2. Create a virtual environment (recommended):

```http
    python -m venv venv
```

#### 3. Activate the virtual environment:

- *Windows:*

```http
    .\venv\Scripts\activate
```

- *macOS/Linux:*

```http
    source venv/bin/activate
```

#### 4. Install Python dependencies:
Ensure you have the `requirements.txt` file  in your backend directory.

```http
    pip install -r requirements.txt
```

#### 5. Download spaCy language model:

```http
    python -m spacy download en_core_web_sm
```

#### 6. Cloudinary Configuration:
Create a file named `cloudinary_config.py` in your backend directory (next to `resume_analyzer.py`) and add your Cloudinary credentials:

```http
import cloudinary
import os

cloudinary.config(
  cloud_name = os.environ.get('CLOUDINARY_CLOUD_NAME', 'YOUR_CLOUD_NAME'),
  api_key = os.environ.get('CLOUDINARY_API_KEY', 'YOUR_API_KEY'),
  api_secret = os.environ.get('CLOUDINARY_API_SECRET', 'YOUR_API_SECRET'),
  secure = True
)
```

Replace `YOUR_CLOUD_NAME`, `YOUR_API_KEY`, and `YOUR_API_SECRET` with your actual Cloudinary credentials. For production, use environment variables.

#### 7. Run the Flask backend:

```http
    python app.py
```
The backend server will typically run on ```http://127.0.0.1:5000.```


#### **Frontend Setup**
#### 1. Navigate to the frontend directory:

```http 
cd ../frontend # Go back to root, then into frontend
```


#### 2. Install Node.js dependencies:

```http
npm install
# OR
yarn install
```

#### 3. Run the React frontend:

```http
npm start
# OR
yarn start
```

This will usually open the application in your browser at `http://localhost:3000.`
## Usage
#### 1. Launch both the backend and frontend servers as described in the Getting Started section.

#### 2. Open your web browser and navigate to the frontend URL (e.g., `http://localhost:3000`).

#### 3. Upload your resume (PDF, DOCX, or TXT).

#### 4. Select a Job Field from the dropdown.

#### 5. Optionally, check "I have a Job Description (JD)" and upload your JD file.

#### 6. Click "Analyze" to get your resume's match scores and suggestions.

#### 7. Review the scores, remarks, and suggested keywords to improve your resume.
## Project Structure
https://drive.google.com/file/d/1E-etBy6LQBjYImhFCV2Dn4yPy7Dff6za/view?usp=sharing
## License

[MIT](https://choosealicense.com/licenses/mit/)


## Contact
Harsh Vardhan Saini - hvardhnaharsh07@gmail.com 

Project Link - https://github.com/Cat-sauce/resume-analyzer
