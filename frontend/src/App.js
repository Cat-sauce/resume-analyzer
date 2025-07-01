import React, { useState } from 'react';
import axios from 'axios';
// Removed external CSS import: import './App.css';

function App() {
  const [resumeFile, setResumeFile] = useState(null);
  const [jobField, setJobField] = useState('');
  const [hasJD, setHasJD] = useState(false);
  const [jdFile, setJdFile] = useState(null);
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const jobFields = ['Data Scientist', 'Data Analyst', 'IoT Engineer', 'Machine Learning Engineer','AI Researcher','Software Developer','Backend Engineer','Frontend Developer','Full Stack Developer','Mobile App Developer','Devops Engineer','Cloud Engineer','Cybersecurity Analyst','Blockchain Developer','Product Manager','UX UI Designer','Graphic Designer','Web Designer','Game Developer','Digital Marketer','Seo Specialist','Content Writer','Social Media Manager','Copywriter','Business Analyst','Business Analyst','Investment Banker','Accountant','HR Manager','Mechanical Engineer','Civil Engineer','Electrical Engineer','Electronics Engineer','Chemical Engineer'];

  // Function to determine the remark based on the score
  const getScoreRemark = (score) => {
    if (score >= 80) {
      return 'Outstanding!';
    } else if (score >= 70) {
      return 'Excellent!';
    } else if (score >= 60) {
      return 'Good, Room to Grow';
    } else if (score >= 40) { 
      return 'Needs Work';
    } else {
      return 'Low Match'; 
    }
  };

  // Function to handle resume file upload
  const handleResumeUpload = (e) => {
    setResumeFile(e.target.files[0]);
  };

  // Function to clear the selected resume file
  const clearResumeFile = () => {
    setResumeFile(null);
    const resumeInput = document.getElementById('resumeFileInput');
    if (resumeInput) resumeInput.value = '';
  };

  // Function to handle JD file upload
  const handleJDUpload = (e) => {
    setJdFile(e.target.files[0]);
  };

  // Function to clear the selected JD file
  const clearJdFile = () => {
    setJdFile(null);
    const jdInput = document.getElementById('jdFileInput');
    if (jdInput) jdInput.value = '';
  };

  const handleSubmit = async () => {
    if (!resumeFile || !jobField) {
      console.warn('Please select a resume file and job field.');
      return;
    }

    const formData = new FormData();
    formData.append('resume', resumeFile);
    formData.append('job_field', jobField.replace(/\s+/g, '_').toLowerCase());
    if (hasJD && jdFile) {
      formData.append('jd', jdFile);
    }

    try {
      setLoading(true);
      const response = await axios.post('http://127.0.0.1:5000/analyze', formData);
      setResults(response.data);
    } catch (err) {
      console.error('Error analyzing resume:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Embedded CSS for the entire application */}
      <style>
        {`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;600&display=swap');

        body {
          margin: 0;
          padding: 30px 15px;
          font-family: 'Poppins', sans-serif;
          background: linear-gradient(to bottom right, #6a11cb, #2575fc);
          min-height: 100vh;
          display: flex;
          justify-content: center;
          align-items: start;
          color: #fff;
        }

        .app-container {
          width: 100%;
          max-width: 720px;
        }

        .title {
          display: flex;
          align-items: center;
          gap: 10px;
          font-size: 2.4rem;
          font-weight: 700;
          margin-bottom: 0.2rem;
        }

        .subtitle {
          margin-bottom: 25px;
          font-size: 1rem;
          color: #f0f0f0;
        }

        .card {
          background: rgba(255, 255, 255, 0.07);
          border: 1px solid rgba(255, 255, 255, 0.15);
          border-radius: 15px;
          padding: 30px;
          margin-bottom: 30px;
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
        }

        .upload-panel {
          display: flex;
          flex-direction: column;
        }

        label {
          font-weight: 600;
          display: block;
          margin-top: 15px;
          margin-bottom: 8px;
          color: #f5f5f5;
        }

        .file-input-wrapper {
          display: flex;
          align-items: center;
          gap: 10px;
          flex-wrap: wrap;
        }

        input[type="file"] {
          padding: 10px 12px;
          border-radius: 12px;
          border: none;
          background: rgba(255, 255, 255, 0.2);
          color: #fff;
          font-size: 0.9rem;
          cursor: pointer;
          backdrop-filter: blur(10px);
          box-shadow: inset 0 0 6px rgba(255, 255, 255, 0.2);
          transition: all 0.3s ease-in-out;
          flex-grow: 1;
          min-width: 150px;
        }

        input[type="file"]::file-selector-button {
          background: linear-gradient(135deg, #a770ef, #cf8bf3);
          border: none;
          padding: 8px 14px;
          border-radius: 10px;
          color: white;
          cursor: pointer;
          margin-right: 10px;
          font-family: 'Poppins', sans-serif;
          font-size: 0.95rem;
          font-weight: 600;
          transition: 0.2s ease-in-out;
        }

        input[type="file"]::file-selector-button:hover {
          background: linear-gradient(135deg, #9d5cf7, #b86ce2);
        }

        .file-name-display {
          background: rgba(255, 255, 255, 0.15);
          border-radius: 8px;
          padding: 8px 12px;
          font-size: 0.85rem;
          color: #e0e0e0;
          display: flex;
          align-items: center;
          gap: 5px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          max-width: 100%;
        }

        .clear-file-btn {
          background: none;
          border: none;
          color: #f0f0f0;
          font-size: 1.2rem;
          cursor: pointer;
          padding: 0 5px;
          line-height: 1;
          transition: color 0.2s ease;
          margin-left: 5px;
          margin-top: 0;
        }

        .clear-file-btn:hover {
          color: #ff6b6b;
        }

        select,
        input[type="text"] {
          width: 100%;
          padding: 12px;
          font-size: 1rem;
          border-radius: 12px;
          border: none;
          background: rgba(255, 255, 255, 0.2);
          color: white;
          backdrop-filter: blur(10px);
        }

        select {
          appearance: none;
          background: rgba(255, 255, 255, 0.25);
          font-weight: 500;
          cursor: pointer;
        }

        select option {
          color: #222;
          background-color: #f0f0f0;
        }

        select:focus,
        input[type="text"]:focus {
          outline: none;
          background: rgba(255, 255, 255, 0.3);
          box-shadow: 0 0 0 2px rgba(255, 255, 255, 0.5);
        }

        button {
          background: linear-gradient(to right, #b46ff9, #8439db);
          color: white;
          font-family: 'Poppins', sans-serif;
          font-size: 0.95rem;
          font-weight: 600;
          padding: 10px 22px;
          border: none;
          border-radius: 10px;
          cursor: pointer;
          transition: background 0.3s ease;
          margin-top: 25px;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
        }

        button:hover:not(:disabled) {
          background: linear-gradient(to right, #9e5fda, #722bbf);
        }

        button:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        .loading-spinner {
          border: 3px solid rgba(255, 255, 255, 0.3);
          border-top: 3px solid #fff;
          border-radius: 50%;
          width: 16px;
          height: 16px;
          animation: spin 1s linear infinite;
        }

        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        .checkbox-container {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-top: 18px;
          margin-bottom: 20px;
          font-family: 'Poppins', sans-serif;
          font-size: 0.95rem;
        }

        input[type="checkbox"] {
          appearance: none;
          width: 18px;
          height: 18px;
          margin: 0;
          border-radius: 5px;
          border: 1px solid rgba(255, 255, 255, 0.6);
          background: rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(6px);
          position: relative;
          cursor: pointer;
          flex-shrink: 0;
        }

        input[type="checkbox"]::before {
          content: "✔";
          font-size: 12px;
          color: white;
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          display: none;
          line-height: 1;
        }

        input[type="checkbox"]:checked::before {
          display: block;
        }

        input[type="file"],
        button,
        select {
          font-family: 'Poppins', sans-serif;
          font-size: 1rem;
        }

        .checkbox-container label {
          margin: 0;
          font-weight: 500;
          font-size: 0.95rem;
          color: #f0f0f0;
        }

        .jd-upload-section {
          display: flex;
          flex-direction: column;
          margin-top: 15px;
        }

        .results-panel {
          margin-top: 30px;
        }

        .score-section strong {
          margin-right: 5px;
        }

        .score-percentage {
          font-size: 1.15rem;
          font-weight: 700;
          color: #fff;
          margin-right: 8px; /* Space between percentage and remark */
        }

        .score-remark {
          font-size: 1rem;
          font-weight: 500;
          color: #a0a0a0; /* A subtle color for the remark */
        }

        .progress {
          height: 12px;
          border-radius: 10px;
          margin: 8px 0 18px 0;
          background: rgba(255, 255, 255, 0.25);
        }

        .progress-bar {
          height: 100%;
          border-radius: 10px;
          background: linear-gradient(90deg, #b36cf8, #8538db);
          transition: width 0.5s ease-in-out;
        }

        .suggestions ul {
          padding-left: 20px;
          list-style: disc;
          color: #f0f0f0;
        }

        .suggestion-list li {
          margin-bottom: 10px;
          font-size: 0.95rem;
        }

        .score-interpretation-note {
            margin-top: 40px; /* More space for the final note */
            padding-top: 20px;
            border-top: 1px solid rgba(255, 255, 255, 0.1);
            color: #e0e0e0;
            font-size: 0.9rem;
            line-height: 1.5;
        }

        .score-interpretation-note h4 {
            font-size: 1.2rem;
            font-weight: 600;
            margin-bottom: 15px;
            color: #fff;
        }

        .score-interpretation-note p {
            margin-bottom: 10px;
        }

        .score-interpretation-note ul {
            padding-left: 20px;
            list-style: disc;
        }

        .score-interpretation-note li {
            margin-bottom: 5px;
        }
        `}
      </style>

      <div className="app-container">
        <h1 className="title">
          <span role="img" aria-label="doc">📄</span> Resume Analyzer
        </h1>
        <p className="subtitle">Upload your resume and get smart suggestions to improve it!</p>

        <div className="upload-panel card">
          <label htmlFor="resumeFileInput">Upload Resume:</label>
          <div className="file-input-wrapper">
            <input type="file" id="resumeFileInput" accept=".pdf,.docx,.txt" onChange={handleResumeUpload} />
            {resumeFile && (
              <span className="file-name-display">
                {resumeFile.name}
                <button onClick={clearResumeFile} className="clear-file-btn">
                  &times;
                </button>
              </span>
            )}
          </div>

          <label htmlFor="jobFieldSelect">Select Job Field:</label>
          <select id="jobFieldSelect" value={jobField} onChange={(e) => setJobField(e.target.value)}>
            <option value="">-- Select Field --</option>
            {jobFields.map((field, i) => (
              <option key={i} value={field}>{field}</option>
            ))}
          </select>

          <div className="checkbox-container">
            <input type="checkbox" id="hasJobDescription" checked={hasJD} onChange={() => setHasJD(!hasJD)} />
            <label htmlFor="hasJobDescription">I have a Job Description (JD)</label>
          </div>

          {hasJD && (
            <div className="jd-upload-section">
              <label htmlFor="jdFileInput">Upload JD:</label>
              <div className="file-input-wrapper">
                <input type="file" id="jdFileInput" accept=".pdf,.docx,.txt" onChange={handleJDUpload} />
                {jdFile && (
                  <span className="file-name-display">
                    {jdFile.name}
                    <button onClick={clearJdFile} className="clear-file-btn">
                      &times;
                    </button>
                  </span>
                )}
              </div>
            </div>
          )}

          <button className="analyze-btn" onClick={handleSubmit} disabled={loading}>
            {loading ? (
              <>
                Analyzing...
                <span className="loading-spinner"></span>
              </>
            ) : (
              'Analyze'
            )}
          </button>
        </div>

        {results && (
          <div className="results-panel card">
            <h2><span role="img" aria-label="chart">📊</span> Results</h2>

            <div className="score-section">
              <strong>Field Match Score:</strong> <span className="score-percentage">{results.field_score}%</span>
              <span className="score-remark">({getScoreRemark(results.field_score)})</span>
              <div className="progress">
                <div className="progress-bar" style={{ width: `${results.field_score}%` }}></div>
              </div>

              {results.jd_score !== null && (
                <>
                  <strong>JD Match Score:</strong> <span className="score-percentage">{results.jd_score}%</span>
                  <span className="score-remark">({getScoreRemark(results.jd_score)})</span>
                  <div className="progress">
                    <div className="progress-bar" style={{ width: `${results.jd_score}%` }}></div>
                  </div>
                </>
              )}
            </div>

            <h3><span role="img" aria-label="brain">🧠</span> Suggestions to Improve:</h3>
            <ul className="suggestion-list">
              {results.suggestions.map(([kw, desc], idx) => (
                <li key={idx}><strong>{kw}:</strong> {desc}</li>
              ))}
            </ul>

            {/* Professional and concise score interpretation note */}
            <div className="score-interpretation-note">
              <h4>Understanding Your Score:</h4>
              <p>Your resume score indicates its alignment with the selected job field. Here's a quick guide:</p>
              <ul>
                <li>**80%+ (Outstanding):** Highly optimized and exceptionally relevant.</li>
                <li>**70%-79% (Excellent):** Strong match with many key terms integrated.</li>
                <li>**60%-69% (Good):** Solid alignment; minor tweaks can further enhance it.</li>
                <li>**Below 60% (Needs Work):** Room for improvement; focus on incorporating more job-specific keywords.</li>
              </ul>
              <p>Scores typically start around 40% due to common resume terminology. While aiming high, perfect 100% is rare; scores in the 70s-80s are excellent indicators of effectiveness.</p>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default App;
