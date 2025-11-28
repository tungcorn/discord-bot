# 🎵 Discord Music Bot

Bot nhạc Discord thông minh, hiện đại - Hỗ trợ YouTube, Spotify, SoundCloud! 

![Discord. js](https://img.shields.io/badge/Discord.js-v14-blue)
![Node.js](https://img. shields.io/badge/Node.js-18+-green)
![License](https://img. shields.io/badge/License-MIT-yellow)

## ✨ Tính năng

- 🎶 Phát nhạc từ YouTube, Spotify, SoundCloud
- 📋 Hệ thống hàng đợi thông minh
- 🔀 Shuffle, Loop, Volume control
- 🎨 Slash Commands hiện đại
- 📊 Progress bar, Now Playing embed đẹp
- 🚀 Tối ưu cho Railway (Free Hosting)
- 🔄 Auto-reconnect, Error handling

## 📋 Danh sách Commands

| Command | Mô tả |
|---------|-------|
| `/play <query>` | Phát nhạc từ tên bài hoặc URL |
| `/pause` | Tạm dừng nhạc |
| `/resume` | Tiếp tục phát |
| `/stop` | Dừng và xóa queue |
| `/skip` | Bỏ qua bài hiện tại |
| `/queue` | Xem hàng đợi |
| `/nowplaying` | Xem bài đang phát |
| `/volume <0-100>` | Điều chỉnh âm lượng |
| `/loop <mode>` | Chế độ lặp |
| `/shuffle` | Xáo trộn queue |
| `/leave` | Bot rời kênh voice |
| `/ping` | Kiểm tra độ trễ |
| `/help` | Xem hướng dẫn |

## 🛠️ Hướng dẫn cài đặt

### Bước 1: Tạo Discord Bot

1. Truy cập [Discord Developer Portal](https://discord.com/developers/applications)
2. Click **"New Application"** → Đặt tên cho bot
3. Vào tab **"Bot"** → Click **"Add Bot"**
4. Copy **Token** (giữ bí mật!)
5. Bật các **Privileged Gateway Intents**:
   - `PRESENCE INTENT`
   - `SERVER MEMBERS INTENT`
   - `MESSAGE CONTENT INTENT`
6. Vào tab **"OAuth2"** → **"URL Generator"**:
   - Scopes: `bot`, `applications. commands`
   - Bot Permissions: `Administrator` (hoặc chọn quyền cụ thể)
7. Copy URL và mời bot vào server

### Bước 2: Setup Local (Development)

```bash
# Clone repository
git clone https://github.com/TungCorn/discord-bot.git
cd discord-bot

# Cài đặt dependencies
npm install

# Tạo file .env
cp .env. example .env
# Điền DISCORD_TOKEN và CLIENT_ID vào file .env

# Đăng ký slash commands
npm run deploy

# Chạy bot
npm start
```

### Bước 3: Deploy lên Railway (Free Hosting)

1. **Tạo tài khoản** [Railway](https://railway.app/)
2. Click **"New Project"** → **"Deploy from GitHub repo"**
3.  Chọn repository `discord-bot`
4. Vào **"Variables"** → Thêm:
   - `DISCORD_TOKEN` = token của bot
   - `CLIENT_ID` = client id của bot
5.  **Deploy tự động! ** 🎉

### 🔐 Environment Variables

| Variable | Mô tả | Bắt buộc |
|----------|-------|----------|
| `DISCORD_TOKEN` | Token của Discord Bot | ✅ |
| `CLIENT_ID` | Client ID của Bot | ✅ |
| `PORT` | Port cho health check | ❌ (mặc định: 3000) |

## 📂 Cấu trúc thư mục

```
discord-bot/
├── src/
│   ├── index.js              # Entry point
│   ├── deploy-commands.js    # Script đăng ký commands
│   ├── commands/
│   │   ├── music/            # Các lệnh nhạc
│   │   └── utility/          # Các lệnh tiện ích
│   ├── events/               # Discord events
│   └── utils/                # Utility functions
├── . env.example
├── package.json
├── railway.json              # Railway config
├── Dockerfile
└── README.md
```

## ❓ FAQ

**Q: Bot không phản hồi lệnh? **
A: Chạy `npm run deploy` để đăng ký slash commands. 

**Q: Bot không phát được nhạc?**
A: Kiểm tra bot có quyền `Connect` và `Speak` trong voice channel.

**Q: Railway hết giờ miễn phí?**
A: Free tier có 500 giờ/tháng.  Có thể upgrade lên Hobby ($5/tháng) để unlimited. 

## 📄 License

MIT License - Tự do sử dụng và chỉnh sửa! 

## 💖 Hỗ trợ

Nếu thấy hữu ích, hãy ⭐ star repo này nhé!