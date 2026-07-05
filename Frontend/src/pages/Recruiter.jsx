import { useState } from "react";
import StatusBadge from "../components/ui/StatusBadge";

const CANDIDATES = [
  { name: "Alex Chen", role: "Sr Frontend Eng", score: 72, status: "Strong Hire", date: "2h ago", skills: "React, TypeScript", level: "high" },
  { name: "Priya Nair", role: "Backend Eng", score: 81, status: "Strong Hire", date: "5h ago", skills: "Go, Postgres", level: "high" },
  { name: "Marcus Webb", role: "Full Stack", score: 54, status: "Consider", date: "1d ago", skills: "React, Node.js", level: "mid" },
  { name: "Sofia Torres", role: "Sr Frontend Eng", score: 38, status: "Reject", date: "2d ago", skills: "Vue, CSS", level: "low" },
  { name: "David Kim", role: "ML Engineer", score: 76, status: "Strong Hire", date: "3d ago", skills: "PyTorch, MLOps", level: "high" },
  { name: "Jordan Lee", role: "Backend Eng", score: 60, status: "Consider", date: "4d ago", skills: "Python, FastAPI", level: "mid" },
];

export default function RecruiterDashboard({ onNavigate }) {
  const [activeFilter, setActiveFilter] = useState("All");
  const [activeSideNav, setActiveSideNav] = useState("Candidates");

  const roles = ["All", "Sr Frontend Eng", "Backend Eng", "Full Stack", "ML Engineer"];
  const filtered = activeFilter === "All" ? CANDIDATES : CANDIDATES.filter(c => c.role === activeFilter);

  const sideItems = [
    { icon: "👥", label: "Candidates" },
    { icon: "📊", label: "Analytics" },
    { icon: "⚙️", label: "Job Roles" },
    { icon: "🔔", label: "Alerts" },
    { icon: "⚡", label: "Settings" },
  ];

  return (
    <div style={{ minHeight: '100vh', display: 'grid', gridTemplateColumns: '220px 1fr', gridTemplateRows: '60px 1fr', paddingTop: 60 }}>
      <div style={{ background: 'var(--surface)', borderRight: '1px solid var(--border)', padding: '20px 0', display: 'flex', flexDirection: 'column', gridRow: 2 }}>
        <div style={{ padding: '8px 20px 16px', fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--text-2)', letterSpacing: '0.15em', textTransform: 'uppercase' }}>
          Navigation
        </div>
        {sideItems.map(item => (
          <button key={item.label} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 20px', fontSize: 14, fontWeight: 500, color: activeSideNav === item.label ? 'var(--cyan)' : 'var(--text-2)', cursor: 'pointer', transition: 'all 0.15s', border: 'none', background: activeSideNav === item.label ? 'var(--cyan-dim)' : 'transparent', width: '100%', textAlign: 'left' }}
            onClick={() => setActiveSideNav(item.label)}>
            <span style={{ fontSize: 16, opacity: 0.8 }}>{item.icon}</span>
            {item.label}
          </button>
        ))}
        <div style={{ flex: 1 }} />
        <div style={{ padding: '0 16px' }}>
          <div className="card-lift" style={{ marginTop: 16 }}>
            <div style={{ fontSize: 11, color: 'var(--text-2)', marginBottom: 8 }}>Processing Queue</div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 24, fontWeight: 700, color: 'var(--white)' }}>4</div>
            <div style={{ fontSize: 11, color: 'var(--text-2)', marginTop: 4 }}>interviews in progress</div>
          </div>
        </div>
      </div>

      <div style={{ background: 'var(--void)', padding: 32, overflowY: 'auto' }}>
        <div className="flex justify-between items-center mb-6">
          <div>
            <div className="section-eyebrow">Recruiter Dashboard</div>
            <h2 className="section-title">Candidate Pipeline</h2>
          </div>
          <div className="flex gap-3">
            <button className="btn btn-ghost btn-sm">Export CSV</button>
            <button className="btn btn-primary btn-sm">+ Invite Candidate</button>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, marginBottom: 28 }}>
          {[
            { num: "24", label: "Total Screened", delta: "+6 this week" },
            { num: "9", label: "Strong Hire", delta: "+2 this week" },
            { num: "3.1h", label: "Avg. Time to Eval", delta: "-40min vs last" },
            { num: "87%", label: "AI Confidence", delta: "+3% this month" },
          ].map(s => (
            <div key={s.label} style={{ padding: 20, background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 14 }}>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 28, fontWeight: 700, color: 'var(--white)', letterSpacing: '-0.04em' }}>{s.num}</div>
              <div style={{ fontSize: 12, color: 'var(--text-2)', marginTop: 4, fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>{s.label}</div>
              <div style={{ fontSize: 12, color: 'var(--green)', marginTop: 8, display: 'flex', alignItems: 'center', gap: 4 }}>↑ {s.delta}</div>
            </div>
          ))}
        </div>

        <div style={{ display: 'flex', gap: 12, alignItems: 'center', marginBottom: 20, flexWrap: 'wrap' }}>
          <span style={{ fontSize: 12, color: 'var(--text-2)', fontWeight: 500 }}>Filter by role:</span>
          {roles.map(r => (
            <div key={r} style={{ padding: '6px 14px', borderRadius: 100, fontSize: 13, fontWeight: 500, color: activeFilter === r ? 'var(--cyan)' : 'var(--text-2)', border: `1px solid ${activeFilter === r ? 'rgba(0,229,255,0.3)' : 'var(--border2)'}`, background: activeFilter === r ? 'var(--cyan-dim)' : 'var(--surface)', cursor: 'pointer', transition: 'all 0.15s' }} onClick={() => setActiveFilter(r)}>
              {r}
            </div>
          ))}
          <div style={{ flex: 1 }} />
          <input className="input" style={{ width: 220 }} placeholder="🔍  Search candidates…" />
        </div>

        <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 16, overflow: 'hidden' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr 1fr 100px', padding: '12px 20px', borderBottom: '1px solid var(--border)', background: 'var(--lift)' }}>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, fontWeight: 500, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--text-2)' }}>Candidate</div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, fontWeight: 500, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--text-2)' }}>Role</div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, fontWeight: 500, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--text-2)' }}>Score</div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, fontWeight: 500, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--text-2)' }}>Skills Tested</div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, fontWeight: 500, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--text-2)' }}>Status</div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, fontWeight: 500, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--text-2)' }}>Actions</div>
          </div>
          {filtered.map(c => (
            <div key={c.name} style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr 1fr 100px', padding: '14px 20px', borderBottom: '1px solid var(--border)', transition: 'background 0.12s', cursor: 'pointer', alignItems: 'center' }} onClick={() => onNavigate("Report")}
              onMouseEnter={e => e.currentTarget.style.background = 'var(--lift)'}
              onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
              <div>
                <div style={{ fontWeight: 500, color: 'var(--text-1)', fontSize: 14 }}>{c.name}</div>
                <div style={{ fontSize: 12, color: 'var(--text-2)', marginTop: 2 }}>{c.date}</div>
              </div>
              <div style={{ fontSize: 13, color: 'var(--text-2)' }}>{c.role}</div>
              <div>
                <span style={{ display: 'inline-block', fontFamily: 'var(--font-mono)', fontSize: 13, fontWeight: 700, padding: '2px 10px', borderRadius: 6, background: c.level === "high" ? 'var(--green-dim)' : c.level === "mid" ? 'rgba(0,229,255,0.08)' : 'var(--red-dim)', color: c.level === "high" ? 'var(--green)' : c.level === "mid" ? 'var(--cyan)' : 'var(--red)' }}>{c.score}</span>
              </div>
              <div style={{ fontSize: 12, color: 'var(--text-2)' }}>{c.skills}</div>
              <div><StatusBadge status={c.status} /></div>
              <div className="flex gap-2">
                <button className="btn btn-ghost btn-sm" style={{ padding: '4px 10px', fontSize: 12 }}
                  onClick={e => { e.stopPropagation(); onNavigate("Report"); }}>
                  View →
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
