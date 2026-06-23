import React, { useState } from 'react';
import { FileText, Upload, Sparkles, AlertCircle, CheckCircle2, ChevronRight, Activity } from 'lucide-react';
import { sampleReportsData } from '../mockData';

export default function ReportAnalyzer({ setPage, setSelectedAssessment }) {
  const [file, setFile] = useState(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [progressText, setProgressText] = useState('');
  const [results, setResults] = useState(null);

  const simulateAnalysis = () => {
    if (!file) return;

    setAnalyzing(true);
    setProgressText('Extracting metadata and OCR values...');
    
    setTimeout(() => {
      setProgressText('Cross-referencing laboratory values against normal clinical ranges...');
      
      setTimeout(() => {
        setProgressText('Synthesizing Ayurvedic Dosha mapping & Homeopathic remedies...');
        
        setTimeout(() => {
          setAnalyzing(false);
          setResults(sampleReportsData.blood_panel);
        }, 1200);
      }, 1000);
    }, 800);
  };

  const handleFileUpload = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const loadDemoReport = () => {
    setFile({ name: 'demo_blood_panel_report.pdf', size: 1048576 });
  };

  const handleComparePathway = () => {
    setSelectedAssessment({
      condition: "Low Vitamin D3 & Elevated LDL",
      description: "Laboratory tests verify vitamin D deficiency and borderline elevated blood LDL cholesterol levels.",
      primarySystem: "Combination",
      scores: { ayurveda: 85, homeopathy: 75, allopathy: 90 }
    });
    setPage('treatment-comparison');
  };

  return (
    <div className="report-analyzer-page animate-fade" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      
      {/* Header */}
      <div>
        <h2 style={{ fontSize: '1.75rem', fontWeight: '700' }}>AI Health Report Analyzer</h2>
        <p style={{ color: 'var(--text-muted)' }}>Upload clinical blood panels, urine tests, or scans to get easy-to-understand explanations across Allopathy, Ayurveda, and Homeopathy.</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', alignItems: 'start' }}>
        
        {/* Upload Zone */}
        <div className="glass-card" style={{ background: 'white', display: 'flex', flexDirection: 'column', gap: '1.5rem', padding: '2rem' }}>
          <h3 style={{ fontSize: '1.1rem', fontWeight: '700' }}>Upload Medical PDF</h3>
          
          <div style={{
            border: '2px dashed var(--border-color)',
            borderRadius: 'var(--radius-lg)',
            padding: '2.5rem 1rem',
            textAlign: 'center',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '1rem',
            backgroundColor: 'var(--slate-50)',
            cursor: 'pointer',
            position: 'relative'
          }}>
            <Upload size={36} style={{ color: 'var(--primary)' }} />
            <div>
              <p style={{ fontWeight: '600', fontSize: '0.9rem' }}>Drag & drop file here or click to browse</p>
              <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>Supports PDF, JPG, PNG (Max 10MB)</p>
            </div>
            
            <input
              type="file"
              onChange={handleFileUpload}
              style={{
                position: 'absolute',
                top: 0, left: 0, width: '100%', height: '100%',
                opacity: 0, cursor: 'pointer'
              }}
            />
          </div>

          {/* Uploaded File status */}
          {file && (
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0.85rem 1rem', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)', backgroundColor: 'var(--slate-50)', fontSize: '0.85rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <FileText size={18} style={{ color: 'var(--primary)' }} />
                <div>
                  <div style={{ fontWeight: '600' }}>{file.name}</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{(file.size / (1024 * 1024)).toFixed(2)} MB</div>
                </div>
              </div>
              <button onClick={() => setFile(null)} style={{ background: 'none', border: 'none', color: 'var(--accent-red)', cursor: 'pointer', fontWeight: '600' }}>
                Remove
              </button>
            </div>
          )}

          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <button
              onClick={simulateAnalysis}
              disabled={!file || analyzing}
              className="btn-primary"
              style={{ flex: 1, justifyContent: 'center' }}
            >
              {analyzing ? 'Analyzing...' : 'Start AI Analysis'}
            </button>
            
            <button
              onClick={loadDemoReport}
              disabled={analyzing}
              className="btn-outline"
              style={{ fontSize: '0.85rem' }}
            >
              Load Demo PDF
            </button>
          </div>

          {/* Scan Animation Loader */}
          {analyzing && (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem', padding: '1rem', border: '1px solid var(--primary-light)', borderRadius: 'var(--radius-md)', backgroundColor: 'var(--primary-light)', color: 'var(--primary-hover)', fontSize: '0.85rem' }}>
              <div style={{
                width: '24px',
                height: '24px',
                border: '3px solid var(--primary)',
                borderTopColor: 'transparent',
                borderRadius: '50%',
                animation: 'rotateRing 0.8s linear infinite'
              }}></div>
              <span style={{ fontWeight: '600', textAlign: 'center' }}>{progressText}</span>
            </div>
          )}
        </div>

        {/* Results Pane */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {results ? (
            <div className="glass-card animate-fade" style={{ background: 'white', padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.75rem' }}>
                <h3 style={{ fontSize: '1.1rem', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                  <Sparkles size={16} style={{ color: 'var(--secondary)' }} />
                  AI Summary Findings
                </h3>
                <span className="badge badge-ayurveda" style={{ fontSize: '0.7rem' }}>Scan Completed</span>
              </div>

              <p style={{ fontSize: '0.9rem', color: 'var(--slate-700)', lineHeight: '1.5' }}>
                {results.summary}
              </p>

              {/* Abnormal items */}
              <div>
                <h4 style={{ fontSize: '0.85rem', fontWeight: '700', color: '#b91c1c', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                  <AlertCircle size={14} /> Out of Range Values Detected
                </h4>
                
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  {results.abnormal.map((item, i) => (
                    <div key={i} style={{ border: '1px solid #fee2e2', borderRadius: 'var(--radius-md)', backgroundColor: '#fff5f5', padding: '0.85rem' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', fontWeight: '700', color: '#7f1d1d' }}>
                        <span>{item.name}</span>
                        <span>{item.value}</span>
                      </div>
                      <div style={{ fontSize: '0.75rem', color: '#991b1b', marginTop: '0.15rem' }}>{item.range} • <strong>{item.status}</strong></div>
                      <p style={{ fontSize: '0.8rem', color: 'var(--slate-700)', marginTop: '0.5rem', borderTop: '1px solid #fee2e2', paddingTop: '0.5rem' }}>
                        <strong>Explanation:</strong> {item.explanation}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Normal items */}
              <div>
                <h4 style={{ fontSize: '0.85rem', fontWeight: '700', color: 'var(--secondary-hover)', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                  <CheckCircle2 size={14} /> Within Normal Range
                </h4>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }}>
                  {results.normal.map((item, i) => (
                    <div key={i} style={{ padding: '0.5rem', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-sm)', fontSize: '0.75rem' }}>
                      <div style={{ fontWeight: '600', color: 'var(--slate-800)' }}>{item.name}</div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-muted)', marginTop: '0.15rem' }}>
                        <span>Value: {item.value}</span>
                        <span>{item.range.split(':')[1]}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action buttons */}
              <button
                className="btn-primary"
                onClick={handleComparePathway}
                style={{ width: '100%', justifyContent: 'center', marginTop: '0.5rem' }}
              >
                Compare Treatment Pathways for this Report <ChevronRight size={16} />
              </button>

            </div>
          ) : (
            <div className="glass-card" style={{ background: 'white', padding: '3rem', textAlign: 'center', color: 'var(--text-muted)', border: '1px dashed var(--border-color)' }}>
              <FileText size={48} style={{ margin: '0 auto 1rem auto', opacity: 0.3 }} />
              <p style={{ fontSize: '0.9rem', fontWeight: '500' }}>No report uploaded yet</p>
              <p style={{ fontSize: '0.75rem' }}>Upload or load the demo report in the left panel to trigger OCR extraction and cross-paradigm intelligence.</p>
            </div>
          )}
        </div>

      </div>

    </div>
  );
}
