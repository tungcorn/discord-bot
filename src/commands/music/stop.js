// ⏹️ Lệnh /stop - Dừng nhạc và xóa queue
const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const { useQueue } = require('discord-player');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('stop')
        . setDescription('⏹️ Dừng nhạc và xóa toàn bộ hàng đợi'),

    async execute(interaction) {
        const queue = useQueue(interaction.guild.id);

        if (!queue) {
            return interaction.reply({
                content: '❌ Không có hàng đợi nhạc! ',
                ephemeral: true,
            });
        }

        queue.delete();

        const embed = new EmbedBuilder()
            . setColor(0xff0000)
            .setDescription('⏹️ Đã dừng nhạc và xóa hàng đợi!')
            .setFooter({ text: `Yêu cầu bởi ${interaction.user. tag}` });

        await interaction.reply({ embeds: [embed] });
    },
};