# Institute ChatBot Frontend

A modern, responsive React-based chatbot interface for your institute with an intuitive user experience and powerful features.

## Features

✨ **Key Features:**
- 🎨 **Beautiful UI** - White background with blue bubble animations
- 💬 **Real-time Messaging** - Black input box with smooth message bubbles
- 🌐 **Multi-language Support** - English, Spanish, French, German, and Hindi
- 💾 **Chat History** - Save and manage your conversation history
- 📥 **Export History** - Download chat history as a text file
- 📱 **Responsive Design** - Works on desktop, tablet, and mobile
- ⚡ **Fast Performance** - Built with React and Axios
- 🎯 **Auto-scroll** - Automatically scrolls to the latest message
- 💾 **Local Storage** - Persistent chat history using browser storage

## Project Structure

```
iitt-chatbot-frontend/
├── public/
│   └── index.html
├── src/
│   ├── components/
│   │   ├── ChatContainer.jsx      # Chat messages display
│   │   ├── LanguageSwitcher.jsx   # Language selection dropdown
│   │   └── HistoryModal.jsx       # Chat history modal
│   ├── utils/
│   │   ├── api.js                 # Axios API calls
│   │   └── localStorage.js        # Local storage utilities
│   ├── App.jsx                    # Main app component
│   ├── App.css                    # Styling
│   ├── index.js                   # React entry point
│   └── index.css                  # Global styles
├── .env                           # Environment variables
├── .gitignore                     # Git ignore rules
├── package.json                   # Dependencies and scripts
└── README.md                      # This file
```

## Installation

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Setup Steps

1. **Clone the repository**
   ```bash
   cd c:\Users\manoj\IITT-Chatbot-frontend-manoj
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure API Endpoint**
   
   Edit `.env` file and update the API URL:
   ```
   REACT_APP_API_URL=http://your-api-server:port/api
   ```

4. **Start the development server**
   ```bash
   npm start
   ```

   The app will open at `http://localhost:3000`

## Usage

### Basic Features

1. **Sending Messages**
   - Type your question in the black input box
   - Press Enter or click the "Send" button
   - Messages appear in blue bubbles

2. **Language Switching**
   - Click the language dropdown (🌐 Language)
   - Select your preferred language
   - The app will remember your choice

3. **View Chat History**
   - Click the "📜 History" button
   - See all previous questions asked
   - Click any item to send it again
   - Export history as a text file

4. **Clear Chat**
   - Click the "🗑️ Clear" button
   - All messages will be removed from the current session
   - (History will remain saved unless explicitly deleted)

## Configuration

### API Integration

The app uses Axios to communicate with your backend. Update `src/utils/api.js` if your API endpoint structure differs.

**Expected API Response Format:**
```json
{
  "response": "Your bot's response text here"
}
```

### Customization

- **Colors**: Edit the CSS variables in `src/App.css`
- **Languages**: Add more languages in `src/components/LanguageSwitcher.jsx` and `src/App.jsx`
- **Bubble Animation**: Modify animation properties in `src/App.css` (`.bubble` class)

## API Endpoints

The app expects these endpoints:

### POST `/api/chat`
Send a message and get a response

**Request:**
```json
{
  "message": "User's question",
  "language": "en"
}
```

**Response:**
```json
{
  "response": "Bot's response"
}
```

### Additional (Optional) Endpoints

- `GET /api/history` - Fetch chat history
- `DELETE /api/history` - Clear chat history
- `GET /api/languages` - Get available languages

## Development

### Available Scripts

```bash
# Start development server
npm start

# Build for production
npm build

# Run tests
npm test

# Eject configuration (not recommended)
npm eject
```

### Technologies Used

- **React 18** - UI framework
- **Axios** - HTTP client for API requests
- **CSS3** - Styling with animations
- **Local Storage API** - Client-side data persistence

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Performance Optimization

- Lazy loading of components
- Efficient re-renders using React hooks
- CSS animations with GPU acceleration
- Optimized bundle size

## Troubleshooting

### API Connection Issues
1. Check if backend server is running
2. Verify `REACT_APP_API_URL` in `.env` file
3. Check browser console for CORS errors
4. Ensure API endpoint returns correct JSON format

### Chat Not Saving
- Clear browser cache and localStorage
- Check browser's local storage limit
- Verify browser privacy settings allow storage

### Styling Issues
- Clear CSS cache (Ctrl+Shift+R or Cmd+Shift+R)
- Check if CSS file is properly loaded
- Verify no conflicting CSS from extensions

## Deployment

### Deploy to Vercel (Recommended)

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel
```

### Deploy to Other Platforms

The app can be deployed to any static hosting service:
- Netlify
- GitHub Pages
- AWS S3
- Firebase Hosting

Build the app first:
```bash
npm run build
```

Then deploy the `build/` folder to your hosting service.

## Future Enhancements

- 🔐 User authentication
- 👤 User profiles
- 📊 Chat analytics
- 🔊 Voice input/output
- 🌙 Dark mode
- 📎 File upload support
- ⌨️ Keyboard shortcuts
- 🤖 AI response suggestions

## License

This project is licensed under the MIT License.

## Support

For issues or questions:
1. Check the GitHub Issues
2. Review the troubleshooting section
3. Contact the development team

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/NewFeature`)
3. Commit changes (`git commit -m 'Add NewFeature'`)
4. Push to branch (`git push origin feature/NewFeature`)
5. Open a Pull Request

---

**Version:** 1.0.0  
**Last Updated:** 2024  
**Author:** Institute Development Team