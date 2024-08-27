const { EmbedBuilder } = require('discord.js');

exports.help = {
  name: "antijoin",
  category: 'antiraid',
  description: "Permet d'activer/désactiver le mode antijoin",
  utilisation: "antijoin [on/off]",
  permission: "OWNER"
}

exports.run = async (bot, message, args) => {

  const nondef = new EmbedBuilder()
    .setTitle(`${bot.emoji.deny}・Erreur`)
    .setDescription(`<@${message.author.id}>, merci d'utiliser correctement la commande !\n **Utilisation:** \`${bot.prefix}antijoin [on/off]\``)
    .setColor(bot.color)
    .setFooter(bot.footer);

  const c2 = new EmbedBuilder()
    .setTitle(`${bot.emoji.deny}・Erreur`)
    .setDescription(`<@${message.author.id}>, l'antijoin est déjà désactivé !`)
    .setColor(bot.color)
    .setFooter(bot.footer);

  const c3 = new EmbedBuilder()
    .setTitle(`${bot.emoji.deny}・Erreur`)
    .setDescription(`<@${message.author.id}>, l'antijoin est déjà activé !`)
    .setColor(bot.color)
    .setFooter(bot.footer);

  if (!args[0]) return message.channel.send({ embeds: [nondef] });

  if(args[0] !== 'on' && args[0] !== 'off') return message.channel.send({ embeds: [nondef] });

  if (args[0] == 'on') {

    bot.db.query(`SELECT * FROM antijoin WHERE guildId = "${message.guild.id}"`, async (err, req) => {
      if (err) throw err;

      if (req.length < 1) {
        bot.db.query(`INSERT INTO antijoin (guildId, antijoin) VALUES ("${message.guild.id}", "on")`);
        const success = new EmbedBuilder()
          .setTitle(`Antijoin activé`)
          .setDescription(`<@${message.author.id}>, l'antijoin a bien été activé !`)
          .setColor(bot.color)
          .setFooter(bot.footer);
        return message.reply({ embeds: [success] });
      } else {
        let c = req[0].antijoin;
        if (c == 'on') return message.channel.send({ embeds: [c3] });

        bot.db.query(`UPDATE antijoin SET antijoin = 'on' WHERE guildId = ${message.guild.id}`);
        const success = new EmbedBuilder()
          .setTitle(`Antijoin activé`)
          .setDescription(`<@${message.author.id}>, l'antijoin a bien été activé !`)
          .setColor(bot.color)
          .setFooter(bot.footer);
        return message.reply({ embeds: [success] });
      }
    });
  }

  if (args[0] == 'off') {
    bot.db.query(`SELECT * FROM antijoin WHERE guildId = "${message.guild.id}"`, async (err, req) => {
      if (err) throw err;

      if (req.length < 1) {
        bot.db.query(`INSERT INTO antijoin (guildId, antijoin) VALUES ("${message.guild.id}", "off")`);
        const success = new EmbedBuilder()
          .setTitle(`Antijoin désactivé`)
          .setDescription(`<@${message.author.id}>, l'antijoin a bien été désactivé !`)
          .setColor(bot.color)
          .setFooter(bot.footer);
        return message.reply({ embeds: [success] });
      } else {
        let c = req[0].antijoin;
        if (c == 'off') return message.channel.send({ embeds: [c2] });

        bot.db.query(`UPDATE antijoin SET antijoin = 'off' WHERE guildId = ${message.guild.id}`);
        const success = new EmbedBuilder()
          .setTitle(`Antijoin désactivé`)
          .setDescription(`<@${message.author.id}>, l'antijoin a bien été désactivé !`)
          .setColor(bot.color)
          .setFooter(bot.footer);
        return message.reply({ embeds: [success] });
      }
    });
  }
}