// 🔁 Lệnh /loop - Lặp bài hát/queue
const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const { useQueue, QueueRepeatMode } = require('discord-player');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('loop')
        .setDescription('🔁 Chế độ lặp')
        .addStringOption(option =>
            option.setName('mode')
                .setDescription('Chọn chế độ lặp')
                .setRequired(true)
                .addChoices(
                    { name: '❌ Tắt', value: 'off' },
                    { name: '🔂 Lặp bài hiện tại', value: 'track' },
                    { name: '🔁 Lặp toàn bộ queue', value: 'queue' },
                    { name: '🔀 Autoplay', value: 'autoplay' },
                )),

    async execute(interaction) {
        const queue = useQueue(interaction.guild.id);
        const mode = interaction.options.getString('mode');

        if (!queue || !queue.isPlaying()) {
            return interaction.reply({
                content: '❌ Không có bài hát nào đang phát! ',
                ephemeral: true,
            });
        }

        const modes = {
            'off': QueueRepeatMode.OFF,
            'track': QueueRepeatMode.TRACK,
            'queue': QueueRepeatMode. QUEUE,
            'autoplay': QueueRepeatMode. AUTOPLAY,
        };

        const modeNames = {
            'off': '❌ Đã tắt chế độ lặp',
            'track': '🔂 Đang lặp bài hiện tại',
            'queue': '🔁 Đang lặp toàn bộ hàng đợi',
            'autoplay': '🔀 Đã bật Autoplay',
        };

        queue.setRepeatMode(modes[mode]);

        const embed = new EmbedBuilder()
            .setColor(0x9b59b6)
            .setDescription(modeNames[mode])
            .setFooter({ text: `Yêu cầu bởi ${interaction.user. tag}` });

        await interaction.reply({ embeds: [embed] });
    },
};