import React, { useState } from 'react';

function TeacherFeedback() {
  const [teachers, setTeachers] = useState([
    { id: 1, name: 'Dr. John Smith', subject: 'Mathematics', rating: 4.5, reviews: 128 },
    { id: 2, name: 'Prof. Sarah Johnson', subject: 'Physics', rating: 4.2, reviews: 95 },
    { id: 3, name: 'Mr. David Lee', subject: 'Chemistry', rating: 4.7, reviews: 112 },
    { id: 4, name: 'Ms. Emily Davis', subject: 'English', rating: 4.3, reviews: 87 }
  ]);

  const [selectedTeacher, setSelectedTeacher] = useState(null);
  const [showFeedbackForm, setShowFeedbackForm] = useState(false);
  const [feedbackText, setFeedbackText] = useState('');
  const [rating, setRating] = useState(5);

  const handleSubmitFeedback = () => {
    if (!feedbackText.trim()) {
      alert('Please enter feedback');
      return;
    }
    alert(`Feedback submitted for ${selectedTeacher.name}!`);
    setFeedbackText('');
    setRating(5);
    setShowFeedbackForm(false);
  };

  const renderStars = (rating) => {
    return '⭐'.repeat(Math.floor(rating));
  };

  return (
    <div className="feature-box feedback-box">
      <h2>👨‍🏫 Teacher Feedback & Reviews</h2>

      <div className="teachers-grid">
        {teachers.map(teacher => (
          <div key={teacher.id} className="teacher-card">
            <div className="teacher-avatar">👨‍🏫</div>
            <h3>{teacher.name}</h3>
            <p className="teacher-subject">{teacher.subject}</p>
            
            <div className="teacher-rating">
              <span className="stars">{renderStars(teacher.rating)}</span>
              <span className="rating-value">{teacher.rating}</span>
            </div>
            
            <p className="reviews-count">{teacher.reviews} reviews</p>
            
            <div className="teacher-buttons">
              <button 
                className="view-reviews-btn"
                onClick={() => setSelectedTeacher(teacher)}
              >
                👁️ View Reviews
              </button>
              <button 
                className="give-feedback-btn"
                onClick={() => {
                  setSelectedTeacher(teacher);
                  setShowFeedbackForm(true);
                }}
              >
                ✍️ Give Feedback
              </button>
            </div>
          </div>
        ))}
      </div>

      {selectedTeacher && !showFeedbackForm && (
        <div className="reviews-modal">
          <div className="reviews-content">
            <button 
              className="close-modal"
              onClick={() => setSelectedTeacher(null)}
            >
              ✕
            </button>
            <h3>Reviews for {selectedTeacher.name}</h3>
            <div className="review-list">
              <div className="review-item">
                <p className="review-text">"Great teaching methods and very understanding." - Student 1</p>
                <span className="review-date">2 days ago</span>
              </div>
              <div className="review-item">
                <p className="review-text">"Makes the subject easy to understand." - Student 2</p>
                <span className="review-date">1 week ago</span>
              </div>
              <div className="review-item">
                <p className="review-text">"Excellent explanations and patient with doubts." - Student 3</p>
                <span className="review-date">2 weeks ago</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {showFeedbackForm && selectedTeacher && (
        <div className="feedback-modal">
          <div className="feedback-content">
            <button 
              className="close-modal"
              onClick={() => setShowFeedbackForm(false)}
            >
              ✕
            </button>
            <h3>Feedback for {selectedTeacher.name}</h3>
            
            <div className="rating-selector">
              <label>Rating:</label>
              <select 
                value={rating}
                onChange={(e) => setRating(Number(e.target.value))}
                className="rating-select"
              >
                <option value={1}>⭐ 1 - Poor</option>
                <option value={2}>⭐⭐ 2 - Fair</option>
                <option value={3}>⭐⭐⭐ 3 - Good</option>
                <option value={4}>⭐⭐⭐⭐ 4 - Very Good</option>
                <option value={5}>⭐⭐⭐⭐⭐ 5 - Excellent</option>
              </select>
            </div>

            <div className="feedback-input-group">
              <label>Your Feedback:</label>
              <textarea 
                value={feedbackText}
                onChange={(e) => setFeedbackText(e.target.value)}
                placeholder="Share your experience and suggestions..."
                className="feedback-textarea"
                rows="4"
              />
            </div>

            <div className="feedback-buttons">
              <button 
                onClick={handleSubmitFeedback}
                className="submit-feedback-btn"
              >
                ✓ Submit Feedback
              </button>
              <button 
                onClick={() => setShowFeedbackForm(false)}
                className="cancel-feedback-btn"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default TeacherFeedback;
