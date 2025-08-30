# 🎙️ Voice Shopping Assistant 🛒

A voice-controlled shopping list web app built with React + Vite using the Web Speech API.
Supports multilingual commands (English, Hindi, Spanish), smart suggestions, and product search with filters.

## 📑 Assignment Deliverables
### 1. Working Application URL

 👉 Netlify Live Link: https://voice-shopping-assistant.netlify.app

### 2. GitHub Repository

 👉 GitHub Repo Link: https://github.com/aakashschauhan/voice-shopping-assistant

### 3. Brief Write-up of Approach

I developed the Voice Shopping Assistant as a React + Vite single-page application using the Web Speech API for voice recognition. The app supports multilingual input (English, Hindi, Spanish) and parses natural commands like “add milk,” “remove bread,” or “find organic apples under 200.”

For NLP, I implemented a lightweight parser to extract intents such as add_item, remove_item, set_quantity, clear_list, and search_item. Each recognized item is auto-categorized (Dairy, Produce, Beverages, etc.) and stored in the shopping list with quantity controls. Data persistence is handled using browser localStorage to retain history across sessions.

The app also provides smart suggestions:

Frequent items (based on history)

Seasonal produce (month-wise)

Substitutes (e.g., almond milk for milk)

For UI, I designed a minimal, responsive interface with real-time feedback, showing recognized commands, search results, and quick-add options. Deployment was done on Netlify for easy public access, while the complete source code and documentation are maintained in a GitHub repository.

This approach ensures a smooth user experience, combining voice interaction, smart recommendations, and lightweight deployment without requiring a backend.

### 🛠️ Tech Stack

- React + Vite

- Web Speech API (browser-native voice recognition)

- LocalStorage for history persistence

- Netlify for hosting

### ⚡ Quick Start (Local Setup)
### 1. Clone repository
git clone https://github.com/aakashschauhan/voice-shopping-assistant.git
cd voice-shopping-assistant

### 2. Install dependencies
npm install

### 3. Run development server
npm run dev

### 🎯 Example Voice Commands

- add 2 bottles of water

- remove bread

- find organic apples under 200

- search brand colgate toothpaste under 150

- clear list

### 📑 Submission Info

- Student: Aakash Singh Chauhan

- Roll Number: 2201640100003

- Assignment: Voice Command Shopping Assistant (Set 2 – Assignment 1)

### 📜 License

MIT © 2025
