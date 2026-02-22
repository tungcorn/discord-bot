// ❓ Lệnh /help - Hiển thị hướng dẫn
const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('help')
        .setDescription('❓ Hiển thị danh sách lệnh và hướng dẫn sử dụng'),

    async execute(interaction) {
        const embed = new EmbedBuilder()
            .setColor(0x7289da)
            .setTitle('🎵 Discord Music Bot - Hướng dẫn')
            .setDescription('Bot nhạc Discord thông minh, hiện đại!')
            .addFields(
                {
                    name: '🎶 Phát nhạc',
                    value: [
                        '`/play <tên/URL>` - Phát nhạc',
                        '`/pause` - Tạm dừng',
                        '`/resume` - Tiếp tục phát',
                        '`/stop` - Dừng và xóa queue',
                        '`/skip` - Bỏ qua bài hiện tại',
                    ].join('\n'),
                },
                {
                    name: '📋 Hàng đợi',
                    value: [
                        '`/queue` - Xem hàng đợi',
                        '`/nowplaying` - Bài đang phát',
                        '`/shuffle` - Xáo trộn queue',
                        '`/loop` - Chế độ lặp',
                    ].join('\n'),
                },
                {
                    name: '🎚️ Điều khiển',
                    value: [
                        '`/volume <0-100>` - Điều chỉnh âm lượng',
                        '`/leave` - Bot rời kênh',
                    ].join('\n'),
                },
                {
                    name: '🔧 Tiện ích',
                    value: [
                        '`/ping` - Kiểm tra độ trễ',
                        '`/help` - Hiển thị hướng dẫn',
                    ]. join('\n'),
                },
            )
            .setFooter({ text: '🎵 Discord Music Bot | Made with ❤️' })
            .setTimestamp();

        await interaction.reply({ embeds: [embed] });
    },
};