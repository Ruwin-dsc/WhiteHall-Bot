const { EmbedBuilder } = require('discord.js');

exports.help = {
  name: "antichannel",
  category: 'antiraid',
  description: "Permet d'activer/désactiver le mode antichannel",
  utilisation: "antichannel [on/off] [kick/derank/ban]",
  permission: "OWNER"
}

exports.run = async (bot, message, args) => {

  const nondef = new EmbedBuilder()
    .setTitle(`${bot.emoji.deny}・Erreur`)
    .setDescription(`<@${message.author.id}>, merci d'utiliser correctement la commande !\n **Utilisation:** \`${bot.prefix}antichannel [ON/OFF] kick/derank/ban]\``)
    .setColor(bot.color)
    .setFooter(bot.footer);

  const c2 = new EmbedBuilder()
    .setTitle(`${bot.emoji.deny}・Erreur`)
    .setDescription(`<@${message.author.id}>, l'antichannel est déjà désactivé !`)
    .setColor(bot.color)
    .setFooter(bot.footer);

  const c3 = new EmbedBuilder()
    .setTitle(`${bot.emoji.deny}・Erreur`)
    .setDescription(`<@${message.author.id}>, l'antichannel est déjà activé sur cette sanction!`)
    .setColor(bot.color)
    .setFooter(bot.footer);

  if (!args[0]) return message.channel.send({ embeds: [nondef] });

  if(args[0] !== 'on' && args[0] !== 'off') return message.channel.send({ embeds: [nondef] });

  if (args[0] == 'on') {
    if (!args[1]) return message.channel.send({ embeds: [nondef] });

    if(args[1] !== 'kick' && args[1] !== 'ban' && args[1] !== 'derank') return message.channel.send({ embeds: [nondef] });

    bot.db.query(`SELECT * FROM antichannel WHERE guildId = "${message.guild.id}"`, async (err, req) => {
      if (err) throw err;

      if (req.length < 1) {
        bot.db.query(`INSERT INTO antichannel (guildId, antichannel, sanction) VALUES ("${message.guild.id}", "on", "${args[1]}")`);
        const success = new EmbedBuilder()
          .setTitle(`Antilink activé`)
          .setDescription(`<@${message.author.id}>, l'antichannel a bien été activé sur la sanction ${args[1]}!\n*Note: Seul les whitelisters et owners du serveur pourront créer/modifier/supprimer des salons*`)
          .setColor(bot.color)
          .setFooter(bot.footer);
        return message.reply({ embeds: [success] });
      } else {
        let c = req[0].antichannel;
        let d = req[0].sanction
        if (c == 'on' && d == args[1]) return message.channel.send({ embeds: [c3] });

        bot.db.query(`UPDATE antichannel SET antichannel = 'on' WHERE guildId = ${message.guild.id}`);
        bot.db.query(`UPDATE antichannel SET sanction = '${args[1]}' WHERE guildId = ${message.guild.id}`);
        const success = new EmbedBuilder()
          .setTitle(`Antilink activé`)
          .setDescription(`<@${message.author.id}>, l'antichannel a bien été activé sur la sanction ${args[1]}!\n*Note: Seul les whitelisters et owners du serveur pourront créer/modifier/supprimer des salons*`)
          .setColor(bot.color)
          .setFooter(bot.footer);
        return message.reply({ embeds: [success] });
      }
    });
  }

  if (args[0] == 'off') {
    bot.db.query(`SELECT * FROM antichannel WHERE guildId = "${message.guild.id}"`, async (err, req) => {
      if (err) throw err;

      if (req.length < 1) {
        bot.db.query(`INSERT INTO antichannel (guildId, antichannel) VALUES ("${message.guild.id}", "off")`);
        const success = new EmbedBuilder()
          .setTitle(`Antilink désactivé`)
          .setDescription(`<@${message.author.id}>, l'antichannel a bien été désactivé !`)
          .setColor(bot.color)
          .setFooter(bot.footer);
        return message.reply({ embeds: [success] });
      } else {
        let c = req[0].antichannel;
        if (c == 'off') return message.channel.send({ embeds: [c2] });

        bot.db.query(`UPDATE antichannel SET antichannel = 'off' WHERE guildId = ${message.guild.id}`);
        const success = new EmbedBuilder()
          .setTitle(`Antilink désactivé`)
          .setDescription(`<@${message.author.id}>, l'antichannel a bien été désactivé !`)
          .setColor(bot.color)
          .setFooter(bot.footer);
        return message.reply({ embeds: [success] });
      }
    });
  }
}