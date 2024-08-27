const {
  EmbedBuilder,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
} = require("discord.js");

exports.help = {
  name: "suggest",
  category: "général",
  description: "Permet de faire une suggestion",
  utilisation: "suggest [text]",
  aliases: ["suggestion"],
  permission: "EVERYONE",
};

exports.run = async (bot, message, args) => {
     const b = new EmbedBuilder()
       .setTitle(`${bot.emoji.deny}・Erreur`)
       .setDescription(
         `<@${message.author.id}>, le serveur n'a pas renseigné le salon des suggestions ou il est invalide, pour configurer ce salon faîtes cette commande \`${bot.prefix}setsuggest [channel]\` `
       )
       .setColor(bot.color)
       .setFooter(bot.footer);

     bot.db.query(
       `SELECT * FROM suggestion WHERE guildId = "${message.guild.id}"`,
       async (err, req) => {
         if (req.length < 1) {
           return message.channel.send({ embeds: [b] });
         }

         const suggesChannel = req[0].channelId;

         const a = bot.channels.cache.get(suggesChannel)
           ? bot.channels.cache.get(suggesChannel).name
             ? "yes"
             : "no"
           : "no";
         if (a === "no") return message.channel.send({ embeds: [b] });

         const suggestion = args.join(" ");
         const c = new EmbedBuilder()
           .setTitle(`${bot.emoji.deny}・Erreur`)
           .setDescription(
             `<@${message.author.id}>, merci de renseigner un texte !`
           )
           .setColor(bot.color)
           .setFooter(bot.footer);
         if(!suggestion) return message.reply({embeds: [c]})

         const row = new ActionRowBuilder().addComponents(
           new ButtonBuilder()
             .setCustomId(`accept_${message.author.id}`)
             .setLabel("Accepter")
             .setStyle(ButtonStyle.Success),
           new ButtonBuilder()
             .setCustomId(`reject_${message.author.id}`)
             .setLabel("Refuser")
             .setStyle(ButtonStyle.Danger)
         );

         const suggestEmbed = new EmbedBuilder()
           .setTitle(`Nouvelle suggestion ! ${bot.emoji.celebiquestion}`)
           .setDescription(
             `${message.author} vient d'envoyer une suggestion !\n\n${suggestion}`
           )
           .setColor(bot.color)
           .setFooter(bot.footer);

           message.reply('Votre suggestion a été envoyé avec succès !')

         const suggestionMessage = await message.guild.channels.cache
           .get(suggesChannel)
           .send({
             embeds: [suggestEmbed],
             components: [row],
           });
         suggestionMessage.startThread({
           name: `${suggestion}`,
           type: "GUILD_PUBLIC_THREAD",
         });
         suggestionMessage.react(bot.emoji.success);
         suggestionMessage.react(bot.emoji.deny);

         const filter = (interaction) => {
           const isAdmin = interaction.member.permissions.has("ADMINISTRATOR");
           const reas = new EmbedBuilder()
             .setTitle(`${bot.emoji.deny}・Erreur`)
             .setDescription(
               `${interaction.member}, pour utiliser cette commande tu dois avoir la permission \`ADMINISTRATEUR\` !`
             )
             .setColor(bot.color)
             .setFooter(bot.footer);
           if (!isAdmin) {
             interaction.reply({ embeds: [reas], ephemeral: true });
             return false;
           }
           return true;
         };
         const collector = suggestionMessage.createMessageComponentCollector({
           filter,
         });

         collector.on("collect", (interaction) => {
           interaction.deferReply({ ephemeral: true });
           if (interaction.customId.startsWith("accept")) {
             const editEmbedSuggest = new EmbedBuilder()
               .setTitle(`${bot.emoji.success} Suggestion Accepté`)
               .setDescription(
                 `${message.author} Votre suggestion a été accepté !\n\n**Suggestion**: ${suggestion}`
               )
               .setColor(bot.color)
               .setFooter(bot.footer);

             suggestionMessage.edit({ embeds: [editEmbedSuggest] });
             interaction.reply({
               content: `Votre choix a été confirmé !`,
               ephemeral: true,
             });
           } else if (interaction.customId.startsWith("reject")) {
             const editEmbedSuggest = new EmbedBuilder()
               .setTitle(`${bot.emoji.deny} Suggestion Refusé`)
               .setDescription(
                 `${message.author} Votre suggestion a été refusé !\n\n**Suggestion**: ${suggestion}`
               )
               .setColor(bot.color)
               .setFooter(bot.footer);

             suggestionMessage.edit({ embeds: [editEmbedSuggest] });
             interaction.reply({
               content: `Votre choix a été confirmé !`,
               ephemeral: true,
             });
           }
         });
       }
     );
};
