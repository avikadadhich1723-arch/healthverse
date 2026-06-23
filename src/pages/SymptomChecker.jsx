import React, { useState, useEffect, useRef } from 'react';
import { Bot, User, Mic, Send, AlertTriangle, RefreshCw, BarChart2, ShieldAlert } from 'lucide-react';
import { symptomQuestions, symptomAssessments } from '../mockData';

export default function SymptomChecker({ setPage, setSelectedAssessment }) {
  const [messages, setMessages] = useState([
    {
      id: 'm1',
      sender: 'bot',
      text: symptomQuestions.start.text,
      options: symptomQuestions.start.options
    }
  ]);
  const [currentStep, setCurrentStep] = useState('start');
  const [isRecording, setIsRecording] = useState(false);
  const [voiceText, setVoiceText] = useState('');
  const [typing, setTyping] = useState(false);
  const messagesEndRef = useRef(null);

  // Auto Scroll
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, typing]);

  const handleOptionClick = (option) => {
    const userMessage = {
      id: `u-${Date.now()}`,
      sender: 'user',
      text: option.text
    };

    setMessages((prev) => [...prev, userMessage]);
    setTyping(true);

    setTimeout(() => {
      setTyping(false);
      const nextKey = option.next;
      
      // Check if it's an assessment result
      if (symptomAssessments[nextKey]) {
        const result = symptomAssessments[nextKey];
        setMessages((prev) => [
          ...prev,
          {
            id: `b-${Date.now()}`,
            sender: 'bot',
            text: `Based on your responses, I have completed a tentative symptom analysis.`,
            assessment: result
          }
        ]);
        setCurrentStep(nextKey);
      } else if (symptomQuestions[nextKey]) {
        // More questions
        const nextQ = symptomQuestions[nextKey];
        setMessages((prev) => [
          ...prev,
          {
            id: `b-${Date.now()}`,
            sender: 'bot',
            text: nextQ.text,
            options: nextQ.options
          }
        ]);
        setCurrentStep(nextKey);
      } else {
        // Fallback fallback
        setMessages((prev) => [
          ...prev,
          {
            id: `b-${Date.now()}`,
            sender: 'bot',
            text: "I didn't quite catch that. Would you like to restart the symptoms checker?",
            options: symptomQuestions.start.options
          }
        ]);
        setCurrentStep('start');
      }
    }, 800);
  };

  const startVoiceInput = () => {
    setIsRecording(true);
    setVoiceText('Listening for symptoms...');
    
    // Simulate speech-to-text
    setTimeout(() => {
      setIsRecording(false);
      setVoiceText('');
      
      // Auto-trigger digestive pathway for demo
      const simulatedText = "I have had heavy bloating and stomach acidity for a week.";
      const userMessage = {
        id: `u-${Date.now()}`,
        sender: 'user',
        text: `🎤 Voice Input: "${simulatedText}"`
      };
      
      setMessages((prev) => [...prev, userMessage]);
      setTyping(true);
      
      setTimeout(() => {
        setTyping(false);
        setMessages((prev) => [
          ...prev,
          {
            id: `b-${Date.now()}`,
            sender: 'bot',
            text: "Detected: Digestive issues (Acidity / bloating). How long have you had this?",
            options: [
              { text: "Just a few days", next: "digestive_acute" },
              { text: "Several weeks or months", next: "digestive_chronic" }
            ]
          }
        ]);
        setCurrentStep('digestive');
      }, 1000);

    }, 3000);
  };

  const restartChecker = () => {
    setMessages([
      {
        id: `m-reset-${Date.now()}`,
        sender: 'bot',
        text: symptomQuestions.start.text,
        options: symptomQuestions.start.options
      }
    ]);
    setCurrentStep('start');
  };

  const handleProceedToComparison = (assessment) => {
    setSelectedAssessment(assessment);
    setPage('treatment-comparison');
  };

  return (
    <div className="symptom-checker animate-fade" style={{ display: 'flex', flexDirection: 'column', height: 'calc(100vh - 120px)' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.75rem' }}>
        <div>
          <h2 style={{ fontSize: '1.5rem', fontWeight: '700' }}>AI Health Assistant</h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>Describe symptoms via chat or voice to compare clinical paths.</p>
        </div>
        <button onClick={restartChecker} className="btn-outline" style={{ display: 'flex', gap: '0.35rem', padding: '0.4rem 0.8rem', fontSize: '0.8rem' }}>
          <RefreshCw size={14} /> Restart Chat
        </button>
      </div>

      {/* Chat Area */}
      <div style={{
        flex: 1,
        background: 'white',
        border: '1px solid var(--border-color)',
        borderRadius: 'var(--radius-lg)',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        boxShadow: 'var(--shadow-sm)'
      }}>
        {/* Messages list */}
        <div style={{ flex: 1, padding: '1.5rem', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          {messages.map((msg) => (
            <div key={msg.id} style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              
              <div style={{
                display: 'flex',
                gap: '0.75rem',
                flexDirection: msg.sender === 'user' ? 'row-reverse' : 'row',
                alignItems: 'flex-start'
              }}>
                {/* Avatar */}
                <div style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: msg.sender === 'user' ? 'var(--primary-light)' : 'var(--secondary-light)',
                  color: msg.sender === 'user' ? 'var(--primary)' : 'var(--secondary-hover)',
                  flexShrink: 0
                }}>
                  {msg.sender === 'user' ? <User size={18} /> : <Bot size={18} />}
                </div>

                {/* Text Bubble */}
                <div style={{
                  maxWidth: '75%',
                  padding: '0.85rem 1.15rem',
                  borderRadius: msg.sender === 'user' 
                    ? '1.15rem 1.15rem 0 1.15rem' 
                    : '1.15rem 1.15rem 1.15rem 0',
                  backgroundColor: msg.sender === 'user' ? 'var(--primary)' : 'var(--slate-100)',
                  color: msg.sender === 'user' ? 'white' : 'var(--slate-800)',
                  fontSize: '0.95rem',
                  boxShadow: 'var(--shadow-sm)'
                }}>
                  {msg.text}
                </div>
              </div>

              {/* Options */}
              {msg.options && (
                <div style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.5rem',
                  paddingLeft: '3rem',
                  marginTop: '0.25rem',
                  maxWidth: '500px'
                }}>
                  {msg.options.map((opt, i) => (
                    <button
                      key={i}
                      onClick={() => handleOptionClick(opt)}
                      style={{
                        padding: '0.65rem 1rem',
                        border: '1px solid var(--border-color)',
                        borderRadius: 'var(--radius-md)',
                        backgroundColor: 'white',
                        textAlign: 'left',
                        cursor: 'pointer',
                        fontSize: '0.875rem',
                        color: 'var(--slate-800)',
                        fontWeight: '500',
                        transition: 'all var(--transition-fast)',
                        boxShadow: '0 2px 4px rgba(0,0,0,0.02)'
                      }}
                      onMouseEnter={(e) => {
                        e.target.style.backgroundColor = 'var(--primary-light)';
                        e.target.style.borderColor = 'var(--primary)';
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.backgroundColor = 'white';
                        e.target.style.borderColor = 'var(--border-color)';
                      }}
                    >
                      {opt.text}
                    </button>
                  ))}
                </div>
              )}

              {/* Assessment Panel */}
              {msg.assessment && (
                <div style={{
                  paddingLeft: '3rem',
                  marginTop: '0.5rem',
                  maxWidth: '650px'
                }}>
                  {msg.assessment.isEmergency ? (
                    <div style={{
                      backgroundColor: '#fee2e2',
                      border: '1px solid #fca5a5',
                      borderRadius: 'var(--radius-md)',
                      padding: '1.25rem',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '0.75rem',
                      animation: 'pulseBorder 2.5s infinite'
                    }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#b91c1c', fontWeight: '700' }}>
                        <ShieldAlert size={20} />
                        EMERGENCY MEDICAL ALARM
                      </div>
                      <p style={{ color: '#7f1d1d', fontSize: '0.9rem', fontWeight: '600' }}>
                        {msg.assessment.recommendation}
                      </p>
                      <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.5rem' }}>
                        <button className="btn-primary" style={{ background: '#dc2626', color: 'white' }}>
                          Call Emergency Services (911)
                        </button>
                        <button className="btn-outline" style={{ borderColor: '#fca5a5', color: '#7f1d1d' }}>
                          Find Closest ER Hospital
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="glass-card" style={{
                      borderLeft: '4px solid var(--secondary)',
                      backgroundColor: 'var(--slate-50)',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '1rem',
                      padding: '1.25rem'
                    }}>
                      <div>
                        <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: '700' }}>Probable Assessment</span>
                        <h4 style={{ fontSize: '1.2rem', fontWeight: '700', color: 'var(--slate-800)' }}>{msg.assessment.condition}</h4>
                      </div>

                      <p style={{ fontSize: '0.9rem', color: 'var(--slate-700)' }}>{msg.assessment.description}</p>
                      
                      <div style={{ backgroundColor: '#fff', padding: '1rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}>
                        <h5 style={{ fontSize: '0.85rem', fontWeight: '700', color: 'var(--slate-700)', marginBottom: '0.75rem', display: 'flex', gap: '0.35rem', alignItems: 'center' }}>
                          <BarChart2 size={16} /> Pathway Suitability Index
                        </h5>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
                          <div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', fontWeight: '600', marginBottom: '0.15rem' }}>
                              <span>Ayurveda</span>
                              <span>{msg.assessment.scores.ayurveda}%</span>
                            </div>
                            <div style={{ height: '6px', background: 'var(--slate-200)', borderRadius: '3px', overflow: 'hidden' }}>
                              <div style={{ width: `${msg.assessment.scores.ayurveda}%`, height: '100%', background: 'var(--secondary)' }}></div>
                            </div>
                          </div>
                          <div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', fontWeight: '600', marginBottom: '0.15rem' }}>
                              <span>Homeopathy</span>
                              <span>{msg.assessment.scores.homeography || msg.assessment.scores.homeopathy}%</span>
                            </div>
                            <div style={{ height: '6px', background: 'var(--slate-200)', borderRadius: '3px', overflow: 'hidden' }}>
                              <div style={{ width: `${msg.assessment.scores.homeopathy}%`, height: '100%', background: 'var(--accent-orange)' }}></div>
                            </div>
                          </div>
                          <div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', fontWeight: '600', marginBottom: '0.15rem' }}>
                              <span>Allopathy</span>
                              <span>{msg.assessment.scores.allopathy}%</span>
                            </div>
                            <div style={{ height: '6px', background: 'var(--slate-200)', borderRadius: '3px', overflow: 'hidden' }}>
                              <div style={{ width: `${msg.assessment.scores.allopathy}%`, height: '100%', background: 'var(--primary)' }}></div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div style={{ padding: '0.75rem', backgroundColor: '#eef2f6', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-sm)', display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                        <AlertTriangle size={16} style={{ color: 'var(--accent-orange)' }} />
                        <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                          <strong>Medical Disclaimer:</strong> This assessment is generated via symptom correlation logic and is not a clinical medical diagnosis.
                        </p>
                      </div>

                      <button
                        className="btn-primary"
                        onClick={() => handleProceedToComparison(msg.assessment)}
                        style={{ alignSelf: 'flex-start', display: 'flex', alignItems: 'center', gap: '0.5rem' }}
                      >
                        Compare Treatments Side-by-Side <ArrowRightIcon />
                      </button>
                    </div>
                  )}
                </div>
              )}

            </div>
          ))}

          {/* Chat Typing indicator */}
          {typing && (
            <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
              <div style={{ width: '36px', height: '36px', borderRadius: '50%', backgroundColor: 'var(--secondary-light)', color: 'var(--secondary-hover)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Bot size={18} />
              </div>
              <div style={{ display: 'flex', gap: '0.25rem', padding: '0.75rem 1rem', borderRadius: 'var(--radius-md)', backgroundColor: 'var(--slate-100)', color: 'var(--text-muted)' }}>
                <span className="typing-dot" style={{ width: '6px', height: '6px', backgroundColor: 'var(--text-muted)', borderRadius: '50%', animation: 'wave 1.2s infinite' }}></span>
                <span className="typing-dot" style={{ width: '6px', height: '6px', backgroundColor: 'var(--text-muted)', borderRadius: '50%', animation: 'wave 1.2s infinite 0.2s' }}></span>
                <span className="typing-dot" style={{ width: '6px', height: '6px', backgroundColor: 'var(--text-muted)', borderRadius: '50%', animation: 'wave 1.2s infinite 0.4s' }}></span>
              </div>
            </div>
          )}

          {/* Equalizer animation for Voice */}
          {isRecording && (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem', margin: '2rem 0' }}>
              <div style={{ display: 'flex', gap: '4px', height: '40px', alignItems: 'center' }}>
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((bar) => (
                  <div
                    key={bar}
                    style={{
                      width: '4px',
                      height: `${Math.floor(Math.random() * 30) + 10}px`,
                      backgroundColor: 'var(--primary)',
                      borderRadius: '2px',
                      animation: 'wave 0.6s ease-in-out infinite alternate',
                      animationDelay: `${bar * 0.05}s`
                    }}
                  ></div>
                ))}
              </div>
              <span style={{ fontSize: '0.85rem', color: 'var(--primary)', fontWeight: '600', animation: 'fadeIn 1s infinite alternate' }}>
                {voiceText}
              </span>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input panel */}
        <div style={{ padding: '1rem', borderTop: '1px solid var(--border-color)', display: 'flex', gap: '0.75rem', backgroundColor: 'var(--slate-50)' }}>
          <button
            onClick={startVoiceInput}
            disabled={isRecording}
            style={{
              padding: '0.75rem',
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--border-color)',
              backgroundColor: isRecording ? 'var(--primary-light)' : 'white',
              color: isRecording ? 'var(--primary)' : 'var(--slate-700)',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: 'var(--shadow-sm)',
              transition: 'all var(--transition-fast)'
            }}
            title="Symptom Voice Input"
          >
            <Mic size={20} className={isRecording ? 'badge-emergency' : ''} style={{ borderRadius: isRecording ? '50%' : 'none' }} />
          </button>
          
          <input
            type="text"
            className="form-control"
            placeholder="Type your symptoms here (e.g. I have a sore throat and fever)..."
            style={{ flex: 1, background: 'white' }}
            disabled={isRecording}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && e.target.value.trim()) {
                const text = e.target.value;
                e.target.value = '';
                handleOptionClick({ text, next: 'digestive_mild' });
              }
            }}
          />

          <button
            style={{
              padding: '0 1rem',
              borderRadius: 'var(--radius-md)',
              border: 'none',
              backgroundColor: 'var(--primary)',
              color: 'white',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <Send size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}

// Inline Arrow Icon component
function ArrowRightIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <line x1="5" y1="12" x2="19" y2="12"></line>
      <polyline points="12 5 19 12 12 19"></polyline>
    </svg>
  );
}
