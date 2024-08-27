const Discord = require("discord.js")
const {
  EmbedBuilder
} = require("discord.js");
const moment = require("moment");


module.exports = {
  name: "channelinfo",
  description: "Permet de voir les informations d'un salon",
  permission: "Aucune",
  dm: false,
  options: [
    {
      type: "channel",
      name: "salon",
      description: "Le salon dont vous souhaitez avoir les informations",
      required: true,
      autocomplete: true,
    },
  ],

  async run(bot, interaction, slashCommand) {
    let channel = slashCommand.getChannel("salon");


    const totalUsers = channel.members.size;
    const nsfwStatus = channel.nsfw ? "Oui" : "Non";

    const embed = new EmbedBuilder()
      .setTitle("Information du salon")
      .setDescription(
        `
      ➔ **Information sur le salon ${channel}**
      > \`•\` **Nom :** ${channel.name}
      > \`•\` **Identifiant :** ${channel.id}
      > \`•\` **Type :** ${channel.type}
      > \`•\` **Utilisateurs :** ${totalUsers}
      > \`•\` **Création :** ${moment(channel.createdAt).format("DD/MMM/YYYY")}
      > \`•\` **NSFW :** ${nsfwStatus}
    `
      )
      .setColor(bot.color)
      .setTimestamp()
      .setFooter(bot.footer);

    interaction.reply({ embeds: [embed] });
  },
};