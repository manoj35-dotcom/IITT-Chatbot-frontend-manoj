# Setup Guide - Institute ChatBot Frontend

## Quick Start (5 minutes)

### Step 1: Install Dependencies
```bash
npm install
```

### Step 2: Configure API URL
Edit `.env` file:
```
REACT_APP_API_URL=http://your-backend-server:5000/api
```

### Step 3: Start the App
```bash
npm start
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Detailed Setup

### System Requirements
- **Node.js**: v14.0.0 or higher
- **npm**: v6.0.0 or higher
- **Git**: For version control (optional)

### Installation Steps

#### 1. Clone or Download the Repository
```bash
cd your-project-directory
```

#### 2. Install Node Modules
```bash
npm install
```

Wait for the installation to complete. This will install:
- react@18.2.0
- react-dom@18.2.0
- axios@1.6.0
- react-scripts@5.0.0

#### 3. Create Environment Configuration

Copy `.env.example` to `.env`:
```bash
cp .env.example .env
```

Edit `.env` with your settings:
```env
REACT_APP_API_URL=http://localhost:5000/api
REACT_APP_ENV=development
REACT_APP_DEBUG=false
```

#### 4. Verify Backend is Running

Before starting the frontend, ensure your backend server is running:
- Backend should be accessible at the URL in REACT_APP_API_URL
- Test with: `curl http://your-api-url/chat`

#### 5. Start Development Server
```bash
npm start
```

The app will automatically open in your default browser at `http://localhost:3000`.

---

## Backend API Setup

### Required Endpoints

Your backend must implement these endpoints:

#### POST `/api/chat`
Handles user messages and returns bot responses.

**Request:**
```json
{
  "message": "What are the institute timings?",
  "language": "en"
}
```

**Response:**
```json
{
  "response": "The institute is open from 9 AM to 5 PM on weekdays."
}
```

**Error Response:**
```json
{
  "error": "An error occurred"
}
```

#### Optional Endpoints

**GET `/api/history`** - Retrieve chat history
```json
{
  "history": [
    "What time does the institute open?",
    "How many courses are available?"
  ]
}
```

**DELETE `/api/history`** - Clear chat history
```json
{
  "message": "History cleared successfully"
}
```

**GET `/api/languages`** - List supported languages
```json
{
  "languages": ["en", "es", "fr", "de", "hi"]
}
```

### Example Backend (Python Flask)

```python
from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route('/api/chat', methods=['POST'])
def chat():
    data = request.json
    message = data.get('message')
    language = data.get('language', 'en')
    
    # Your chatbot logic here
    response = "This is a sample response"
    
    return jsonify({
        'response': response
    })

if __name__ == '__main__':
    app.run(debug=True, host='localhost', port=5000)
```

---

## Configuration Guide

### Environment Variables

| Variable | Default | Description |
|----------|---------|-------------|
| `REACT_APP_API_URL` | `http://localhost:5000/api` | Backend API endpoint |
| `REACT_APP_ENV` | `development` | Environment type |
| `REACT_APP_API_TIMEOUT` | `30000` | API request timeout (ms) |
| `REACT_APP_DEBUG` | `false` | Enable debug logging |

### CSS Customization

Edit `src/App.css` to customize:

**Colors:**
```css
/* Change primary blue color */
.message.user .message-bubble {
  background: linear-gradient(135deg, #YOUR_COLOR_1 0%, #YOUR_COLOR_2 100%);
}

/* Change bot message background */
.message.bot .message-bubble {
  background-color: #YOUR_COLOR;
}
```

**Fonts:**
```css
body {
  font-family: 'Your Font', sans-serif;
}
```

**Bubble Animation:**
```css
@keyframes float {
  0% { transform: translateY(0px) translateX(0px); }
  50% { transform: translateY(-100px) translateX(0px); }
  100% { transform: translateY(0px) translateX(0px); }
}
```

---

## Troubleshooting

### Issue: "npm: command not found"
**Solution:** Install Node.js from [nodejs.org](https://nodejs.org/)

### Issue: Port 3000 already in use
**Solution:** 
```bash
# Windows
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# Mac/Linux
lsof -ti:3000 | xargs kill -9
```

Or start on a different port:
```bash
PORT=3001 npm start
```

### Issue: "Cannot connect to API"
1. Check if backend is running
2. Verify API URL in `.env`
3. Check browser console (F12) for errors
4. Ensure backend allows CORS requests

**Enable CORS in Flask:**
```python
from flask_cors import CORS
CORS(app)
```

**Enable CORS in Express:**
```javascript
const cors = require('cors');
app.use(cors());
```

### Issue: Chat history not saving
1. Check browser's Local Storage (F12 → Application → Local Storage)
2. Clear cache: Ctrl+Shift+Delete
3. Check if privacy mode is enabled
4. Verify browser supports Local Storage

### Issue: Messages not sending
1. Check browser console for errors
2. Verify API endpoint returns correct format
3. Check network tab (F12 → Network)
4. Ensure API accepts POST requests

---

## Development Tips

### Hot Reload
Changes to files are automatically reflected in the browser during development.

### Browser DevTools
Press `F12` to open Developer Tools:
- **Console**: View error messages
- **Network**: Monitor API calls
- **Application**: View Local Storage and Cookies
- **Elements**: Inspect HTML structure

### React DevTools
Install the React DevTools browser extension to debug component state and props.

### Testing API Manually

Using cURL:
```bash
curl -X POST http://localhost:5000/api/chat \
  -H "Content-Type: application/json" \
  -d '{"message":"Hello","language":"en"}'
```

Using Postman:
1. Create new POST request
2. URL: `http://localhost:5000/api/chat`
3. Body (JSON):
```json
{
  "message": "Hello",
  "language": "en"
}
```

---

## Production Deployment

### Build for Production
```bash
npm run build
```

This creates an optimized production build in the `build/` folder.

### Deploy to Vercel
```bash
npm install -g vercel
vercel
```

### Deploy to Netlify
```bash
# via CLI
npm install -g netlify-cli
netlify deploy --prod --dir=build

# or via GitHub integration
# Connect your GitHub repo to Netlify Dashboard
```

### Deploy to AWS S3
```bash
# Build
npm run build

# Install AWS CLI
pip install awscli

# Deploy
aws s3 sync build/ s3://your-bucket-name --delete
```

### Environment for Production
Create `.env.production`:
```env
REACT_APP_API_URL=https://your-production-api.com/api
REACT_APP_ENV=production
REACT_APP_DEBUG=false
```

---

## Additional Resources

- [React Documentation](https://react.dev/)
- [Axios Documentation](https://axios-http.com/)
- [CSS Animations](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Animations)
- [Local Storage API](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage)

---

## Support

For issues or questions:
1. Check the main README.md
2. Review the error messages in browser console
3. Check the Troubleshooting section above
4. Contact the development team

---

**Last Updated:** 2024  
**Version:** 1.0.0
