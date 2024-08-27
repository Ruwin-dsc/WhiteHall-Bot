const { EmbedBuilder } = require("discord.js");

exports.help = {
  name: "clear",
  category: 'outils',
  description: "Permet de clear un nombre de message",
  utilisation: "clear [nombre]",
  permission: "MANAGE_MESSAGES",
  aliases: ["cl"]
};

exports.run = async (bot, message, args) => {
  const nondef = new EmbedBuilder()
    .setTitle(`${bot.emoji.deny}・Erreur`)
    .setDescription(`<@${message.author.id}>, merci d'utiliser correctement la commande !\n **Utilisation:** \`${bot.prefix}clear [nombre]\``)
    .setColor(bot.color)
    .setFooter(bot.footer);

  if (args[0]) {
    if (isNaN(args[0])) {
      return message.reply({ embeds: [nondef] });
    }

    let amount = parseInt(args[0], 10) + 1;

    if (amount > 100) {
      amount = 100;
    }

    await message.channel.bulkDelete(amount, true).catch((error) => {
      return message.reply("Je ne peux pas supprimer les messages qui datent de plus de 14 jours");
    });

    const log = new EmbedBuilder()
    .setColor(bot.color)
    .setTitle(`Supression de message`)
    .setTimestamp()
    .setDescription(`${message.author} a supprimé ${amount} messages dans le salon <#${message.channel.id}>.`)
    .setFooter(bot.footer);

  bot.db.query(`SELECT * FROM logs WHERE guildID = "${message.guild.id}"`, async (err, req) => {
    if (req.length < 1) return;
    const channellogs = req[0].mods;

    bot.channels.cache.get(channellogs).send({ embeds: [log] }).catch(e => { return; })
  });

  } else {
    return message.reply({ embeds: [nondef] });
  }
};
