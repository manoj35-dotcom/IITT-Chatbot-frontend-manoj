import React, { useState } from 'react';

function PYQsBox() {
  const [selectedSubject, setSelectedSubject] = useState('');
  const [selectedYear, setSelectedYear] = useState('');
  const [pyqs, setPyqs] = useState([]);
  const [loading, setLoading] = useState(false);

  const subjects = [
    'Mathematics',
    'Physics',
    'Chemistry',
    'Computer Science',
    'English',
    'History',
    'Biology'
  ];

  const years = ['2020', '2021', '2022', '2023', '2024'];

  const handleSearch = async () => {
    if (!selectedSubject || !selectedYear) {
      alert('Please select both subject and year');
      return;
    }

    setLoading(true);
    // Simulated API call - replace with actual backend
    setTimeout(() => {
      const samplePyqs = [
        {
          id: 1,
          question: `Sample PYQ 1 - ${selectedSubject} (${selectedYear})`,
          marks: 5,
          difficulty: 'Easy'
        },
        {
          id: 2,
          question: `Sample PYQ 2 - ${selectedSubject} (${selectedYear})`,
          marks: 10,
          difficulty: 'Medium'
        },
        {
          id: 3,
          question: `Sample PYQ 3 - ${selectedSubject} (${selectedYear})`,
          marks: 15,
          difficulty: 'Hard'
        }
      ];
      setPyqs(samplePyqs);
      setLoading(false);
    }, 500);
  };

  const handleDownload = (pqId) => {
    alert(`Downloading PYQ ${pqId}...`);
    // Implement download logic
  };

  return (
    <div className="feature-box pyqs-box">
      <h2>📚 Previous Year Questions (PYQs)</h2>
      
      <div className="pyqs-controls">
        <select 
          value={selectedSubject}
          onChange={(e) => setSelectedSubject(e.target.value)}
          className="pyqs-select"
        >
          <option value="">Select Subject</option>
          {subjects.map(subject => (
            <option key={subject} value={subject}>{subject}</option>
          ))}
        </select>

        <select 
          value={selectedYear}
          onChange={(e) => setSelectedYear(e.target.value)}
          className="pyqs-select"
        >
          <option value="">Select Year</option>
          {years.map(year => (
            <option key={year} value={year}>{year}</option>
          ))}
        </select>

        <button 
          onClick={handleSearch}
          className="search-btn"
          disabled={loading}
        >
          {loading ? '🔍 Searching...' : '🔍 Search'}
        </button>
      </div>

      <div className="pyqs-results">
        {loading && <p className="loading-text">Loading questions...</p>}
        {!loading && pyqs.length === 0 && (
          <p className="empty-text">Select subject and year to view PYQs</p>
        )}
        {pyqs.length > 0 && (
          <div className="pyqs-list">
            {pyqs.map(pq => (
              <div key={pq.id} className="pyq-item">
                <div className="pyq-content">
                  <h4>{pq.question}</h4>
                  <div className="pyq-meta">
                    <span className="pyq-marks">Marks: {pq.marks}</span>
                    <span className={`pyq-difficulty ${pq.difficulty.toLowerCase()}`}>
                      {pq.difficulty}
                    </span>
                  </div>
                </div>
                <button 
                  onClick={() => handleDownload(pq.id)}
                  className="download-btn"
                >
                  📥 Download
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default PYQsBox;
