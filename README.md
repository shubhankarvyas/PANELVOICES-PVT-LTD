# ElevenLabs Clone

A Next.js application that replicates the ElevenLabs Text-to-Speech interface with audio playback functionality.

## Features

- 🎨 Pixel-perfect UI replication of ElevenLabs interface
- 🗣️ **Spoken language samples** for 10 languages (not TTS generation)
- 📱 Responsive design with Tailwind CSS
- 🗂️ Tab navigation (Text to Speech, Agents, Music, etc.)
- 🎛️ Language dropdown with flag icons for 10 languages
- ⬇️ Download functionality for audio files
- 🎯 Clean, modern interface
- 🌍 Multi-language support with actual human speech samples

## Tech Stack

### Frontend
- **Next.js 14** - React framework
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **Lucide React** - Icons

### Backend
- **Flask** - Python web framework
- **MongoDB** - Database for storing audio URLs
- **Flask-CORS** - Cross-origin resource sharing

## Setup Instructions

### Prerequisites
- Node.js 18+ 
- Python 3.8+
- MongoDB (local or cloud)

### Frontend Setup

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser.

### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Create a virtual environment:
```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

3. Install Python dependencies:
```bash
pip install -r requirements.txt
```

4. Create a `.env` file:
```bash
cp .env.example .env
```

5. Update the `.env` file with your MongoDB connection string:
```
MONGO_URI=mongodb://localhost:27017/
```

6. Initialize the database with sample data:
```bash
python setup_db.py
```

7. Run the Flask server:
```bash
python app.py
```

The backend will run on [http://localhost:5000](http://localhost:5000).

## Project Structure

```
├── app/
│   ├── api/audio/route.ts    # Next.js API route
│   ├── globals.css           # Global styles
│   ├── layout.tsx           # Root layout
│   └── page.tsx             # Main page
├── components/
│   ├── Header.tsx           # Navigation header
│   ├── HeroSection.tsx      # Hero section
│   ├── TabNavigation.tsx    # Tab navigation
│   └── TextToSpeechPanel.tsx # Main TTS interface
├── backend/
│   ├── app.py              # Flask application
│   ├── requirements.txt    # Python dependencies
│   └── .env.example       # Environment variables template
└── README.md
```

## API Endpoints

### POST /api/audio
Fetch audio URL for a specific language.

**Request:**
```json
{
  "language": "english" | "spanish" | "french" | "german" | "italian" | "portuguese" | "russian" | "japanese" | "chinese" | "arabic"
}
```

**Response:**
```json
{
  "audioUrl": "https://example.com/audio.mp3",
  "language": "english"
}
```

### GET /api/languages
Get all available languages.

**Response:**
```json
{
  "languages": [
    {
      "language": "english",
      "voice": "Somnus",
      "available": true
    }
  ]
}
```

## Deployment

### Frontend (Vercel)
1. Push your code to GitHub
2. Connect your repository to Vercel
3. Deploy automatically

### Backend (Railway/Heroku)
1. Add your MongoDB connection string to environment variables
2. Deploy the Flask application
3. Update the frontend API calls to use the deployed backend URL

## Features Implemented

✅ **Exact UI Replication**:
- Header with ElevenLabs logo, navigation menu, and Login/Sign up buttons
- Hero section with "The most realistic voice AI platform" heading
- Tab navigation with all tabs shown (TEXT TO SPEECH active)
- Large text editor area with sample dragon story text
- Voice/speaker options with colored dots and labels
- Language dropdown with flag icons (English/Arabic)
- Play button with triangle icon and audio functionality
- Download button with proper icon
- Bottom gradient section with "EXPERIENCE THE FULL AUDIO AI PLATFORM"

✅ **Functionality**:
- Language selection dropdown (English/Arabic)
- Audio playback based on selected language
- Download functionality for audio files
- MongoDB integration for storing audio URLs
- Flask API for audio retrieval
- Responsive design matching the screenshots  

## Notes

- **Audio samples are spoken language greetings, not text-to-speech**
- Currently using placeholder URLs - see `AUDIO_SETUP.md` for adding real audio
- Each language has a human-spoken greeting (e.g., "Hello" in English, "Hola" in Spanish)
- The UI closely matches the provided screenshots
- Only the Text to Speech tab has functionality; other tabs show placeholder content
- 10 languages supported: English, Spanish, French, German, Italian, Portuguese, Russian, Japanese, Chinese, Arabic

## License

This project is for educational purposes only.