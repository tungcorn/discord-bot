// 📡 Event khi bot sẵn sàng
module.exports = {
    name: 'ready',
    once: true,
    execute(client) {
        console.log('═══════════════════════════════════════');
        console.log('🎵 DISCORD MUSIC BOT');
        console.log('═══════════════════════════════════════');
        console.log(`✅ Bot đã online: ${client.user. tag}`);
        console.log(`📊 Đang phục vụ ${client.guilds. cache.size} servers`);
        console.log(`⏰ Thời gian: ${new Date().toLocaleString('vi-VN')}`);
        console.log('═══════════════════════════════════════');
        
        // Set status
        client.user.setPresence({
            activities: [{ name: '🎵 /play để nghe nhạc', type: 2 }],
            status: 'online',
        });
    },
};