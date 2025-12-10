// 🎵 Discord Music Bot - Entry Point
// Bot nhạc Discord thông minh, hiện đại

require('dotenv').config();
const { Client, GatewayIntentBits, Collection } = require('discord.js');
const { Player } = require('discord-player');
const express = require('express');
const fs = require('fs');
const path = require('path');

// ========================
// 🤖 KHỞI TẠO DISCORD CLIENT
// ========================
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildVoiceStates,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
    ],
});

// Collection để lưu commands
client.commands = new Collection();

// ========================
// 🎵 KHỞI TẠO MUSIC PLAYER
// ========================
const player = new Player(client);

// Load extractors cho YouTube, Spotify
const { SpotifyExtractor, SoundCloudExtractor, YoutubeExtractor, AppleMusicExtractor } = require('@discord-player/extractor');
const playdl = require('play-dl');

player.extractors.register(YoutubeExtractor, {});
player.extractors.register(SpotifyExtractor, {
    createStream: (q) => playdl.stream(q, {
        quality: 1
    })
});
player.extractors.register(SoundCloudExtractor, {});
player.extractors.register(AppleMusicExtractor, {});

// ========================
// 📁 LOAD COMMANDS
// ========================
const commandsPath = path.join(__dirname, 'commands');
const commandFolders = fs.readdirSync(commandsPath);

for (const folder of commandFolders) {
    const folderPath = path.join(commandsPath, folder);
    const commandFiles = fs.readdirSync(folderPath).filter(file => file.endsWith('.js'));

    for (const file of commandFiles) {
        const filePath = path.join(folderPath, file);
        const command = require(filePath);

        if ('data' in command && 'execute' in command) {
            client.commands.set(command.data.name, command);
            console.log(`✅ Loaded command: ${command.data.name}`);
        }
    }
}

// ========================
// 📡 LOAD EVENTS
// ========================
const eventsPath = path.join(__dirname, 'events');
const eventFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith('.js'));

for (const file of eventFiles) {
    const filePath = path.join(eventsPath, file);
    const event = require(filePath);

    if (event.once) {
        client.once(event.name, (...args) => event.execute(...args, player));
    } else {
        client.on(event.name, (...args) => event.execute(...args, player));
    }
}

// ========================
// 🎶 PLAYER EVENTS
// ========================
player.events.on('playerStart', (queue, track) => {
    const embed = {
        color: 0x00ff00,
        title: '🎵 Đang phát',
        description: `**[${track.title}](${track.url})**`,
        thumbnail: { url: track.thumbnail },
        fields: [
            { name: '👤 Ca sĩ', value: track.author, inline: true },
            { name: '⏱️ Thời lượng', value: track.duration, inline: true },
            { name: '🎧 Yêu cầu bởi', value: `${track.requestedBy}`, inline: true },
        ],
        footer: { text: '🎵 Discord Music Bot' },
        timestamp: new Date().toISOString(),
    };

    queue.metadata.channel.send({ embeds: [embed] });
});

player.events.on('audioTrackAdd', (queue, track) => {
    queue.metadata.channel.send(`✅ Đã thêm **${track.title}** vào hàng đợi!`);
});

player.events.on('emptyQueue', (queue) => {
    queue.metadata.channel.send('📭 Hàng đợi đã hết!  Bot sẽ rời kênh sau 5 phút nếu không có bài mới.');
});

player.events.on('emptyChannel', (queue) => {
    queue.metadata.channel.send('👋 Không có ai trong kênh voice. Bot đã rời đi! ');
});

player.events.on('error', (queue, error) => {
    console.error(`❌ Player Error: ${error.message}`);
    queue.metadata.channel.send(`❌ Có lỗi xảy ra: ${error.message}`);
});

// ========================
// 🌐 HEALTH CHECK SERVER (cho Railway)
// ========================
const app = express();
const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
    res.json({
        status: 'online',
        bot: client.user?.tag || 'Đang khởi động...',
        uptime: process.uptime(),
        guilds: client.guilds.cache.size,
    });
});

app.get('/health', (req, res) => {
    res.status(200).send('OK');
});

app.listen(PORT, () => {
    console.log(`🌐 Health check server đang chạy tại port ${PORT}`);
});

// ========================
// 🔄 XỬ LÝ LỖI & GRACEFUL SHUTDOWN
// ========================
process.on('unhandledRejection', (error) => {
    console.error('❌ Unhandled Rejection:', error);
});

process.on('uncaughtException', (error) => {
    console.error('❌ Uncaught Exception:', error);
});

// Graceful shutdown
process.on('SIGTERM', () => {
    console.log('👋 Nhận SIGTERM, đang tắt bot...');
    client.destroy();
    process.exit(0);
});

process.on('SIGINT', () => {
    console.log('👋 Nhận SIGINT, đang tắt bot...');
    client.destroy();
    process.exit(0);
});

// ========================
// 🚀 ĐĂNG NHẬP BOT
// ========================
client.login(process.env.DISCORD_TOKEN);