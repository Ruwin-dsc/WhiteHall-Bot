const { EmbedBuilder } = require('discord.js');

exports.help = {
  name: "adduser",
  description: "Ajoute un utilisateur à un ticket",
  utilisation: "adduser [utilisateur]",
  permission: 'ADMINISTRATOR',
  category: 'ticket'
};

exports.run = async (bot, message, args) => {
  if (!message.channel.name.toLowerCase().startsWith("ticket-")) {
    const reas = new EmbedBuilder()
      .setTitle(`${bot.emoji.deny}・Erreur`)
      .setDescription(`<@${message.author.id}>, cette commande ne peut être utilisée que dans les tickets !`)
      .setColor(bot.color)
      .setFooter(bot.footer);

    return message.reply({ embeds: [reas] });
  }

  const reass = new EmbedBuilder()
    .setTitle(`${bot.emoji.deny}・Erreur`)
    .setDescription(`<@${message.author.id}>, merci de mentionner un utilisateur ! **Utilisation:** \`${bot.prefix}adduser [utilisateur]\``)
    .setColor(bot.color)
    .setFooter(bot.footer);

  if (args.length !== 1) {
    return message.reply({embeds: [reass]});
  }

  const userArg = args[0];

  const user = message.mentions.users.first() || await bot.users.fetch(userArg).catch(() => null);
  if (!user) {
    return message.reply({embeds: [reass]});
  }

  const channel = message.channel;


  channel.permissionOverwrites.create(user, { VIEW_CHANNEL: true })
    .then(() => {
      message.reply(`L'utilisateur ${user} a été ajouté.`);
    })
    .catch(error => {
      message.reply("Une erreur s'est produite lors de l'ajout de l'utilisateur au salon.");
    });
}