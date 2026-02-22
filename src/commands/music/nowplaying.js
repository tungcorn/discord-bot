// 🎵 Lệnh /nowplaying - Xem bài đang phát
const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const { useQueue } = require('discord-player');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('nowplaying')
        .setDescription('🎵 Xem thông tin bài hát đang phát'),

    async execute(interaction) {
        const queue = useQueue(interaction.guild.id);

        if (!queue || !queue.isPlaying()) {
            return interaction. reply({
                content: '❌ Không có bài hát nào đang phát!',
                ephemeral: true,
            });
        }

        const track = queue.currentTrack;
        const progress = queue.node.createProgressBar({
            length: 15,
            timecodes: true,
            indicator: '🔘',
            leftChar: '▬',
            rightChar: '▬',
        });

        const embed = new EmbedBuilder()
            .setColor(0x00ff00)
            .setTitle('🎵 Đang phát')
            .setDescription(`**[${track.title}](${track.url})**`)
            .setThumbnail(track.thumbnail)
            .addFields(
                { name: '👤 Ca sĩ', value: track.author, inline: true },
                { name: '⏱️ Thời lượng', value: track.duration, inline: true },
                { name: '🔊 Âm lượng', value: `${queue.node.volume}%`, inline: true },
                { name: '📊 Tiến trình', value: progress || 'N/A' },
            )
            .setFooter({ text: `Yêu cầu bởi ${track.requestedBy?. tag || 'Unknown'}` })
            .setTimestamp();

        await interaction.reply({ embeds: [embed] });
    },
};