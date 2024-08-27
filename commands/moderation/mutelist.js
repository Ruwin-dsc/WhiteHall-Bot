const { EmbedBuilder } = require("discord.js");

exports.help = {
  name: "mutelist",
  description: "Affiche les mutes d'un membre",
  permission: "MANAGE_MESSAGES",
  category: "moderation",
  utilisation: "mutelist [membre]",
};

exports.run = async (bot, message, args) => {
  const reas = new EmbedBuilder()
    .setTitle(`${bot.emoji.deny}・Permission manquante`)
    .setDescription(
      `<@${message.author.id}>, pour utiliser cette commande tu dois avoir la permission \`Gérer les messages\` !`
    )
    .setColor(bot.color)
    .setFooter(bot.footer);

  if (!message.member.permissions.has("MANAGE_MESSAGES")) {
    return message.channel.send({ embeds: [reas] });
  }

  const nondef = new EmbedBuilder()
    .setTitle(`${bot.emoji.deny}・Erreur`)
    .setDescription(
      `<@${message.author.id}>, merci d'utiliser correctement la commande !\n **Utilisation:** \`${bot.prefix}mutelist [membre]\``
    )
    .setColor(bot.color)
    .setFooter(bot.footer);

  let user;
  if (args.length >= 1) {
    user = message.mentions.users.first() || (await bot.users.fetch(args[0]));
    if (!user) return message.reply({ embeds: [nondef] });
  } else {
    user = message.author;
  }

  bot.db.query(
    `SELECT * FROM mutes WHERE guild = '${message.guild.id}' AND user = '${user.id}'`,
    async (err, req) => {
      if (req.length < 1) {
        return message.reply("Ce membre n'a pas de mutes !");
      }

      req.sort((a, b) => parseInt(b.date) - parseInt(a.date));

      const embed = new EmbedBuilder()
        .setColor(bot.color)
        .setTitle(`Mutes de ${user.tag}`)
        .setThumbnail(user.displayAvatarURL({ dynamic: true }))
        .setTimestamp()
        .setFooter(bot.footer);

      req.forEach((mute, index) => {
        const author = bot.users.cache.get(mute.author) || { tag: "Inconnu" };

        embed.addFields([
          {
            name: `Mute n°${index + 1}`,
            value: `> **Auteur** : ${author.tag}\n> **ID** : \`${mute.mute}\`\n> **Date** : <t:${Math.floor(mute.date / 1000)}>\n> **Raison** : ${mute.reason}`,
          },
        ]);
      });

      message.reply({ embeds: [embed] });
    }
  );
};
