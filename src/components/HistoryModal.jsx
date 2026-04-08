import React from 'react';

function HistoryModal({ isOpen, onClose, history, onLoadMessage, onClearHistory, onExportHistory }) {
  return (
    <div className={`modal ${isOpen ? 'open' : ''}`}>
      <div className="modal-content">
        <div className="modal-header">
          <h2>Chat History</h2>
          <button className="close-btn" onClick={onClose}>&times;</button>
        </div>
        
        <div className="history-list">
          {history.length === 0 ? (
            <p style={{ textAlign: 'center', color: '#999', padding: '20px' }}>
              No history yet
            </p>
          ) : (
            history.map((item, index) => (
              <div 
                key={index} 
                className="history-item"
                onClick={() => onLoadMessage(item)}
              >
                <div className="history-item-text">{item}</div>
              </div>
            ))
          )}
        </div>
        
        <div className="modal-footer">
          <button className="export-btn" onClick={onExportHistory}>
            📥 Export
          </button>
          <button 
            className="clear-history-btn" 
            onClick={() => {
              if (window.confirm('Are you sure you want to delete all history?')) {
                onClearHistory();
              }
            }}
          >
            Delete All
          </button>
        </div>
      </div>
    </div>
  );
}

export default HistoryModal;
