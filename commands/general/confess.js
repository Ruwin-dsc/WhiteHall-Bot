const Discord = require("discord.js");
const { EmbedBuilder } = require("discord.js");

exports.help = {
  name: "confess",
  category: "général",
  description: "Permet d'envoyer une confession",
  utilisation: "confess [text]",
  permission: "EVERYONE",
  aliases: ["confession"],
};
exports.run = async (bot, message, args) => {
  let b = new Discord.EmbedBuilder()
    .setTitle(`${bot.emoji.deny}・Erreur`)
    .setDescription(
      `<@${message.author.id}>, le serveur n'a pas renseigné le salon des confessions ou il est invalide, pour configurer ce salon faîtes cette commande \`${bot.prefix}setconfess [channel]\` `
    )
    .setColor(bot.color)
    .setFooter(bot.footer);

  let d = new Discord.EmbedBuilder()
    .setTitle(`${bot.emoji.deny}・Erreur`)
    .setDescription(
      `<@${message.author.id}>, merci de bien utiliser la commande.\n **Utilisation:** \`${bot.prefix}confess [text]\``
    )
    .setColor(bot.color)
    .setFooter(bot.footer);

  bot.db.query(
    `SELECT * FROM Confession WHERE guildId = "${message.guild.id}"`,
    async (err, req) => {
      if (req.length < 1) return message.reply({ embeds: [b] });
      const channelconfess = req[0].confesschannel;
      const numberconfess = req[0].nombre;

      if (message.deletable) message.delete();

      const a = bot.channels.cache.get(channelconfess)
        ? bot.channels.cache.get(channelconfess).name
          ? "yes"
          : "no"
        : "no";
      if (a === "no") return message.channel.send({ embeds: [b] });

      const suggestq = args.join(" ");
      if (!suggestq) return message.reply({ embeds: [d] });

      bot.db.query(
        `UPDATE Confession set nombre = ${
          Number(numberconfess) + Number(1)
        } WHERE guildId = '${message.guild.id}'`
      );

      const embed = new EmbedBuilder()
        .setTitle(
          `Nouvelle Confession ! (#${numberconfess}) ${bot.emoji.blackheart} `
        )
        .setDescription(`${suggestq}`)
        .setColor(bot.color)
        .setFooter(bot.footer)
        .setTimestamp();

      const conf = new EmbedBuilder()
        .setDescription(
          `Votre confession a été transféré ici <#${channelconfess}> ${bot.emoji.blackheart} `
        )
        .setColor(bot.color)
        .setFooter(bot.footer);

      message.author.send({ embeds: [conf] });

      await message.guild.channels.cache
        .get(channelconfess)
        .send({ embeds: [embed] });
    }
  );
};
