# 🏗️ Architecture Overview

## System Architecture

```
┌─────────────────────────────────────────┐
│        INSTITUTE CHATBOT SYSTEM          │
└─────────────────────────────────────────┘
                    │
        ┌───────────┴───────────┐
        │                       │
    ┌───▼────┐           ┌────▼────┐
    │ Frontend│           │ Backend  │
    │ (React) │◄────────►│ (Flask/  │
    └───┬────┘           │ Express) │
        │                └────┬────┘
        │                     │
    ┌───▼──────────┐     ┌───▼──────────┐
    │ Local Storage│     │ Database/    │
    │ (Browser)    │     │ Knowledge    │
    │              │     │ Base         │
    └──────────────┘     └──────────────┘
```

---

## Data Flow

### 1. User Sends a Message
```
User Input (Black Box)
        │
        ▼
React State Updates
        │
        ▼
Message Added to Chat Display (Blue Bubble)
        │
        ▼
Axios sends POST to Backend
        │
        ▼
localStorage.saveToLocalStorage()
```

### 2. Backend Processes Message
```
Backend receives POST /api/chat
        │
        ▼
Extract message & language
        │
        ▼
Query Knowledge Base or AI
        │
        ▼
Generate Response
        │
        ▼
Return JSON Response
```

### 3. Display Bot Response
```
Axios receives response
        │
        ▼
Extract response text
        │
        ▼
Create bot message object
        │
        ▼
Add to React state
        │
        ▼
Auto-scroll to latest message
        │
        ▼
Display in Gray Bubble
```

---

## Component Structure

```
App
├── Header
│   ├── Title
│   └── Controls
│       ├── LanguageSwitcher
│       │   └── select dropdown
│       ├── History Button
│       │   └── Opens Modal
│       └── Clear Button
│
├── ChatContainer (Main Component)
│   ├── Welcome Message (Initial)
│   ├── Message List
│   │   ├── User Messages (Blue)
│   │   └── Bot Messages (Gray)
│   └── Loading Indicator (Dots)
│
├── InputArea
│   ├── Text Input (Black BG)
│   └── Send Button (Blue)
│
└── HistoryModal
    ├── Modal Header
    ├── History List
    │   └── Clickable Items
    └── Modal Footer
        ├── Export Button
        └── Delete All Button
```

---

## File Organization

```
src/
├── App.jsx                 ← Main application component
├── App.css                 ← All styling + animations
│   ├── Bubble animations
│   ├── Message bubbles
│   ├── Input box styling
│   └── Responsive design
│
├── components/             ← Reusable UI components
│   ├── ChatContainer.jsx   ← Messages display area
│   ├── LanguageSwitcher.jsx ← Language dropdown
│   └── HistoryModal.jsx    ← History modal popup
│
├── utils/                  ← Helper functions
│   ├── api.js              ← Axios API calls
│   │   ├── sendMessage()
│   │   ├── getChatHistory()
│   │   ├── clearChatHistory()
│   │   └── getAvailableLanguages()
│   │
│   └── localStorage.js     ← Local storage utilities
│       ├── saveToLocalStorage()
│       ├── loadFromLocalStorage()
│       ├── deleteFromLocalStorage()
│       └── clearAllLocalStorage()
│
├── index.js                ← React entry point
└── index.css               ← Global styles
```

---

## State Management

### App.jsx State Variables

```javascript
// Message handling
const [messages, setMessages] = useState([])
  // Structure: { id, text, sender, timestamp }

const [loading, setLoading] = useState(false)
  // True while waiting for API response

// Language & Preferences  
const [language, setLanguage] = useState('en')
  // Selected language code

// History management
const [chatHistory, setChatHistory] = useState([])
  // Array of previously asked questions

const [showHistory, setShowHistory] = useState(false)
  // Controls history modal visibility

// References
const chatEndRef = useRef(null)
  // For auto-scroll to latest message
```

---

## API Integration

### Axios Instance Configuration
```javascript
// src/utils/api.js
const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json'
  }
})
```

### API Calls Made
```
1. POST /api/chat
   ├── Sends: { message, language }
   └── Receives: { response }

2. GET /api/history (Optional)
   └── Receives: { history: [...] }

3. DELETE /api/history (Optional)
   └── Clears server-side history

4. GET /api/languages (Optional)
   └── Receives: { languages: [...] }
```

---

## Local Storage Structure

```javascript
localStorage = {
  'chatMessages': [
    { id, text, sender, timestamp },
    { id, text, sender, timestamp }
  ],
  
  'language': 'en',
  
  'chatHistory': [
    'Previous question 1',
    'Previous question 2',
    ...
  ]
}
```

---

## Message Object Structure

```javascript
message = {
  id: 1234567890,              // Timestamp
  text: "User's question",      // Message content
  sender: 'user' | 'bot',       // Who sent it
  timestamp: "10:30:45 AM"      // When sent
}
```

---

## CSS Architecture

### Naming Convention
- `.message` - Base message class
- `.message.user` - User message wrapper
- `.message.bot` - Bot message wrapper
- `.message-bubble` - Message styling
- `.loading-bubble` - Loading indicator
- `.bubble` - Background animation

### Responsive Breakpoints
```css
/* Desktop */
@media (min-width: 1024px) { ... }

/* Tablet */
@media (max-width: 768px) { ... }

/* Mobile */
@media (max-width: 480px) { ... }
```

### Animations
- **Float**: Background bubbles (20s infinite)
- **SlideIn**: New messages (0.3s)
- **Bounce**: Loading dots (1.4s)
- **FadeIn**: Modal (0.3s)
- **SlideUp**: Modal content (0.3s)

---

## User Interaction Flow

```
START
  │
  ├─► User Types Message
  │     │
  │     ├─► Input validates (trim check)
  │     │
  │     └─► NOT EMPTY?
  │          │
  │          ├─YES─► Add to Messages
  │          │        │
  │          │        ├─► Save to localStorage
  │          │        │
  │          │        └─► Add to Chat History
  │          │             │
  │          │             └─► Call API
  │          │                  │
  │          │                  ├─► Show Loading
  │          │                  │
  │          │                  ├─► Get Response
  │          │                  │
  │          │                  ├─► Add to Messages
  │          │                  │
  │          │                  ├─► Save to Storage
  │          │                  │
  │          │                  └─► Hide Loading
  │          │
  │          └─NO─► Do Nothing
  │
  ├─► User Clicks History
  │     │
  │     └─► Show Modal
  │          │
  │          ├─► User Selects Item
  │          │     │
  │          │     └─► Send as Message
  │          │
  │          ├─► User Clicks Export
  │          │     │
  │          │     └─► Download Text File
  │          │
  │          └─► User Clicks Delete
  │                │
  │                └─► Clear All History
  │
  ├─► User Switches Language
  │     │
  │     └─► Save to localStorage
  │          │
  │          └─► Update UI Labels
  │
  └─► User Clicks Clear
        │
        └─► Remove All Messages
             │
             └─► Clear localStorage
```

---

## Performance Optimization

### Techniques Used

1. **Component Memoization**
   - ChatContainer: Pure display component
   - LanguageSwitcher: Simple dropdown
   - HistoryModal: Conditional rendering

2. **Efficient Re-renders**
   - State updates only when necessary
   - useRef for non-rendered values
   - Proper dependency arrays in useEffect

3. **CSS Optimization**
   - GPU-accelerated animations
   - Efficient selectors
   - Minimal repaints

4. **Network Optimization**
   - Single Axios instance
   - Timeout handling
   - Error recovery

5. **Storage Optimization**
   - Lazy loading from localStorage
   - Efficient JSON serialization
   - Size limits for history

---

## Security Considerations

### Implemented
- ✅ CORS headers (backend)
- ✅ Input validation (client)
- ✅ Error message sanitization
- ✅ Local storage usage (no sensitive data)

### Recommendations
- Add CSRF protection (backend)
- Implement rate limiting (backend)
- Validate all inputs (backend)
- Use HTTPS in production
- Add authentication if needed
- Sanitize HTML in responses

---

## Scalability

### Current Capacity
- Chat messages: Limited by browser memory (~50MB)
- History items: ~1000 items recommended
- API response time: <1 second for best UX

### Future Improvements
- Pagination for long chats
- Message lazy loading
- Service Workers for offline support
- Web Workers for heavy computation
- IndexedDB for larger local storage
- Real-time updates with WebSockets
- Message encryption
- Cloud sync across devices

---

## Technology Stack

### Frontend
- **React 18** - UI framework
- **Axios 1.6** - HTTP client
- **CSS3** - Styling with animations
- **HTML5** - Structure

### Backend (Example)
- **Flask/Express** - Framework
- **Python/Node.js** - Language
- **CORS** - Cross-origin requests
- **JSON** - Data format

### Hosting
- **Development**: Localhost
- **Production**: Vercel, Netlify, AWS, etc.

---

## Next Steps

1. **Setup Backend**: See [BACKEND_EXAMPLE.md](BACKEND_EXAMPLE.md)
2. **Configure API**: Edit `.env` file
3. **Run App**: `npm start`
4. **Test Chat**: Send a message
5. **Customize**: Edit colors in `App.css`
6. **Deploy**: Build and deploy to cloud

---

**Version:** 1.0.0  
**Architecture Pattern:** Component-based with Hooks  
**State Management:** React Hooks (useState, useRef, useEffect)
