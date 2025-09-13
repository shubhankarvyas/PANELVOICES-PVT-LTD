'use client'

import { useState, useRef, useEffect } from 'react'
import { Play, Download, ChevronDown } from 'lucide-react'

const sampleText = `In the ancient land of Eldoria, where skies shimmered and forests, whispered secrets to the wind, lived a dragon named Zephyros. [sarcastically] Not the "burn it all down" kind... [giggles] but he was gentle, wise, with eyes like old stars. [whispers] Even the birds fell silent when he passed.`

const voiceOptions = [
    { name: 'Somnus', type: 'Narrate a story', color: 'bg-blue-100 text-blue-800' },
    { name: 'Aria', type: '2 speakers', color: 'bg-pink-100 text-pink-800' },
    { name: 'Create a dialogue', type: '', color: 'bg-gray-100 text-gray-800' },
    { name: 'Announcer', type: '', color: 'bg-green-100 text-green-800' },
    { name: 'Voiceover a game', type: '', color: 'bg-purple-100 text-purple-800' },
    { name: 'Sergeant', type: '', color: 'bg-red-100 text-red-800' },
    { name: 'Play a different prompt', type: '', color: 'bg-yellow-100 text-yellow-800' },
]

const additionalOptions = [
    { name: 'Squish', type: 'Recount an old story', color: 'bg-blue-100 text-blue-800' },
    { name: 'Jessica', type: '', color: 'bg-pink-100 text-pink-800' },
    { name: 'Provide customer support', type: '', color: 'bg-gray-100 text-gray-800' },
]

export default function TextToSpeechPanel() {
    const [selectedLanguage, setSelectedLanguage] = useState('ENGLISH')
    const [isPlaying, setIsPlaying] = useState(false)
    const [text, setText] = useState(sampleText)
    const [showDropdown, setShowDropdown] = useState(false)
    const audioRef = useRef<HTMLAudioElement>(null)

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            const target = event.target as HTMLElement
            if (!target.closest('.relative')) {
                setShowDropdown(false)
            }
        }

        if (showDropdown) {
            document.addEventListener('mousedown', handleClickOutside)
            return () => document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [showDropdown])

    const languages = [
        { code: 'ENGLISH', flag: '🇺🇸', name: 'English' },
        { code: 'SPANISH', flag: '🇪🇸', name: 'Spanish' },
        { code: 'FRENCH', flag: '🇫🇷', name: 'French' },
        { code: 'GERMAN', flag: '🇩🇪', name: 'German' },
        { code: 'ITALIAN', flag: '🇮🇹', name: 'Italian' },
        { code: 'PORTUGUESE', flag: '🇵🇹', name: 'Portuguese' },
        { code: 'RUSSIAN', flag: '🇷🇺', name: 'Russian' },
        { code: 'JAPANESE', flag: '🇯🇵', name: 'Japanese' },
        { code: 'CHINESE', flag: '🇨🇳', name: 'Chinese' },
        { code: 'ARABIC', flag: '🇸🇦', name: 'Arabic' }
    ]

    const handlePlay = async () => {
        try {
            setIsPlaying(true)

            // Use Web Speech API for demo - actual spoken language samples
            if ('speechSynthesis' in window) {
                const utterance = new SpeechSynthesisUtterance()

                // Language-specific greetings
                const greetings = {
                    english: 'Hello, welcome to our platform',
                    spanish: 'Hola, bienvenido a nuestra plataforma',
                    french: 'Bonjour, bienvenue sur notre plateforme',
                    german: 'Hallo, willkommen auf unserer Plattform',
                    italian: 'Ciao, benvenuto sulla nostra piattaforma',
                    portuguese: 'Olá, bem-vindo à nossa plataforma',
                    russian: 'Привет, добро пожаловать на нашу платформу',
                    japanese: 'こんにちは、私たちのプラットフォームへようこそ',
                    chinese: '你好，欢迎来到我们的平台',
                    arabic: 'مرحبا، أهلا بك في منصتنا'
                }

                // Language codes for speech synthesis
                const languageCodes = {
                    english: 'en-US',
                    spanish: 'es-ES',
                    french: 'fr-FR',
                    german: 'de-DE',
                    italian: 'it-IT',
                    portuguese: 'pt-PT',
                    russian: 'ru-RU',
                    japanese: 'ja-JP',
                    chinese: 'zh-CN',
                    arabic: 'ar-SA'
                }

                const selectedLang = selectedLanguage.toLowerCase()
                utterance.text = greetings[selectedLang as keyof typeof greetings] || greetings.english
                utterance.lang = languageCodes[selectedLang as keyof typeof languageCodes] || 'en-US'
                utterance.rate = 0.9
                utterance.pitch = 1

                utterance.onend = () => setIsPlaying(false)
                utterance.onerror = () => setIsPlaying(false)

                speechSynthesis.speak(utterance)
            } else {
                // Fallback to API if speech synthesis not available
                const response = await fetch('/api/audio', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        language: selectedLanguage.toLowerCase()
                    }),
                })

                if (response.ok) {
                    const data = await response.json()
                    if (audioRef.current && data.audioUrl) {
                        audioRef.current.src = data.audioUrl
                        await audioRef.current.play()
                    }
                }
            }
        } catch (error) {
            console.error('Error playing audio:', error)
            setIsPlaying(false)
        }
    }

    const handleDownload = async () => {
        try {
            const response = await fetch('/api/audio', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    language: selectedLanguage.toLowerCase()
                }),
            })

            if (response.ok) {
                const data = await response.json()
                if (data.audioUrl) {
                    const link = document.createElement('a')
                    link.href = data.audioUrl
                    link.download = `${selectedLanguage.toLowerCase()}_sample.mp3`
                    link.click()
                }
            }
        } catch (error) {
            console.error('Error downloading audio:', error)
        }
    }

    return (
        <div className="mt-8 max-w-3xl mx-auto">
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
                {/* Text Editor */}
                <div className="p-6">
                    <textarea
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        className="w-full h-40 p-4 border border-gray-200 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-800 leading-relaxed text-sm"
                        placeholder="Enter your text here..."
                    />
                </div>

                {/* Voice Options */}
                <div className="px-6 pb-4">
                    <div className="flex flex-wrap gap-2 mb-3">
                        {voiceOptions.map((option, index) => (
                            <span
                                key={index}
                                className={`px-3 py-1 rounded-full text-xs font-medium ${option.color}`}
                            >
                                {option.name} {option.type && `• ${option.type}`}
                            </span>
                        ))}
                    </div>
                    <div className="flex flex-wrap gap-2">
                        {additionalOptions.map((option, index) => (
                            <span
                                key={index}
                                className={`px-3 py-1 rounded-full text-xs font-medium ${option.color}`}
                            >
                                {option.name} {option.type && `• ${option.type}`}
                            </span>
                        ))}
                    </div>
                </div>

                {/* Controls */}
                <div className="px-6 py-4 bg-gray-50 flex items-center justify-between rounded-b-xl relative">
                    <div className="flex items-center space-x-4">
                        {/* Language Dropdown - SIMPLE VERSION */}
                        <div className="relative z-50">
                            <button
                                onClick={() => {
                                    console.log('Dropdown clicked!')
                                    setShowDropdown(!showDropdown)
                                }}
                                className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-md bg-white hover:bg-gray-50 text-sm font-medium min-w-[160px] justify-between"
                            >
                                <span className="flex items-center space-x-2">
                                    <span className="text-lg">{languages.find(lang => lang.code === selectedLanguage)?.flag}</span>
                                    <span>{selectedLanguage}</span>
                                </span>
                                <ChevronDown className={`w-4 h-4 text-gray-500 transition-transform ${showDropdown ? 'rotate-180' : ''}`} />
                            </button>

                            {/* Simple Dropdown - NO PORTAL */}
                            {showDropdown && (
                                <div className="absolute top-full left-0 mt-1 w-full min-w-[200px] bg-white border border-gray-200 rounded-lg shadow-xl z-[9999] max-h-72 overflow-y-auto">
                                    {languages.map((language) => (
                                        <button
                                            key={language.code}
                                            onClick={() => {
                                                console.log('Language selected:', language.code)
                                                setSelectedLanguage(language.code)
                                                setShowDropdown(false)
                                            }}
                                            className={`w-full text-left px-4 py-3 hover:bg-blue-50 flex items-center space-x-3 text-sm transition-colors first:rounded-t-lg last:rounded-b-lg ${selectedLanguage === language.code ? 'bg-blue-50 text-blue-700 font-medium' : 'text-gray-700 hover:text-gray-900'
                                                }`}
                                        >
                                            <span className="text-lg">{language.flag}</span>
                                            <span>{language.name}</span>
                                            {selectedLanguage === language.code && (
                                                <span className="ml-auto text-blue-600">✓</span>
                                            )}
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="flex items-center space-x-3">
                        {/* Play Button */}
                        <button
                            onClick={handlePlay}
                            disabled={isPlaying}
                            className="flex items-center space-x-2 bg-black text-white px-6 py-2 rounded-full hover:bg-gray-800 transition-colors disabled:opacity-50 text-sm font-medium"
                        >
                            <Play className="w-4 h-4 fill-white" />
                            <span>{isPlaying ? 'Playing...' : 'PLAY'}</span>
                        </button>

                        {/* Download Button */}
                        <button
                            onClick={handleDownload}
                            className="p-2 border border-gray-300 rounded-full hover:bg-gray-50 transition-colors"
                        >
                            <Download className="w-4 h-4 text-gray-600" />
                        </button>
                    </div>
                </div>

                {/* Hidden audio element */}
                <audio
                    ref={audioRef}
                    onEnded={() => setIsPlaying(false)}
                    onError={() => setIsPlaying(false)}
                />
            </div>

            {/* Bottom section */}
            <div className="mt-8 text-center">
                <p className="text-sm text-gray-500 mb-4">Powered by Eleven v3 (alpha)</p>
                <div className="bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 rounded-xl p-6 text-white">
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                        <span className="font-medium text-lg">EXPERIENCE THE FULL AUDIO AI PLATFORM</span>
                        <button className="bg-black text-white px-6 py-3 rounded-full font-medium hover:bg-gray-800 transition-colors">
                            SIGN UP
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}