import { useLocation, useNavigate } from "react-router-dom";

export default function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  
  const tabs = [
    { name: "Landing", path: "/" },
    { name: "Upload", path: "/upload" },
    { name: "Voice Screen", path: "/voice-screen" },
    { name: "Interview", path: "/interview" },
    { name: "Report", path: "/report" },
    { name: "Recruiter", path: "/recruiter" },
  ];
  
  return (
    <nav className="nav">
      <div className="nav-logo">
        <div className="nav-logo-dot" />
        AXON<span style={{ color: "var(--text-2)", fontWeight: 400 }}>hire</span>
      </div>
      <div className="nav-tabs">
        {tabs.map(t => (
          <button 
            key={t.name} 
            className={`nav-tab ${location.pathname === t.path ? "active" : ""}`} 
            onClick={() => navigate(t.path)}
          >
            {t.name}
          </button>
        ))}
      </div>
      <div className="flex gap-2 items-center">
        <span className="badge badge-active"><span className="badge-dot" />Live Demo</span>
      </div>
    </nav>
  );
}
