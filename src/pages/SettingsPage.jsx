import React, { useState } from 'react';
import { Globe, Bell, Volume2, User, Shield, CheckCircle2 } from 'lucide-react';

export default function SettingsPage({ patientProfile, setPatientProfile }) {
  const [name, setName] = useState(patientProfile.name);
  const [email, setEmail] = useState(patientProfile.email);
  const [age, setAge] = useState(patientProfile.age);
  const [language, setLanguage] = useState('en'); // en, es, hi, de
  const [voiceVolume, setVoiceVolume] = useState(70);
  const [notifications, setNotifications] = useState({
    reminders: true,
    consultations: true,
    healthScore: false
  });
  const [showSavedAlert, setShowSavedAlert] = useState(false);

  const handleSave = (e) => {
    e.preventDefault();
    setPatientProfile({
      ...patientProfile,
      name,
      email,
      age: parseInt(age)
    });
    setShowSavedAlert(true);
    setTimeout(() => {
      setShowSavedAlert(false);
    }, 3000);
  };

  const getLanguageAlertText = () => {
    switch (language) {
      case 'es': return 'Idioma cambiado a Español. (Simulación)';
      case 'hi': return 'भाषा बदलकर हिंदी कर दी गई है। (सिमुलेशन)';
      case 'de': return 'Sprache auf Deutsch geändert. (Simulation)';
      case 'en':
      default: return 'Language set to English.';
    }
  };

  return (
    <div className="settings-page animate-fade" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      
      {/* Header */}
      <div>
        <h2 style={{ fontSize: '1.75rem', fontWeight: '700' }}>Account Settings</h2>
        <p style={{ color: 'var(--text-muted)' }}>Configure notifications, platform voice input, languages, and personal details.</p>
      </div>

      {showSavedAlert && (
        <div style={{ padding: '0.85rem 1.25rem', backgroundColor: 'var(--secondary-light)', color: 'var(--secondary-hover)', borderRadius: 'var(--radius-md)', fontSize: '0.9rem', display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
          <CheckCircle2 size={18} />
          <span>Settings successfully updated! {getLanguageAlertText()}</span>
        </div>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '2rem' }}>
        
        {/* Forms column */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          
          {/* Personal profile details */}
          <div className="glass-card" style={{ background: 'white' }}>
            <h3 style={{ fontSize: '1.15rem', fontWeight: '700', marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <User size={18} style={{ color: 'var(--primary)' }} /> Personal Details
            </h3>

            <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div className="two-col-grid">
                <div className="form-group">
                  <label>Full Name</label>
                  <input
                    type="text"
                    className="form-control"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Age</label>
                  <input
                    type="number"
                    className="form-control"
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Email Address</label>
                <input
                  type="email"
                  className="form-control"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <button type="submit" className="btn-primary" style={{ alignSelf: 'flex-start', marginTop: '0.5rem' }}>
                Save Changes
              </button>
            </form>
          </div>

          {/* Multilingual & Voice Input */}
          <div className="glass-card" style={{ background: 'white' }}>
            <h3 style={{ fontSize: '1.15rem', fontWeight: '700', marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Globe size={18} style={{ color: 'var(--secondary)' }} /> Language & Voice Input
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              
              <div className="form-group">
                <label>Default Interface Language</label>
                <select
                  className="form-control"
                  value={language}
                  onChange={(e) => { setLanguage(e.target.value); setShowSavedAlert(true); setTimeout(() => setShowSavedAlert(false), 2500); }}
                >
                  <option value="en">English (US)</option>
                  <option value="es">Español (Spanish)</option>
                  <option value="hi">हिंदी (Hindi)</option>
                  <option value="de">Deutsch (German)</option>
                </select>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <label style={{ fontSize: '0.875rem', fontWeight: '500', color: 'var(--slate-700)', display: 'flex', justifyContent: 'space-between' }}>
                  <span>Voice Microphone Sensitivity</span>
                  <strong>{voiceVolume}%</strong>
                </label>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <Volume2 size={16} style={{ color: 'var(--text-muted)' }} />
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={voiceVolume}
                    onChange={(e) => setVoiceVolume(e.target.value)}
                    style={{ flex: 1, cursor: 'pointer' }}
                  />
                </div>
              </div>

            </div>
          </div>

        </div>

        {/* Notifications & Security Sidebar */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          
          {/* Notification toggles */}
          <div className="glass-card" style={{ background: 'white' }}>
            <h3 style={{ fontSize: '1.1rem', fontWeight: '700', marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Bell size={18} style={{ color: 'var(--accent-orange)' }} /> Notification Settings
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', fontSize: '0.875rem' }}>
                <input
                  type="checkbox"
                  checked={notifications.reminders}
                  onChange={() => setNotifications({ ...notifications, reminders: !notifications.reminders })}
                />
                <span>Daily Medicine Reminders</span>
              </label>

              <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', fontSize: '0.875rem' }}>
                <input
                  type="checkbox"
                  checked={notifications.consultations}
                  onChange={() => setNotifications({ ...notifications, consultations: !notifications.consultations })}
                />
                <span>Upcoming Consultation Alerts</span>
              </label>

              <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', fontSize: '0.875rem' }}>
                <input
                  type="checkbox"
                  checked={notifications.healthScore}
                  onChange={() => setNotifications({ ...notifications, healthScore: !notifications.healthScore })}
                />
                <span>Weekly Health Score logs</span>
              </label>
            </div>
          </div>

          {/* Security & Health Compliance info */}
          <div className="glass-card" style={{ background: 'white', borderTop: '4px solid var(--primary)' }}>
            <h3 style={{ fontSize: '1.1rem', fontWeight: '700', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
              <Shield size={16} style={{ color: 'var(--primary)' }} /> Compliance & Security
            </h3>
            <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', lineHeight: '1.5' }}>
              HealthVerse is HIPAA compliant. All tele-consultation data, prescriptions, and blood panels are stored securely utilizing AES-256 military-grade encryption.
            </p>
          </div>

        </div>

      </div>

    </div>
  );
}
