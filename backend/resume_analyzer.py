import os                                                                   #interacting with operating system components
import fitz                                                                 #pdf extraction
import docx                                                                 #word file
import re                                                                   #pattern searching
import tempfile                                                             #create temporary files and directories
import requests                                                             #making HTTP requests
from collections import Counter                                             #count occurrences of elements
from sklearn.feature_extraction.text import TfidfVectorizer                 #NLP
from sklearn.metrics.pairwise import cosine_similarity                      #compute cosine similarity
from cloudinary_config import cloudinary                                    #database
import cloudinary.api                                                       #Admin API for managing assets
from keybert import KeyBERT                                                 #word/phrase extraction from text
import spacy                                                                #NLP

# ---------- Model Setup ----------
kw_model = KeyBERT(model='all-mpnet-base-v2')
nlp = spacy.load("en_core_web_sm")

# ---------- Text Extraction ----------
def extract_text_from_pdf(file_path):
    text = ""
    with fitz.open(file_path) as doc:
        for page in doc:
            text += page.get_text()
    return re.sub(r'\s+', ' ', text.replace('-\n', '').replace('\n', ' ')).strip()

def extract_text_from_docx(file_path):
    doc = docx.Document(file_path)
    return ' '.join([p.text for p in doc.paragraphs])

def parse_text_file(file_path):
    with open(file_path, 'r', encoding='utf-8') as f:
        return f.read()

def parse_resume(file_path):
    ext = os.path.splitext(file_path)[1].lower()

    if ext == '.pdf':
        return extract_text_from_pdf(file_path)
    elif ext == '.docx':
        return extract_text_from_docx(file_path)
    elif ext == '.txt':
        return parse_text_file(file_path)
    else:
        raise ValueError(f"Unsupported resume format: {ext}. Use PDF, DOCX, or TXT.")

def parse_job_description(file_path):
    return parse_resume(file_path)

# ---------- Preprocessing ----------
def clean_text(text):
    text = text.lower()
    return re.sub(r'[^a-zA-Z0-9\s,.()\-:/]', '', text).strip()

# ---------- Cloudinary Helpers ----------
def fetch_keyword_bank_from_cloudinary(job_field):
    file_path = f"sample_resumes/{job_field}/{job_field}_keyword_bank.txt"
    try:
        url = cloudinary.api.resource(file_path, resource_type="raw")["secure_url"]
        lines = requests.get(url).text.strip().split('\n')
        return [(k.strip(), d.strip()) for line in lines if ':::' in line for k, d in [line.split(':::')]]
    except Exception as e:
        raise RuntimeError(f"Error fetching keyword bank: {e}")

def load_sample_resumes_from_cloudinary(job_field):
    import cloudinary
    import cloudinary.api
    folder_prefix = f"sample_resumes/{job_field}/"
    try:
        response = cloudinary.api.resources(
            type="upload",
            prefix=folder_prefix,
            resource_type="raw"
        )
        resumes = response.get("resources", [])
        for res in resumes:
            if 'keyword_bank' in res['public_id']:
                continue  # Skip the keyword bank file
            
        if not resumes:
            raise FileNotFoundError(f"No resumes found in Cloudinary folder: {folder_prefix}")

        print(f"\n✅ Found {len(resumes)-1} sample resumes in Cloudinary folder '{folder_prefix}':")
        for res in resumes:
           print(f" - {res['public_id']}")

        texts = []
        for res in resumes:
            url = res['secure_url']
            with tempfile.NamedTemporaryFile(delete=False, suffix=".txt") as tmp:
                r = requests.get(url)
                tmp.write(r.content)
                tmp_path = tmp.name
            texts.append(parse_text_file(tmp_path))
        return texts

    except Exception as e:
        raise RuntimeError(f"Error loading resumes from Cloudinary: {e}")

# ---------- Comparison Logic ----------
def compare_resume_with_samples(user_text, samples):
    tfidf = TfidfVectorizer(stop_words="english")
    matrix = tfidf.fit_transform([user_text] + samples)
    raw_score = cosine_similarity(matrix[0:1], matrix[1:]).mean() * 100
    adjusted_score = min(round(raw_score + 40, 2), 100.0)  # cap at 100
    return adjusted_score

def compare_resume_with_jd(resume, jd):
    tfidf = TfidfVectorizer(stop_words='english')
    matrix = tfidf.fit_transform([resume, jd])
    return round(cosine_similarity(matrix[0:1], matrix[1:])[0][0] * 100, 2)

def extract_keywords(text, top_n=20):
    raw_keywords = kw_model.extract_keywords(
        text, keyphrase_ngram_range=(1, 3), stop_words='english', top_n=40, use_mmr=True, diversity=0.7
    )
    blacklist = {"you", "your", "company", "job", "role", "benefits"}

    def is_meaningful(phrase):
        phrase = phrase.lower().strip()
        if any(b in phrase for b in blacklist) or len(phrase) <= 3:
            return False
        doc = nlp(phrase)
        return any(t.pos_ in {"NOUN", "PROPN"} for t in doc)

    return [kw for kw, _ in raw_keywords if is_meaningful(kw)][:top_n]

def suggest_missing_keywords(resume_text, keyword_bank):
    return [(kw, desc) for kw, desc in keyword_bank if kw.lower() not in resume_text.lower()]

# ---------- Main ----------
def main():
    print("----- Unified Resume Analyzer -----")
    resume_path = input("Enter path to your resume (PDF, DOCX, TXT): ").strip()
    job_field = input("Enter your target job field (e.g., data_scientist): ").strip()

    if not os.path.exists(resume_path):
        print("❌ Resume file not found.")
        return

    try:
        resume_text = clean_text(parse_resume(resume_path))
        samples = load_sample_resumes_from_cloudinary(job_field)

        print("\n📊 Field-Based Resume Comparison")
        print(f"✅ Similarity Score with '{job_field}' professionals: {compare_resume_with_samples(resume_text, samples)}%")
        print("\n 📝 Note: Based on observed score ranges, anything above 70% is considered strong.")

        if input("\nDo you have a Job Description (JD) document? (yes/no): ").strip().lower() == 'yes':
            jd_path = input("Enter path to job description (DOCX or TXT): ").strip()
            if not os.path.exists(jd_path):
                print("❌ JD file not found.")
                return
            jd_text = clean_text(parse_job_description(jd_path))
            print("\n📊 Job Description Matching")
            print(f"✅ Similarity Score with JD: {compare_resume_with_jd(resume_text, jd_text)}%")
        else:
            print("\n📌 Skipping JD comparison...")

        print("\n🔍 Suggestions to Improve Your Resume:")
        keyword_bank = fetch_keyword_bank_from_cloudinary(job_field)
        missing = suggest_missing_keywords(resume_text, keyword_bank)
        if missing:
            for kw, desc in missing[:10]:
                print(f" - {kw}: {desc}")
        else:
            print("✅ Resume covers all major keywords!")

    except Exception as e:
        print("⚠️ Error:", e)

if __name__ == "__main__":
    main()

def analyze_resume(resume_path, job_field, jd_path=None):
    resume_text = clean_text(parse_resume(resume_path))
    sample_texts = load_sample_resumes_from_cloudinary(job_field)

    field_score = compare_resume_with_samples(resume_text, sample_texts)

    jd_score = None
    if jd_path:
        jd_text = clean_text(parse_job_description(jd_path))
        jd_score = compare_resume_with_jd(resume_text, jd_text)

    keyword_bank = fetch_keyword_bank_from_cloudinary(job_field)
    suggestions = suggest_missing_keywords(resume_text, keyword_bank)

    return {
        "field_score": field_score,
        "jd_score": jd_score,
        "suggestions": suggestions[:10]
    }
