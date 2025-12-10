// 🎵 Lệnh /play - Phát nhạc
const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const { useMainPlayer } = require('discord-player');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('play')
        .setDescription('🎵 Phát nhạc từ nhiều nguồn (YouTube, Spotify, SoundCloud,...)')
        .addStringOption(option =>
            option.setName('query')
                .setDescription('Tên bài hát hoặc URL')
                .setRequired(true)),

    async execute(interaction) {
        const player = useMainPlayer();
        const query = interaction.options.getString('query');
        
        const voiceChannel = interaction.member.voice.channel;
        if (!voiceChannel) {
            return interaction.reply({
                content: '❌ Bạn cần vào một kênh voice trước! ',
                ephemeral: true,
            });
        }

        const permissions = voiceChannel.permissionsFor(interaction.client.user);
        if (!permissions.has('Connect') || !permissions.has('Speak')) {
            return interaction.reply({
                content: '❌ Bot không có quyền vào kênh voice này!',
                ephemeral: true,
            });
        }

        await interaction.deferReply();

        try {
            const { track } = await player.play(voiceChannel, query, {
                nodeOptions: {
                    metadata: {
                        channel: interaction.channel,
                        requestedBy: interaction.user,
                    },
                    volume: 50,
                    leaveOnEmpty: true,
                    leaveOnEmptyCooldown: 300000,
                    leaveOnEnd: false,
                    leaveOnEndCooldown: 300000,
                },
            });

            const embed = new EmbedBuilder()
                .setColor(0x00ff00)
                .setTitle('✅ Đã thêm vào hàng đợi')
                .setDescription(`**[${track.title}](${track.url})**`)
                .setThumbnail(track.thumbnail)
                .addFields(
                    { name: '👤 Ca sĩ', value: track.author || 'Unknown', inline: true },
                    { name: '⏱️ Thời lượng', value: track.duration || 'N/A', inline: true },
                    { name: '🎧 Yêu cầu bởi', value: `${interaction.user}`, inline: true }
                )
                .setFooter({ text: '🎵 Discord Music Bot' })
                .setTimestamp();

            await interaction.followUp({ embeds: [embed] });
        } catch (error) {
            console.error('❌ Play Error:', error);
            await interaction.followUp({
                content: `❌ Không thể phát bài hát: ${error.message}`,
            });
        }
    },
};