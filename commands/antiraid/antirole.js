const { EmbedBuilder } = require('discord.js');

exports.help = {
  name: "antirole",
  category: 'antiraid',
  description: "Permet d'activer/désactiver le mode antirole",
  utilisation: "antirole [on/off] [kick/derank/ban]",
  permission: "OWNER"
}

exports.run = async (bot, message, args) => {
  const nondef = new EmbedBuilder()
    .setTitle(`${bot.emoji.deny}・Erreur`)
    .setDescription(`<@${message.author.id}>, merci d'utiliser correctement la commande !\n **Utilisation:** \`${bot.prefix}antirole [ON/OFF] [kick/derank/ban]\``)
    .setColor(bot.color)
    .setFooter(bot.footer);

  const c2 = new EmbedBuilder()
    .setTitle(`${bot.emoji.deny}・Erreur`)
    .setDescription(`<@${message.author.id}>, l'antirole est déjà désactivé !`)
    .setColor(bot.color)
    .setFooter(bot.footer);

  const c3 = new EmbedBuilder()
    .setTitle(`${bot.emoji.deny}・Erreur`)
    .setDescription(`<@${message.author.id}>, l'antirole est déjà activé sur cette sanction!`)
    .setColor(bot.color)
    .setFooter(bot.footer);

  if (!args[0]) return message.channel.send({ embeds: [nondef] });

  if(args[0] !== 'on' && args[0] !== 'off') return message.channel.send({ embeds: [nondef] });

  if (args[0] == 'on') {
    if (!args[1]) return message.channel.send({ embeds: [nondef] });

    if(args[1] !== 'kick' && args[1] !== 'ban' && args[1] !== 'derank') return message.channel.send({ embeds: [nondef] });

    bot.db.query(`SELECT * FROM antirole WHERE guildId = "${message.guild.id}"`, async (err, req) => {
      if (err) throw err;

      if (req.length < 1) {
        bot.db.query(`INSERT INTO antirole (guildId, antirole, sanction) VALUES ("${message.guild.id}", "on", "${args[1]}")`);
        const success = new EmbedBuilder()
          .setTitle(`Antirole activé`)
          .setDescription(`<@${message.author.id}>, l'antirole a bien été activé sur la sanction ${args[1]}!\n*Note: Seul les whitelisters et owners du serveur pourront créer/modifier/supprimer des rôles*`)
          .setColor(bot.color)
          .setFooter(bot.footer);
        return message.reply({ embeds: [success] });
      } else {
        let c = req[0].antirole;
        let d = req[0].sanction
        if (c == 'on' && d == args[1]) return message.channel.send({ embeds: [c3] });

        bot.db.query(`UPDATE antirole SET antirole = 'on' WHERE guildId = ${message.guild.id}`);
        bot.db.query(`UPDATE antirole SET sanction = '${args[1]}' WHERE guildId = ${message.guild.id}`);
        const success = new EmbedBuilder()
          .setTitle(`Antirole activé`)
          .setDescription(`<@${message.author.id}>, l'antirole a bien été activé sur la sanction ${args[1]}!\n*Note: Seul les whitelisters et owners du serveur pourront créer/modifier/supprimer des rôles*`)
          .setColor(bot.color)
          .setFooter(bot.footer);
        return message.reply({ embeds: [success] });
      }
    });
  }

  if (args[0] == 'off') {
    bot.db.query(`SELECT * FROM antirole WHERE guildId = "${message.guild.id}"`, async (err, req) => {
      if (err) throw err;

      if (req.length < 1) {
        bot.db.query(`INSERT INTO antirole (guildId, antirole) VALUES ("${message.guild.id}", "off")`);
        const success = new EmbedBuilder()
          .setTitle(`Antirole désactivé`)
          .setDescription(`<@${message.author.id}>, l'antirole a bien été désactivé !`)
          .setColor(bot.color)
          .setFooter(bot.footer);
        return message.reply({ embeds: [success] });
      } else {
        let c = req[0].antirole;
        if (c == 'off') return message.channel.send({ embeds: [c2] });

        bot.db.query(`UPDATE antirole SET antirole = 'off' WHERE guildId = ${message.guild.id}`);
        const success = new EmbedBuilder()
          .setTitle(`Antirole désactivé`)
          .setDescription(`<@${message.author.id}>, l'antirole a bien été désactivé !`)
          .setColor(bot.color)
          .setFooter(bot.footer);
        return message.reply({ embeds: [success] });
      }
    });
  }
}