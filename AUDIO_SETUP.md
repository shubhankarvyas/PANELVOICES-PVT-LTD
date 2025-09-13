# Audio Samples Setup Guide

## Overview
This project uses spoken language samples (not text-to-speech) for demonstrating different languages. Each language has a sample audio file with someone speaking a greeting in that language.

## Current Setup
The project is configured with placeholder audio URLs. To use real spoken language samples, you need to:

### 1. Obtain Audio Samples
Get actual spoken audio files for each language:
- **English**: "Hello, welcome to our platform"
- **Spanish**: "Hola, bienvenido a nuestra plataforma"  
- **French**: "Bonjour, bienvenue sur notre plateforme"
- **German**: "Hallo, willkommen auf unserer Plattform"
- **Italian**: "Ciao, benvenuto sulla nostra piattaforma"
- **Portuguese**: "Olá, bem-vindo à nossa plataforma"
- **Russian**: "Привет, добро пожаловать на нашу платформу"
- **Japanese**: "こんにちは、私たちのプラットフォームへようこそ"
- **Chinese**: "你好，欢迎来到我们的平台"
- **Arabic**: "مرحبا، أهلا بك في منصتنا"

### 2. Upload Audio Files
Upload your audio files to a cloud storage service:
- **AWS S3**
- **Google Cloud Storage**
- **Cloudinary**
- **Firebase Storage**
- **Any CDN service**

### 3. Update Configuration
Edit `backend/audio_samples.py` and replace the placeholder URLs with your actual audio URLs:

```python
LANGUAGE_AUDIO_SAMPLES = {
    'english': {
        'audio_url': 'https://your-storage.com/audio/english-greeting.mp3',
        'spoken_text': 'Hello, welcome to our platform',
        # ... rest of config
    },
    # ... other languages
}
```

### 4. Audio File Requirements
- **Format**: MP3, WAV, or OGG
- **Duration**: 2-5 seconds recommended
- **Quality**: Clear speech, minimal background noise
- **Size**: Keep under 1MB per file for fast loading

## Free Audio Resources
You can find free spoken language samples from:
- **Forvo.com** - Pronunciation dictionary
- **Google Translate** - Has audio playback (check terms of use)
- **Mozilla Common Voice** - Open source voice dataset
- **Freesound.org** - Creative Commons audio samples

## Testing
After updating the URLs:
1. Restart the backend server
2. Test each language in the dropdown
3. Verify audio plays correctly in the browser

## Production Considerations
- Use a CDN for faster audio loading
- Implement audio caching
- Add fallback audio files
- Monitor audio file availability
- Consider audio compression for smaller file sizes

## Example Implementation
```python
# In backend/audio_samples.py
LANGUAGE_AUDIO_SAMPLES = {
    'english': {
        'audio_url': 'https://cdn.yoursite.com/audio/en/greeting.mp3',
        'spoken_text': 'Hello, welcome to our platform',
        'voice': 'Somnus',
        'description': 'English greeting',
        'sample_type': 'greeting'
    }
}
```

This setup ensures users hear actual human speech in different languages when they select from the dropdown, providing a realistic demonstration of the voice AI platform.