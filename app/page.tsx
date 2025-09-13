'use client'

import { useState } from 'react'
import Header from '@/components/Header'
import HeroSection from '@/components/HeroSection'
import TabNavigation from '@/components/TabNavigation'
import TextToSpeechPanel from '@/components/TextToSpeechPanel'

export default function Home() {
    const [activeTab, setActiveTab] = useState('TEXT TO SPEECH')

    return (
        <main className="min-h-screen bg-white">
            <Header />
            <HeroSection />
            <div className="max-w-6xl mx-auto px-4 py-8">
                <TabNavigation activeTab={activeTab} setActiveTab={setActiveTab} />
                {activeTab === 'TEXT TO SPEECH' && <TextToSpeechPanel />}
                {activeTab !== 'TEXT TO SPEECH' && (
                    <div className="mt-8 p-8 text-center text-gray-500">
                        Content for {activeTab} tab coming soon...
                    </div>
                )}
            </div>
        </main>
    )
}