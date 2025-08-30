# Voice Shopping Assistant

A voice-based shopping list manager with smart suggestions. Built with React + Vite and the Web Speech API for speech recognition.

## Features
- 🎙️ **Voice Commands**: add/remove items, set quantities, search products by voice (brand, organic, price under).
- 🌐 **Multilingual**: Switch mic language (English `en-US`, Hindi `hi-IN`, Spanish `es-ES`).
- 🧠 **Smart Suggestions**: Frequent items from your local history, seasonal picks by month, and substitutes for last added item.
- 🧾 **List Management**: Categorization (dairy/produce/etc), quantity controls, clear list.
- 🔎 **Voice-Activated Search**: Filters a sample product catalog (brand/organic/price).

## Quick Start (Local)
1. Install dependencies:
   ```bash
   npm i
   ```
2. Run the dev server:
   ```bash
   npm run dev
   ```
3. Open the URL shown (usually `http://localhost:5173`). Allow microphone access.

> Tip: The Web Speech API works best in Chrome/Edge. Firefox may not support recognition yet.

## Example Voice Commands
- "add milk" / "add 2 bottles of water"
- "remove bread"
- "find organic apples under 200"
- "search brand colgate toothpaste under 150"
- "clear list"

## Deploy (Firebase Hosting)
1. Install the Firebase CLI:
   ```bash
   npm i -g firebase-tools
   ```
2. Login and init (choose Hosting only):
   ```bash
   firebase login
   firebase init hosting
   # Use existing project or create one, set `dist` as the public directory, SPA: Yes
   ```
3. Build & deploy:
   ```bash
   npm run build
   firebase deploy
   ```

## Tech
- React + Vite
- Web Speech API
- No backend required (data saved to `localStorage`); simple JSON catalogs included.

## License
MIT
