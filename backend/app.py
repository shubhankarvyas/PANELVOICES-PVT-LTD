from flask import Flask, request, jsonify
from flask_cors import CORS
from pymongo import MongoClient
import os
from datetime import datetime
from dotenv import load_dotenv
from audio_samples import get_sample_data_for_db, get_language_sample

load_dotenv()

app = Flask(__name__)
CORS(app)

# MongoDB connection
MONGO_URI = os.getenv('MONGO_URI', 'mongodb://localhost:27017/')
client = MongoClient(MONGO_URI)
db = client['elevenlabs_clone']
audio_collection = db['audio_files']

# Initialize with sample data for all 10 languages
def init_db():
    if audio_collection.count_documents({}) == 0:
        # Get sample data from audio_samples.py
        sample_data = get_sample_data_for_db()
        audio_collection.insert_many(sample_data)
        print("Database initialized with sample data for 10 languages")

@app.route('/api/text-to-speech', methods=['POST'])
def text_to_speech():
    try:
        data = request.get_json()
        text = data.get('text', '')
        language = data.get('language', '').lower()
        
        if not text or not language:
            return jsonify({'error': 'Text and language are required'}), 400
        
        # Find language configuration
        language_doc = audio_collection.find_one({'language': language})
        
        if not language_doc:
            return jsonify({'error': f'Language not supported: {language}'}), 404
        
        # In a real implementation, you would:
        # 1. Call a TTS service (ElevenLabs, Google TTS, etc.)
        # 2. Generate audio from the text in the specified language
        # 3. Upload the audio file to cloud storage
        # 4. Save the record to MongoDB
        
        # For demo purposes, we'll use the pre-stored audio URL
        # but save the TTS request to database
        tts_record = {
            'text': text,
            'language': language,
            'audio_url': language_doc['audio_url'],
            'voice': language_doc.get('voice', 'default'),
            'character_count': len(text),
            'created_at': datetime.utcnow().isoformat(),
            'status': 'completed'
        }
        
        # Save TTS request to database
        tts_collection = db['tts_requests']
        result = tts_collection.insert_one(tts_record)
        
        return jsonify({
            'audioUrl': language_doc['audio_url'],
            'language': language,
            'textLength': len(text),
            'voice': language_doc.get('voice', 'default'),
            'requestId': str(result.inserted_id),
            'message': f'Text-to-speech generated for {language} ({len(text)} characters)'
        })
    
    except Exception as e:
        print(f"Error: {e}")
        return jsonify({'error': 'Internal server error'}), 500

@app.route('/api/audio', methods=['POST'])
def get_audio():
    try:
        data = request.get_json()
        language = data.get('language', '').lower()
        
        if not language:
            return jsonify({'error': 'Language is required'}), 400
        
        # Find audio URL for the specified language
        audio_doc = audio_collection.find_one({'language': language})
        
        if not audio_doc:
            return jsonify({'error': f'Audio not found for language: {language}'}), 404
        
        return jsonify({
            'audioUrl': audio_doc['audio_url'],
            'language': audio_doc['language']
        })
    
    except Exception as e:
        print(f"Error: {e}")
        return jsonify({'error': 'Internal server error'}), 500

@app.route('/api/audio', methods=['GET'])
def list_audio():
    try:
        audio_files = list(audio_collection.find({}, {'_id': 0}))
        return jsonify({'audio_files': audio_files})
    
    except Exception as e:
        print(f"Error: {e}")
        return jsonify({'error': 'Internal server error'}), 500

@app.route('/api/languages', methods=['GET'])
def get_languages():
    try:
        languages = audio_collection.distinct('language')
        language_data = []
        
        for lang in languages:
            audio_doc = audio_collection.find_one({'language': lang})
            language_data.append({
                'language': lang,
                'voice': audio_doc.get('voice', 'Unknown'),
                'available': True
            })
        
        return jsonify({'languages': language_data})
    
    except Exception as e:
        print(f"Error: {e}")
        return jsonify({'error': 'Internal server error'}), 500

@app.route('/api/tts-history', methods=['GET'])
def get_tts_history():
    try:
        tts_collection = db['tts_requests']
        history = list(tts_collection.find({}, {'_id': 0}).sort('created_at', -1).limit(50))
        
        return jsonify({
            'history': history,
            'total': len(history)
        })
    
    except Exception as e:
        print(f"Error: {e}")
        return jsonify({'error': 'Internal server error'}), 500

if __name__ == '__main__':
    init_db()
    app.run(debug=True, port=5000)