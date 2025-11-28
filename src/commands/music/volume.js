// 🔊 Lệnh /volume - Điều chỉnh âm lượng
const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const { useQueue } = require('discord-player');

module. exports = {
    data: new SlashCommandBuilder()
        .setName('volume')
        .setDescription('🔊 Điều chỉnh âm lượng')
        .addIntegerOption(option =>
            option.setName('level')
                .setDescription('Mức âm lượng (0-100)')
                .setMinValue(0)
                .setMaxValue(100)
                . setRequired(true)),

    async execute(interaction) {
        const queue = useQueue(interaction.guild.id);
        const volume = interaction.options.getInteger('level');

        if (!queue || ! queue.isPlaying()) {
            return interaction.reply({
                content: '❌ Không có bài hát nào đang phát!',
                ephemeral: true,
            });
        }

        queue. node.setVolume(volume);

        // Tạo thanh âm lượng visual
        const filled = Math.round(volume / 10);
        const empty = 10 - filled;
        const volumeBar = '🔊 ' + '█'.repeat(filled) + '░'.repeat(empty);

        const embed = new EmbedBuilder()
            .setColor(0x00bfff)
            .setDescription(`${volumeBar}\n\n**Âm lượng:** ${volume}%`)
            .setFooter({ text: `Yêu cầu bởi ${interaction.user. tag}` });

        await interaction.reply({ embeds: [embed] });
    },
};