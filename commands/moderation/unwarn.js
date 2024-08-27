const { EmbedBuilder } = require("discord.js");

exports.help = {
  name: "unwarn",
  description: "Permet de supprimer un avertissement d'un membre",
  permission: "MANAGE_MESSAGES",
  category: "modération",
  utilisation: "unwarn [membre] [id]",
};

exports.run = async (bot, message, args) => {

  const nondef = new EmbedBuilder()
    .setTitle(`${bot.emoji.deny}・Erreur`)
    .setDescription(
      `<@${message.author.id}>, merci d'utiliser correctement la commande !\n **Utilisation:** \`${bot.prefix}unwarn [membre] [id]\``
    )
    .setColor(bot.color)
    .setFooter(bot.footer);

  const user = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
  if (!user || !args[1]) {
    return message.reply({ embeds: [nondef] });
  }

  if (user.id === message.author.id) {
    return message.reply("Tu ne peux pas te unwarn !");
  }

  const id = args.slice(1).join(" ");
  if (!id) {
    return message.reply({ embeds: [nondef] });
  }

  bot.db.query(
    `SELECT * FROM warns WHERE guildID = "${message.guild.id}" AND userID = "${user.id}" AND warnID = '${id}'`,
    async (err, req) => {
      if (req.length < 1) {
        return message.reply("Aucun avertissement pour ce membre/ID du warn invalide");
      }

      bot.db.query(
        `DELETE FROM warns WHERE guildID = "${message.guild.id}" AND userID = "${user.id}" AND warnID = "${id}"`
      );
      message.reply(`Vous avez supprimé un avertissement du membre ${user}`);
    }
  );

  bot.db.query(`SELECT * FROM logs WHERE guildID = "${message.guild.id}"`, async (err, req) => {
    if (req.length < 1) return;

    const logs = req[0].mods;
    if (logs == "off") return;

    const channel = bot.channels.cache.get(logs);
    if (!channel) return;

    const embed = new EmbedBuilder()
      .setTitle("**Unwarn**")
      .setDescription(`<@${message.author.id}> a unwarn ${user}`)
      .setColor(bot.color)
      .setTimestamp()
      .setFooter(bot.footer);

    channel.send({ embeds: [embed] });
  });
};
