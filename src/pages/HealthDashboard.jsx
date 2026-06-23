import React, { useState } from 'react';
import { Activity, Calendar, ShieldCheck, Heart, Dumbbell, Clock, Plus, AlertCircle, Sparkles, Check, CheckSquare, Square } from 'lucide-react';

export default function HealthDashboard({ setPage, patientProfile, setPatientProfile }) {
  const [reminders, setReminders] = useState(patientProfile.activeReminders);
  const [healthScore, setHealthScore] = useState(patientProfile.healthScore);
  const [showEmergency, setShowEmergency] = useState(false);

  const toggleReminder = (id) => {
    const updated = reminders.map((rem) => {
      if (rem.id === id) {
        const nextState = !rem.completed;
        // Boost health score if user checks off a medicine reminder!
        if (nextState) {
          setHealthScore((prev) => Math.min(100, prev + 2));
        } else {
          setHealthScore((prev) => Math.max(0, prev - 2));
        }
        return { ...rem, completed: nextState };
      }
      return rem;
    });

    setReminders(updated);
    setPatientProfile({
      ...patientProfile,
      activeReminders: updated,
      healthScore: healthScore
    });
  };

  return (
    <div className="health-dashboard-page animate-fade" style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      
      {/* Emergency Mode Overlay */}
      {showEmergency && (
        <div style={{
          position: 'fixed',
          top: 0, right: 0, bottom: 0, left: 0,
          backgroundColor: 'rgba(15, 23, 42, 0.85)',
          backdropFilter: 'blur(10px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 9999,
          padding: '1.5rem'
        }}>
          <div className="glass-card animate-fade" style={{
            maxWidth: '550px',
            background: 'white',
            border: '2px solid var(--accent-red)',
            padding: '2.5rem',
            textAlign: 'center',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '1.5rem',
            boxShadow: '0 20px 50px rgba(239, 68, 68, 0.3)'
          }}>
            <div className="badge-emergency" style={{ width: '80px', height: '80px', borderRadius: '50%', backgroundColor: '#fee2e2', color: 'var(--accent-red)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <AlertCircle size={48} />
            </div>
            <div>
              <h2 style={{ color: '#b91c1c', fontSize: '1.8rem', fontWeight: '800' }}>EMERGENCY CLINICAL PROTOCOL</h2>
              <p style={{ color: 'var(--slate-700)', fontSize: '0.95rem', marginTop: '0.5rem', fontWeight: '500' }}>
                You have activated HealthVerse Emergency Mode. Our system indicates high-risk indicators requiring physical, immediate clinical investigation.
              </p>
            </div>

            <div style={{
              width: '100%',
              backgroundColor: 'var(--slate-50)',
              border: '1px solid var(--border-color)',
              borderRadius: 'var(--radius-md)',
              padding: '1rem',
              textAlign: 'left',
              fontSize: '0.85rem',
              display: 'flex',
              flexDirection: 'column',
              gap: '0.5rem',
              color: 'var(--slate-800)'
            }}>
              <div>🚨 <strong>Primary Action:</strong> Go to the nearest Hospital ER immediately.</div>
              <div>📞 <strong>Ambulance Hotline:</strong> Call <strong>911</strong> or <strong>112</strong> immediately.</div>
              <div>📍 <strong>Nearest Clinical Trauma Centers:</strong></div>
              <ul style={{ paddingLeft: '1.25rem' }}>
                <li>City General ER & Trauma Center (0.8 mi) - <strong>Open 24/7</strong></li>
                <li>Mercy Cardiovascular Trauma Clinic (2.1 mi) - <strong>Open 24/7</strong></li>
              </ul>
            </div>

            <div style={{ display: 'flex', gap: '0.75rem', width: '100%' }}>
              <button className="btn-primary" style={{ flex: 1, backgroundColor: 'var(--accent-red)', border: 'none', justifyContent: 'center' }}>
                Call Ambulance Now
              </button>
              <button className="btn-outline" onClick={() => setShowEmergency(false)} style={{ flex: 1 }}>
                Cancel Emergency
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Welcome Banner */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h2 style={{ fontSize: '1.75rem', fontWeight: '800' }}>Welcome back, {patientProfile.name}!</h2>
          <p style={{ color: 'var(--text-muted)' }}>Here is your integrated health assessment and daily lifestyle checklist.</p>
        </div>
        <button
          onClick={() => setShowEmergency(true)}
          className="btn-primary"
          style={{ background: 'var(--accent-red)', color: 'white', fontWeight: '700', boxShadow: '0 4px 12px rgba(239, 68, 68, 0.2)' }}
        >
          🚨 ACTIVATE EMERGENCY MODE
        </button>
      </div>

      {/* Main Grid: Left column (Score and stats), Right Column (Meds, diet, upcoming) */}
      <div className="dashboard-grid">
        
        {/* Left Column */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          
          {/* Health Score & Recovery Meter */}
          <div className="two-col-grid">
            
            {/* Health Score Card */}
            <div className="glass-card" style={{ background: 'white', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '2rem' }}>
              <h4 style={{ fontSize: '1rem', color: 'var(--text-muted)', marginBottom: '1rem', fontWeight: '700' }}>AI HEALTH SCORE</h4>
              
              <div style={{ position: 'relative', width: '120px', height: '120px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem' }}>
                {/* Simulated circle indicator */}
                <svg width="120" height="120" viewBox="0 0 120 120" style={{ transform: 'rotate(-90deg)' }}>
                  <circle cx="60" cy="60" r="50" fill="none" stroke="var(--slate-100)" strokeWidth="10" />
                  <circle cx="60" cy="60" r="50" fill="none" stroke="var(--primary)" strokeWidth="10" strokeDasharray="314" strokeDashoffset={314 - (314 * healthScore) / 100} style={{ transition: 'stroke-dashoffset var(--transition-slow)' }} />
                </svg>
                <div style={{ position: 'absolute', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <span style={{ fontSize: '1.8rem', fontWeight: '800', color: 'var(--slate-800)' }}>{healthScore}</span>
                  <span style={{ fontSize: '0.65rem', color: 'var(--text-muted)' }}>/ 100</span>
                </div>
              </div>

              <div className="badge badge-ayurveda" style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', fontSize: '0.75rem' }}>
                <Sparkles size={12} /> Baseline: Good
              </div>
              <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.75rem' }}>
                Check off your medicine reminders and complete daily exercise to raise this score.
              </p>
            </div>

            {/* Recovery Meter Card */}
            <div className="glass-card" style={{ background: 'white', display: 'flex', flexDirection: 'column', padding: '1.5rem', justifyContent: 'space-between' }}>
              <div>
                <h4 style={{ fontSize: '1rem', color: 'var(--text-muted)', marginBottom: '0.5rem', fontWeight: '700' }}>RECOVERY PROBABILITY METER</h4>
                <h2 style={{ fontSize: '2rem', fontWeight: '800', color: 'var(--secondary-hover)' }}>{patientProfile.recoveryProbability}%</h2>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>
                  Expected recovery likelihood based on currently diagnosed digestive parameters.
                </p>
              </div>

              <div style={{ marginTop: '1rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', fontWeight: '600', marginBottom: '0.25rem' }}>
                  <span>Current Progress</span>
                  <span>Active Therapy</span>
                </div>
                <div style={{ height: '8px', background: 'var(--slate-100)', borderRadius: '4px', overflow: 'hidden' }}>
                  <div style={{ width: `${patientProfile.recoveryProbability}%`, height: '100%', background: 'var(--secondary)' }}></div>
                </div>
              </div>

              <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', display: 'block', marginTop: '0.5rem' }}>
                Factors boosting probability: Ayurvedic herbal balancing, consistent cardio habits.
              </span>
            </div>

          </div>

          {/* Disease Risk Prediction Cards */}
          <div className="glass-card" style={{ background: 'white' }}>
            <h3 style={{ fontSize: '1.1rem', fontWeight: '700', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
              <Activity size={18} style={{ color: 'var(--primary)' }} /> AI Disease Risk Predictions
            </h3>
            
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '1rem' }}>
              <div style={{ padding: '1rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)', backgroundColor: 'var(--slate-50)' }}>
                <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: '700' }}>Cardiovascular</span>
                <h4 style={{ fontSize: '1.1rem', color: 'var(--secondary-hover)', fontWeight: '700', marginTop: '0.15rem' }}>Low Risk</h4>
                <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', marginTop: '0.35rem' }}>HDL/LDL ratio is safe. Heart rate variability: 72ms.</div>
              </div>

              <div style={{ padding: '1rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)', backgroundColor: 'var(--slate-50)' }}>
                <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: '700' }}>Gastrointestinal</span>
                <h4 style={{ fontSize: '1.1rem', color: 'var(--accent-orange)', fontWeight: '700', marginTop: '0.15rem' }}>Moderate Risk</h4>
                <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', marginTop: '0.35rem' }}>Frequent reports of hyperacidity. Pitta dosha slightly elevated.</div>
              </div>

              <div style={{ padding: '1rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)', backgroundColor: 'var(--slate-50)' }}>
                <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: '700' }}>Metabolic / Sugar</span>
                <h4 style={{ fontSize: '1.1rem', color: 'var(--secondary-hover)', fontWeight: '700', marginTop: '0.15rem' }}>Low Risk</h4>
                <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', marginTop: '0.35rem' }}>Fasting glucose: 88 mg/dL. Active physical habits.</div>
              </div>
            </div>
          </div>

          {/* Consultation History */}
          <div className="glass-card" style={{ background: 'white' }}>
            <h3 style={{ fontSize: '1.1rem', fontWeight: '700', marginBottom: '1rem' }}>Consultation & Prescription Vault</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {patientProfile.consultationHistory.map((con) => (
                <div key={con.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0.85rem 1rem', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)', fontSize: '0.85rem' }}>
                  <div>
                    <h5 style={{ fontWeight: '700' }}>{con.doctorName}</h5>
                    <span style={{ color: 'var(--text-muted)', fontSize: '0.75rem' }}>{con.specialty} • {con.date}</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <span className={`badge badge-${con.type.toLowerCase().replace('ic', '')}`}>
                      {con.type}
                    </span>
                    <button className="action-btn" title="Download Rx PDF" style={{ width: '32px', height: '32px' }}>
                      <Calendar size={14} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Right Column */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          
          {/* Active Medicine Reminders */}
          <div className="glass-card" style={{ background: 'white' }}>
            <h3 style={{ fontSize: '1.1rem', fontWeight: '700', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Clock size={18} style={{ color: 'var(--primary)' }} />
              Medicine Reminders
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {reminders.map((rem) => (
                <div
                  key={rem.id}
                  onClick={() => toggleReminder(rem.id)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.75rem',
                    padding: '0.75rem',
                    border: '1px solid var(--border-color)',
                    borderRadius: 'var(--radius-md)',
                    cursor: 'pointer',
                    backgroundColor: rem.completed ? 'var(--slate-50)' : 'white',
                    opacity: rem.completed ? 0.75 : 1,
                    transition: 'all var(--transition-fast)'
                  }}
                >
                  <div style={{ color: rem.completed ? 'var(--secondary)' : 'var(--slate-300)' }}>
                    {rem.completed ? <CheckSquare size={20} /> : <Square size={20} />}
                  </div>
                  <div style={{ flex: 1 }}>
                    <h5 style={{
                      fontSize: '0.85rem',
                      fontWeight: '700',
                      textDecoration: rem.completed ? 'line-through' : 'none',
                      color: rem.completed ? 'var(--text-muted)' : 'var(--slate-800)'
                    }}>
                      {rem.name}
                    </h5>
                    <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{rem.dosage} • {rem.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Upcoming Video Visits */}
          <div className="glass-card" style={{ background: 'white' }}>
            <h3 style={{ fontSize: '1.1rem', fontWeight: '700', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Calendar size={18} style={{ color: 'var(--secondary)' }} />
              Upcoming Video Visits
            </h3>
            {patientProfile.upcomingAppointments.length > 0 ? (
              patientProfile.upcomingAppointments.map((app) => (
                <div key={app.id} style={{ padding: '1rem', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <div>
                      <h5 style={{ fontWeight: '700', fontSize: '0.9rem' }}>{app.doctorName}</h5>
                      <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{app.specialty}</p>
                    </div>
                    <span className={`badge badge-${app.type.toLowerCase().replace('ic', '')}`} style={{ fontSize: '0.7rem' }}>
                      {app.type}
                    </span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', color: 'var(--slate-800)' }}>
                    <span>📅 {app.date}</span>
                    <span>⏰ {app.time}</span>
                  </div>
                  <button className="btn-primary" onClick={() => setPage('video-consultation')} style={{ fontSize: '0.8rem', padding: '0.45rem', justifyContent: 'center' }}>
                    Join Video Call
                  </button>
                </div>
              ))
            ) : (
              <div style={{ textAlign: 'center', padding: '1.5rem', color: 'var(--text-muted)', fontSize: '0.85rem' }}>
                No video appointments booked.
              </div>
            )}
          </div>

          {/* Diet & Exercise Lifestyle Guides */}
          <div className="glass-card" style={{ background: 'white' }}>
            <h3 style={{ fontSize: '1.1rem', fontWeight: '700', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Heart size={18} style={{ color: 'var(--accent-orange)' }} />
              Personalized Lifestyle
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              
              <div>
                <h5 style={{ fontSize: '0.85rem', fontWeight: '700', color: 'var(--slate-700)', display: 'flex', alignItems: 'center', gap: '0.25rem', marginBottom: '0.35rem' }}>
                  🥞 Tailored Diet Plan (Cooling Pitta)
                </h5>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem', fontSize: '0.75rem', color: 'var(--slate-800)' }}>
                  {patientProfile.dietPlan.slice(0, 2).map((item, i) => (
                    <div key={i}><strong>{item.meal}:</strong> {item.food}</div>
                  ))}
                </div>
              </div>

              <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '0.75rem' }}>
                <h5 style={{ fontSize: '0.85rem', fontWeight: '700', color: 'var(--slate-700)', display: 'flex', alignItems: 'center', gap: '0.25rem', marginBottom: '0.35rem' }}>
                  <Dumbbell size={14} /> Exercise Routine
                </h5>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem', fontSize: '0.75rem', color: 'var(--slate-800)' }}>
                  {patientProfile.exercisePlan.slice(0, 2).map((item, i) => (
                    <div key={i}><strong>{item.activity}:</strong> {item.duration} ({item.intensity})</div>
                  ))}
                </div>
              </div>

            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
