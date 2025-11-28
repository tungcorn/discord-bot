// ▶️ Lệnh /resume - Tiếp tục phát nhạc
const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const { useQueue } = require('discord-player');

module. exports = {
    data: new SlashCommandBuilder()
        .setName('resume')
        .setDescription('▶️ Tiếp tục phát nhạc'),

    async execute(interaction) {
        const queue = useQueue(interaction.guild.id);

        if (!queue) {
            return interaction.reply({
                content: '❌ Không có hàng đợi nhạc!',
                ephemeral: true,
            });
        }

        queue.node.resume();

        const embed = new EmbedBuilder()
            .setColor(0x00ff00)
            .setDescription('▶️ Đã tiếp tục phát nhạc!')
            .setFooter({ text: `Yêu cầu bởi ${interaction.user. tag}` });

        await interaction.reply({ embeds: [embed] });
    },
};