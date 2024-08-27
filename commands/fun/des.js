const { EmbedBuilder } = require('discord.js');

exports.help = {
    name: "des",
    description: "Génère un nombre aléatoire entre 1 et 6.",
    category: "funny",
    utilisation: 'des',
    permission: 'EVERYONE'
};

exports.run = async (bot, message) => {
    const randomNumber = Math.floor(Math.random() * 6) + 1;

    const embed = new EmbedBuilder()
        .setTitle(`Lancemant du dé ${bot.emoji.die} !`)
        .setTimestamp()
        .addFields({ name: "Le dé est tombé sur :", value: `\`\`\`${randomNumber}\`\`\`` })
        .setColor(bot.color)
        .setFooter(bot.footer);

    await message.reply({ embeds: [embed] });
};
