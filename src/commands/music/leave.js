// 👋 Lệnh /leave - Bot rời voice channel
const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const { useQueue } = require('discord-player');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('leave')
        .setDescription('👋 Bot rời khỏi kênh voice'),

    async execute(interaction) {
        const queue = useQueue(interaction.guild.id);

        if (queue) {
            queue.delete();
        }

        const embed = new EmbedBuilder()
            .setColor(0xff6b6b)
            .setDescription('👋 Đã rời khỏi kênh voice.  Hẹn gặp lại!')
            .setFooter({ text: `Yêu cầu bởi ${interaction.user. tag}` });

        await interaction.reply({ embeds: [embed] });
    },
};