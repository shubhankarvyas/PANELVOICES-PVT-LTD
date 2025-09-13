'use client'

import { Mic, Users, Music, MessageSquare, Copy, Volume2, Headphones } from 'lucide-react'

interface TabNavigationProps {
    activeTab: string
    setActiveTab: (tab: string) => void
}

const tabs = [
    { name: 'TEXT TO SPEECH', icon: Mic },
    { name: 'AGENTS', icon: Users },
    { name: 'MUSIC', icon: Music },
    { name: 'SPEECH TO TEXT', icon: MessageSquare },
    { name: 'DUBBING', icon: Copy },
    { name: 'VOICE CLONING', icon: Volume2 },
    { name: 'ELEVENREADER', icon: Headphones },
]

export default function TabNavigation({ activeTab, setActiveTab }: TabNavigationProps) {
    return (
        <div className="border-b border-gray-200">
            <nav className="flex space-x-8 overflow-x-auto">
                {tabs.map((tab) => {
                    const Icon = tab.icon
                    const isActive = activeTab === tab.name

                    return (
                        <button
                            key={tab.name}
                            onClick={() => setActiveTab(tab.name)}
                            className={`flex items-center space-x-2 py-4 px-2 border-b-2 font-medium text-sm whitespace-nowrap transition-colors ${isActive
                                    ? 'border-black text-black'
                                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                }`}
                        >
                            <Icon className="w-4 h-4" />
                            <span>{tab.name}</span>
                        </button>
                    )
                })}
            </nav>
        </div>
    )
}