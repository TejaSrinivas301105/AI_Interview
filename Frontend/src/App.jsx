import { BrowserRouter, Routes, Route, useNavigate, Navigate } from "react-router-dom";
import { useState } from "react";
import { UploadContext, useUploadStatus } from "./context/UploadContext";
import Navbar from "./components/ui/Navbar";
import LandingPage from "./pages/Landing";
import UploadPage from "./pages/Upload";
import VoiceScreenPage from "./pages/VoiceScreen";
import InterviewPage from "./pages/Interview";
import ReportPage from "./pages/Report";
import RecruiterDashboard from "./pages/Recruiter";
import "./design/styles.css";
import Help from "./pages/Help";

function ProtectedRoute({ children }) {
  const { isUploaded } = useUploadStatus();
  return isUploaded ? children : <Navigate to="/upload" replace />;
}

function AppContent() {
  const navigate = useNavigate();
  const [isUploaded, setIsUploaded] = useState(false);

  return (
    <UploadContext.Provider value={{ isUploaded, setIsUploaded }}>
      <div className="platform-root">
        <div className="noise" />
        <Navbar />
        <div className="content">
          <Routes>
            <Route path="/" element={<LandingPage onNavigate={(path) => navigate(`/${path.toLowerCase().replace(" ", "-")}`)} />} />
            <Route path="/upload" element={<UploadPage onNavigate={(path) => navigate(`/${path.toLowerCase().replace(" ", "-")}`)} />} />
            <Route path="/voice-screen" element={<ProtectedRoute><VoiceScreenPage onNavigate={(path) => navigate(`/${path.toLowerCase().replace(" ", "-")}`)} /></ProtectedRoute>} />
            <Route path="/interview" element={<ProtectedRoute><InterviewPage onNavigate={(path) => navigate(`/${path.toLowerCase().replace(" ", "-")}`)} /></ProtectedRoute>} />
            <Route path="/report" element={<ReportPage />} />
            <Route path="/recruiter" element={<RecruiterDashboard onNavigate={(path) => navigate(`/${path.toLowerCase().replace(" ", "-")}`)} />} />
            <Route path="/Help" element={<Help/>} />
          </Routes>
        </div>
      </div>
    </UploadContext.Provider>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}
