// 🚀 Script để đăng ký Slash Commands với Discord
require('dotenv').config();
const { REST, Routes } = require('discord.js');
const fs = require('fs');
const path = require('path');

const commands = [];
const commandsPath = path.join(__dirname, 'commands');
const commandFolders = fs.readdirSync(commandsPath);

// Load tất cả commands
for (const folder of commandFolders) {
    const folderPath = path.join(commandsPath, folder);
    const commandFiles = fs.readdirSync(folderPath).filter(file => file.endsWith('. js'));
    
    for (const file of commandFiles) {
        const command = require(path. join(folderPath, file));
        if ('data' in command) {
            commands. push(command.data. toJSON());
        }
    }
}

const rest = new REST({ version: '10' }). setToken(process. env.DISCORD_TOKEN);

(async () => {
    try {
        console.log(`🔄 Đang đăng ký ${commands. length} commands...`);

        // Đăng ký global commands
        await rest.put(
            Routes.applicationCommands(process.env.CLIENT_ID),
            { body: commands },
        );

        console. log('✅ Đã đăng ký commands thành công!');
    } catch (error) {
        console.error('❌ Lỗi:', error);
    }
})();