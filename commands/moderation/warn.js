const { EmbedBuilder } = require("discord.js");

exports.help = {
  name: "warn",
  description: "Permet d'avertir une personne du serveur.",
  permission: "MANAGE_MESSAGES",
  category: "modération",
  utilisation: "warn [membre] (raison)",
};

exports.run = async (bot, message, args) => {

  const nondef = new EmbedBuilder()
    .setTitle(`${bot.emoji.deny}・Erreur`)
    .setDescription(
      `<@${message.author.id}>, merci d'utiliser correctement la commande !\n **Utilisation:** \`${bot.prefix}warn [membre] (raison)\``
    )
    .setColor(bot.color)
    .setFooter(bot.footer);

  const user = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
  if (!user) {
    return message.reply({ embeds: [nondef] });
  }

  if (user.id === message.author.id) {
    return message.reply("Tu ne peux pas te warn !");
  }

  let reason = args.slice(1).join(" ") || "Aucune raison";

  try {
    await user.send(
      `${message.author.tag} vous a warn sur le serveur ${message.guild.name} pour la raison : \`${reason}\``
    );
  } catch (err) {}

  await message.reply(`Vous avez warn <@${user.id}> pour la raison : \`${reason}\` avec succès !`);

  bot.db.query(`SELECT * FROM logs WHERE guildID = "${message.guild.id}"`, async (err, req) => {
    if (req.length < 1) return;

    const logs = req[0].mods;
    if (logs == "off") return;

    const channel = bot.channels.cache.get(logs);
    if (!channel) return;

    const embed = new EmbedBuilder()
      .setTitle("**Warn**")
      .setDescription(`<@${message.author.id}> a warn ${user} pour la raison ${reason}`)
      .setColor(bot.color)
      .setTimestamp()
      .setFooter(bot.footer);

    channel.send({ embeds: [embed] });
  });

  let ID = await bot.function.createID("WARN");

  bot.db.query(
    `INSERT INTO warns (guildID, userID, authorID, warnID, reason, date) VALUES ('${message.guild.id}', '${user.id}', '${message.author.id}', '${ID}', '${reason.replace(
      /'/g,
      "\\'"
    )}', '${Date.now()}')`
  );
};
