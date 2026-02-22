// 🏓 Lệnh /ping - Kiểm tra độ trễ
const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ping')
        .setDescription('🏓 Kiểm tra độ trễ của bot'),

    async execute(interaction) {
        const sent = await interaction.reply({ 
            content: '🏓 Đang kiểm tra... ', 
            fetchReply: true 
        });
        
        const latency = sent.createdTimestamp - interaction.createdTimestamp;
        const apiLatency = Math.round(interaction.client.ws.ping);

        const embed = new EmbedBuilder()
            .setColor(0x00ff00)
            .setTitle('🏓 Pong!')
            .addFields(
                { name: '📡 Bot Latency', value: `${latency}ms`, inline: true },
                { name: '💓 API Latency', value: `${apiLatency}ms`, inline: true },
            )
            .setTimestamp();

        await interaction.editReply({ content: '', embeds: [embed] });
    },
};