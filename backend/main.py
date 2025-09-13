from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from pymongo import MongoClient
import os
from datetime import datetime
from dotenv import load_dotenv
from audio_samples import get_sample_data_for_db, get_language_sample
from typing import Optional

load_dotenv()

app = FastAPI(
    title="ElevenLabs Clone API",
    description="Backend API for ElevenLabs clone with 10 language support",
    version="1.0.0"
)

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, specify your frontend domain
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# MongoDB connection
MONGO_URI = os.getenv('MONGO_URI', 'mongodb://localhost:27017/')
client = MongoClient(MONGO_URI)
db = client['elevenlabs_clone']
audio_collection = db['audio_files']
tts_collection = db['tts_requests']

# Pydantic models
class AudioRequest(BaseModel):
    language: str

class TTSRequest(BaseModel):
    text: str
    language: str

class AudioResponse(BaseModel):
    audioUrl: str
    language: str
    voice: Optional[str] = None
    description: Optional[str] = None

class LanguageInfo(BaseModel):
    language: str
    voice: str
    available: bool

# Initialize database with sample data
def init_db():
    if audio_collection.count_documents({}) == 0:
        sample_data = get_sample_data_for_db()
        audio_collection.insert_many(sample_data)
        print("Database initialized with sample data for 10 languages")

@app.on_event("startup")
async def startup_event():
    init_db()
    print("🚀 FastAPI server started successfully!")

@app.get("/")
async def root():
    return {
        "message": "ElevenLabs Clone API",
        "version": "1.0.0",
        "endpoints": {
            "/audio": "POST - Get audio URL for language",
            "/languages": "GET - Get all available languages",
            "/tts-history": "GET - Get TTS request history",
            "/health": "GET - Health check"
        }
    }

@app.get("/health")
async def health_check():
    try:
        # Test database connection
        audio_collection.find_one()
        return {
            "status": "healthy",
            "database": "connected",
            "timestamp": datetime.utcnow().isoformat()
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Database connection failed: {str(e)}")

@app.post("/api/audio", response_model=AudioResponse)
async def get_audio(request: AudioRequest):
    try:
        language = request.language.lower()
        
        if not language:
            raise HTTPException(status_code=400, detail="Language is required")
        
        # Find audio URL for the specified language
        audio_doc = audio_collection.find_one({'language': language})
        
        if not audio_doc:
            raise HTTPException(status_code=404, detail=f"Audio not found for language: {language}")
        
        return AudioResponse(
            audioUrl=audio_doc['audio_url'],
            language=audio_doc['language'],
            voice=audio_doc.get('voice'),
            description=audio_doc.get('description')
        )
    
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Internal server error: {str(e)}")

@app.post("/api/text-to-speech")
async def text_to_speech(request: TTSRequest):
    try:
        text = request.text
        language = request.language.lower()
        
        if not text or not language:
            raise HTTPException(status_code=400, detail="Text and language are required")
        
        # Find language configuration
        language_doc = audio_collection.find_one({'language': language})
        
        if not language_doc:
            raise HTTPException(status_code=404, detail=f"Language not supported: {language}")
        
        # Save TTS request to database
        tts_record = {
            'text': text,
            'language': language,
            'audio_url': language_doc['audio_url'],
            'voice': language_doc.get('voice', 'default'),
            'character_count': len(text),
            'created_at': datetime.utcnow().isoformat(),
            'status': 'completed'
        }
        
        result = tts_collection.insert_one(tts_record)
        
        return {
            'audioUrl': language_doc['audio_url'],
            'language': language,
            'textLength': len(text),
            'voice': language_doc.get('voice', 'default'),
            'requestId': str(result.inserted_id),
            'message': f'Text-to-speech generated for {language} ({len(text)} characters)'
        }
    
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Internal server error: {str(e)}")

@app.get("/api/languages")
async def get_languages():
    try:
        languages = audio_collection.distinct('language')
        language_data = []
        
        for lang in languages:
            audio_doc = audio_collection.find_one({'language': lang})
            language_data.append(LanguageInfo(
                language=lang,
                voice=audio_doc.get('voice', 'Unknown'),
                available=True
            ))
        
        return {'languages': language_data}
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Internal server error: {str(e)}")

@app.get("/api/tts-history")
async def get_tts_history():
    try:
        history = list(tts_collection.find({}, {'_id': 0}).sort('created_at', -1).limit(50))
        
        return {
            'history': history,
            'total': len(history)
        }
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Internal server error: {str(e)}")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)