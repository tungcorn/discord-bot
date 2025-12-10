# 🎵 Discord Music Bot

A modern Discord music bot with YouTube, Spotify, SoundCloud support (theoretically).

![Discord.js](https://img.shields.io/badge/Discord.js-v14-blue)
![Node.js](https://img.shields.io/badge/Node.js-18+-green)
![License](https://img.shields.io/badge/License-MIT-yellow)

---

## ⚠️ PROJECT STATUS: SUSPENDED

### What Works
- ✅ Bot comes online on Discord
- ✅ Responds to `/ping`, `/help` commands
- ✅ Joins Voice Channel successfully
- ✅ Adds songs to queue (displays embed)

### What Doesn't Work
- ❌ **Cannot play audio** - YouTube has blocked most free libraries

---

## 🛠️ Libraries Attempted

| Library | Result |
|---------|--------|
| `discord-player` + `@discord-player/extractor` | ❌ ERR_NO_RESULT |
| `discord-player-youtubei` | ❌ Parser errors, skips all tracks |
| `play-dl` | ❌ No results found |
| `ffmpeg-static` + `@discordjs/opus` | ✅ Installed, but no audio |

**All attempts failed** due to YouTube API changes and blocking of free scraping libraries.

---

## 🔧 Possible Solutions (Not Implemented)

| Solution | Difficulty | Stability |
|----------|------------|-----------|
| **Lavalink + Java** | ⭐⭐⭐ Hard | ✅ 100% stable |
| **Use existing bots** (Chip, Hydra) | ⭐ Easy | ✅ 100% stable |
| **Wait for library updates** | - | ❓ Unknown |

---

## ✨ Features (If Working)

- 🎶 Play music from YouTube, Spotify
- 📋 Smart queue system
- 🔀 Shuffle, Loop, Volume control
- 🎨 Modern Slash Commands
- 📊 Progress bar, beautiful Now Playing embed
- 🚀 Optimized for Railway (Free Hosting)
- 🔄 Auto-reconnect, Error handling

## 📋 Commands

| Command | Description |
|---------|-------------|
| `/play <query>` | Play music from name or URL |
| `/pause` | Pause music |
| `/resume` | Resume playback |
| `/stop` | Stop and clear queue |
| `/skip` | Skip current track |
| `/queue` | View queue |
| `/nowplaying` | View current track |
| `/volume <0-100>` | Adjust volume |
| `/loop <mode>` | Loop mode |
| `/shuffle` | Shuffle queue |
| `/leave` | Bot leaves voice channel |
| `/ping` | Check latency |
| `/help` | View help |

## 🛠️ Installation

### Step 1: Create Discord Bot

1. Go to [Discord Developer Portal](https://discord.com/developers/applications)
2. Click **"New Application"** → Name your bot
3. Go to **"Bot"** tab → Click **"Add Bot"**
4. Copy **Token** (keep it secret!)
5. Enable **Privileged Gateway Intents**:
   - `PRESENCE INTENT`
   - `SERVER MEMBERS INTENT`
   - `MESSAGE CONTENT INTENT`
6. Go to **"OAuth2"** → **"URL Generator"**:
   - Scopes: `bot`, `applications.commands`
   - Bot Permissions: `Administrator`
7. Copy URL and invite bot to server

### Step 2: Local Setup

```bash
# Clone repository
git clone https://github.com/TungCorn/discord-bot.git
cd discord-bot

# Install dependencies
npm install

# Create .env file
copy .env.example .env
# Fill in DISCORD_TOKEN and CLIENT_ID

# Register slash commands
npm run deploy

# Run bot
npm start
```

### Step 3: Deploy to Railway (Optional)

1. Create account at [Railway](https://railway.app/)
2. Click **"New Project"** → **"Deploy from GitHub repo"**
3. Select `discord-bot` repository
4. Add environment variables: `DISCORD_TOKEN`, `CLIENT_ID`
5. **Auto deploy!** 🎉

## 🔐 Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `DISCORD_TOKEN` | Discord Bot Token | ✅ |
| `CLIENT_ID` | Bot Client ID | ✅ |
| `PORT` | Health check port | ❌ (default: 3000) |

## 📂 Project Structure

```
discord-bot/
├── src/
│   ├── index.js              # Entry point
│   ├── deploy-commands.js    # Commands registration
│   ├── commands/
│   │   ├── music/            # Music commands
│   │   └── utility/          # Utility commands
│   ├── events/               # Discord events
│   └── utils/                # Utility functions
├── .env.example
├── package.json
├── railway.json
├── Dockerfile
└── README.md
```

## ❓ FAQ

**Q: Will this project be updated?**  
A: Maybe, if free libraries find a workaround for YouTube blocking.

**Q: Should I use this code?**  
A: Only for learning purposes. For production, use Lavalink or existing bots.

**Q: Can I contribute?**  
A: Yes! If you find a working solution, PRs are welcome!

## 📄 License

MIT License - Free to use and modify!

---

**Made with ❤️ by TungCorn**