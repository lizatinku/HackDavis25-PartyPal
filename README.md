# 🥳 PartyPal - The safer, smarter way to party.

PartyPal is your campus companion for finding lit parties, events and life-saving resources, all in one map-based React Native app. Built at HackDavis 2025, it’s designed for college students who want to turn up without tripping up.

## 🚀 Features
- 🎉 Party Discovery: See upcoming events with date, location, and vibe.
- 🍻 Smart Filters: Toggle icons for alcohol, weed, Narcan availability, and more.
- 🧠 Harm Reduction First: Map also shows police, ERs, and substance support centers.
- 🧭 Geolocation Aware: Only shows what’s near you (distance filters from 5 to 50 miles).
- 📍 Map-based UI: Cluster-free, zoomable, and icon-rich with real event pins.
- ⚡ Live Add Events: Submit events via in-app form — instantly syncs to Supabase backend.
- 🖼️ Custom Emojis & Icons: Replaces basic checkboxes with aesthetic icons like alc-icon.png, narcan-icon-selected.png, and more.


## 🧪 How It Works
### 🔍 Events Fetch
Events are pulled from Supabase, then filtered based on:
- Distance (via Haversine formula)
- Toggle filters (alcohol, narcan, weed, etc.)
- Search query

## 🧭 Map Markers
### Pins are rendered by category:
- 🎉 for parties
- 💊 for Narcan
- 🚑 for ERs
- 🚓 for Police and Saferide
- 🩹 for rehab & alcohol safety

Sidebar toggles visibility without re-centering the map — perfect for judging at a glance. Zoom controls allow manual precision.

# ⚡ Local Setup
````
git clone https://github.com/yourusername/partypal.git
cd partypal
npm install
npx expo start
````

#### 📦 Required .env
Make sure you have your Supabase URL and Anon Key set up in .env or lib/supabase.ts.


## 🙌 Team
Built by:
- 👩‍💻 Liza Tinku Jose: Full-stack dev
- 🎨 Tyler Bernshteyn & Elysia Touami: Two amazing designers who made the app pop visually
