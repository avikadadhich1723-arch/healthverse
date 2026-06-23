import React, { useState, useEffect } from 'react';
import { Search, Star, Clock, DollarSign, Award, MapPin } from 'lucide-react';
import { doctorsData } from '../mockData';

export default function DoctorListing({ setPage, setSelectedDoctor, doctorFilter, setDoctorFilter }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('rating'); // rating, fee, experience
  const [filteredDoctors, setFilteredDoctors] = useState(doctorsData);

  useEffect(() => {
    let result = doctorsData;

    // Pathway Filter
    if (doctorFilter !== 'All' && doctorFilter) {
      result = result.filter(doc => doc.type.toLowerCase() === doctorFilter.toLowerCase().replace('ic', ''));
    }

    // Search term
    if (searchTerm) {
      result = result.filter(doc => 
        doc.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
        doc.specialty.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Sort logic
    if (sortBy === 'rating') {
      result = [...result].sort((a, b) => b.rating - a.rating);
    } else if (sortBy === 'fee') {
      result = [...result].sort((a, b) => a.fee - b.fee);
    } else if (sortBy === 'experience') {
      result = [...result].sort((a, b) => b.experience - a.experience);
    }

    setFilteredDoctors(result);
  }, [searchTerm, sortBy, doctorFilter]);

  const handleSelectDoctor = (doc, targetPage) => {
    setSelectedDoctor(doc);
    setPage(targetPage);
  };

  return (
    <div className="doctor-listing-page animate-fade" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      
      {/* Header */}
      <div>
        <h2 style={{ fontSize: '1.75rem', fontWeight: '700' }}>Doctor Marketplace</h2>
        <p style={{ color: 'var(--text-muted)' }}>Consult with verified specialists across Allopathy, Ayurveda, and Homeopathy.</p>
      </div>

      {/* Filter and Search Panel */}
      <div className="glass-card" style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', alignItems: 'center', background: 'white' }}>
        
        {/* Pathway categories */}
        <div style={{ display: 'flex', gap: '0.35rem', background: 'var(--slate-100)', padding: '0.25rem', borderRadius: 'var(--radius-md)', flexWrap: 'wrap' }}>
          {['All', 'Ayurvedic', 'Homeopathic', 'Allopathic'].map((cat) => (
            <button
              key={cat}
              onClick={() => setDoctorFilter(cat)}
              style={{
                padding: '0.4rem 0.8rem',
                border: 'none',
                borderRadius: 'var(--radius-sm)',
                background: (doctorFilter === cat || (!doctorFilter && cat === 'All')) ? 'white' : 'transparent',
                color: (doctorFilter === cat || (!doctorFilter && cat === 'All')) ? 'var(--primary)' : 'var(--text-muted)',
                fontWeight: '600',
                fontSize: '0.85rem',
                cursor: 'pointer',
                boxShadow: (doctorFilter === cat || (!doctorFilter && cat === 'All')) ? 'var(--shadow-sm)' : 'none',
                transition: 'all var(--transition-fast)'
              }}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="nav-search" style={{ flex: 1, minWidth: '240px', background: 'var(--slate-50)' }}>
          <Search size={16} style={{ color: 'var(--text-muted)' }} />
          <input
            type="text"
            placeholder="Search doctor name or specialty (e.g. Cardiologist)..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Sort */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <label style={{ fontSize: '0.85rem', fontWeight: '600', color: 'var(--slate-700)' }}>Sort By:</label>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            style={{
              padding: '0.45rem 1rem',
              border: '1px solid var(--border-color)',
              borderRadius: 'var(--radius-md)',
              outline: 'none',
              fontSize: '0.85rem',
              backgroundColor: 'white',
              cursor: 'pointer'
            }}
          >
            <option value="rating">Highest Rating</option>
            <option value="fee">Lowest Price</option>
            <option value="experience">Most Experience</option>
          </select>
        </div>

      </div>

      {/* Grid of Doctor Cards */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
        gap: '1.5rem'
      }}>
        {filteredDoctors.length > 0 ? (
          filteredDoctors.map((doc) => (
            <div key={doc.id} className="glass-card" style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '1rem',
              padding: '1.25rem',
              background: 'white'
            }}>
              {/* Doctor Header (Image & Badge) */}
              <div style={{ display: 'flex', gap: '1rem' }}>
                <img
                  src={doc.avatar}
                  alt={doc.name}
                  style={{
                    width: '80px',
                    height: '80px',
                    borderRadius: 'var(--radius-md)',
                    objectFit: 'cover',
                    border: '1px solid var(--border-color)'
                  }}
                />
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                  <span className={`badge badge-${doc.type.toLowerCase().replace('ic', '')}`} style={{ alignSelf: 'flex-start' }}>
                    {doc.type}
                  </span>
                  <h4 style={{ fontSize: '1.05rem', fontWeight: '700' }}>{doc.name}</h4>
                  <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{doc.specialty}</p>
                </div>
              </div>

              {/* Stats & Hospital */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '0.75rem',
                padding: '0.75rem 0',
                borderTop: '1px solid var(--border-color)',
                borderBottom: '1px solid var(--border-color)',
                fontSize: '0.8rem',
                color: 'var(--slate-700)'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                  <Star size={14} style={{ color: '#fbbf24', fill: '#fbbf24' }} />
                  <strong>{doc.rating}</strong> ({doc.reviewsCount} reviews)
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                  <Award size={14} style={{ color: 'var(--secondary)' }} />
                  <strong>{doc.experience} Years</strong> exp
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                  <DollarSign size={14} style={{ color: 'var(--primary)' }} />
                  <strong>${doc.fee}</strong> fee
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  <MapPin size={14} style={{ color: 'var(--text-muted)' }} />
                  <span style={{ fontSize: '0.75rem' }}>{doc.hospital.split(' ')[0]} Hospital</span>
                </div>
              </div>

              {/* Buttons */}
              <div style={{ display: 'flex', gap: '0.5rem', marginTop: 'auto' }}>
                <button
                  className="btn-outline"
                  onClick={() => handleSelectDoctor(doc, 'doctor-profile')}
                  style={{ flex: 1, fontSize: '0.85rem', padding: '0.5rem' }}
                >
                  View Profile
                </button>
                <button
                  className="btn-primary"
                  onClick={() => handleSelectDoctor(doc, 'appointment-booking')}
                  style={{ flex: 1, fontSize: '0.85rem', padding: '0.5rem', justifyContent: 'center' }}
                >
                  Book Video
                </button>
              </div>

            </div>
          ))
        ) : (
          <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '3rem', backgroundColor: 'white', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-lg)', color: 'var(--text-muted)' }}>
            <p>No doctor matching your query was found. Try selecting another pathway or clearing search.</p>
          </div>
        )}
      </div>

    </div>
  );
}
