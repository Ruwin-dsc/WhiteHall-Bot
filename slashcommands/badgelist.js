const Discord = require("discord.js")
const {
  EmbedBuilder,
} = require("discord.js");

module.exports = {
  name: "badgelist",
  description: "Permet de voir tous les badges des membres du serveur",
  permission: "Aucune",
  dm: false,

  async run(bot, interaction, slashCommand) {

    const badges = [];
  const counts = {};

  interaction.guild.members.cache.forEach((member) => {
    const user = member.user;
    const userFlags = user.flags?.toArray() || [];
    badges.push(...userFlags);
  });

  for (const badge of badges) {
    counts[badge] = (counts[badge] || 0) + 1;
  }

  const embed = new EmbedBuilder()
    .setColor(bot.color)
    .setTitle(`Liste des badges sûr ${interaction.guild.name}`)
    .setDescription(
      `<:DiscordEmployee:1199421064871166182>: **${counts['Staff'] || 0}**\n` +
      `<:PartneredServerOwner:1199421131443150928>: **${counts['Partner'] || 0}**\n` +
      `<:DiscordCertifiedModerator:1199421199894204497>: **${counts['CertifiedModerator'] || 0}**\n` +
      `<:BugHunterLevel1:1199421253900046427>: **${counts['BugHunterLevel1'] || 0}**\n` +
      `<:BugHunterLevel2:1199421305666154657>: **${counts['BugHunterLevel2'] || 0}**\n` +
      `<:HypeSquadEvents:1199421362813550703>: **${counts['Hypesquad'] || 0}**\n` +
      `<:EarlyVerifiedBotDeveloper:1199421418698457189>: **${counts['VerifiedDeveloper'] || 0}**\n` +
      `<:soutien:1199421467822149744>: **${counts['PremiumEarlySupporter'] || 0}**\n` +
      `<:HouseBalance:1199421518715826307>: **${counts['HypeSquadOnlineHouse3'] || 0}**\n` +
      `<:HouseBrilliance:1199421566409252924>: **${counts['HypeSquadOnlineHouse2'] || 0}**\n` +
      `<:HouseBravery:1199421620826157177>: **${counts['HypeSquadOnlineHouse1'] || 0}**\n` +
      `<:ActiveDeveloper:1199421675515691008>: **${counts['ActiveDeveloper'] || 0}**`
    )
    .setFooter(bot.footer);

  interaction.reply({ embeds: [embed] });

  }}