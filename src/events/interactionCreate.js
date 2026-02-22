// 📡 Event xử lý interactions (slash commands, buttons)
module.exports = {
    name: 'interactionCreate',
    async execute(interaction, player) {
        // Xử lý Slash Commands
        if (interaction.isChatInputCommand()) {
            const command = interaction.client.commands.get(interaction.commandName);

            if (!command) {
                return interaction.reply({
                    content: '❌ Không tìm thấy lệnh này! ',
                    ephemeral: true,
                });
            }

            try {
                await command.execute(interaction, player);
            } catch (error) {
                console.error(`❌ Lỗi command ${interaction.commandName}:`, error);
                
                const errorMessage = {
                    content: '❌ Có lỗi xảy ra khi thực hiện lệnh này! ',
                    ephemeral: true,
                };

                if (interaction.replied || interaction.deferred) {
                    await interaction.followUp(errorMessage);
                } else {
                    await interaction.reply(errorMessage);
                }
            }
        }
    },
};