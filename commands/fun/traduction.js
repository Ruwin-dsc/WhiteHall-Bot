const { translator } = require("dimdams");
const Discord = require("discord.js");

exports.help = {
  name: "traduction",
  category: "funny",
  description: "Permet de traduire un texte",
  utilisation: "translate [langue] [texte]",
  permission: "EVERYONE",
  aliases: ["translate"]
};

exports.run = async (bot, message, args) => {
  let b = new Discord.EmbedBuilder()
    .setTitle(`${bot.emoji.deny}・Erreur`)
    .setDescription(`<@${message.author.id}>, merci de bien utiliser la commande.\n **Utilisation:** \`${bot.prefix}traduction [langue] [texte]\``)
    .setColor(bot.color)
    .setFooter(bot.footer);

  if (!args[0] || !args[1]) {
    return message.reply({ embeds: [b] });
  }

  let lang = args[0];
  let text = args.slice(1).join(' ');

  try {
    let result = await translator(text, { to: lang });

    const trans = new Discord.EmbedBuilder()
      .setTitle(`Traduction en ${lang}`)
      .addFields(
        { name: 'Texte original', value: text, inline: true },
        { name: 'Texte traduit', value: result.text, inline: true }
      )
      .setTimestamp()
      .setFooter(bot.footer)
      .setColor(bot.color);

    await message.reply({ embeds: [trans] });
  } catch (error) {
    message.channel.send({ embeds: [b] });
  }
};
