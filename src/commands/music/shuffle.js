// 🔀 Lệnh /shuffle - Xáo trộn hàng đợi
const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const { useQueue } = require('discord-player');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('shuffle')
        . setDescription('🔀 Xáo trộn hàng đợi nhạc'),

    async execute(interaction) {
        const queue = useQueue(interaction.guild.id);

        if (!queue || queue.tracks.size < 2) {
            return interaction.reply({
                content: '❌ Cần ít nhất 2 bài trong hàng đợi để xáo trộn!',
                ephemeral: true,
            });
        }

        queue.tracks.shuffle();

        const embed = new EmbedBuilder()
            . setColor(0xe91e63)
            .setDescription(`🔀 Đã xáo trộn **${queue.tracks.size}** bài hát! `)
            .setFooter({ text: `Yêu cầu bởi ${interaction.user.tag}` });

        await interaction. reply({ embeds: [embed] });
    },
};