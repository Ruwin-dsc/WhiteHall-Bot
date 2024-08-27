const { EmbedBuilder } = require('discord.js');

exports.help = {
  name: "setconfess",
  category: 'configuration',
  description: "Permet de définir le salon des confessions",
  utilisation: "setconfess [salon]",
  permission: "ADMINISTRATOR"
}

exports.run = async (bot, message) => {
  const args = message.content.trim().split(/ +/g);

  if (!args[1]) {
    const b = new EmbedBuilder()
      .setTitle(`${bot.emoji.deny}・Erreur`)
      .setDescription(`<@${message.author.id}>, merci de bien utiliser la commande.\n **Utilisation:** \`${bot.prefix}setconfess [salon/off]\``)
      .setColor(bot.color)
      .setFooter(bot.footer);
    return message.reply({ embeds: [b] });
  }

  const off = 'off';
  const c2 = new EmbedBuilder()
    .setTitle(`${bot.emoji.deny}・Erreur`)
    .setDescription(`<@${message.author.id}>, le salon des confessions est déjà désactivé !`)
    .setColor(bot.color)
    .setFooter(bot.footer);
  
  const c3 = new EmbedBuilder()
    .setTitle(`${bot.emoji.deny}・Erreur`)
    .setDescription(`<@${message.author.id}>, le salon des confessions est déjà configuré sur ce salon !`)
    .setColor(bot.color)
    .setFooter(bot.footer);
  
  const c4 = new EmbedBuilder()
    .setTitle(`${bot.emoji.deny}・Confessions désactivé`)
    .setDescription(`<@${message.author.id}>, le salon des confessions a bien été désactivé !`)
    .setColor(bot.color)
    .setFooter(bot.footer);
  
  const c5 = new EmbedBuilder()
    .setTitle(`${bot.emoji.success}・Confessions activé`)
    .setDescription(`<@${message.author.id}>, le salon des confessions a bien été activé ! Pour envoyer des confessions, faîtes la commande \`${bot.prefix}confess [TEXT]\``)
    .setColor(bot.color)
    .setFooter(bot.footer);

  if (args[1] === "off") {
    bot.db.query(`SELECT * FROM Confession WHERE guildId = "${message.guild.id}"`, async (err, req) => {
      if (err) throw err;

      if (req.length < 1) {
        bot.db.query(`INSERT INTO Confession (guildId, confesschannel) VALUES ("${message.guild.id}", "${off}")`);
        return message.channel.send({ embeds: [c4] });
      } else {
        const d = req[0].confesschannel;
        if (d === off) return message.channel.send({ embeds: [c2] });

        bot.db.query(`UPDATE Confession SET confesschannel = '${off}' WHERE guildId = ${message.guild.id}`);
        return message.channel.send({ embeds: [c4] });
      }
    });
  } else if (args[1] !== off) {
    const channelId = args[1].replace("<#", "").replace(">", "");
    const channel = bot.channels.cache.get(channelId);

    if (!channel || !channel.name) {
      const b = new EmbedBuilder()
        .setTitle(`${bot.emoji.deny}・Erreur`)
        .setDescription(`<@${message.author.id}>, le salon spécifié est invalide !`)
        .setColor(bot.color)
        .setFooter(bot.footer);
      return message.channel.send({ embeds: [b] });
    }

    bot.db.query(`SELECT * FROM Confession WHERE guildId = "${message.guild.id}"`, async (err, req) => {
      if (err) throw err;

      if (req.length < 1) {
        bot.db.query(`INSERT INTO Confession (guildId, confesschannel) VALUES ("${message.guild.id}", "${channelId}")`);
        return message.channel.send({ embeds: [c5] });
      } else {
        const e = req[0].confesschannel;
        if (e === channelId) return message.channel.send({ embeds: [c3] });

        bot.db.query(`UPDATE Confession SET confesschannel = '${channelId}' WHERE guildId = ${message.guild.id}`);
        return message.channel.send({ embeds: [c5] });
      }
    });
  }
}