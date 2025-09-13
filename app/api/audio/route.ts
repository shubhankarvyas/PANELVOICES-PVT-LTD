import { NextRequest, NextResponse } from 'next/server'

// Demo spoken language samples - using different audio files to simulate different languages
// In production, these would be actual human speech samples in each language
const audioUrls = {
    english: 'https://www.soundjay.com/misc/sounds/bell-ringing-05.wav', // Represents English sample
    spanish: 'https://www.learningcontainer.com/wp-content/uploads/2020/02/Kalimba.mp3', // Represents Spanish sample  
    french: 'https://www.soundjay.com/misc/sounds/bell-ringing-04.wav', // Represents French sample
    german: 'https://www.learningcontainer.com/wp-content/uploads/2020/02/Kalimba.mp3', // Represents German sample
    italian: 'https://www.soundjay.com/misc/sounds/bell-ringing-05.wav', // Represents Italian sample
    portuguese: 'https://www.learningcontainer.com/wp-content/uploads/2020/02/Kalimba.mp3', // Represents Portuguese sample
    russian: 'https://www.soundjay.com/misc/sounds/bell-ringing-04.wav', // Represents Russian sample
    japanese: 'https://www.learningcontainer.com/wp-content/uploads/2020/02/Kalimba.mp3', // Represents Japanese sample
    chinese: 'https://www.soundjay.com/misc/sounds/bell-ringing-05.wav', // Represents Chinese sample
    arabic: 'https://www.learningcontainer.com/wp-content/uploads/2020/02/Kalimba.mp3' // Represents Arabic sample
}

const supportedLanguages = Object.keys(audioUrls)

export async function POST(request: NextRequest) {
    try {
        const { language } = await request.json()

        // Validate language
        if (!language || !supportedLanguages.includes(language.toLowerCase())) {
            return NextResponse.json(
                { error: `Invalid language. Supported languages: ${supportedLanguages.join(', ')}` },
                { status: 400 }
            )
        }

        const audioUrl = audioUrls[language.toLowerCase() as keyof typeof audioUrls]

        if (!audioUrl) {
            return NextResponse.json(
                { error: 'Audio not found for the specified language' },
                { status: 404 }
            )
        }

        return NextResponse.json({ audioUrl })
    } catch (error) {
        console.error('Error in audio API:', error)
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        )
    }
}