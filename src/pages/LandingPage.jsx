import React from 'react';
import { Activity, Shield, Cpu, RefreshCw, ChevronRight, Heart, Star, Users } from 'lucide-react';

export default function LandingPage({ setPage }) {
  return (
    <div className="landing-page animate-fade" style={{ display: 'flex', flexDirection: 'column', gap: '4rem', paddingBottom: '4rem' }}>
      
      {/* Hero Section */}
      <section style={{
        padding: '4rem 2rem',
        borderRadius: 'var(--radius-lg)',
        background: 'linear-gradient(135deg, rgba(2, 132, 199, 0.08) 0%, rgba(16, 185, 129, 0.08) 100%)',
        border: '1px solid rgba(255, 255, 255, 0.5)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
        gap: '1.5rem',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Glow Effects */}
        <div style={{ position: 'absolute', top: '-10%', left: '-10%', width: '300px', height: '300px', background: 'radial-gradient(circle, rgba(2,132,199,0.1) 0%, transparent 70%)', filter: 'blur(50px)' }}></div>
        <div style={{ position: 'absolute', bottom: '-10%', right: '-10%', width: '300px', height: '300px', background: 'radial-gradient(circle, rgba(16,185,129,0.1) 0%, transparent 70%)', filter: 'blur(50px)' }}></div>

        <div className="badge badge-allopathy" style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', fontSize: '0.85rem', padding: '0.4rem 1rem' }}>
          <Activity size={14} /> AI-Powered Holistic Healthcare
        </div>

        <h1 style={{ fontSize: '3rem', lineHeight: '1.2', fontWeight: '800', maxWidth: '800px', margin: '0 auto' }}>
          Ayurveda, Homeopathy, & Allopathy <br/>
          <span style={{ background: 'linear-gradient(135deg, var(--primary) 0%, var(--secondary) 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            Unified For Your Health
          </span>
        </h1>

        <p style={{ color: 'var(--text-muted)', fontSize: '1.15rem', maxWidth: '600px', margin: '0 auto' }}>
          HealthVerse bridges the gap between traditional wisdom and modern science. Assess your symptoms, compare recovery pathways, and book expert consultations.
        </p>

        <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem', flexWrap: 'wrap', justifyContent: 'center' }}>
          <button className="btn-primary" onClick={() => setPage('symptom-checker')} style={{ padding: '0.8rem 1.8rem', fontSize: '1rem' }}>
            Try AI Symptom Checker <ChevronRight size={18} />
          </button>
          <button className="btn-outline" onClick={() => setPage('doctors')} style={{ padding: '0.8rem 1.8rem', fontSize: '1rem', backgroundColor: 'white' }}>
            Find a Doctor
          </button>
        </div>
      </section>

      {/* Pathways Overview */}
      <section style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
        <div style={{ textAlign: 'center' }}>
          <h2 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>Three Pathways, One Platform</h2>
          <p style={{ color: 'var(--text-muted)' }}>Explore and compare healing frameworks to find your optimal cure.</p>
        </div>

        <div className="two-col-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))' }}>
          
          <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', gap: '1rem', borderTop: '4px solid var(--secondary)' }}>
            <div style={{ width: '48px', height: '48px', borderRadius: 'var(--radius-md)', backgroundColor: 'var(--secondary-light)', display: 'flex', alignItems: 'center', justifySelf: 'center', justifyContent: 'center', color: 'var(--secondary-hover)' }}>
              <Heart size={24} />
            </div>
            <h3 style={{ fontSize: '1.25rem' }}>Ayurveda</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
              Rooted in balance of three Doshas (Vata, Pitta, Kapha). Uses herbs, Panchakarma detox, yoga, and diet correction to treat conditions at their root.
            </p>
            <span style={{ fontSize: '0.85rem', fontWeight: '600', color: 'var(--secondary-hover)' }}>Best for: Chronic lifestyle diseases & long-term health boost.</span>
          </div>

          <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', gap: '1rem', borderTop: '4px solid #f59e0b' }}>
            <div style={{ width: '48px', height: '48px', borderRadius: 'var(--radius-md)', backgroundColor: '#fef3c7', display: 'flex', alignItems: 'center', justifySelf: 'center', justifyContent: 'center', color: '#d97706' }}>
              <RefreshCw size={24} />
            </div>
            <h3 style={{ fontSize: '1.25rem' }}>Homeopathy</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
              Operates on the principle of 'Like Cures Like'. Uses highly diluted natural remedies to gently stimulate the body self-healing intelligence.
            </p>
            <span style={{ fontSize: '0.85rem', fontWeight: '600', color: '#d97706' }}>Best for: Allergies, skin issues, pediatrics, and gentle healing.</span>
          </div>

          <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', gap: '1rem', borderTop: '4px solid var(--primary)' }}>
            <div style={{ width: '48px', height: '48px', borderRadius: 'var(--radius-md)', backgroundColor: 'var(--primary-light)', display: 'flex', alignItems: 'center', justifySelf: 'center', justifyContent: 'center', color: 'var(--primary)' }}>
              <Shield size={24} />
            </div>
            <h3 style={{ fontSize: '1.25rem' }}>Allopathy</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
              Modern clinical medicine using evidence-based drugs, laboratory diagnostics, surgeries, and vaccines for targeted disease management.
            </p>
            <span style={{ fontSize: '0.85rem', fontWeight: '600', color: 'var(--primary)' }}>Best for: Emergencies, acute pain, surgery, and fast symptom control.</span>
          </div>

        </div>
      </section>

      {/* Trust & Features Showcase */}
      <section className="two-col-grid" style={{ alignItems: 'center', gap: '3rem' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <h2 style={{ fontSize: '2.25rem', lineHeight: '1.3' }}>AI-Powered Diagnostic & Comparative Engine</h2>
          <p style={{ color: 'var(--text-muted)' }}>
            Unsure where to start? Enter your symptoms into our health checker. Our medical AI cross-references across multiple treatment paradigms, showing you side-by-side cost, recovery times, and scientific validity.
          </p>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div style={{ display: 'flex', gap: '1rem' }}>
              <div style={{ color: 'var(--primary)', marginTop: '0.2rem' }}><Cpu size={20} /></div>
              <div>
                <h4 style={{ fontSize: '1.05rem', fontWeight: '600' }}>Deep Symptom Analysis</h4>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>Multi-turn dialogue that prompts follow-ups to refine probable condition mapping.</p>
              </div>
            </div>
            <div style={{ display: 'flex', gap: '1rem' }}>
              <div style={{ color: 'var(--secondary)', marginTop: '0.2rem' }}><RefreshCw size={20} /></div>
              <div>
                <h4 style={{ fontSize: '1.05rem', fontWeight: '600' }}>Recovery Timeline Forecasting</h4>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>Smart models estimate the speed and efficiency of each treatment type based on severity.</p>
              </div>
            </div>
          </div>

          <button className="btn-secondary" onClick={() => setPage('symptom-checker')} style={{ alignSelf: 'flex-start', marginTop: '0.5rem' }}>
            Open AI Checker
          </button>
        </div>

        {/* Visual Mock Grid */}
        <div style={{
          background: 'linear-gradient(135deg, rgba(2, 132, 199, 0.05) 0%, rgba(16, 185, 129, 0.05) 100%)',
          borderRadius: 'var(--radius-lg)',
          padding: '2rem',
          border: '1px solid var(--border-color)',
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem',
          boxShadow: 'var(--shadow-glass)'
        }}>
          <div className="glass-card" style={{ padding: '1rem', display: 'flex', alignItems: 'center', gap: '1rem', background: 'rgba(255, 255, 255, 0.9)' }}>
            <div style={{ background: '#d1fae5', color: '#059669', width: '36px', height: '36px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '700' }}>94%</div>
            <div>
              <h5 style={{ fontSize: '0.9rem', fontWeight: '600' }}>Ayurveda Compatibility</h5>
              <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>High suitability for chronic acid reflux and diet correction.</p>
            </div>
          </div>
          <div className="glass-card" style={{ padding: '1rem', display: 'flex', alignItems: 'center', gap: '1rem', background: 'rgba(255, 255, 255, 0.9)', transform: 'translateX(20px)' }}>
            <div style={{ background: '#e0f2fe', color: '#0284c7', width: '36px', height: '36px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '700' }}>45%</div>
            <div>
              <h5 style={{ fontSize: '0.9rem', fontWeight: '600' }}>Allopathy Compatibility</h5>
              <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Low suitability for symptoms. Short-term relief only.</p>
            </div>
          </div>
          <div className="glass-card" style={{ padding: '1rem', display: 'flex', alignItems: 'center', gap: '1rem', background: 'rgba(255, 255, 255, 0.9)', transform: 'translateX(10px)' }}>
            <div style={{ background: '#fef3c7', color: '#d97706', width: '36px', height: '36px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '700' }}>78%</div>
            <div>
              <h5 style={{ fontSize: '0.9rem', fontWeight: '600' }}>Homeopathy Compatibility</h5>
              <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Good suitability for gradual system reboot.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Counter Section */}
      <section style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '2rem',
        padding: '2rem',
        background: 'white',
        border: '1px solid var(--border-color)',
        borderRadius: 'var(--radius-lg)',
        textAlign: 'center',
        boxShadow: 'var(--shadow-sm)'
      }}>
        <div>
          <h2 style={{ fontSize: '2.5rem', fontWeight: '700', color: 'var(--primary)' }}>50+</h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Verified Medical Specialists</p>
        </div>
        <div>
          <h2 style={{ fontSize: '2.5rem', fontWeight: '700', color: 'var(--secondary)' }}>12,000+</h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Consultations Managed</p>
        </div>
        <div>
          <h2 style={{ fontSize: '2.5rem', fontWeight: '700', color: 'var(--slate-800)' }}>99.2%</h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Patient Satisfaction Rating</p>
        </div>
        <div>
          <h2 style={{ fontSize: '2.5rem', fontWeight: '700', color: 'var(--accent-orange)' }}>15 Mins</h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Average Time-to-Consult</p>
        </div>
      </section>

      {/* Emergency CTA */}
      <section className="glass-card" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: '1rem', border: '1px solid #fee2e2', background: '#fff5f5' }}>
        <div style={{ color: 'var(--accent-red)' }}><Activity size={32} className="badge-emergency" style={{ borderRadius: '50%', padding: '4px' }} /></div>
        <h3 style={{ color: '#991b1b' }}>Need Immediate Medical Care?</h3>
        <p style={{ maxWidth: '600px', color: '#7f1d1d', fontSize: '0.9rem' }}>
          If you are experiencing chest pain, major respiratory distress, sudden loss of speech/movement, or bleeding, bypass alternative pathways. Go directly to a hospital or enter our Emergency Mode.
        </p>
        <button className="btn-primary" onClick={() => setPage('dashboard')} style={{ background: 'var(--accent-red)', boxShadow: '0 4px 12px rgba(239, 68, 68, 0.2)' }}>
          Launch Emergency Dashboard
        </button>
      </section>

    </div>
  );
}
