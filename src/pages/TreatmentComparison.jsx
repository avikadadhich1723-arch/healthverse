import React, { useState } from 'react';
import { Calendar, RefreshCw, Award, Heart, CheckCircle2, ChevronRight, TrendingUp } from 'lucide-react';

export default function TreatmentComparison({ setPage, selectedAssessment, setDoctorFilter }) {
  const [severity, setSeverity] = useState('moderate'); // mild, moderate, severe

  // Fallback assessment if user navigated straight here without using the Symptom Checker
  const assessment = selectedAssessment || {
    condition: "Acidity & Pitta Aggravation",
    description: "Mild to moderate inflammation of stomach lining and acid reflux.",
    primarySystem: "Ayurveda",
    scores: { ayurveda: 95, homeopathy: 80, allopathy: 50 }
  };

  const getTimelineModifier = () => {
    switch (severity) {
      case 'mild': return { ayurveda: '1-2 weeks', homeopathy: '2-3 weeks', allopathy: '2-3 days' };
      case 'severe': return { ayurveda: '2-3 months', homeopathy: '3-4 months', allopathy: '10-15 days' };
      case 'moderate':
      default: return { ayurveda: '4-6 weeks', homeopathy: '6-8 weeks', allopathy: '5-7 days' };
    }
  };

  const timelines = getTimelineModifier();

  const handleBookPathway = (pathway) => {
    setDoctorFilter(pathway);
    setPage('doctors');
  };

  return (
    <div className="treatment-comparison-page animate-fade" style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      
      {/* Header */}
      <div>
        <h2 style={{ fontSize: '1.75rem', fontWeight: '700' }}>Treatment Comparison Engine</h2>
        <p style={{ color: 'var(--text-muted)' }}>
          Comparing pathways for: <strong style={{ color: 'var(--slate-800)' }}>{assessment.condition}</strong>
        </p>
      </div>

      {/* Disease Severity & Smart Recovery Prediction */}
      <section className="glass-card" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', background: 'linear-gradient(135deg, white 0%, rgba(224, 242, 254, 0.2) 100%)' }}>
        <h3 style={{ fontSize: '1.25rem', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <TrendingUp size={20} style={{ color: 'var(--primary)' }} />
          Smart Recovery Prediction
        </h3>

        <div className="two-col-grid" style={{ gap: '2rem' }}>
          {/* Controls */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <div>
              <label style={{ fontWeight: '600', fontSize: '0.9rem', color: 'var(--slate-700)', display: 'block', marginBottom: '0.5rem' }}>
                Simulate Disease Severity: <span style={{ textTransform: 'capitalize', color: 'var(--primary)', fontWeight: '700' }}>{severity}</span>
              </label>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                {['mild', 'moderate', 'severe'].map((level) => (
                  <button
                    key={level}
                    onClick={() => setSeverity(level)}
                    style={{
                      flex: 1,
                      padding: '0.5rem 1rem',
                      border: '1px solid var(--border-color)',
                      borderRadius: 'var(--radius-md)',
                      backgroundColor: severity === level ? 'var(--primary-light)' : 'white',
                      borderColor: severity === level ? 'var(--primary)' : 'var(--border-color)',
                      color: severity === level ? 'var(--primary-hover)' : 'var(--slate-700)',
                      fontWeight: '600',
                      cursor: 'pointer',
                      textTransform: 'capitalize',
                      transition: 'all var(--transition-fast)'
                    }}
                  >
                    {level}
                  </button>
                ))}
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '1rem', backgroundColor: 'white', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}>
              <div style={{ width: '50px', height: '50px', borderRadius: '50%', backgroundColor: 'var(--secondary-light)', color: 'var(--secondary-hover)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '700', fontSize: '1.1rem' }}>
                86%
              </div>
              <div>
                <h4 style={{ fontSize: '0.9rem', fontWeight: '700' }}>AI Confidence Score</h4>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Based on clinical symptoms & 12k similar patient histories.</p>
              </div>
            </div>
          </div>

          {/* Recovery factors */}
          <div>
            <h4 style={{ fontSize: '0.9rem', fontWeight: '700', marginBottom: '0.5rem' }}>Key Recovery Speed Factors:</h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.4rem', fontSize: '0.85rem', color: 'var(--slate-700)' }}>
              <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <CheckCircle2 size={14} style={{ color: 'var(--secondary)' }} /> Patient Age (28 Years - positive impact)
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <CheckCircle2 size={14} style={{ color: 'var(--secondary)' }} /> No major chronic diabetic/respiratory history (positive impact)
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <CheckCircle2 size={14} style={{ color: 'var(--accent-orange)' }} /> Sleep levels (Average 6h - moderate negative impact)
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <CheckCircle2 size={14} style={{ color: 'var(--secondary)' }} /> Non-smoker, active lifestyle (positive impact)
              </li>
            </ul>
          </div>
        </div>

        {/* Healing Curves Visual Timeline */}
        <div style={{ marginTop: '1rem' }}>
          <h4 style={{ fontSize: '0.9rem', fontWeight: '700', marginBottom: '0.75rem' }}>Estimated Healing Curves Progression</h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', backgroundColor: 'white', padding: '1.25rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', marginBottom: '0.25rem' }}>
                <span style={{ fontWeight: '600', color: 'var(--primary-hover)' }}>Allopathy (Symptomatic Action)</span>
                <span style={{ color: 'var(--text-muted)' }}>Estimated relief: {timelines.allopathy}</span>
              </div>
              <div style={{ height: '8px', background: 'var(--slate-100)', borderRadius: '4px', overflow: 'hidden' }}>
                <div style={{ width: '90%', height: '100%', background: 'linear-gradient(90deg, var(--primary) 0%, #38bdf8 100%)', borderRadius: '4px' }}></div>
              </div>
              <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Rapid initial action, high chance of symptom suppression.</span>
            </div>

            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', marginBottom: '0.25rem' }}>
                <span style={{ fontWeight: '600', color: 'var(--secondary-hover)' }}>Ayurveda (Systemic Balancing)</span>
                <span style={{ color: 'var(--text-muted)' }}>Estimated root cure: {timelines.ayurveda}</span>
              </div>
              <div style={{ height: '8px', background: 'var(--slate-100)', borderRadius: '4px', overflow: 'hidden' }}>
                <div style={{ width: '75%', height: '100%', background: 'linear-gradient(90deg, var(--secondary) 0%, #34d399 100%)', borderRadius: '4px' }}></div>
              </div>
              <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Gradual detoxification, permanent metabolic restoration.</span>
            </div>

            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', marginBottom: '0.25rem' }}>
                <span style={{ fontWeight: '600', color: '#d97706' }}>Homeopathy (Gentle Immuno-trigger)</span>
                <span style={{ color: 'var(--text-muted)' }}>Estimated immune reboot: {timelines.homeography || timelines.homeopathy}</span>
              </div>
              <div style={{ height: '8px', background: 'var(--slate-100)', borderRadius: '4px', overflow: 'hidden' }}>
                <div style={{ width: '60%', height: '100%', background: 'linear-gradient(90deg, #f59e0b 0%, #fbbf24 100%)', borderRadius: '4px' }}></div>
              </div>
              <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Root alignment by triggering bodily self-healing.</span>
            </div>
          </div>
        </div>
      </section>

      {/* Comparison Table */}
      <div className="comparison-table-wrapper">
        <table className="comparison-table">
          <thead>
            <tr>
              <th style={{ width: '20%' }}>Parameter</th>
              <th style={{ width: '26%', color: 'var(--secondary-hover)' }}>🌿 Ayurveda</th>
              <th style={{ width: '26%', color: '#d97706' }}>💧 Homeopathy</th>
              <th style={{ width: '28%', color: 'var(--primary)' }}>🔬 Allopathy</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>Treatment Approach</strong></td>
              <td>Pacifies aggravated Pitta dosha through digestive herbs, toxin clearing (Panchakarma), and heat-dispelling diets.</td>
              <td>Constitutional therapy using micro-diluted remedies (e.g. Nux Vomica) to re-align energy and digestive speed.</td>
              <td>Suppresses excess stomach acid utilizing H2-blockers or Proton Pump Inhibitors (PPIs) for immediate mucosal healing.</td>
            </tr>
            <tr>
              <td><strong>Recovery Timeline</strong></td>
              <td>{timelines.ayurveda} (Root resolution)</td>
              <td>{timelines.homeopathy} (Gentle, steady)</td>
              <td>{timelines.allopathy} (Immediate symptomatic relief)</td>
            </tr>
            <tr>
              <td><strong>Diet & Lifestyle</strong></td>
              <td>Avoid hot/spicy foods, tomatoes, caffeine. Incorporate fresh coriander juice, buttermilk, and sheetali pranayama.</td>
              <td>Avoid strong stimulants (raw onion, garlic, coffee) around dosage times. Mild walking recommended.</td>
              <td>Limit fatty/fried food intake. Avoid lying down immediately after meals. General balanced diet.</td>
            </tr>
            <tr>
              <td><strong>Therapy Cost</strong></td>
              <td>Moderate (Herbs: $20/mo, therapy optional)</td>
              <td>Very Low (Pills: $10-$15/mo)</td>
              <td>High (Diagnostics + recurring PPI meds: $40-$80/mo)</td>
            </tr>
            <tr>
              <td><strong>Evidence Level</strong></td>
              <td>
                <span className="badge" style={{ backgroundColor: '#d1fae5', color: '#065f46' }}>WHO Recognized</span>
                <span style={{ display: 'block', fontSize: '0.75rem', marginTop: '4px', color: 'var(--text-muted)' }}>Supported by thousands of years of classical Sanskrit treatises.</span>
              </td>
              <td>
                <span className="badge" style={{ backgroundColor: '#fffbeb', color: '#92400e' }}>Clinical Trials</span>
                <span style={{ display: 'block', fontSize: '0.75rem', marginTop: '4px', color: 'var(--text-muted)' }}>Extensively used globally; debate on nano-dilution mechanics.</span>
              </td>
              <td>
                <span className="badge" style={{ backgroundColor: '#e0f2fe', color: '#075985' }}>FDA Approved</span>
                <span style={{ display: 'block', fontSize: '0.75rem', marginTop: '4px', color: 'var(--text-muted)' }}>Rigorous double-blind randomized clinical trial backup.</span>
              </td>
            </tr>
            <tr>
              <td><strong>Action</strong></td>
              <td>
                <button className="btn-secondary" onClick={() => handleBookPathway('Ayurvedic')} style={{ fontSize: '0.8rem', padding: '0.4rem 0.8rem' }}>
                  Book Ayurvedic Doctor <ChevronRight size={14} />
                </button>
              </td>
              <td>
                <button className="btn-outline" onClick={() => handleBookPathway('Homeopathic')} style={{ fontSize: '0.8rem', padding: '0.4rem 0.8rem', color: '#d97706', borderColor: '#fbcfe8', background: '#fff9fb' }}>
                  Book Homeopathic Doctor <ChevronRight size={14} />
                </button>
              </td>
              <td>
                <button className="btn-primary" onClick={() => handleBookPathway('Allopathic')} style={{ fontSize: '0.8rem', padding: '0.4rem 0.8rem' }}>
                  Book Allopathic Doctor <ChevronRight size={14} />
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* AI Treatment Recommender Options */}
      <div>
        <h3 style={{ fontSize: '1.25rem', fontWeight: '700', marginBottom: '1rem' }}>AI Recommendation Engine</h3>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1rem' }}>
          
          <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', borderLeft: '4px solid var(--primary)', background: 'white' }}>
            <span className="badge badge-allopathy" style={{ alignSelf: 'flex-start' }}>Fastest Relief</span>
            <h4 style={{ fontSize: '1rem', fontWeight: '700' }}>🔬 Allopathic Pathway</h4>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
              Choose Allopathy if you are experiencing severe burning, cannot sleep, and require immediate symptom control.
            </p>
            <button className="btn-outline" onClick={() => handleBookPathway('Allopathic')} style={{ marginTop: 'auto', fontSize: '0.8rem', padding: '0.4rem' }}>
              Consult Allopath
            </button>
          </div>

          <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', borderLeft: '4px solid var(--secondary)', background: 'white' }}>
            <span className="badge badge-ayurveda" style={{ alignSelf: 'flex-start' }}>Natural Root Cure</span>
            <h4 style={{ fontSize: '1rem', fontWeight: '700' }}>🌿 Ayurvedic Pathway</h4>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
              Choose Ayurveda to detoxify the system, fix your digestive fire (Agni), and cure the underlying cause permanently.
            </p>
            <button className="btn-outline" onClick={() => handleBookPathway('Ayurvedic')} style={{ marginTop: 'auto', fontSize: '0.8rem', padding: '0.4rem' }}>
              Consult Ayurved
            </button>
          </div>

          <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', borderLeft: '4px solid #f59e0b', background: 'white' }}>
            <span className="badge badge-homeopathy" style={{ alignSelf: 'flex-start' }}>Most Affordable & Gentle</span>
            <h4 style={{ fontSize: '1rem', fontWeight: '700' }}>💧 Homeopathic Pathway</h4>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
              Best for a highly cost-efficient, non-toxic, sweet pill methodology that corrects immune sensitivity gradually.
            </p>
            <button className="btn-outline" onClick={() => handleBookPathway('Homeopathic')} style={{ marginTop: 'auto', fontSize: '0.8rem', padding: '0.4rem' }}>
              Consult Homeopath
            </button>
          </div>

          <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', borderLeft: '4px solid var(--slate-700)', background: 'white' }}>
            <span className="badge" style={{ backgroundColor: 'var(--slate-100)', color: 'var(--slate-800)', alignSelf: 'flex-start' }}>Balanced Combo</span>
            <h4 style={{ fontSize: '1rem', fontWeight: '700' }}>🔄 Combination Approach</h4>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
              Consult an Allopath to rapidly ease symptoms for 3 days, while initiating an Ayurvedic diet modification program for long-term health.
            </p>
            <button className="btn-outline" onClick={() => handleBookPathway('All')} style={{ marginTop: 'auto', fontSize: '0.8rem', padding: '0.4rem' }}>
              View Unified Specialists
            </button>
          </div>

        </div>
      </div>

    </div>
  );
}
