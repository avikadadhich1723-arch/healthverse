import React, { useState } from 'react';
import { ShieldCheck, Mail, Lock, User, Check, ArrowRight } from 'lucide-react';

export default function LoginRegister({ setPage, setUser }) {
  const [isLogin, setIsLogin] = useState(true);
  const [role, setRole] = useState('patient'); // patient, doctor
  const [email, setEmail] = useState('alex.mercer@healthverse.com');
  const [password, setPassword] = useState('password123');
  const [name, setName] = useState('Alex Mercer');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password || (!isLogin && !name)) {
      setError('Please fill in all fields.');
      return;
    }
    
    // Successful login simulation
    setUser({
      name: isLogin ? (role === 'doctor' ? 'Dr. Sarah Jenkins' : 'Alex Mercer') : name,
      email,
      role
    });
    
    if (role === 'doctor') {
      setPage('video-consultation'); // Go straight to consultation/appointments for doctors
    } else {
      setPage('dashboard'); // Patients see their health dashboard
    }
  };

  const handleRoleToggle = (selectedRole) => {
    setRole(selectedRole);
    if (selectedRole === 'doctor') {
      setEmail('sarah.jenkins@healthverse.com');
      setName('Dr. Sarah Jenkins');
    } else {
      setEmail('alex.mercer@healthverse.com');
      setName('Alex Mercer');
    }
  };

  return (
    <div className="login-register-page animate-fade" style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: 'calc(100vh - 180px)',
      padding: '2rem 0'
    }}>
      <div className="glass-card" style={{
        width: '100%',
        maxWidth: '460px',
        padding: '2.5rem',
        background: 'white',
        boxShadow: 'var(--shadow-lg)'
      }}>
        {/* Toggle Roles */}
        <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '2rem', background: 'var(--slate-100)', padding: '0.35rem', borderRadius: 'var(--radius-md)' }}>
          <button
            onClick={() => handleRoleToggle('patient')}
            style={{
              flex: 1,
              padding: '0.5rem 1rem',
              border: 'none',
              borderRadius: 'var(--radius-sm)',
              background: role === 'patient' ? 'white' : 'transparent',
              color: role === 'patient' ? 'var(--primary)' : 'var(--text-muted)',
              fontWeight: '600',
              fontSize: '0.875rem',
              cursor: 'pointer',
              boxShadow: role === 'patient' ? 'var(--shadow-sm)' : 'none',
              transition: 'all var(--transition-fast)'
            }}
          >
            Patient Access
          </button>
          <button
            onClick={() => handleRoleToggle('doctor')}
            style={{
              flex: 1,
              padding: '0.5rem 1rem',
              border: 'none',
              borderRadius: 'var(--radius-sm)',
              background: role === 'doctor' ? 'white' : 'transparent',
              color: role === 'doctor' ? 'var(--primary)' : 'var(--text-muted)',
              fontWeight: '600',
              fontSize: '0.875rem',
              cursor: 'pointer',
              boxShadow: role === 'doctor' ? 'var(--shadow-sm)' : 'none',
              transition: 'all var(--transition-fast)'
            }}
          >
            Doctor Portal
          </button>
        </div>

        {/* Title */}
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <h2 style={{ fontSize: '1.75rem', fontWeight: '700', marginBottom: '0.25rem' }}>
            {isLogin ? 'Welcome Back' : 'Create Account'}
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
            {isLogin 
              ? `Access your HealthVerse ${role} dashboard` 
              : 'Sign up to unified holistic healthcare'
            }
          </p>
        </div>

        {error && (
          <div style={{ padding: '0.75rem 1rem', backgroundColor: '#fee2e2', color: '#b91c1c', borderRadius: 'var(--radius-md)', fontSize: '0.85rem', marginBottom: '1.25rem', display: 'flex', gap: '0.5rem' }}>
            <span>⚠️</span>
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          
          {!isLogin && (
            <div className="form-group">
              <label>Full Name</label>
              <div style={{ position: 'relative' }}>
                <User size={18} style={{ position: 'absolute', left: '12px', top: '12px', color: 'var(--text-muted)' }} />
                <input
                  type="text"
                  className="form-control"
                  style={{ paddingLeft: '40px', width: '100%' }}
                  placeholder="Enter your full name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
            </div>
          )}

          <div className="form-group">
            <label>Email Address</label>
            <div style={{ position: 'relative' }}>
              <Mail size={18} style={{ position: 'absolute', left: '12px', top: '12px', color: 'var(--text-muted)' }} />
              <input
                type="email"
                className="form-control"
                style={{ paddingLeft: '40px', width: '100%' }}
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>

          <div className="form-group">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <label>Password</label>
              {isLogin && (
                <a href="#forgot" style={{ fontSize: '0.75rem', color: 'var(--primary)', fontWeight: '600' }}>Forgot password?</a>
              )}
            </div>
            <div style={{ position: 'relative' }}>
              <Lock size={18} style={{ position: 'absolute', left: '12px', top: '12px', color: 'var(--text-muted)' }} />
              <input
                type="password"
                className="form-control"
                style={{ paddingLeft: '40px', width: '100%' }}
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          {isLogin && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', margin: '0.25rem 0' }}>
              <input type="checkbox" id="remember" style={{ cursor: 'pointer' }} defaultChecked />
              <label htmlFor="remember" style={{ fontSize: '0.85rem', color: 'var(--slate-700)', cursor: 'pointer' }}>Keep me logged in</label>
            </div>
          )}

          <button type="submit" className="btn-primary" style={{ width: '100%', justifyContent: 'center', padding: '0.75rem', fontSize: '0.95rem', marginTop: '0.5rem' }}>
            {isLogin ? 'Login Securely' : 'Register Now'} <ArrowRight size={16} />
          </button>
        </form>

        <div style={{ position: 'relative', margin: '2rem 0 1.5rem 0', textAlign: 'center' }}>
          <div style={{ position: 'absolute', top: '50%', left: 0, right: 0, height: '1px', backgroundColor: 'var(--border-color)', zIndex: 1 }}></div>
          <span style={{ position: 'relative', zIndex: 2, backgroundColor: 'white', padding: '0 0.75rem', fontSize: '0.8rem', color: 'var(--text-muted)' }}>DEMO MODE</span>
        </div>

        <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', textAlign: 'center' }}>
          {isLogin ? "Don't have an account? " : "Already have an account? "}
          <button
            onClick={() => { setIsLogin(!isLogin); setError(''); }}
            style={{
              background: 'none',
              border: 'none',
              color: 'var(--primary)',
              fontWeight: '600',
              cursor: 'pointer',
              textDecoration: 'underline'
            }}
          >
            {isLogin ? 'Sign up' : 'Log in'}
          </button>
        </div>

        {/* Demo Credentials Tip */}
        <div style={{ marginTop: '1.5rem', padding: '0.75rem', backgroundColor: 'var(--slate-50)', border: '1px dashed var(--border-color)', borderRadius: 'var(--radius-sm)', fontSize: '0.8rem', color: 'var(--slate-700)' }}>
          <strong>💡 Demo Hint:</strong> Click the secure login button directly. The form is pre-filled with demo credentials. Switch to "Doctor Portal" to log in as a practitioner.
        </div>
      </div>
    </div>
  );
}
