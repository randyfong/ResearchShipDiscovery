#!/bin/bash

# Exit on error
set -e

echo "🚢 Initializing Research Vessel Discovery Backend..."

# Check for Python 3.11+
if ! command -v python3.11 &> /dev/null; then
    echo "❌ Python 3.11 is required but not found. Please install it."
    exit 1
fi

# Create virtual environment
echo "Creating virtual environment in 'venv'..."
python3.11 -m venv venv

# Activate virtual environment
echo "Activating virtual environment..."
source venv/bin/activate

# Upgrade pip
echo "Upgrading pip..."
pip install --upgrade pip

# Install dependencies
echo "Installing dependencies from requirements.txt..."
pip install -r requirements.txt

# Create .env if it doesn't exist
if [ ! -f .env ]; then
    echo "Creating .env template..."
    cat > .env << EOL
GEMINI_API_KEY=your_gemini_api_key_here
OPENAI_API_KEY=dummy_for_tool_validation
SERPER_API_KEY=your_serper_api_key_here
EOL
    echo "⚠️  Created .env template. Please update GEMINI_API_KEY in backend/.env"
fi

echo "✅ Backend installation complete!"
echo "🚀 To run the backend:"
echo "   source backend/venv/bin/activate"
echo "   python backend/main.py"
