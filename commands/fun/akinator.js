const { EmbedBuilder } = require('discord.js');
const akinator = require("discord.js-akinator");

exports.help = {
  name: "akinator",
  category: "funny",
  utilisation: 'akinator [objet/personnage/animal]',
  description: 'Permet de jouer à Akinator',
  permission: 'EVERYONE'
};

exports.run = async (bot, message, args) => {
  const d = new EmbedBuilder()
    .setTitle(`${bot.emoji.deny}・Erreur`)
    .setDescription(`<@${message.author.id}>, merci de bien utiliser la commande.\n **Utilisation:** \`${bot.prefix}akinator [objet/personnage/animal]\``)
    .setColor(bot.color)
    .setFooter(bot.footer);

  if (!args[0]) return message.channel.send({ embeds: [d] });

  let language, gameType;

  switch (args[0]) {
    case 'objet':
      language = "fr";
      gameType = "object";
      break;
    case 'personnage':
      language = "fr";
      gameType = "character";
      break;
    case 'animal':
      language = "fr";
      gameType = "animal";
      break;
    default:
      return message.channel.send({ embeds: [d] });
  }

  const childMode = false;
  const useButtons = true;
  const embedColor = bot.color;

  akinator(message, {
    language: language,
    childMode: childMode,
    gameType: gameType,
    useButtons: useButtons,
    embedColor: embedColor
  });
};
