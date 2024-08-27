const { EmbedBuilder } = require('discord.js');

exports.help = {
  name: "removeuser",
  description: "Retire un utilisateur d'un ticket",
  utilisation: "removeuser [utilisateur]",
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
    .setDescription(`<@${message.author.id}>, merci de mentionner un utilisateur ! **Utilisation:** \`${bot.prefix}removeuser [utilisateur]\``)
    .setColor(bot.color)
    .setFooter(bot.footer);


  if (args.length !== 1) {
    return message.reply({ embeds: [reass] });
  }

  const userArg = args[0];

  const user = message.mentions.users.first() || await bot.users.fetch(userArg).catch(() => null);
  if (!user) {
    return message.reply({ embeds: [reass] });
  }

  const channel = message.channel;

  channel.permissionOverwrites.edit(user, { VIEW_CHANNEL: null })
    .then(() => {
      message.reply(`L'utilisateur ${user} a été retiré.`);
    })
    .catch(error => {
      message.reply("Une erreur s'est produite lors du retrait de l'utilisateur du salon.");
    });
};