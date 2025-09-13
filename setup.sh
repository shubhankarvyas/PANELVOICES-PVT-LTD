#!/bin/bash

echo "🚀 Setting up ElevenLabs Clone..."

# Install frontend dependencies
echo "📦 Installing frontend dependencies..."
npm install

# Setup backend
echo "🐍 Setting up backend..."
cd backend

# Create virtual environment
python3 -m venv venv
source venv/bin/activate

# Install Python dependencies
pip install -r requirements.txt

# Create .env file if it doesn't exist
if [ ! -f .env ]; then
    cp .env.example .env
    echo "📝 Created .env file. Please update it with your MongoDB connection string."
fi

cd ..

echo "✅ Setup complete!"
echo ""
echo "To start the application:"
echo "1. Frontend: npm run dev"
echo "2. Backend: cd backend && source venv/bin/activate && python app.py"
echo ""
echo "Frontend will be available at: http://localhost:3000"
echo "Backend will be available at: http://localhost:5000"