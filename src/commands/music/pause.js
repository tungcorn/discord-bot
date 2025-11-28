// ⏸️ Lệnh /pause - Tạm dừng nhạc
const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const { useQueue } = require('discord-player');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('pause')
        . setDescription('⏸️ Tạm dừng bài hát đang phát'),

    async execute(interaction) {
        const queue = useQueue(interaction.guild. id);

        if (! queue || !queue.isPlaying()) {
            return interaction.reply({
                content: '❌ Không có bài hát nào đang phát!',
                ephemeral: true,
            });
        }

        queue.node.pause();

        const embed = new EmbedBuilder()
            .setColor(0xffff00)
            .setDescription('⏸️ Đã tạm dừng nhạc!  Dùng `/resume` để tiếp tục.')
            .setFooter({ text: `Yêu cầu bởi ${interaction.user. tag}` });

        await interaction.reply({ embeds: [embed] });
    },
};