// 📋 Lệnh /queue - Xem hàng đợi nhạc
const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const { useQueue } = require('discord-player');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('queue')
        .setDescription('📋 Xem hàng đợi nhạc hiện tại')
        .addIntegerOption(option =>
            option.setName('page')
                .setDescription('Số trang')
                        .setMinValue(1)),

    async execute(interaction) {
        const queue = useQueue(interaction.guild.id);

        if (!queue || !queue.isPlaying()) {
            return interaction.reply({
                content: '❌ Không có bài hát nào trong hàng đợi!',
                ephemeral: true,
            });
        }

        const tracks = queue.tracks.toArray();
        const currentTrack = queue.currentTrack;
        
        const pageSize = 10;
        const page = (interaction.options.getInteger('page') || 1) - 1;
        const totalPages = Math.ceil(tracks.length / pageSize) || 1;

        const start = page * pageSize;
        const end = start + pageSize;
        const pageTracks = tracks.slice(start, end);

        let queueList = pageTracks
            .map((track, i) => `**${start + i + 1}. ** [${track.title}](${track.url}) - \`${track.duration}\``)
            .join('\n');

        if (!queueList) queueList = 'Không có bài hát nào trong hàng đợi.';

        const embed = new EmbedBuilder()
            .setColor(0x7289da)
            .setTitle('📋 Hàng đợi nhạc')
            .setDescription(`**🎵 Đang phát:**\n[${currentTrack.title}](${currentTrack.url}) - \`${currentTrack.duration}\`\n\n**📜 Tiếp theo:**\n${queueList}`)
            .setThumbnail(currentTrack.thumbnail)
            .setFooter({ text: `Trang ${page + 1}/${totalPages} • ${tracks.length} bài hát trong hàng đợi` });

        await interaction.reply({ embeds: [embed] });
    },
};