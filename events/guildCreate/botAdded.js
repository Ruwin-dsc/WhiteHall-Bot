const Discord = require('discord.js');
module.exports = {
  name: "guildCreate",
  async execute(guild, bot) {

    if (guild.memberCount < 10) {
      guild.leave().catch(() => {})
    } else {
    const canal = bot.channels.cache.get(bot.config.salon.whitehallGuildAdded);
    const embed = new Discord.EmbedBuilder()
      .setColor(bot.color)
      .setTitle(`Bot ajouté ! ${bot.emoji.InkLove}`)
      .setDescription(`J'ai été ajouté sur ${guild.name} (\`${guild.members.cache.size} membres\`)! \nJe suis maintenant dans ${bot.guilds.cache.size} serveurs !`)
      .setThumbnail(guild.iconURL());

    

    canal.send({ embeds: [embed] });
  
  }
}
};
