const { EmbedBuilder } = require("discord.js");
const Discord = require("discord.js")

module.exports = {
  name: "ban",
  description: "Permet de bannir une personne",
  permission: Discord.PermissionFlagsBits.BanMembers,
  dm: false,
  options: [
    {
      type: "user",
      name: "utilisateur",
      description: "L'utilisateur dont vous souhaitez bannir",
      required: true,
      autocomplete: true,
    },
    {
      type: "string",
      name: "raison",
      description: "La raison du bannissement",
      required: false,
      autocomplete: false,
    },
  ],

  async run(bot, interaction, slashCommand) {
    try {
    const d = slashCommand.getUser("utilisateur");
    if(!d) {
        const a = new EmbedBuilder()
      .setTitle(`${bot.emoji.deny}・Erreur`)
      .setDescription(`<@${interaction.user.id}>, L'utilisateur est invalide !`)
      .setColor(bot.color)
      .setFooter(bot.footer);
  return interaction.reply({embeds: [a], ephemeral: true});
    }
    const member = await interaction.guild.members.fetch(d.id);
    if(!member) return interaction.reply({ content: `L'utilisateur n'est pas sur le serveur !`, ephemeral: true})
    const reason = slashCommand.getString("raison") !== null ? slashCommand.getString("raison") : "Aucune raison fournie"

  if (member.id === interaction.user.id) {
    const a = new EmbedBuilder()
      .setTitle(`${bot.emoji.deny}・Erreur`)
      .setDescription(`<@${interaction.user.id}>, tu ne peux pas subir toi même cette action 🥲 !`)
      .setColor(bot.color)
      .setFooter(bot.footer);
  return interaction.reply({embeds: [a]});
  }

  if (member.id === interaction.guild.ownerId) {
    const a = new EmbedBuilder()
      .setTitle(`${bot.emoji.deny}・Erreur`)
      .setDescription(`<@${interaction.user.id}>, tu ne peux pas faire cette action sur l'owner du serveur !`)
      .setColor(bot.color)
      .setFooter(bot.footer);
  return interaction.reply({embeds: [a]});
  }

  if (member.id === bot.user.id) {
    const a = new EmbedBuilder()
      .setTitle(`${bot.emoji.deny}・Erreur`)
      .setDescription(`<@${interaction.user.id}>, tu ne peux pas me ban 🥲 !`)
      .setColor(bot.color)
      .setFooter(bot.footer);
  return interaction.reply({embeds: [a]});
  }

  if(member.member && interaction.member.roles.highest.comparePositionTo(member.roles.highest) <= 0) {
    const a = new EmbedBuilder()
      .setTitle(`${bot.emoji.deny}・Erreur`)
      .setDescription(`<@${interaction.user.id}>, tu n'es pas assez haut pour faire cette action !`)
      .setColor(bot.color)
      .setFooter(bot.footer);
  return interaction.reply({embeds: [a]});
  }

  const embed = new EmbedBuilder()
    .setColor(bot.color)
    .setTitle('Membre Banni !')
    .setDescription(`Membre : ${member} \nBanni par : ${interaction.user} \nRaison : ${reason}`)
    .setTimestamp()
    .setFooter(bot.footer);

    member.send({ content: `Tu as été banni par ${interaction.user} pour la raison suivante:\n\n${reason}` }).catch(() => false);

  await interaction.guild.bans.create(member.id)
    .then(() => interaction.reply({ embeds: [embed] }))
    .catch(() => {
      const a = new EmbedBuilder()
        .setTitle(`${bot.emoji.deny}・Erreur`)
        .setDescription(`Une erreur s'est produite lors du bannissement. Assurez-vous que j'ai les permissions nécessaires et que l'utilisateur n'est pas supérieur à moi dans la hiérarchie des rôles.`)
        .setColor(bot.color)
        .setFooter(bot.footer);
      return interaction.reply({ embeds: [a] });
    });

  bot.db.query(`SELECT * FROM logs WHERE guildID = "${interaction.guild.id}"`, async (err, req) => {
    if (req.length < 1) return;
    const logs = req[0].mods;
    if (logs == "off") return;
    const a = bot.channels.cache.get(logs) ? bot.channels.cache.get(logs).name ? "yes" : "no" : "no";
    if (a === "no") return;
    const logEmbed = new EmbedBuilder()
      .setTitle(`**Bannissement**`)
      .setDescription(`<@${interaction.user.id}> a banni ${member} pour la raison ${reason}`)
      .setColor(bot.color)
      .setTimestamp()
      .setFooter(bot.footer);
    bot.channels.cache.get(logs).send({ embeds: [logEmbed] });
  });
    } catch(e) {
      console.log(e)
        interaction.reply({ content: `Je n'ai pas trouvé ce membre !`})
    }

  }
}