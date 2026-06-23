import React, { useState } from 'react';
import { defaultPatientProfile } from './mockData';

// Page Imports
import LandingPage from './pages/LandingPage';
import LoginRegister from './pages/LoginRegister';
import SymptomChecker from './pages/SymptomChecker';
import TreatmentComparison from './pages/TreatmentComparison';
import DoctorListing from './pages/DoctorListing';
import DoctorProfile from './pages/DoctorProfile';
import AppointmentBooking from './pages/AppointmentBooking';
import VideoConsultation from './pages/VideoConsultation';
import HealthDashboard from './pages/HealthDashboard';
import ReportAnalyzer from './pages/ReportAnalyzer';
import SettingsPage from './pages/SettingsPage';

// Icon Imports
import {
  Activity,
  Heart,
  Home,
  User,
  Stethoscope,
  ClipboardList,
  Calendar,
  Video,
  FileSpreadsheet,
  Settings,
  LogOut,
  LogIn,
  Search,
  Bell,
  Menu,
  ChevronRight
} from 'lucide-react';

export default function App() {
  const [page, setPage] = useState('landing'); // landing, login, dashboard, etc.
  const [user, setUser] = useState(null); // Simulated logged-in user
  const [patientProfile, setPatientProfile] = useState(defaultPatientProfile);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [selectedAssessment, setSelectedAssessment] = useState(null);
  const [doctorFilter, setDoctorFilter] = useState('All');
  const [sidebarOpen, setSidebarOpen] = useState(true);

  // Active Navigation Helper
  const navigateTo = (targetPage) => {
    setPage(targetPage);
  };

  // Logout Helper
  const handleLogout = () => {
    setUser(null);
    navigateTo('landing');
  };

  // Check if Sidebar/Navbar should be displayed (Hide on Landing and Login/Register for full page immersion)
  const showNav = page !== 'landing' && page !== 'login';

  return (
    <div className="app-container">
      
      {/* Sidebar Navigation */}
      {showNav && sidebarOpen && (
        <aside className="app-sidebar animate-fade">
          <div className="sidebar-logo">
            <div className="logo-icon">
              <Activity size={22} />
            </div>
            <span className="logo-text">HealthVerse</span>
          </div>

          <nav className="sidebar-nav">
            <div
              className={`sidebar-item ${page === 'dashboard' ? 'active' : ''}`}
              onClick={() => navigateTo('dashboard')}
            >
              <Home size={18} />
              <span>Dashboard</span>
            </div>

            <div
              className={`sidebar-item ${page === 'symptom-checker' ? 'active' : ''}`}
              onClick={() => navigateTo('symptom-checker')}
            >
              <Stethoscope size={18} />
              <span>Symptom Checker</span>
            </div>

            <div
              className={`sidebar-item ${page === 'treatment-comparison' ? 'active' : ''}`}
              onClick={() => navigateTo('treatment-comparison')}
            >
              <FileSpreadsheet size={18} />
              <span>Compare Pathways</span>
            </div>

            <div
              className={`sidebar-item ${page === 'doctors' || page === 'doctor-profile' || page === 'appointment-booking' ? 'active' : ''}`}
              onClick={() => { setDoctorFilter('All'); navigateTo('doctors'); }}
            >
              <ClipboardList size={18} />
              <span>Doctor Marketplace</span>
            </div>

            <div
              className={`sidebar-item ${page === 'video-consultation' ? 'active' : ''}`}
              onClick={() => navigateTo('video-consultation')}
            >
              <Video size={18} />
              <span>Video Consultation</span>
            </div>

            <div
              className={`sidebar-item ${page === 'report-analyzer' ? 'active' : ''}`}
              onClick={() => navigateTo('report-analyzer')}
            >
              <Heart size={18} />
              <span>Report Analyzer</span>
            </div>

            <div
              className={`sidebar-item ${page === 'settings' ? 'active' : ''}`}
              onClick={() => navigateTo('settings')}
            >
              <Settings size={18} />
              <span>Settings</span>
            </div>
          </nav>

          <div className="sidebar-footer">
            {user ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <div className="user-profile-card">
                  <div className="user-avatar">
                    {user.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div className="user-info">
                    <span className="user-name">{user.name}</span>
                    <span className="user-role">{user.role === 'doctor' ? 'Practitioner' : 'Patient'}</span>
                  </div>
                </div>
                <div
                  className="sidebar-item"
                  onClick={handleLogout}
                  style={{ color: 'var(--accent-red)' }}
                >
                  <LogOut size={18} />
                  <span>Logout</span>
                </div>
              </div>
            ) : (
              <div
                className="sidebar-item"
                onClick={() => navigateTo('login')}
                style={{ color: 'var(--primary)' }}
              >
                <LogIn size={18} />
                <span>Log In / Register</span>
              </div>
            )}
          </div>
        </aside>
      )}

      {/* Main Content Area */}
      <div className="main-wrapper">
        
        {/* Top Navbar */}
        {showNav ? (
          <header className="top-navbar">
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <button
                className="action-btn"
                onClick={() => setSidebarOpen(!sidebarOpen)}
                style={{ border: 'none' }}
              >
                <Menu size={20} />
              </button>
              <div className="nav-search">
                <Search size={16} style={{ color: 'var(--text-muted)' }} />
                <input type="text" placeholder="Search parameters, symptoms, records..." />
              </div>
            </div>

            <div className="nav-actions">
              <button className="action-btn" title="Emergency Services" onClick={() => navigateTo('dashboard')} style={{ borderColor: '#fca5a5', color: '#dc2626', background: '#fee2e2' }}>
                🚨
              </button>
              <button className="action-btn" title="Notifications">
                <Bell size={18} />
                <span className="badge-dot"></span>
              </button>
              
              {user ? (
                <div
                  style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}
                  onClick={() => navigateTo('settings')}
                >
                  <div className="user-avatar" style={{ width: '34px', height: '34px', fontSize: '0.9rem' }}>
                    {user.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <span style={{ fontSize: '0.85rem', fontWeight: '600', color: 'var(--slate-800)' }} className="user-name">
                    {user.name.split(' ')[0]}
                  </span>
                </div>
              ) : (
                <button className="btn-primary" onClick={() => navigateTo('login')} style={{ padding: '0.45rem 1rem', fontSize: '0.8rem' }}>
                  Log In
                </button>
              )}
            </div>
          </header>
        ) : (
          /* Custom Small Navbar for Landing Page */
          <header className="top-navbar" style={{ position: 'static', background: 'transparent', borderBottom: 'none' }}>
            <div className="sidebar-logo" style={{ marginBottom: 0 }}>
              <div className="logo-icon">
                <Activity size={22} />
              </div>
              <span className="logo-text">HealthVerse</span>
            </div>
            
            <div className="nav-actions">
              <button className="btn-outline" onClick={() => navigateTo('symptom-checker')} style={{ padding: '0.5rem 1rem', fontSize: '0.85rem' }}>
                AI Checker
              </button>
              <button className="btn-primary" onClick={() => navigateTo('login')} style={{ padding: '0.5rem 1.2rem', fontSize: '0.85rem' }}>
                Access Platform
              </button>
            </div>
          </header>
        )}

        {/* Dynamic Page Container */}
        <main className="page-container">
          
          {page === 'landing' && (
            <LandingPage setPage={navigateTo} />
          )}

          {page === 'login' && (
            <LoginRegister
              setPage={navigateTo}
              setUser={setUser}
            />
          )}

          {page === 'dashboard' && (
            <HealthDashboard
              setPage={navigateTo}
              patientProfile={patientProfile}
              setPatientProfile={setPatientProfile}
            />
          )}

          {page === 'symptom-checker' && (
            <SymptomChecker
              setPage={navigateTo}
              setSelectedAssessment={setSelectedAssessment}
            />
          )}

          {page === 'treatment-comparison' && (
            <TreatmentComparison
              setPage={navigateTo}
              selectedAssessment={selectedAssessment}
              setDoctorFilter={setDoctorFilter}
            />
          )}

          {page === 'doctors' && (
            <DoctorListing
              setPage={navigateTo}
              setSelectedDoctor={setSelectedDoctor}
              doctorFilter={doctorFilter}
              setDoctorFilter={setDoctorFilter}
            />
          )}

          {page === 'doctor-profile' && (
            <DoctorProfile
              setPage={navigateTo}
              selectedDoctor={selectedDoctor}
            />
          )}

          {page === 'appointment-booking' && (
            <AppointmentBooking
              setPage={navigateTo}
              selectedDoctor={selectedDoctor}
              patientProfile={patientProfile}
              setPatientProfile={setPatientProfile}
            />
          )}

          {page === 'video-consultation' && (
            <VideoConsultation
              setPage={navigateTo}
              patientProfile={patientProfile}
            />
          )}

          {page === 'report-analyzer' && (
            <ReportAnalyzer
              setPage={navigateTo}
              setSelectedAssessment={setSelectedAssessment}
            />
          )}

          {page === 'settings' && (
            <SettingsPage
              patientProfile={patientProfile}
              setPatientProfile={setPatientProfile}
            />
          )}

        </main>
      </div>

    </div>
  );
}
