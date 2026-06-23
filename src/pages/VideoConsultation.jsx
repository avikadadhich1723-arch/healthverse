import React, { useState } from 'react';
import { Video, VideoOff, Mic, MicOff, PhoneOff, Monitor, Send, FileText, Download, Edit3, MessageSquare } from 'lucide-react';

export default function VideoConsultation({ setPage, patientProfile }) {
  const [isVideoActive, setIsVideoActive] = useState(true);
  const [isAudioActive, setIsAudioActive] = useState(true);
  const [activeTab, setActiveTab] = useState('chat'); // chat, files, notes
  const [messages, setMessages] = useState([
    { id: 1, sender: 'doctor', text: "Hello Alex, I hope you're doing well today. I've received your medical history and the Comprehensive Blood Panel report." },
    { id: 2, sender: 'patient', text: "Hello doctor! Yes, I wanted to discuss the Vitamin D levels and get your thoughts on the best pathway to restore it." },
    { id: 3, sender: 'doctor', text: "Absolutely. I see your Vitamin D is at 18.2 ng/mL. I'll outline an immediate booster and discuss complementary Ayurvedic adjustments." }
  ]);
  const [inputValue, setInputValue] = useState('');

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    setMessages((prev) => [
      ...prev,
      { id: Date.now(), sender: 'patient', text: inputValue }
    ]);
    setInputValue('');

    // Simulate doctor quick answer
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { id: Date.now(), sender: 'doctor', text: "That sounds like a good plan. Let me write that down in the clinic notes so you can download the prescription." }
      ]);
    }, 1500);
  };

  return (
    <div className="video-consultation-page animate-fade" style={{ display: 'flex', flexDirection: 'column', height: 'calc(100vh - 120px)' }}>
      
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.75rem' }}>
        <div>
          <h2 style={{ fontSize: '1.5rem', fontWeight: '700' }}>HealthVerse Virtual Consultation</h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>Active Session: <strong>Dr. Sarah Jenkins</strong> (Allopathic & Integrative Cardiology)</p>
        </div>
        <span className="badge badge-emergency" style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', padding: '0.4rem 1rem' }}>
          ● LIVE SESSION
        </span>
      </div>

      {/* Video + Workspace Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: '7fr 4fr', gap: '1.5rem', flex: 1, overflow: 'hidden' }}>
        
        {/* Left Side: Video Screens */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', height: '100%' }}>
          
          <div style={{
            flex: 1,
            backgroundColor: 'var(--slate-900)',
            borderRadius: 'var(--radius-lg)',
            position: 'relative',
            overflow: 'hidden',
            boxShadow: 'var(--shadow-lg)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            {/* Doctor Large Feed */}
            {isVideoActive ? (
              <img
                src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=800&q=80"
                alt="Doctor video stream"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            ) : (
              <div style={{ color: 'white', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
                <VideoOff size={48} />
                <span>Doctor's video is stopped</span>
              </div>
            )}

            {/* Doctor Name overlay */}
            <div style={{ position: 'absolute', bottom: '20px', left: '20px', backgroundColor: 'rgba(15, 23, 42, 0.65)', color: 'white', padding: '0.35rem 0.75rem', borderRadius: 'var(--radius-sm)', fontSize: '0.85rem', fontWeight: '600' }}>
              Dr. Sarah Jenkins
            </div>

            {/* Patient Small Picture-in-Picture Feed */}
            <div style={{
              position: 'absolute',
              top: '20px',
              right: '20px',
              width: '140px',
              height: '100px',
              backgroundColor: 'var(--slate-800)',
              borderRadius: 'var(--radius-md)',
              border: '2px solid white',
              overflow: 'hidden',
              boxShadow: 'var(--shadow-md)'
            }}>
              <div style={{ width: '100%', height: '100%', background: 'linear-gradient(135deg, var(--primary) 0%, var(--secondary) 100%)', display: 'flex', alignItems: 'center', justifySelf: 'center', justifyContent: 'center', color: 'white', fontSize: '1.25rem', fontWeight: '700' }}>
                AM
              </div>
              <div style={{ position: 'absolute', bottom: '4px', left: '4px', color: 'white', fontSize: '0.65rem', backgroundColor: 'rgba(0,0,0,0.5)', padding: '1px 4px', borderRadius: '2px' }}>
                You
              </div>
            </div>

            {/* Control Panel Overlay */}
            <div style={{
              position: 'absolute',
              bottom: '20px',
              left: '50%',
              transform: 'translateX(-50%)',
              backgroundColor: 'rgba(15, 23, 42, 0.85)',
              padding: '0.5rem 1.5rem',
              borderRadius: 'var(--radius-full)',
              display: 'flex',
              gap: '1rem',
              alignItems: 'center',
              boxShadow: '0 10px 25px rgba(0,0,0,0.3)',
              backdropFilter: 'blur(8px)'
            }}>
              <button
                onClick={() => setIsAudioActive(!isAudioActive)}
                style={{ background: 'none', border: 'none', color: 'white', cursor: 'pointer', width: '38px', height: '38px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: isAudioActive ? 'rgba(255,255,255,0.1)' : 'var(--accent-red)' }}
                title={isAudioActive ? 'Mute Mic' : 'Unmute Mic'}
              >
                {isAudioActive ? <Mic size={18} /> : <MicOff size={18} />}
              </button>

              <button
                onClick={() => setIsVideoActive(!isVideoActive)}
                style={{ background: 'none', border: 'none', color: 'white', cursor: 'pointer', width: '38px', height: '38px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: isVideoActive ? 'rgba(255,255,255,0.1)' : 'var(--accent-red)' }}
                title={isVideoActive ? 'Stop Video' : 'Start Video'}
              >
                {isVideoActive ? <Video size={18} /> : <VideoOff size={18} />}
              </button>

              <button
                style={{ background: 'none', border: 'none', color: 'white', cursor: 'pointer', width: '38px', height: '38px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(255,255,255,0.1)' }}
                title="Share Screen"
              >
                <Monitor size={18} />
              </button>

              <div style={{ width: '1px', height: '24px', backgroundColor: 'rgba(255,255,255,0.2)' }}></div>

              <button
                onClick={() => setPage('dashboard')}
                style={{ background: 'none', border: 'none', color: 'white', cursor: 'pointer', width: '38px', height: '38px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'var(--accent-red)' }}
                title="Hang Up Consultation"
              >
                <PhoneOff size={18} />
              </button>
            </div>
          </div>

        </div>

        {/* Right Side: Tab Workspace (Chat, Prescriptions, Whiteboard) */}
        <div className="glass-card" style={{ background: 'white', display: 'flex', flexDirection: 'column', height: '100%', padding: '0' }}>
          {/* Tabs header */}
          <div style={{ display: 'flex', borderBottom: '1px solid var(--border-color)', background: 'var(--slate-50)' }}>
            <button
              onClick={() => setActiveTab('chat')}
              style={{
                flex: 1,
                padding: '0.85rem',
                border: 'none',
                borderBottom: activeTab === 'chat' ? '3px solid var(--primary)' : 'none',
                background: 'transparent',
                fontWeight: '600',
                color: activeTab === 'chat' ? 'var(--primary)' : 'var(--text-muted)',
                cursor: 'pointer',
                fontSize: '0.85rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.35rem'
              }}
            >
              <MessageSquare size={16} /> Chat
            </button>

            <button
              onClick={() => setActiveTab('files')}
              style={{
                flex: 1,
                padding: '0.85rem',
                border: 'none',
                borderBottom: activeTab === 'files' ? '3px solid var(--primary)' : 'none',
                background: 'transparent',
                fontWeight: '600',
                color: activeTab === 'files' ? 'var(--primary)' : 'var(--text-muted)',
                cursor: 'pointer',
                fontSize: '0.85rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.35rem'
              }}
            >
              <FileText size={16} /> Prescriptions
            </button>

            <button
              onClick={() => setActiveTab('notes')}
              style={{
                flex: 1,
                padding: '0.85rem',
                border: 'none',
                borderBottom: activeTab === 'notes' ? '3px solid var(--primary)' : 'none',
                background: 'transparent',
                fontWeight: '600',
                color: activeTab === 'notes' ? 'var(--primary)' : 'var(--text-muted)',
                cursor: 'pointer',
                fontSize: '0.85rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.35rem'
              }}
            >
              <Edit3 size={16} /> Whiteboard
            </button>
          </div>

          {/* Tab Body */}
          <div style={{ flex: 1, overflowY: 'auto', padding: '1rem' }}>
            
            {/* Chat Content */}
            {activeTab === 'chat' && (
              <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '1rem', overflowY: 'auto', paddingBottom: '1rem' }}>
                  {messages.map((msg) => (
                    <div key={msg.id} style={{ display: 'flex', flexDirection: 'column', alignItems: msg.sender === 'patient' ? 'flex-end' : 'flex-start' }}>
                      <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', marginBottom: '0.15rem' }}>
                        {msg.sender === 'patient' ? 'You' : 'Dr. Jenkins'}
                      </span>
                      <div style={{
                        padding: '0.65rem 0.85rem',
                        borderRadius: 'var(--radius-md)',
                        fontSize: '0.85rem',
                        backgroundColor: msg.sender === 'patient' ? 'var(--primary)' : 'var(--slate-100)',
                        color: msg.sender === 'patient' ? 'white' : 'var(--slate-800)',
                        maxWidth: '85%'
                      }}>
                        {msg.text}
                      </div>
                    </div>
                  ))}
                </div>

                <form onSubmit={handleSendMessage} style={{ display: 'flex', gap: '0.5rem', borderTop: '1px solid var(--border-color)', paddingTop: '0.75rem' }}>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Type call message..."
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    style={{ flex: 1, fontSize: '0.85rem', padding: '0.5rem' }}
                  />
                  <button type="submit" className="btn-primary" style={{ padding: '0 0.75rem' }}>
                    <Send size={14} />
                  </button>
                </form>
              </div>
            )}

            {/* Prescriptions & Upload Files */}
            {activeTab === 'files' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div>
                  <h4 style={{ fontSize: '0.9rem', fontWeight: '700', marginBottom: '0.5rem' }}>Live Prescription Outbox</h4>
                  <div style={{
                    padding: '1rem',
                    border: '1px solid var(--border-color)',
                    borderRadius: 'var(--radius-md)',
                    backgroundColor: 'var(--slate-50)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'between',
                    justifyContent: 'space-between'
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <FileText size={28} style={{ color: 'var(--secondary)' }} />
                      <div>
                        <h5 style={{ fontSize: '0.85rem', fontWeight: '700' }}>Rx_Integrative_VitD_Acidity.pdf</h5>
                        <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Signed by Dr. Sarah Jenkins</span>
                      </div>
                    </div>
                    <button className="action-btn" title="Download prescription">
                      <Download size={16} />
                    </button>
                  </div>
                </div>

                <div style={{ borderTop: '1px dashed var(--border-color)', paddingTop: '1rem' }}>
                  <h4 style={{ fontSize: '0.9rem', fontWeight: '700', marginBottom: '0.5rem' }}>Patient Attached Reports</h4>
                  <div style={{ padding: '0.75rem', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)', display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.8rem' }}>
                    <FileText size={16} style={{ color: 'var(--primary)' }} />
                    <span style={{ fontWeight: '600' }}>Comprehensive Blood Panel.pdf</span>
                  </div>
                </div>
              </div>
            )}

            {/* Whiteboard / Consultation Notes */}
            {activeTab === 'notes' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <h4 style={{ fontSize: '0.9rem', fontWeight: '700' }}>Doctor's Active Whiteboard</h4>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Real-time notes created by your physician during this consultation.</p>

                <div style={{
                  padding: '1.25rem',
                  border: '1px solid #fef08a',
                  borderRadius: 'var(--radius-md)',
                  backgroundColor: '#fef9c3',
                  fontSize: '0.85rem',
                  color: '#713f12',
                  fontFamily: 'monospace',
                  lineHeight: '1.6',
                  boxShadow: 'var(--shadow-sm)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.5rem'
                }}>
                  <div><strong>=== CLINICAL ACTION PLAN ===</strong></div>
                  <div>1. Cholecalciferol (Vit D3) 60k UI - 1 tab weekly for 8 weeks (Allopathy).</div>
                  <div>2. Aloe Vera juice 20ml morning empty stomach with warm water (Ayurveda - cooling).</div>
                  <div>3. Nux Vomica 30C - 4 pills before dinner (Homeopathy - bloating relief).</div>
                  <div>4. Eliminate carbonated beverages and tomato/citrus items for 14 days.</div>
                </div>
              </div>
            )}

          </div>
        </div>

      </div>

    </div>
  );
}
