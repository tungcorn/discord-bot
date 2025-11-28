// ⏭️ Lệnh /skip - Bỏ qua bài hiện tại
const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const { useQueue } = require('discord-player');

module.exports = {
    data: new SlashCommandBuilder()
        . setName('skip')
        .setDescription('⏭️ Bỏ qua bài hát hiện tại'),

    async execute(interaction) {
        const queue = useQueue(interaction.guild.id);

        if (!queue || !queue.isPlaying()) {
            return interaction.reply({
                content: '❌ Không có bài hát nào đang phát!',
                ephemeral: true,
            });
        }

        const currentTrack = queue. currentTrack;
        queue.node.skip();

        const embed = new EmbedBuilder()
            . setColor(0x00bfff)
            .setDescription(`⏭️ Đã bỏ qua: **${currentTrack.title}**`)
            .setFooter({ text: `Yêu cầu bởi ${interaction.user. tag}` });

        await interaction.reply({ embeds: [embed] });
    },
};