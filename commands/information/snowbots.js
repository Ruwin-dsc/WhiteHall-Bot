const { EmbedBuilder } = require('discord.js');


exports.help = {
  
  name: "Shinetsus",
    category: 'infos',
    description: 'Permet de voir les infos du serveur pour la salle de trophée',
    utilisation: 'Shinetsus',
    permission: 'EVERYONE'
 }

  exports.run = async (bot, message, args) => {
      message.delete()
     


    message.guild.owner = await message.guild.fetchOwner().then(m => m.user).catch(() => { })
    const online = message.guild.presences.cache.filter((presence) => presence.status !== "offline").size;
        
    let embed = new EmbedBuilder()
      .setTitle(`**__${message.guild.name}〃Statistiques__**`)
      .setThumbnail(message.guild.iconURL())
      .setColor(bot.color)
      .setDescription(`Membre: **${message.guild.memberCount}** <:members:1199447820147626054>\nEn ligne: **${online}** <:Enligne:1199447877269852312>\nEn vocal: **${message.guild.members.cache.filter(m => m.voice.channel).size}** <:vocal:1199447934626963587>\nBoost: **${message.guild.premiumSubscriptionCount}** <a:boost:1199447986397265932>`)


    message.channel.send({ embeds: [embed] })

          
  }