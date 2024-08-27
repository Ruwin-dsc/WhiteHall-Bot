const { EmbedBuilder } = require("discord.js");
const Discord = require("discord.js")
const ms = require("ms")

module.exports = {
  name: "mute",
  description: "Permet de mute une personne",
  permission: Discord.PermissionFlagsBits.MuteMembers,
  dm: false,
  options: [
    {
      type: "user",
      name: "utilisateur",
      description: "L'utilisateur dont vous souhaitez mute",
      required: true,
      autocomplete: true,
    },
    {
      type: "string",
      name: "temps",
      description: "La temps du mute",
      required: true,
      autocomplete: false,
    },
    {
      type: "string",
      name: "raison",
      description: "La raison du mute",
      required: false,
      autocomplete: false,
    },
  ],

  async run(bot, interaction, slashCommand) {
    const d = slashCommand.getUser("utilisateur");
    if(!d) {
        const a = new EmbedBuilder()
      .setTitle(`${bot.emoji.deny}・Erreur`)
      .setDescription(`<@${interaction.user.id}>, L'utilisateur est invalide !`)
      .setColor(bot.color)
      .setFooter(bot.footer);
  return interaction.reply({embeds: [a], ephemeral: true});
    }
    const target = await interaction.guild.members.fetch(d.id);
    if(!target) return interaction.reply({ content: `L'utilisateur n'est pas sur le serveur !`, ephemeral: true})
     const duration = slashCommand.getString("temps")
    const reason = slashCommand.getString("raison") !== null ? slashCommand.getString("raison") : "Aucune raison fournie"

  if (!parseInt(ms(duration))) return interaction.reply({ embeds: [nondef] });
  if (ms(duration) > 2419200000) return interaction.reply("Le temps ne doit pas être supérieur à 28 jours !");

  if (!duration.endsWith("s") && !duration.endsWith("h") && !duration.endsWith("d") && !duration.endsWith("m")) {
    return interaction.reply("La durée du mute n'est pas valide !\n\n*Aide :*\n> Jours : `d`\n> Heures : `h`\n> Minutes : `m`\n> Secondes : `s`");
  }

  const muteEmbed = new Discord.EmbedBuilder()
    .setColor(bot.color)
    .setTitle(`Tempmute`)
    .setDescription(`Vous avez été tempmute du serveur : **${interaction.guild.name}**\nRaison: **${reason}**\nFin du mute dans : **${duration}**`)
    .setFooter(bot.footer);

  const muteLogEmbed = new Discord.EmbedBuilder()
    .setTitle(`**Mute**`)
    .setDescription(`${target} a été tempmute par <@${interaction.user.id}> pour la raison: **${reason}**\nFin du mute dans : **${duration}**`)
    .setColor(bot.color)
    .setTimestamp()
    .setFooter(bot.footer);

  if (target.id === interaction.user.id) {
    const a = new EmbedBuilder()
      .setTitle(`${bot.emoji.deny}・Erreur`)
      .setDescription(`<@${interaction.user.id}>, tu ne peux pas effectuer cette action sur toi même 🥲 !`)
      .setColor(bot.color)
      .setFooter(bot.footer);
  return interaction.reply({embeds: [a]});
  }

  if (target.id === interaction.guild.ownerId) {
    const a = new EmbedBuilder()
      .setTitle(`${bot.emoji.deny}・Erreur`)
      .setDescription(`<@${interaction.user.id}>, tu ne peux pas effectuer cette action sur l'owner du serveur !`)
      .setColor(bot.color)
      .setFooter(bot.footer);
  return interaction.reply({embeds: [a]});
  }

  if (target.id === bot.user.id) {
    const a = new EmbedBuilder()
      .setTitle(`${bot.emoji.deny}・Erreur`)
      .setDescription(`<@${interaction.user.id}>, tu ne peux pas effectuer sur moi 🥲 !`)
      .setColor(bot.color)
      .setFooter(bot.footer);
  return interaction.reply({embeds: [a]});
  }

  if(target.member && interaction.member.roles.highest.comparePositionTo(target.roles.highest) <= 0) {
    const a = new EmbedBuilder()
      .setTitle(`${bot.emoji.deny}・Erreur`)
      .setDescription(`<@${interaction.user.id}>, tu n'es pas assez haut pour faire cette action !`)
      .setColor(bot.color)
      .setFooter(bot.footer);
  return interaction.reply({embeds: [a]});
  }

  target.timeout(ms(duration), reason);
  target.send({ embeds: [muteEmbed] });
  interaction.reply({ embeds: [muteLogEmbed] });

  bot.db.query(`SELECT * FROM logs WHERE guildID = "${interaction.guild.id}"`, async (err, req) => {
    if (req.length < 1) return;

    const logs = req[0].mods;
    if (logs == "off") return;

    const channel = bot.channels.cache.get(logs);
    if (!channel) return;

    reply({ embeds: [muteLogEmbed] });
  });

  const ID = await bot.function.createID("MUTE");
  const query = `INSERT INTO mutes (guild, user, user, mute, reason, time, date) VALUES ('${interaction.guild.id}', '${target.id}', '${interaction.user.id}', '${ID}', '${reason.replace(/'/g, "\\'")}', '${duration}', '${Date.now()}')`;
  bot.db.query(query);


}}