import { useState, useRef } from "react";
import SkillBar from "../components/ui/SkillBar";
import { useUploadStatus } from "../context/UploadContext";

const DEMO_SKILLS = [
];

export default function UploadPage({ onNavigate }) {
  const [dragOver, setDragOver] = useState(false);
  const [uploaded, setUploaded] = useState(false);
  const [fileName, setFileName] = useState("");
  const [role, setRole] = useState("Senior Frontend Engineer");
  const fileInputRef = useRef(null);
  const { setIsUploaded } = useUploadStatus();

  const handleFileSelect = (file) => {
    if (file) {
      setFileName(file.name);
      setUploaded(true);
      setIsUploaded(true);
    }
  };

  return (
    <div className="page">
      <div className="container-narrow">
        <div className="mb-8">
          <div className="section-eyebrow">Stage 01 · Resume Analysis</div>
          <h2 className="section-title">Upload your résumé</h2>
          <p className="section-sub">AI will extract your skill graph and tailor the screening to your background.</p>
        </div>

        <div className="mb-6">
          <label className="label">Target Role</label>
          <select className="input select" value={role} onChange={e => setRole(e.target.value)}>
            <option>Senior Frontend Engineer</option>
            <option>Backend Engineer (Go / Python)</option>
            <option>Full Stack Engineer</option>
            <option>Staff Engineer</option>
            <option>Engineering Manager</option>
            <option>ML Engineer</option>
          </select>
        </div>

        <input
          ref={fileInputRef}
          type="file"
          accept=".pdf,.doc,.docx"
          style={{ display: 'none' }}
          onChange={e => handleFileSelect(e.target.files[0])}
        />

        <div
          className={`upload-zone mb-6 ${dragOver ? "drag-over" : ""}`}
          onDragOver={e => { e.preventDefault(); setDragOver(true); }}
          onDragLeave={() => setDragOver(false)}
          onDrop={e => { e.preventDefault(); setDragOver(false); handleFileSelect(e.dataTransfer.files[0]); }}
          onClick={() => fileInputRef.current?.click()}
        >
          {!uploaded ? (
            <>
              <div className="upload-icon">📄</div>
              <div className="upload-title">Drop your résumé here</div>
              <div className="upload-sub">PDF, DOCX — up to 10 MB</div>
              <div style={{ marginTop: 20 }}>
                <button className="btn btn-ghost btn-sm" onClick={e => { e.stopPropagation(); fileInputRef.current?.click(); }}>
                  Browse files
                </button>
              </div>
            </>
          ) : (
            <>
              <div style={{ fontSize: 40, marginBottom: 12 }}>✅</div>
              <div className="upload-title" style={{ color: "var(--green)" }}>{fileName || "resume_alex_chen.pdf"}</div>
              <div className="upload-sub">Parsed successfully · 847 KB</div>
            </>
          )}
        </div>

        {uploaded && (
          <div className="skill-graph-wrap mb-6">
            <div className="flex justify-between items-center mb-4">
              <div>
                <div className="label" style={{ marginBottom: 4 }}>Extracted Skill Graph</div>
                <div style={{ fontSize: 12, color: "var(--text-2)" }}>Confidence based on résumé evidence</div>
              </div>
              <span className="badge badge-active"><span className="badge-dot" />AI Analysis Complete</span>
            </div>
            {DEMO_SKILLS.map((s, i) => (
              <SkillBar key={s.name} name={s.name} pct={s.pct} delay={i * 100} />
            ))}
          </div>
        )}

        <button className="btn btn-primary btn-lg w-full" onClick={() => onNavigate("Voice Screen")}
          style={{ justifyContent: "center", opacity: uploaded ? 1 : 0.4, pointerEvents: uploaded ? "auto" : "none" }}>
          <span>🎙</span> Start Screening Call
        </button>
      </div>
    </div>
  );
}
