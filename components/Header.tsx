'use client'

import { ChevronDown } from 'lucide-react'

export default function Header() {
    return (
        <header className="bg-white border-b border-gray-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    {/* Logo */}
                    <div className="flex items-center">
                        <span className="text-xl font-bold text-black">ElevenLabs</span>
                    </div>

                    {/* Navigation */}
                    <nav className="hidden md:flex items-center space-x-8">
                        <div className="flex items-center space-x-1 text-gray-700 hover:text-gray-900 cursor-pointer">
                            <span>Creative Platform</span>
                            <ChevronDown className="w-4 h-4" />
                        </div>
                        <div className="flex items-center space-x-1 text-gray-700 hover:text-gray-900 cursor-pointer">
                            <span>Agents Platform</span>
                            <ChevronDown className="w-4 h-4" />
                        </div>
                        <div className="flex items-center space-x-1 text-gray-700 hover:text-gray-900 cursor-pointer">
                            <span>Developers</span>
                            <ChevronDown className="w-4 h-4" />
                        </div>
                        <div className="flex items-center space-x-1 text-gray-700 hover:text-gray-900 cursor-pointer">
                            <span>Resources</span>
                            <ChevronDown className="w-4 h-4" />
                        </div>
                        <span className="text-gray-700 hover:text-gray-900 cursor-pointer">Enterprise</span>
                        <span className="text-gray-700 hover:text-gray-900 cursor-pointer">Pricing</span>
                    </nav>

                    {/* Auth buttons */}
                    <div className="flex items-center space-x-4">
                        <button className="text-gray-700 hover:text-gray-900 font-medium">
                            Log in
                        </button>
                        <button className="bg-black text-white px-4 py-2 rounded-md font-medium hover:bg-gray-800 transition-colors">
                            Sign up
                        </button>
                    </div>
                </div>
            </div>
        </header>
    )
}