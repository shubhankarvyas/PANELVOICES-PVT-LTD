// Simple test to verify the project setup
console.log('🧪 Testing ElevenLabs Clone Setup...')

// Test 1: Check if package.json exists and has required dependencies
try {
    const packageJson = require('./package.json')
    console.log('✅ package.json found')
    
    const requiredDeps = ['next', 'react', 'tailwindcss', 'lucide-react']
    const missingDeps = requiredDeps.filter(dep => !packageJson.dependencies[dep])
    
    if (missingDeps.length === 0) {
        console.log('✅ All required dependencies found')
    } else {
        console.log('❌ Missing dependencies:', missingDeps)
    }
} catch (error) {
    console.log('❌ package.json not found or invalid')
}

// Test 2: Check if main components exist
const fs = require('fs')
const path = require('path')

const requiredFiles = [
    'app/page.tsx',
    'app/layout.tsx',
    'components/Header.tsx',
    'components/HeroSection.tsx',
    'components/TabNavigation.tsx',
    'components/TextToSpeechPanel.tsx',
    'app/api/audio/route.ts'
]

requiredFiles.forEach(file => {
    if (fs.existsSync(path.join(__dirname, file))) {
        console.log(`✅ ${file} exists`)
    } else {
        console.log(`❌ ${file} missing`)
    }
})

console.log('\n🚀 Setup verification complete!')
console.log('Run "npm install" then "npm run dev" to start the application')