from flask import Flask, request, jsonify                   #web framework for Python
from flask_cors import CORS                                 #Cross-Origin Resource Sharing
import tempfile                                             #to create temporary files and directories
import os                                                   #interacting with the operating system
from resume_analyzer import analyze_resume                  # function/module

app = Flask(__name__)
CORS(app)                                                   #Allow React frontend to talk to backend

import traceback                                            #identifying the errors

@app.route('/analyze', methods=['POST'])                    #handles file uploads and calls resume analysis logic
def analyze():
    try:
        resume = request.files['resume']
        job_field = request.form['job_field']               #database
        jd = request.files.get('jd')

        print(f"📎 Resume Filename: {resume.filename}")
        if jd:
            print(f"📎 JD Filename received: {jd.filename}")
        else:
            print("📎 No JD file uploaded.")

        with tempfile.NamedTemporaryFile(delete=False, suffix=os.path.splitext(resume.filename)[1]) as tmp_resume:
            resume.save(tmp_resume.name)
            resume_path = tmp_resume.name

        jd_path = None
        if jd and jd.filename:
            jd_ext = os.path.splitext(jd.filename)[1].lower()
            if jd_ext not in ['.pdf', '.docx', '.txt']:
                return jsonify({"error": f"Unsupported JD file format: {jd_ext}"}), 400

            with tempfile.NamedTemporaryFile(delete=False, suffix=jd_ext) as tmp_jd:
                jd.save(tmp_jd.name)
                jd_path = tmp_jd.name

        result = analyze_resume(resume_path, job_field, jd_path)

        return jsonify(result)

    except Exception as e:
        print(f"🔥 Error in /analyze route: {e}")
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(port=5000)
