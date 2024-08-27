const { EmbedBuilder } = require('discord.js');

exports.help = {
  name: "antibot",
  category: 'antiraid',
  description: "Permet d'activer/désactiver le mode antibot",
  utilisation: "antibot [on/off] [kick/derank/ban]",
  permission: "OWNER"
}

exports.run = async (bot, message, args) => {

  const nondef = new EmbedBuilder()
    .setTitle(`${bot.emoji.deny}・Erreur`)
    .setDescription(`<@${message.author.id}>, merci d'utiliser correctement la commande !\n **Utilisation:** \`${bot.prefix}antibot [ON/OFF] [kick/derank/ban]\``)
    .setColor(bot.color)
    .setFooter(bot.footer);

  const c2 = new EmbedBuilder()
    .setTitle(`${bot.emoji.deny}・Erreur`)
    .setDescription(`<@${message.author.id}>, l'antibot est déjà désactivé !`)
    .setColor(bot.color)
    .setFooter(bot.footer);

  const c3 = new EmbedBuilder()
    .setTitle(`${bot.emoji.deny}・Erreur`)
    .setDescription(`<@${message.author.id}>, l'antibot est déjà activé sur cette sanction!`)
    .setColor(bot.color)
    .setFooter(bot.footer);

  if (!args[0]) return message.channel.send({ embeds: [nondef] });

  if(args[0] !== 'on' && args[0] !== 'off') return message.channel.send({ embeds: [nondef] });

  if (args[0] == 'on') {
    if (!args[1]) return message.channel.send({ embeds: [nondef] });

    if(args[1] !== 'kick' && args[1] !== 'ban' && args[1] !== 'derank') return message.channel.send({ embeds: [nondef] });

    bot.db.query(`SELECT * FROM antibot WHERE guildId = "${message.guild.id}"`, async (err, req) => {
      if (err) throw err;

      if (req.length < 1) {
        bot.db.query(`INSERT INTO antibot (guildId, antibot, sanction) VALUES ("${message.guild.id}", "on", "${args[1]}")`);
        const success = new EmbedBuilder()
          .setTitle(`Antibot activé`)
          .setDescription(`<@${message.author.id}>, l'antibot a bien été activé sur la sanction ${args[1]}!\n*Note: Seul les whitelisters et owners du serveur pourront ajouter des bots*`)
          .setColor(bot.color)
          .setFooter(bot.footer);
        return message.reply({ embeds: [success] });
      } else {
        let c = req[0].antibot;
        let d = req[0].sanction
        if (c == 'on' && d == args[1]) return message.channel.send({ embeds: [c3] });

        bot.db.query(`UPDATE antibot SET antibot = 'on' WHERE guildId = ${message.guild.id}`);
        bot.db.query(`UPDATE antibot SET sanction = '${args[1]}' WHERE guildId = ${message.guild.id}`);
        const success = new EmbedBuilder()
          .setTitle(`Antibot activé`)
          .setDescription(`<@${message.author.id}>, l'antibot a bien été activé sur la sanction ${args[1]}!\n*Note: Seul les whitelisters et owners du serveur pourront ajouter des bots*`)
          .setColor(bot.color)
          .setFooter(bot.footer);
        return message.reply({ embeds: [success] });
      }
    });
  }

  if (args[0] == 'off') {
    bot.db.query(`SELECT * FROM antibot WHERE guildId = "${message.guild.id}"`, async (err, req) => {
      if (err) throw err;

      if (req.length < 1) {
        bot.db.query(`INSERT INTO antibot (guildId, antibot) VALUES ("${message.guild.id}", "off")`);
        const success = new EmbedBuilder()
          .setTitle(`Antibot désactivé`)
          .setDescription(`<@${message.author.id}>, l'antibot a bien été désactivé !`)
          .setColor(bot.color)
          .setFooter(bot.footer);
        return message.reply({ embeds: [success] });
      } else {
        let c = req[0].antibot;
        if (c == 'off') return message.channel.send({ embeds: [c2] });

        bot.db.query(`UPDATE antibot SET antibot = 'off' WHERE guildId = ${message.guild.id}`);
        const success = new EmbedBuilder()
          .setTitle(`Antibot désactivé`)
          .setDescription(`<@${message.author.id}>, l'antibot a bien été désactivé !`)
          .setColor(bot.color)
          .setFooter(bot.footer);
        return message.reply({ embeds: [success] });
      }
    });
  }
}