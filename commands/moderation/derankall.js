const { EmbedBuilder } = require("discord.js");

exports.help = {
  name: "derankall",
  category: 'moderation',
  description: 'Permet de derank tous les membres',
  utilisation: "derank [utilisateur]",
  permission: "OWNER"
};

exports.run = async (bot, message) => {
  if (message.author.id !== message.guild.ownerId) {
    const noperm = new EmbedBuilder()
      .setColor(bot.color)
      .setDescription(`Tu n'as pas le droit d'utiliser cette commande, seul l'owner du serveur peut l'utiliser.`)
      .setTimestamp()
      .setFooter(bot.footer);
    return message.reply({ embeds: [noperm] });
  }

  try {
    const embedarray = [];
    const perms = [
      "ADMINISTRATOR",
      "MANAGE_GUILD",
      "MANAGE_ROLES",
      "MANAGE_CHANNELS",
      "BAN_MEMBERS",
      "KICK_MEMBERS",
      "MANAGE_WEBHOOKS"
    ];

    message.guild.members.cache.forEach((m) => {
      m.roles.cache.forEach((r) => {
        if (r.managed || r.id === r.guild.id || m.id === bot.user.id) return;

        embedarray.push({
          mid: `<@${m.id}>`,
          rid: ` -> <@&${r.id}>`
        });

        perms.forEach((p) => {
          if (r.permissions.has(p)) {
            m.roles.remove(r.id);
          }
        });
      });
    });

    const embed = new EmbedBuilder()
      .setColor(bot.color)
      .setTitle("Voici les personnes qui ont été derank")
      .setDescription(embedarray.map(e => `${e.mid}${e.rid}`).join("\n"))
      .setFooter(bot.footer);
    message.channel.send({ embeds: [embed] });

    const alert = new EmbedBuilder()
      .setColor(bot.color)
      .setTitle(`${message.author.tag} a effectué un derank all`)
      .setDescription("Toutes les personnes possédant des permissions **Dangereuses** ont été derank")
      .setTimestamp()
      .setFooter(bot.footer);
    
      const logsQuery = await bot.db.query(`SELECT * FROM logs WHERE guildID = "${message.guild.id}"`);
      const channellogs = logsQuery[0]?.mods;
    
      if (channellogs) {
        bot.channels.cache.get(channellogs).send({ embeds: [alert] }).catch();
      }

  } catch (error) {
    message.reply("Il ya une erreur, vérifier que le bot dispose des permissons nécéssaire");
  }
};
