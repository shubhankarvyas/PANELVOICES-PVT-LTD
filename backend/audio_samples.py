#!/usr/bin/env python3
"""
Audio samples configuration for different languages
This file contains URLs to actual spoken language samples
"""

# Free spoken language samples from various sources
LANGUAGE_AUDIO_SAMPLES = {
    'english': {
        'audio_url': 'https://www.soundjay.com/misc/sounds/bell-ringing-05.wav',  # Placeholder - replace with actual English speech
        'spoken_text': 'Hello, welcome to our platform',
        'voice': 'Somnus',
        'description': 'English greeting',
        'sample_type': 'greeting'
    },
    'spanish': {
        'audio_url': 'https://www.learningcontainer.com/wp-content/uploads/2020/02/Kalimba.mp3',  # Placeholder - replace with actual Spanish speech
        'spoken_text': 'Hola, bienvenido a nuestra plataforma',
        'voice': 'Aria',
        'description': 'Spanish greeting',
        'sample_type': 'greeting'
    },
    'french': {
        'audio_url': 'https://www.soundjay.com/misc/sounds/bell-ringing-05.wav',  # Placeholder - replace with actual French speech
        'spoken_text': 'Bonjour, bienvenue sur notre plateforme',
        'voice': 'Jessica',
        'description': 'French greeting',
        'sample_type': 'greeting'
    },
    'german': {
        'audio_url': 'https://www.learningcontainer.com/wp-content/uploads/2020/02/Kalimba.mp3',  # Placeholder - replace with actual German speech
        'spoken_text': 'Hallo, willkommen auf unserer Plattform',
        'voice': 'Announcer',
        'description': 'German greeting',
        'sample_type': 'greeting'
    },
    'italian': {
        'audio_url': 'https://www.soundjay.com/misc/sounds/bell-ringing-05.wav',  # Placeholder - replace with actual Italian speech
        'spoken_text': 'Ciao, benvenuto sulla nostra piattaforma',
        'voice': 'Sergeant',
        'description': 'Italian greeting',
        'sample_type': 'greeting'
    },
    'portuguese': {
        'audio_url': 'https://www.learningcontainer.com/wp-content/uploads/2020/02/Kalimba.mp3',  # Placeholder - replace with actual Portuguese speech
        'spoken_text': 'Olá, bem-vindo à nossa plataforma',
        'voice': 'Squish',
        'description': 'Portuguese greeting',
        'sample_type': 'greeting'
    },
    'russian': {
        'audio_url': 'https://www.soundjay.com/misc/sounds/bell-ringing-05.wav',  # Placeholder - replace with actual Russian speech
        'spoken_text': 'Привет, добро пожаловать на нашу платформу',
        'voice': 'Somnus',
        'description': 'Russian greeting',
        'sample_type': 'greeting'
    },
    'japanese': {
        'audio_url': 'https://www.learningcontainer.com/wp-content/uploads/2020/02/Kalimba.mp3',  # Placeholder - replace with actual Japanese speech
        'spoken_text': 'こんにちは、私たちのプラットフォームへようこそ',
        'voice': 'Aria',
        'description': 'Japanese greeting',
        'sample_type': 'greeting'
    },
    'chinese': {
        'audio_url': 'https://www.soundjay.com/misc/sounds/bell-ringing-05.wav',  # Placeholder - replace with actual Chinese speech
        'spoken_text': '你好，欢迎来到我们的平台',
        'voice': 'Jessica',
        'description': 'Chinese greeting',
        'sample_type': 'greeting'
    },
    'arabic': {
        'audio_url': 'https://www.learningcontainer.com/wp-content/uploads/2020/02/Kalimba.mp3',  # Placeholder - replace with actual Arabic speech
        'spoken_text': 'مرحبا، أهلا بك في منصتنا',
        'voice': 'Announcer',
        'description': 'Arabic greeting',
        'sample_type': 'greeting'
    }
}

def get_language_sample(language):
    """Get audio sample for a specific language"""
    return LANGUAGE_AUDIO_SAMPLES.get(language.lower())

def get_all_languages():
    """Get all available languages"""
    return list(LANGUAGE_AUDIO_SAMPLES.keys())

def get_sample_data_for_db():
    """Get formatted data for database insertion"""
    return [
        {
            'language': lang,
            **sample_data
        }
        for lang, sample_data in LANGUAGE_AUDIO_SAMPLES.items()
    ]

if __name__ == "__main__":
    print("Available language samples:")
    for lang, data in LANGUAGE_AUDIO_SAMPLES.items():
        print(f"  {lang.upper()}: {data['spoken_text']}")