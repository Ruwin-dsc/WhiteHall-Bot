const {
  EmbedBuilder
} = require("discord.js");

module.exports = {
  name: "derankall",
  description: "Permet de dérank tous les utilisateurs qui ont une permission",
  permission: "Aucune",
  dm: false,
 
  async run(bot, interaction, slashCommand) {
   const reas = new EmbedBuilder()
     .setTitle(`${bot.emoji.deny}・Erreur`)
     .setDescription(
       `<@${interaction.user.id}>, pour utiliser cette commande tu dois avoir la permission \`OWNER\` !`
     )
     .setColor(bot.color)
     .setFooter(bot.footer);

   if (interaction.user.id !== interaction.guild.ownerId) {
     return interaction.reply({ embeds: [reas], ephemeral: true });
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

    interaction.guild.members.cache.forEach((m) => {
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
    interaction.reply({ embeds: [embed] });

    const alert = new EmbedBuilder()
      .setColor(bot.color)
      .setTitle(`${interaction.user.username} a effectué un derank all`)
      .setDescription("Toutes les personnes possédant des permissions **Dangereuses** ont été derank")
      .setTimestamp()
      .setFooter(bot.footer);
    
      const logsQuery = await bot.db.query(`SELECT * FROM logs WHERE guildID = "${interaction.guild.id}"`);
      const channellogs = logsQuery[0]?.mods;
    
      if (channellogs) {
        bot.channels.cache.get(channellogs).send({ embeds: [alert] }).catch();
      }

  } catch (error) {
    interaction.reply("Il ya une erreur, vérifier que le bot dispose des permissons nécéssaire");
  }


}
}