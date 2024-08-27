const Discord = require("discord.js");
const { EmbedBuilder } = require("discord.js");

exports.help = {
  name: "unmute",
  category: "moderation",
  description: "Permet de ne plus rendre muet un membre.",
  utilisation: "unmute [utilisateur] [ID]",
  permission: "MUTE_MEMBERS",
};

exports.run = async (bot, message, args) => {

  const nondef = new EmbedBuilder()
    .setTitle(`${bot.emoji.deny}・Erreur`)
    .setDescription(
      `<@${message.author.id}>, merci d'utiliser correctement la commande !\n **Utilisation:** \`${bot.prefix}unmute [utilisateur] [ID]\``
    )
    .setColor(bot.color)
    .setFooter(bot.footer);

  const target = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
  if (!target || !args[1]) {
    return message.reply({ embeds: [nondef] });
  }

  if (message.author.id === target.id) {
    return message.reply("Vous ne pouvez pas supprimer vos mutes");
  }
  if (message.guild.ownerId === target.id) {
    return message.reply("Vous ne pouvez pas supprimer les mutes du propriétaire du serveur");
  }
  if (
    (await message.guild.members.fetchMe()).roles.highest.comparePositionTo(target.roles.highest) <= 0
  ) {
    return message.reply("Le bot ne peut pas supprimer les mutes de ce membre");
  }
  
await target.timeout(null);
  bot.db.query(
    `SELECT * FROM mutes WHERE guild = "${message.guild.id}" AND user = "${target.id}" AND mute = '${args[1]}'`,
    async (err, req) => {
      if (req.length < 1) {
        return message.reply("Aucun mute pour ce membre/ID du mute invalide");
      }

      bot.db.query(
        `DELETE FROM mutes WHERE guild = "${message.guild.id}" AND user = "${target.id}" AND mute = "${args[1]}"`
      );
      message.reply(`Vous avez supprimé un mute du membre ${target}`);
    }
  );

  bot.db.query(`SELECT * FROM logs WHERE guildID = "${message.guild.id}"`, async (err, req) => {
    if (req.length < 1) return;

    const logs = req[0].mods;
    if (logs == "off") return;

    const channel = bot.channels.cache.get(logs);
    if (!channel) return;

    const embed = new Discord.EmbedBuilder()
      .setTitle("**Unmute**")
      .setDescription(`<@${message.author.id}> a unmute ${target} dont l'id est ${args[1]}`)
      .setColor(bot.color)
      .setTimestamp()
      .setFooter(bot.footer);

    channel.send({ embeds: [embed] });
  });
};
