# 🚀 Quick Start Guide

Get your Institute ChatBot running in 3 minutes!

## 1️⃣ Install Dependencies
```bash
npm install
```

## 2️⃣ Configure Your API
Edit `.env` file:
```
REACT_APP_API_URL=http://localhost:5000/api
```

## 3️⃣ Start the App
```bash
npm start
```

✅ **Done!** The app opens at `http://localhost:3000`

---

## 📁 Project Structure
```
src/
├── App.jsx              ← Main component
├── App.css              ← Styling
├── components/          ← UI components
│   ├── ChatContainer.jsx
│   ├── LanguageSwitcher.jsx
│   └── HistoryModal.jsx
├── utils/               ← Helper functions
│   ├── api.js           ← Axios API calls
│   └── localStorage.js  ← Data persistence
└── index.js             ← React entry point
```

---

## 🎨 Features Overview

| Feature | How to Use |
|---------|-----------|
| **Send Messages** | Type in black box + Press Enter |
| **Language Switch** | Click 🌐 Language dropdown |
| **View History** | Click 📜 History button |
| **Export History** | Open History → Click Export |
| **Clear Chat** | Click 🗑️ Clear button |
| **Blue Bubbles** | Auto-animated background 🎯 |

---

## 🔗 Connect Your Backend

Your API must have this endpoint:

```
POST /api/chat
Request:  { "message": "user text", "language": "en" }
Response: { "response": "bot reply" }
```

### Quick Test
```bash
curl -X POST http://localhost:5000/api/chat \
  -H "Content-Type: application/json" \
  -d '{"message":"Hello","language":"en"}'
```

---

## 🛠️ For More Details

- **Setup & Config**: See [SETUP.md](SETUP.md)
- **Backend Example**: See [BACKEND_EXAMPLE.md](BACKEND_EXAMPLE.md)
- **Full Documentation**: See [README.md](README.md)

---

## ⚡ Build Commands

```bash
npm start          # Start dev server
npm run build      # Build for production
npm test           # Run tests
```

---

## 📱 Responsive Design

Works perfectly on:
- ✅ Desktop
- ✅ Tablet
- ✅ Mobile
- ✅ All modern browsers

---

## 💾 Data Persistence

All data stored locally:
- ✅ Chat messages (auto-saved)
- ✅ Language preference (auto-saved)
- ✅ Chat history (exportable)

---

## 🎯 Customization

### Change Colors
Edit `src/App.css`:
```css
.message.user .message-bubble {
  background: linear-gradient(135deg, #YOUR_COLOR_1, #YOUR_COLOR_2);
}
```

### Add Languages
Edit `src/App.jsx`:
```jsx
const languages = {
  en: { ... },
  ja: { ... }  // Add new language
};
```

---

## 🆘 Quick Troubleshooting

| Problem | Solution |
|---------|----------|
| Port 3000 taken | `PORT=3001 npm start` |
| API not connecting | Check `.env` URL and backend server |
| Styling broken | Press Ctrl+Shift+Delete to clear cache |
| Module not found | Run `npm install` again |

---

## 📞 Support

- Check [SETUP.md](SETUP.md) for detailed setup
- Review error messages in browser console (F12)
- Contact your development team for issues

---

**Ready? Run `npm start` now!** 🎉
