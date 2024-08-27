const Discord = require("discord.js");
const { EmbedBuilder } = require("discord.js");
const ms = require("ms");

exports.help = {
  name: "mute",
  category: "moderation",
  description: "Permet de rendre muet un membre.",
  utilisation: "mute [utilisateur] [durée] (raison)",
  permission: "MUTE_MEMBERS",
};

exports.run = async (bot, message, args) => {
  const nondef = new EmbedBuilder()
    .setTitle(`${bot.emoji.deny}・Erreur`)
    .setDescription(`<@${message.author.id}>, merci d'utiliser correctement la commande !\n **Utilisation:** \`${bot.prefix}mute [utilisateur] [durée] (raison)\``)
    .setColor(bot.color)
    .setFooter(bot.footer);

  if (args.length < 2) return message.reply({ embeds: [nondef] });

  const target = message.mentions.members?.first() || message.guild.members.cache.get(args[0]);
  if (!target) return message.reply(`Merci de faire \`${bot.prefix}mute [utilisateur] [durée] (raison)\` !`);

  const duration = args[1];
  if (!parseInt(ms(duration))) return message.reply({ embeds: [nondef] });
  if (ms(duration) > 2419200000) return message.reply("Le temps ne doit pas être supérieur à 28 jours !");

  if (!duration.endsWith("s") && !duration.endsWith("h") && !duration.endsWith("d") && !duration.endsWith("m")) {
    return message.reply("La durée du mute n'est pas valide !\n\n*Aide :*\n> Jours : `d`\n> Heures : `h`\n> Minutes : `m`\n> Secondes : `s`");
  }

  const reason = args.slice(2).join(" ") || "Aucune raison";

  const muteEmbed = new Discord.EmbedBuilder()
    .setColor(bot.color)
    .setTitle(`Tempmute`)
    .setDescription(`Vous avez été tempmute du serveur : **${message.guild.name}**\nRaison: **${reason}**\nFin du mute dans : **${duration}**`)
    .setFooter(bot.footer);

  const muteLogEmbed = new Discord.EmbedBuilder()
    .setTitle(`**Mute**`)
    .setDescription(`${target} a été tempmute par <@${message.author.id}> pour la raison: **${reason}**\nFin du mute dans : **${duration}**`)
    .setColor(bot.color)
    .setTimestamp()
    .setFooter(bot.footer);

  if (target.id === message.author.id) {
    const a = new EmbedBuilder()
      .setTitle(`${bot.emoji.deny}・Erreur`)
      .setDescription(`<@${message.author.id}>, tu ne peux pas effectuer cette action sur toi même 🥲 !`)
      .setColor(bot.color)
      .setFooter(bot.footer);
  return message.channel.send({embeds: [a]});
  }

  if (target.id === message.guild.ownerId) {
    const a = new EmbedBuilder()
      .setTitle(`${bot.emoji.deny}・Erreur`)
      .setDescription(`<@${message.author.id}>, tu ne peux pas effectuer cette action sur l'owner du serveur !`)
      .setColor(bot.color)
      .setFooter(bot.footer);
  return message.channel.send({embeds: [a]});
  }

  if (target.id === bot.user.id) {
    const a = new EmbedBuilder()
      .setTitle(`${bot.emoji.deny}・Erreur`)
      .setDescription(`<@${message.author.id}>, tu ne peux pas effectuer sur moi 🥲 !`)
      .setColor(bot.color)
      .setFooter(bot.footer);
  return message.channel.send({embeds: [a]});
  }

  if(target.member && message.member.roles.highest.comparePositionTo(target.roles.highest) <= 0) {
    const a = new EmbedBuilder()
      .setTitle(`${bot.emoji.deny}・Erreur`)
      .setDescription(`<@${message.author.id}>, tu n'es pas assez haut pour faire cette action !`)
      .setColor(bot.color)
      .setFooter(bot.footer);
  return message.channel.send({embeds: [a]});
  }

  target.timeout(ms(duration), reason);
  target.send({ embeds: [muteEmbed] });
  message.reply({ embeds: [muteLogEmbed] });

  bot.db.query(`SELECT * FROM logs WHERE guildID = "${message.guild.id}"`, async (err, req) => {
    if (req.length < 1) return;

    const logs = req[0].mods;
    if (logs == "off") return;

    const channel = bot.channels.cache.get(logs);
    if (!channel) return;

    channel.send({ embeds: [muteLogEmbed] });
  });

  const ID = await bot.function.createID("MUTE");
  const query = `INSERT INTO mutes (guild, user, author, mute, reason, time, date) VALUES ('${message.guild.id}', '${target.id}', '${message.author.id}', '${ID}', '${reason.replace(/'/g, "\\'")}', '${duration}', '${Date.now()}')`;
  bot.db.query(query);
};