const {
  EmbedBuilder
} = require("discord.js");

const backup = require("discord-backup");

module.exports = {
  name: "backup-create",
  description: "Permet de créer une backup",
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
     return interaction.reply({ embeds: [reas] });
   }

   const es = new EmbedBuilder()
     .setTitle(`${bot.emoji.deny}・Erreur`)
     .setDescription(
       `<@${interaction.user.id}>, vous n'avez plus de place pour créé une backup faîtes la commande \`${bot.prefix}backup-delete\`pour en retirer !`
     )
     .setColor(bot.color)
     .setFooter(bot.footer);

   const prob = new EmbedBuilder()
     .setTitle(`${bot.emoji.deny}・Erreur`)
     .setDescription(
       `<@${interaction.user.id}>, Je n'ai pas pu créé la backup, je n'ai sûrement pas les permissions nécessaires...`
     )
     .setColor(bot.color)
     .setFooter(bot.footer);

   bot.db.query(
     `SELECT * FROM backup WHERE ownerId = "${interaction.user.id}"`,
     async (err, req) => {
       if (err) throw err;
       if (req.length >= 5) return interaction.reply({ embeds: [es] });
     }
   );

   const basemessage = await interaction
     .reply({
       embeds: [
         new EmbedBuilder()
           .setDescription(
             `**${bot.emoji.snake} Création de la backup en cours...** Vous allez recevoir un interaction privé quand la création sera terminée`
           )
           .setColor(bot.color)
           .setFooter(bot.footer),
       ],
     })
     .catch(() => false);

   backup
     .create(interaction.guild, { maxMessagesPerChannel: 5 })
     .then(async (backupData) => {
       interaction.user
         .send({
           embeds: [
             new EmbedBuilder()
               .setTitle(`${bot.emoji.snake} Backup créée`)
               .setDescription(
                 `**La backup ${interaction.guild.name} a bien été créée avec l'id ** \`${backupData.id}\` **!**\n\n**Voici comment l'utiliser:**\n\`\`\`${bot.prefix}backup-info ${backupData.id}\`\`\`\n\`\`\`${bot.prefix}backup-load ${backupData.id}\`\`\``
               )
               .setColor(bot.color)
               .setFooter(bot.footer),
           ],
         })
         .catch(() => false);

       bot.db.query(
         `INSERT INTO backup (ownerId, backupId, guildName) VALUES ("${interaction.user.id}", "${backupData.id}", "${interaction.guild.name}")`
       );
     })
     .catch((e) =>
       basemessage.edit({ embeds: [prob], content: `${e}` }).catch(() => false)
     );
  },
};