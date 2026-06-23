import React, { useState } from 'react';
import { ArrowLeft, Calendar, FileText, CheckCircle2, User, Activity } from 'lucide-react';

export default function AppointmentBooking({ setPage, selectedDoctor, patientProfile, setPatientProfile }) {
  // Fallback doctor if navigated straight here
  const doc = selectedDoctor || {
    id: 'allo-1',
    name: 'Dr. Sarah Jenkins',
    type: 'Allopathic',
    specialty: 'Cardiologist & General Physician',
    fee: 80,
    schedule: ['09:00 AM', '10:30 AM', '02:00 PM', '04:30 PM'],
    hospital: 'Metro Cardiac & General Hospital'
  };

  const [date, setDate] = useState('2026-06-25');
  const [time, setTime] = useState(doc.schedule[0]);
  const [reason, setReason] = useState('Second opinion on blood cholesterol panel and chronic mild acidity.');
  const [selectedReport, setSelectedReport] = useState('rep-1'); // rep-1 = blood panel
  const [cardNumber, setCardNumber] = useState('4111 2222 3333 4444');
  const [expiry, setExpiry] = useState('09/29');
  const [cvv, setCvv] = useState('321');
  const [isBooked, setIsBooked] = useState(false);

  const handleBookingSubmit = (e) => {
    e.preventDefault();
    
    // Add to upcoming appointments list
    const newAppointment = {
      id: `app-booked-${Date.now()}`,
      doctorName: doc.name,
      type: doc.type,
      specialty: doc.specialty,
      date,
      time,
      status: 'Confirmed'
    };

    const updatedAppointments = [...patientProfile.upcomingAppointments, newAppointment];
    
    setPatientProfile({
      ...patientProfile,
      upcomingAppointments: updatedAppointments
    });

    setIsBooked(true);
  };

  if (isBooked) {
    return (
      <div className="appointment-booking-page animate-fade" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: 'calc(100vh - 180px)' }}>
        <div className="glass-card" style={{ maxWidth: '500px', textAlign: 'center', padding: '3rem', background: 'white', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.25rem' }}>
          <div style={{ width: '72px', height: '72px', borderRadius: '50%', backgroundColor: 'var(--secondary-light)', color: 'var(--secondary)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <CheckCircle2 size={44} />
          </div>
          <h2 style={{ fontSize: '1.75rem', fontWeight: '700' }}>Appointment Confirmed!</h2>
          <p style={{ color: 'var(--text-muted)' }}>
            Your tele-health consultation with <strong>{doc.name}</strong> is successfully scheduled.
          </p>

          <div style={{
            background: 'var(--slate-50)',
            border: '1px solid var(--border-color)',
            borderRadius: 'var(--radius-md)',
            padding: '1rem',
            width: '100%',
            textAlign: 'left',
            fontSize: '0.9rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '0.5rem',
            color: 'var(--slate-800)'
          }}>
            <div><strong>Consultant:</strong> {doc.name} ({doc.type})</div>
            <div><strong>Date & Time:</strong> {date} at {time}</div>
            <div><strong>Method:</strong> HealthVerse Video Consultation</div>
            <div><strong>Connected Files:</strong> {selectedReport === 'rep-1' ? 'Comprehensive Blood Panel.pdf' : 'None'}</div>
          </div>

          <div style={{ display: 'flex', gap: '1rem', width: '100%', marginTop: '0.5rem' }}>
            <button className="btn-primary" onClick={() => setPage('dashboard')} style={{ flex: 1, justifyContent: 'center' }}>
              Go to Dashboard
            </button>
            <button className="btn-outline" onClick={() => setPage('video-consultation')} style={{ flex: 1 }}>
              Enter Video Portal
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="appointment-booking-page animate-fade" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      
      <button onClick={() => setPage('doctor-profile')} className="btn-outline" style={{ alignSelf: 'flex-start', display: 'flex', alignItems: 'center', gap: '0.35rem', padding: '0.4rem 0.8rem', fontSize: '0.85rem' }}>
        <ArrowLeft size={16} /> Back to Doctor Profile
      </button>

      <div>
        <h2 style={{ fontSize: '1.75rem', fontWeight: '700' }}>Schedule Appointment</h2>
        <p style={{ color: 'var(--text-muted)' }}>Fill in consultation details and complete secure checkout.</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '2rem' }}>
        
        {/* Form Details */}
        <form onSubmit={handleBookingSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          
          {/* Appointment slots card */}
          <div className="glass-card" style={{ background: 'white' }}>
            <h3 style={{ fontSize: '1.15rem', fontWeight: '700', marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Calendar size={18} style={{ color: 'var(--primary)' }} />
              1. Choose Date & Time
            </h3>
            
            <div className="two-col-grid" style={{ marginBottom: '1rem' }}>
              <div className="form-group">
                <label>Consultation Date</label>
                <input
                  type="date"
                  className="form-control"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  min="2026-06-23"
                  required
                />
              </div>

              <div className="form-group">
                <label>Available Slots</label>
                <select
                  className="form-control"
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  required
                >
                  {doc.schedule.map((slot) => (
                    <option key={slot} value={slot}>{slot}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Clinical Details */}
          <div className="glass-card" style={{ background: 'white' }}>
            <h3 style={{ fontSize: '1.15rem', fontWeight: '700', marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Activity size={18} style={{ color: 'var(--secondary)' }} />
              2. Clinical Context & History
            </h3>

            <div className="form-group">
              <label>Reason for Consultation / Symptoms</label>
              <textarea
                className="form-control"
                style={{ height: '100px', resize: 'vertical' }}
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                placeholder="Explain details of what symptoms or issues you want to address..."
                required
              ></textarea>
            </div>

            <div className="form-group">
              <label>Link Medical Record or Lab Report (Optional)</label>
              <select
                className="form-control"
                value={selectedReport}
                onChange={(e) => setSelectedReport(e.target.value)}
              >
                <option value="none">No files to attach</option>
                {patientProfile.reports.map((rep) => (
                  <option key={rep.id} value={rep.id}>{rep.name} ({rep.date})</option>
                ))}
              </select>
            </div>
          </div>

          {/* Secure Checkout */}
          <div className="glass-card" style={{ background: 'white' }}>
            <h3 style={{ fontSize: '1.15rem', fontWeight: '700', marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <FileText size={18} style={{ color: 'var(--accent-orange)' }} />
              3. Secure Telehealth Checkout
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div className="form-group">
                <label>Cardholder Name</label>
                <input
                  type="text"
                  className="form-control"
                  defaultValue={patientProfile.name}
                  required
                />
              </div>

              <div className="form-group">
                <label>Credit Card Number</label>
                <input
                  type="text"
                  className="form-control"
                  value={cardNumber}
                  onChange={(e) => setCardNumber(e.target.value)}
                  placeholder="xxxx xxxx xxxx xxxx"
                  required
                />
              </div>

              <div className="two-col-grid">
                <div className="form-group">
                  <label>Expiry Date</label>
                  <input
                    type="text"
                    className="form-control"
                    value={expiry}
                    onChange={(e) => setExpiry(e.target.value)}
                    placeholder="MM/YY"
                    required
                  />
                </div>
                <div className="form-group">
                  <label>CVV</label>
                  <input
                    type="password"
                    className="form-control"
                    value={cvv}
                    onChange={(e) => setCvv(e.target.value)}
                    placeholder="xxx"
                    maxLength="3"
                    required
                  />
                </div>
              </div>
            </div>

            <button
              type="submit"
              className="btn-primary"
              style={{ width: '100%', justifyContent: 'center', marginTop: '1.5rem', padding: '0.85rem' }}
            >
              Pay ${doc.fee} & Confirm Booking
            </button>
          </div>

        </form>

        {/* Doctor Summary Sidebar */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          
          <div className="glass-card" style={{ background: 'white', position: 'sticky', top: '100px' }}>
            <h4 style={{ fontSize: '1.15rem', fontWeight: '700', marginBottom: '1rem' }}>Booking Summary</h4>
            
            <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '1rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '1rem' }}>
              <img
                src={doc.avatar}
                alt={doc.name}
                style={{ width: '60px', height: '60px', borderRadius: 'var(--radius-sm)', objectFit: 'cover' }}
              />
              <div>
                <h5 style={{ fontWeight: '700', fontSize: '0.95rem' }}>{doc.name}</h5>
                <span className={`badge badge-${doc.type.toLowerCase().replace('ic', '')}`} style={{ fontSize: '0.7rem', padding: '0.1rem 0.5rem' }}>
                  {doc.type}
                </span>
                <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.15rem' }}>{doc.specialty}</p>
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.85rem', color: 'var(--slate-800)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--text-muted)' }}>Video Consultation:</span>
                <span>$ {doc.fee}.00</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--text-muted)' }}>Booking Platform Fee:</span>
                <span>$ 0.00</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '1px solid var(--border-color)', paddingTop: '0.75rem', fontSize: '1rem' }}>
                <strong>Total Amount:</strong>
                <strong style={{ color: 'var(--slate-900)' }}>$ {doc.fee}.00</strong>
              </div>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
