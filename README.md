# 🤖 AI Interview — Hakkuna Mattata

An end-to-end AI-powered technical screening platform that conducts voice interviews, evaluates candidates in real time, and stores results on decentralized storage.

🌐 **Live Demo:** [https://hakunamatta.netlify.app](https://hakunamatta.netlify.app)

---

## 🔥 Key Features

### 🧠 Skill Graph Extraction
- Extracts skills from resume using rule-based parser + LLM refinement
- Assigns confidence scores per skill
- Detects contradictions during live screening

### 🎙 AI Voice Interview (ElevenLabs)
- Natural human-like interviewer voice (ARIA)
- Adaptive questioning based on candidate responses
- Real-time transcript generation

### 🔍 RAG-Based Adaptive Engine
- Uses resume + screening transcript as context
- Depth-first skill probing
- Difficulty control based on confidence scores


### 📊 AI Evaluation
Each answer is scored on:
- Technical Accuracy
- Depth of Knowledge
- Consistency
- Communication Clarity

### 🔐 Decentralized Data Storage
Stored securely on DataHaven (Testnet):
- Resume
- Screening transcript
- Interview transcript
- Skill graph
- Evaluation report

Candidates retain full ownership of their data.

---

## 🛠 Tech Stack

| Layer | Technologies |
|---|---|
| Frontend | React 19, React Router, Recharts, TailwindCSS, Framer Motion |
| Backend | FastAPI, Python, Node.js |
| AI / ML | Groq (LLaMA), ElevenLabs, RAG Architecture,|
| Storage | DataHaven (Testnet) |

---

## 📁 Project Structure

```
AI_Interview/
├── Frontend/                        # React frontend (Vite)
│   ├── src/
│   │   ├── components/
│   │   │   ├── ui/                  # Shared UI components
│   │   │   ├── interview/           # Interview flow components
│   │   │   ├── recruiter/           # Recruiter dashboard components
│   │   │   ├── report/              # Report view components
│   │   │   └── voice/               # Voice interface components
│   │   ├── pages/
│   │   │   ├── Landing.jsx          # Home / landing page
│   │   │   ├── Upload.jsx           # Resume upload
│   │   │   ├── VoiceScreen.jsx      # Voice screening session
│   │   │   ├── Interview.jsx        # Full interview session
│   │   │   ├── Report.jsx           # Evaluation report
│   │   │   ├── Recruiter.jsx        # Recruiter dashboard
│   │   │   └── Help.jsx             # Help & documentation
│   │   └── context/
│   │       └── UploadContext.jsx    # Resume upload state
│   └── package.json
│
└── Hakkuna_Mattata_AI_Interview/
    ├── resume_parser/               # PDF resume parser
    │   ├── resume_parser.py         # Rule-based PDF text extractor
    │   ├── groq_parser.py           # LLM refinement via Groq API
    │   ├── streamlit_app.py         # Streamlit demo UI
    │   └── requirements.txt
    │
    └── Voice_Screening/             # AI voice interview engine
        ├── interactive_interview.py # ARIA interview loop
        └── resume.json              # Candidate resume input
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js >= 18
- Python >= 3.10
- Groq API key
- ElevenLabs API key

---

### Frontend

```bash
cd Frontend
npm install
npm run dev
```

---

### Resume Parser

```bash
cd Hakkuna_Mattata_AI_Interview/resume_parser
pip install -r requirements.txt
```

Create a `.env` file:
```
GROQ_API_KEY=your_groq_api_key
```

Run the Streamlit app:
```bash
streamlit run streamlit_app.py
```

---

### Voice Screening

```bash
cd Hakkuna_Mattata_AI_Interview/Voice_Screening
```

Create a `.env` file:
```
GROQ_API_KEY=your_groq_api_key
ELEVENLABS_API_KEY=your_elevenlabs_api_key
```

Add your candidate resume as `resume.json`, then run:
```bash
python interactive_interview.py
```

---

## 🔑 Environment Variables

| Variable | Used In | Description |
|---|---|---|
| `GROQ_API_KEY` | resume_parser, Voice_Screening | Groq LLM API key |
| `ELEVENLABS_API_KEY` | Voice_Screening | ElevenLabs TTS API key |

> ⚠️ Never commit `.env` files. Both directories have `.gitignore` entries to prevent this.

---

## 👥 Team

**Hakkuna Mattata** — Built for SRM Hackathon
