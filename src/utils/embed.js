// 🎨 Utility functions cho embeds
const { EmbedBuilder } = require('discord.js');

const colors = {
    success: 0x00ff00,
    error: 0xff0000,
    warning: 0xffff00,
    info: 0x00bfff,
    music: 0x7289da,
};

function successEmbed(description) {
    return new EmbedBuilder()
        .setColor(colors.success)
        .setDescription(`✅ ${description}`);
}

function errorEmbed(description) {
    return new EmbedBuilder()
        .setColor(colors.error)
        .setDescription(`❌ ${description}`);
}

function infoEmbed(description) {
    return new EmbedBuilder()
        .setColor(colors.info)
        .setDescription(`ℹ️ ${description}`);
}

module.exports = {
    colors,
    successEmbed,
    errorEmbed,
    infoEmbed,
};