# Sample Backend Implementation

This folder contains example backend implementations for the chatbot API.

## Python Flask Example

```python
# app.py
from flask import Flask, request, jsonify
from flask_cors import CORS
import json

app = Flask(__name__)
CORS(app)

# Sample knowledge base
knowledge_base = {
    "timing": "The institute is open from 9 AM to 5 PM on weekdays.",
    "contact": "You can reach us at +91-XXXX-XXXX-XX or contact@institute.edu",
    "courses": "We offer courses in Computer Science, Data Science, and Web Development.",
    "location": "We are located at 123 Main Street, City, State.",
    "admission": "Admission is on rolling basis. Please visit our website for more details.",
}

@app.route('/api/chat', methods=['POST'])
def chat():
    try:
        data = request.json
        message = data.get('message', '').lower()
        language = data.get('language', 'en')
        
        # Simple keyword matching
        response = "I'm sorry, I didn't understand your question. Please ask about timing, courses, admission, contact, or location."
        
        for key, value in knowledge_base.items():
            if key.lower() in message:
                response = value
                break
        
        return jsonify({
            'response': response,
            'language_processed': language
        }), 200
        
    except Exception as e:
        return jsonify({
            'error': str(e)
        }), 500

@app.route('/api/history', methods=['GET'])
def get_history():
    # Implement your history retrieval logic
    return jsonify({
        'history': []
    }), 200

@app.route('/api/history', methods=['DELETE'])
def clear_history():
    # Implement your history clearing logic
    return jsonify({
        'message': 'History cleared successfully'
    }), 200

@app.route('/api/languages', methods=['GET'])
def get_languages():
    return jsonify({
        'languages': ['en', 'es', 'fr', 'de', 'hi']
    }), 200

if __name__ == '__main__':
    app.run(debug=True, host='localhost', port=5000)
```

## Node.js Express Example

```javascript
// server.js
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Sample knowledge base
const knowledgeBase = {
    "timing": "The institute is open from 9 AM to 5 PM on weekdays.",
    "contact": "You can reach us at +91-XXXX-XXXX-XX or contact@institute.edu",
    "courses": "We offer courses in Computer Science, Data Science, and Web Development.",
    "location": "We are located at 123 Main Street, City, State.",
    "admission": "Admission is on rolling basis. Please visit our website for more details.",
};

// Chat endpoint
app.post('/api/chat', (req, res) => {
    try {
        const { message, language } = req.body;
        
        if (!message) {
            return res.status(400).json({ error: 'Message is required' });
        }
        
        const lowerMessage = message.toLowerCase();
        let response = "I'm sorry, I didn't understand your question. Please ask about timing, courses, admission, contact, or location.";
        
        for (const [key, value] of Object.entries(knowledgeBase)) {
            if (lowerMessage.includes(key)) {
                response = value;
                break;
            }
        }
        
        res.json({
            response: response,
            language_processed: language || 'en'
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// History endpoints
app.get('/api/history', (req, res) => {
    res.json({ history: [] });
});

app.delete('/api/history', (req, res) => {
    res.json({ message: 'History cleared successfully' });
});

// Languages endpoint
app.get('/api/languages', (req, res) => {
    res.json({ languages: ['en', 'es', 'fr', 'de', 'hi'] });
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
```

## Installation Instructions

### Flask
```bash
pip install flask flask-cors
python app.py
```

### Express
```bash
npm install express cors body-parser
node server.js
```

Both will start the server on `http://localhost:5000`

---

## Testing the API

### Using cURL
```bash
curl -X POST http://localhost:5000/api/chat \
  -H "Content-Type: application/json" \
  -d '{
    "message": "What are the institute timings?",
    "language": "en"
  }'
```

### Using Postman
1. Create a new POST request
2. URL: `http://localhost:5000/api/chat`
3. Headers: `Content-Type: application/json`
4. Body (JSON):
```json
{
  "message": "What time does the institute open?",
  "language": "en"
}
```

---

## Advanced Features

For production, consider implementing:
- Database integration for persistent storage
- NLP/ML for better intent recognition
- Authentication and rate limiting
- Logging and monitoring
- Multi-language translation API integration
- Webhook support for backend notifications
- Session management
- Analytics tracking

---

**Need Help?** Check the main SETUP.md guide for more details.
