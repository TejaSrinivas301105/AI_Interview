import { useState, useEffect, useRef } from "react";
import Waveform from "../components/ui/Waveform";

const VOICE_SKILLS = [
  { name: "React Hooks", pct: 0, newPct: 72 },
  { name: "TypeScript", pct: 0, newPct: 58 },
  { name: "Performance", pct: 0, newPct: 45 },
  { name: "Testing", pct: 0, newPct: 61 },
];

export default function VoiceScreenPage({ onNavigate }) {
  const [speaking, setSpeaking] = useState(true);
  const [recording, setRecording] = useState(false);
  const [qIndex, setQIndex] = useState(0);
  const [skillPcts, setSkillPcts] = useState(VOICE_SKILLS.map(s => s.pct));
  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);

  const questions = [
    "Walk me through your experience with React. What's the most complex component you've built?",
    "How do you approach TypeScript in a large codebase — strict mode, generics, any pitfalls?",
    "Describe a performance bottleneck you diagnosed and resolved in a production app.",
  ];

  useEffect(() => {
    const t = setTimeout(() => {
      setSpeaking(false);
      setSkillPcts([72, 58, 45, 61]);
    }, 2000);
    return () => clearTimeout(t);
  }, [qIndex]);

  const handleMic = async () => {
    if (!recording) {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        const mediaRecorder = new MediaRecorder(stream);
        mediaRecorderRef.current = mediaRecorder;
        audioChunksRef.current = [];

        mediaRecorder.ondataavailable = (event) => {
          audioChunksRef.current.push(event.data);
        };

        mediaRecorder.onstop = async () => {
          const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
          const formData = new FormData();
          formData.append('audio', audioBlob, `voice_q${qIndex + 1}_${Date.now()}.webm`);
          
          try {
            await fetch('http://localhost:5000/api/upload-audio', {
              method: 'POST',
              body: formData,
            });
          } catch (error) {
            console.error('Upload failed:', error);
          }
          
          stream.getTracks().forEach(track => track.stop());
        };

        mediaRecorder.start();
        setRecording(true);
      } catch (error) {
        console.error('Microphone access denied:', error);
      }
    } else {
      if (mediaRecorderRef.current) {
        mediaRecorderRef.current.stop();
        setRecording(false);
      }
    }
  };

  const nextQ = () => {
    if (qIndex < questions.length - 1) {
      setSpeaking(true);
      setRecording(false);
      setQIndex(i => i + 1);
    } else {
      onNavigate("Interview");
    }
  };

  return (
    <div style={{ minHeight: '100vh', display: 'grid', gridTemplateColumns: '1fr 320px', gridTemplateRows: '60px 1fr', background: 'var(--void)', paddingTop: 60 }}>
      <div style={{ gridColumn: '1 / -1', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 32px', borderBottom: '1px solid var(--border)', background: 'var(--surface)' }}>
        <div className="flex gap-3 items-center">
          <div className="nav-logo-dot" />
          <span style={{ fontFamily: "var(--font-display)", fontWeight: 600, color: "var(--white)" }}>AI Screening Call</span>
          <span className="badge badge-active"><span className="badge-dot" />Live</span>
        </div>
        <div className="flex gap-3 items-center">
          <span style={{ fontFamily: "var(--font-mono)", fontSize: 13, color: "var(--text-2)" }}>
            Q {qIndex + 1}/{questions.length}
          </span>
          <button className="btn btn-danger btn-sm">End Call</button>
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 48, gap: 40, position: 'relative' }}>
        <div style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ width: 120, height: 120, borderRadius: '50%', background: 'linear-gradient(135deg, #0D0D12, #1A1A26)', border: `2px solid ${speaking ? 'var(--cyan)' : 'var(--border2)'}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 48, position: 'relative', zIndex: 1, boxShadow: speaking ? '0 0 0 8px rgba(0,229,255,0.1), 0 0 60px rgba(0,229,255,0.25)' : '0 0 0 8px rgba(0,229,255,0.05), 0 0 40px rgba(0,229,255,0.15)' }}>
            🤖
          </div>
        </div>

        <Waveform active={speaking} />

        <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 16, padding: '24px 28px', maxWidth: 600, textAlign: 'center' }}>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--text-2)', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: 12 }}>
            {speaking ? "AI is speaking..." : "Question " + (qIndex + 1)}
          </div>
          <div style={{ fontFamily: 'var(--font-display)', fontSize: 20, fontWeight: 600, color: 'var(--white)', lineHeight: 1.4 }}>{questions[qIndex]}</div>
        </div>

        <div className="flex gap-4 items-center">
          <button className={`btn ${recording ? 'btn-danger' : 'btn-ghost'}`} style={{ width: 72, height: 72, borderRadius: '50%', fontSize: 28, padding: 0 }} onClick={handleMic}>
            {recording ? "⏹" : "🎙"}
          </button>
          <button className="btn btn-ghost btn-sm" onClick={nextQ}>
            {qIndex < questions.length - 1 ? "Next Question →" : "Proceed to Deep Interview →"}
          </button>
        </div>

        {recording && (
          <div style={{ fontFamily: "var(--font-mono)", fontSize: 12, color: "var(--red)", display: "flex", alignItems: "center", gap: 6 }}>
            <span style={{ animation: "blink 1s step-end infinite", display: "inline-block" }}>●</span>
            Recording · 00:34
          </div>
        )}
      </div>

      <div style={{ background: 'var(--surface)', borderLeft: '1px solid var(--border)', padding: '24px 20px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: 20 }}>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--text-2)', letterSpacing: '0.15em', textTransform: 'uppercase' }}>Live Skill Confidence</div>
        <div style={{ fontSize: 12, color: "var(--text-2)", marginTop: -12 }}>Updated as you answer</div>

        {VOICE_SKILLS.map((s, i) => (
          <div key={s.name} className="card-lift">
            <div className="flex justify-between items-center mb-2">
              <span style={{ fontSize: 13, fontWeight: 500, color: 'var(--text-1)' }}>{s.name}</span>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: 12, fontWeight: 700, color: 'var(--cyan)' }}>{skillPcts[i]}%</span>
            </div>
            <div className="skill-bar-track">
              <div className="skill-bar-fill" style={{ width: `${skillPcts[i]}%` }} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
