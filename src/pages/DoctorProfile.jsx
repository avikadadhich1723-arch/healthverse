import React from 'react';
import { Star, ShieldCheck, Calendar, DollarSign, Award, ArrowLeft, Heart, MessageSquare } from 'lucide-react';

export default function DoctorProfile({ setPage, selectedDoctor }) {
  // Fallback doctor if navigated straight here
  const doc = selectedDoctor || {
    id: 'allo-1',
    name: 'Dr. Sarah Jenkins',
    type: 'Allopathic',
    specialty: 'Cardiologist & General Physician',
    experience: 14,
    rating: 4.9,
    reviewsCount: 182,
    fee: 80,
    avatar: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=300&q=80',
    bio: 'Dr. Sarah Jenkins is a board-certified Cardiologist with over 14 years of experience. She specializes in cardiovascular health, preventative medicine, and managing complex multi-system disorders with modern evidence-based pharmaceuticals.',
    hospital: 'Metro Cardiac & General Hospital',
    schedule: ['09:00 AM', '10:30 AM', '02:00 PM', '04:30 PM']
  };

  return (
    <div className="doctor-profile-page animate-fade" style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      
      {/* Back button */}
      <button onClick={() => setPage('doctors')} className="btn-outline" style={{ alignSelf: 'flex-start', display: 'flex', alignItems: 'center', gap: '0.35rem', padding: '0.4rem 0.8rem', fontSize: '0.85rem' }}>
        <ArrowLeft size={16} /> Back to Doctor Listings
      </button>

      {/* Main Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '2rem' }}>
        
        {/* Profile details */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          
          {/* Main Info Card */}
          <div className="glass-card" style={{ display: 'flex', gap: '1.5rem', background: 'white', padding: '2rem', flexWrap: 'wrap' }}>
            <img
              src={doc.avatar}
              alt={doc.name}
              style={{
                width: '120px',
                height: '120px',
                borderRadius: 'var(--radius-md)',
                objectFit: 'cover',
                border: '1px solid var(--border-color)'
              }}
            />
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', flex: 1, minWidth: '240px' }}>
              <span className={`badge badge-${doc.type.toLowerCase().replace('ic', '')}`} style={{ alignSelf: 'flex-start' }}>
                {doc.type} Specialist
              </span>
              <h3 style={{ fontSize: '1.5rem', fontWeight: '700' }}>{doc.name}</h3>
              <p style={{ color: 'var(--text-muted)' }}>{doc.specialty}</p>
              
              <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginTop: '0.5rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', fontSize: '0.85rem' }}>
                  <Star size={16} style={{ color: '#fbbf24', fill: '#fbbf24' }} />
                  <strong>{doc.rating}</strong> ({doc.reviewsCount} reviews)
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', fontSize: '0.85rem' }}>
                  <ShieldCheck size={16} style={{ color: 'var(--secondary)' }} />
                  <span>Verified Practitioner</span>
                </div>
              </div>
            </div>
          </div>

          {/* About Section */}
          <div className="glass-card" style={{ background: 'white', padding: '1.5rem' }}>
            <h4 style={{ fontSize: '1.15rem', fontWeight: '700', marginBottom: '0.75rem' }}>Professional Bio</h4>
            <p style={{ color: 'var(--slate-700)', fontSize: '0.925rem', lineHeight: '1.6' }}>{doc.bio}</p>
          </div>

          {/* Highlights */}
          <div className="two-col-grid">
            <div className="glass-card" style={{ background: 'white', padding: '1.5rem' }}>
              <h4 style={{ fontSize: '1.15rem', fontWeight: '700', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                <Award size={18} style={{ color: 'var(--primary)' }} /> Education & Training
              </h4>
              <ul style={{ paddingLeft: '1.25rem', fontSize: '0.875rem', color: 'var(--slate-700)', display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                <li>MD, Board Certified Cardiology & General Medicine</li>
                <li>Fellowship in Clinical Pharmacology & Heart Health</li>
                <li>Certified Practitioner in Integrative Healthcare Systems</li>
              </ul>
            </div>
            <div className="glass-card" style={{ background: 'white', padding: '1.5rem' }}>
              <h4 style={{ fontSize: '1.15rem', fontWeight: '700', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                <Heart size={18} style={{ color: 'var(--secondary)' }} /> Clinical Philosophy
              </h4>
              <p style={{ color: 'var(--slate-700)', fontSize: '0.875rem', lineHeight: '1.5' }}>
                "Healing isn't just about administering medicines. It is about understanding the baseline lifestyle, reducing toxic stress, and empowering body immunity to recovery."
              </p>
            </div>
          </div>

          {/* Reviews */}
          <div className="glass-card" style={{ background: 'white', padding: '1.5rem' }}>
            <h4 style={{ fontSize: '1.15rem', fontWeight: '700', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
              <MessageSquare size={18} style={{ color: 'var(--accent-orange)' }} /> Patient Reviews ({doc.reviewsCount})
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div style={{ borderBottom: '1px solid var(--border-color)', paddingBottom: '0.75rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.25rem' }}>
                  <span style={{ fontWeight: '600', fontSize: '0.85rem' }}>Hannah B.</span>
                  <div style={{ display: 'flex', gap: '2px' }}>
                    {[1, 2, 3, 4, 5].map((s) => <Star key={s} size={12} style={{ color: '#fbbf24', fill: '#fbbf24' }} />)}
                  </div>
                </div>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                  Very patient-focused. Took the time to review both my cardiology charts and check my Ayurvedic history that I uploaded. Extremely balanced prescriptions.
                </p>
              </div>
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.25rem' }}>
                  <span style={{ fontWeight: '600', fontSize: '0.85rem' }}>Robert M.</span>
                  <div style={{ display: 'flex', gap: '2px' }}>
                    {[1, 2, 3, 4, 5].map((s) => <Star key={s} size={12} style={{ color: '#fbbf24', fill: '#fbbf24' }} />)}
                  </div>
                </div>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                  Excellent explanations of my symptoms. Didn't rush through the virtual call. Recommended highly.
                </p>
              </div>
            </div>
          </div>

        </div>

        {/* Booking Card sidebar */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          
          <div className="glass-card" style={{ background: 'white', position: 'sticky', top: '100px' }}>
            <h4 style={{ fontSize: '1.15rem', fontWeight: '700', marginBottom: '0.75rem' }}>Consultation Info</h4>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '1.5rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem' }}>
                <span style={{ color: 'var(--text-muted)' }}>Video Consultation:</span>
                <strong style={{ color: 'var(--primary-hover)' }}>Yes (HealthVerse Live)</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem' }}>
                <span style={{ color: 'var(--text-muted)' }}>Consultation Fee:</span>
                <strong style={{ fontSize: '1.2rem', color: 'var(--slate-800)' }}>${doc.fee}</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem' }}>
                <span style={{ color: 'var(--text-muted)' }}>Hospital/Clinic:</span>
                <strong style={{ fontSize: '0.85rem', color: 'var(--slate-700)', textAlign: 'right' }}>{doc.hospital}</strong>
              </div>
            </div>

            <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '1rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <span style={{ fontSize: '0.85rem', fontWeight: '600', color: 'var(--slate-700)' }}>Available Slots Today:</span>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }}>
                {doc.schedule.map((time) => (
                  <div
                    key={time}
                    style={{
                      padding: '0.4rem',
                      border: '1px solid var(--border-color)',
                      borderRadius: 'var(--radius-sm)',
                      fontSize: '0.75rem',
                      textAlign: 'center',
                      backgroundColor: 'var(--slate-50)',
                      fontWeight: '600',
                      color: 'var(--slate-800)'
                    }}
                  >
                    {time}
                  </div>
                ))}
              </div>
            </div>

            <button
              className="btn-primary"
              onClick={() => setPage('appointment-booking')}
              style={{ width: '100%', justifyContent: 'center', marginTop: '1.5rem' }}
            >
              <Calendar size={18} /> Schedule Video Visit
            </button>
          </div>

        </div>

      </div>

    </div>
  );
}
