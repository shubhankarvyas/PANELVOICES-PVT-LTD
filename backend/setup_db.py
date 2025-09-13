#!/usr/bin/env python3
"""
Database setup script for ElevenLabs Clone
This script initializes MongoDB with sample audio data for 10 languages
"""

from pymongo import MongoClient
import os
from dotenv import load_dotenv

load_dotenv()

def setup_database():
    # MongoDB connection
    MONGO_URI = os.getenv('MONGO_URI', 'mongodb://localhost:27017/')
    client = MongoClient(MONGO_URI)
    db = client['elevenlabs_clone']
    audio_collection = db['audio_files']
    
    # Clear existing data
    audio_collection.delete_many({})
    print("Cleared existing data...")
    
    # Sample data for all 10 languages
    sample_data = [
        {
            'language': 'english',
            'audio_url': 'https://www.learningcontainer.com/wp-content/uploads/2020/02/Kalimba.mp3',
            'text': 'In the ancient land of Eldoria, where skies shimmered and forests whispered secrets to the wind, lived a dragon named Zephyros.',
            'voice': 'Somnus',
            'created_at': '2024-01-01T00:00:00Z'
        },
        {
            'language': 'spanish',
            'audio_url': 'https://www.soundjay.com/misc/sounds/bell-ringing-05.wav',
            'text': 'En la antigua tierra de Eldoria, donde los cielos brillaban y los bosques susurraban secretos al viento, vivía un dragón llamado Zephyros.',
            'voice': 'Aria',
            'created_at': '2024-01-01T00:00:00Z'
        },
        {
            'language': 'french',
            'audio_url': 'https://www.learningcontainer.com/wp-content/uploads/2020/02/Kalimba.mp3',
            'text': 'Dans l\'ancienne terre d\'Eldoria, où les cieux scintillaient et les forêts chuchotaient des secrets au vent, vivait un dragon nommé Zephyros.',
            'voice': 'Jessica',
            'created_at': '2024-01-01T00:00:00Z'
        },
        {
            'language': 'german',
            'audio_url': 'https://www.soundjay.com/misc/sounds/bell-ringing-05.wav',
            'text': 'Im alten Land Eldoria, wo Himmel schimmerten und Wälder Geheimnisse dem Wind zuflüsterten, lebte ein Drache namens Zephyros.',
            'voice': 'Announcer',
            'created_at': '2024-01-01T00:00:00Z'
        },
        {
            'language': 'italian',
            'audio_url': 'https://www.learningcontainer.com/wp-content/uploads/2020/02/Kalimba.mp3',
            'text': 'Nell\'antica terra di Eldoria, dove i cieli luccicavano e le foreste sussurravano segreti al vento, viveva un drago di nome Zephyros.',
            'voice': 'Sergeant',
            'created_at': '2024-01-01T00:00:00Z'
        },
        {
            'language': 'portuguese',
            'audio_url': 'https://www.soundjay.com/misc/sounds/bell-ringing-05.wav',
            'text': 'Na antiga terra de Eldoria, onde os céus cintilavam e as florestas sussurravam segredos ao vento, vivia um dragão chamado Zephyros.',
            'voice': 'Squish',
            'created_at': '2024-01-01T00:00:00Z'
        },
        {
            'language': 'russian',
            'audio_url': 'https://www.learningcontainer.com/wp-content/uploads/2020/02/Kalimba.mp3',
            'text': 'В древней земле Эльдория, где небеса мерцали, а леса шептали секреты ветру, жил дракон по имени Зефирос.',
            'voice': 'Somnus',
            'created_at': '2024-01-01T00:00:00Z'
        },
        {
            'language': 'japanese',
            'audio_url': 'https://www.soundjay.com/misc/sounds/bell-ringing-05.wav',
            'text': '空がきらめき、森が風に秘密をささやく古代の地エルドリアに、ゼフィロスという名の竜が住んでいました。',
            'voice': 'Aria',
            'created_at': '2024-01-01T00:00:00Z'
        },
        {
            'language': 'chinese',
            'audio_url': 'https://www.learningcontainer.com/wp-content/uploads/2020/02/Kalimba.mp3',
            'text': '在古老的埃尔多利亚大地上，天空闪闪发光，森林向风低语着秘密，住着一条名叫泽菲罗斯的龙。',
            'voice': 'Jessica',
            'created_at': '2024-01-01T00:00:00Z'
        },
        {
            'language': 'arabic',
            'audio_url': 'https://www.soundjay.com/misc/sounds/bell-ringing-05.wav',
            'text': 'في أرض إلدوريا القديمة، حيث تتلألأ السماء وتهمس الغابات بالأسرار للرياح، عاش تنين يُدعى زيفيروس.',
            'voice': 'Announcer',
            'created_at': '2024-01-01T00:00:00Z'
        }
    ]
    
    # Insert sample data
    result = audio_collection.insert_many(sample_data)
    print(f"✅ Inserted {len(result.inserted_ids)} audio records")
    
    # Create indexes for better performance
    audio_collection.create_index("language")
    audio_collection.create_index("voice")
    print("✅ Created database indexes")
    
    # Verify data
    count = audio_collection.count_documents({})
    languages = audio_collection.distinct('language')
    
    print(f"\n📊 Database Summary:")
    print(f"   Total records: {count}")
    print(f"   Languages: {', '.join(languages)}")
    print(f"   MongoDB URI: {MONGO_URI}")
    
    client.close()
    print("\n🎉 Database setup complete!")

if __name__ == "__main__":
    setup_database()