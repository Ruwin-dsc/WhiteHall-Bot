const { EmbedBuilder } = require('discord.js');

exports.help = {
  name: "setsuggest",
  category: 'configuration',
  description: "Permet de définir le salon des suggestions",
  utilisation: "setsuggest [salon]",
  permission: "ADMINISTRATOR"
}

exports.run = async (bot, message) => {
  const args = message.content.trim().split(/ +/g);

  if (!args[1]) {
    const b = new EmbedBuilder()
      .setTitle(`${bot.emoji.deny}・Erreur`)
      .setDescription(`<@${message.author.id}>, merci de bien utiliser la commande.\n **Utilisation:** \`${bot.prefix}setsuggest [salon/off]\``)
      .setColor(bot.color)
      .setFooter(bot.footer);
    return message.reply({ embeds: [b] });
  }

  const off = 'off';
  const c2 = new EmbedBuilder()
    .setTitle(`${bot.emoji.deny}・Erreur`)
    .setDescription(`<@${message.author.id}>, le salon des suggestions est déjà désactivé !`)
    .setColor(bot.color)
    .setFooter(bot.footer);
  
  const c3 = new EmbedBuilder()
    .setTitle(`${bot.emoji.deny}・Erreur`)
    .setDescription(`<@${message.author.id}>, le salon des suggestions est déjà configuré sur ce salon !`)
    .setColor(bot.color)
    .setFooter(bot.footer);
  
  const c4 = new EmbedBuilder()
    .setTitle(`${bot.emoji.deny}・Suggestions désactivé`)
    .setDescription(`<@${message.author.id}>, le salon des suggestions a bien été désactivé !`)
    .setColor(bot.color)
    .setFooter(bot.footer);
  
  const c5 = new EmbedBuilder()
    .setTitle(`${bot.emoji.success}・Suggestions activé`)
    .setDescription(`<@${message.author.id}>, le salon des suggestions a bien été activé ! Pour envoyer des suggestions, faîtes la commande \`${bot.prefix}suggest [TEXT]\``)
    .setColor(bot.color)
    .setFooter(bot.footer);

  if (args[1] === "off") {
    bot.db.query(`SELECT * FROM suggestion WHERE guildId = "${message.guild.id}"`, async (err, req) => {
      if (err) throw err;

      if (req.length < 1) {
        bot.db.query(`INSERT INTO suggestion (guildId, channelId) VALUES ("${message.guild.id}", "${off}")`);
        return message.channel.send({ embeds: [c4] });
      } else {
        const d = req[0].channelId;
        if (d === off) return message.channel.send({ embeds: [c2] });

        bot.db.query(`UPDATE suggestion SET channelId = '${off}' WHERE guildId = ${message.guild.id}`);
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

    bot.db.query(`SELECT * FROM suggestion WHERE guildId = "${message.guild.id}"`, async (err, req) => {
      if (err) throw err;

      if (req.length < 1) {
        bot.db.query(`INSERT INTO suggestion (guildId, channelId) VALUES ("${message.guild.id}", "${channelId}")`);
        return message.channel.send({ embeds: [c5] });
      } else {
        const e = req[0].channelId;
        if (e === channelId) return message.channel.send({ embeds: [c3] });

        bot.db.query(`UPDATE suggestion SET channelId = '${channelId}' WHERE guildId = ${message.guild.id}`);
        return message.channel.send({ embeds: [c5] });
      }
    });
  }
}