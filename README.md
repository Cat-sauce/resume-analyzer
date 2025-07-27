# Resume Analyzer

## 📑 Table of Contents

- [About the Project](#about-the-project)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Backend Setup](#backend-setup)
  - [Frontend Setup](#frontend-setup)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [License](#license)
- [Contact](#contact)

---

## 📘 About the Project

**Resume Analyzer** is a smart web-based tool that helps job seekers optimize their resumes for targeted job fields or specific Job Descriptions (JDs). By leveraging NLP and AI-powered keyword analysis, the system evaluates how well a resume aligns with industry standards and recruiter expectations.

The goal is to increase a candidate’s chances of passing through automated screening systems (ATS) and improve job application success rates.

---

## ✨ Features

- 📄 **Resume Upload:** Accepts `.pdf`, `.docx`, and `.txt` file formats.
- 🔍 **Job Field Selection:** Choose from a predefined list of popular job categories.
- 📎 **Optional JD Upload:** Upload a Job Description to tailor the analysis.
- 📊 **Field Match Score:** Compares resume content with cloud-hosted sample resumes for the selected field.
- 📑 **JD Match Score:** If a JD is provided, directly measures resume-JD alignment.
- 💬 **Score Remarks:** Clear performance remarks (e.g., “Excellent”, “Needs Improvement”) alongside scores.
- 🧠 **Keyword Suggestions:** Highlights missing technical terms and concepts relevant to the selected job role.
- 💻 **Modern UI:** Clean, intuitive interface with responsive design and loading indicators.

---

## 🛠️ Technologies Used

### Frontend

- **React.js** – Core UI framework  
- **Axios** – HTTP requests to backend  
- **CSS3** – Styling  
- **Google Fonts (Poppins)** – Typography  

### Backend

- **Python 3.x** – Main backend language  
- **Flask** – Lightweight web framework  
- **Flask-CORS** – Cross-origin support  
- **PyMuPDF (fitz)** – PDF text extraction  
- **python-docx** – DOCX text parsing  
- **Scikit-learn** – TF-IDF vectorization and cosine similarity  
- **KeyBERT** – BERT-based keyword extractor  
- **spaCy** – Tokenization and POS tagging  
- **Requests** – API communication  
- **Cloudinary** – Remote resume/keyword bank storage  

---

## 🚀 Getting Started

### 📌 Prerequisites

Ensure you have the following installed:

- **Node.js** (includes `npm`)
- **Yarn** *(optional)*
- **Python 3.x**
- **pip** *(Python package manager)*

---

### 🖥️ Backend Setup

1. **Clone the repository:**

```bash
git clone <your-repository-url>
cd resume-analyzer/backend
```

2. **Create and activate a virtual environment:**

```bash
# Windows
python -m venv venv
.env\Scriptsctivate

# macOS/Linux
python3 -m venv venv
source venv/bin/activate
```

3. **Install required packages:**

```bash
pip install -r requirements.txt
```

4. **Download spaCy model:**

```bash
python -m spacy download en_core_web_sm
```

5. **Configure Cloudinary:**

Create a file named `cloudinary_config.py` and add the following:

```python
import cloudinary
import os

cloudinary.config(
  cloud_name = os.environ.get('CLOUDINARY_CLOUD_NAME', 'YOUR_CLOUD_NAME'),
  api_key = os.environ.get('CLOUDINARY_API_KEY', 'YOUR_API_KEY'),
  api_secret = os.environ.get('CLOUDINARY_API_SECRET', 'YOUR_API_SECRET'),
  secure = True
)
```

> 💡 Use environment variables for production deployments.

6. **Run the Flask server:**

```bash
python app.py
```

By default, the backend will run on `http://127.0.0.1:5000`.

---

### 🌐 Frontend Setup

1. **Navigate to the frontend directory:**

```bash
cd ../frontend
```

2. **Install dependencies:**

```bash
npm install
# OR
yarn install
```

3. **Run the React app:**

```bash
npm start
# OR
yarn start
```

This launches the frontend at `http://localhost:3000`.

---

## 🧪 Usage

1. Ensure both backend (`localhost:5000`) and frontend (`localhost:3000`) servers are running.
2. Open the app in your browser.
3. Upload your resume.
4. Select a job field.
5. Optionally upload a JD file.
6. Click **Analyze**.
7. Review match scores, remarks, and improvement suggestions.

---

## 🗂️ Project Structure

[Click to View Folder Structure](https://drive.google.com/file/d/1E-etBy6LQBjYImhFCV2Dn4yPy7Dff6za/view?usp=sharing)

---

## 🧧 Preview

[(<2025-06-29 23 45 18.png>)](https://drive.google.com/file/d/1hfjtlS6oDH8Z3_xEvbhzV9nPAuDYREQu/view?usp=drive_link)

---

## 📄 License

This project is licensed under the [MIT License](https://choosealicense.com/licenses/mit/).

---

## 📬 Contact

**Harsh Vardhan Saini**  
📧 hvardhnaharsh07@gmail.com  
🔗 [GitHub Repository](https://github.com/Cat-sauce/resume-analyzer)

---
