const Discord = require("discord.js");

module.exports = {
  name: "vc",
  description: "Permet de voir les stats vocaux",
  permission: "Aucune",
  dm: false,

  async run(bot, interaction) {
     const voiceChannels = interaction.guild.channels.cache.filter(channel => channel.type === Discord.ChannelType.GuildVoice);

  let totalMembersInVoice = 0;
  let totalChannels = 0;
  let totalListeners = 0;
  let totalMuted = 0;
  let totalDeafened = 0;
  let totalScreenSharing = 0;
  let totalCameraSharing = 0;
  let videoSharing = 0;

  voiceChannels.forEach(channel => {
    const channelMembers = channel.members.size;
    const channelListeners = channelMembers - channel.members.filter(member => member.user.bot).size;
    const channelMuted = channel.members.filter(member => member.voice.mute).size;
    const channelDeafened = channel.members.filter(member => member.voice.deaf).size;
    const channelScreenSharing = channel.members.filter(member => member.presence.activities.some(activity => activity.type === 'VIDEO' && activity.applicationID)).size;
    const channelCameraSharing = channel.members.filter(member => member.presence.streaming).size;
    const video = interaction.guild.members.cache.filter(m => m.voice.selfVideo).size

    totalMembersInVoice += channelMembers;
    totalListeners += channelListeners;
    totalMuted += channelMuted;
    totalDeafened += channelDeafened;
    totalScreenSharing += channelScreenSharing;
    totalCameraSharing += channelCameraSharing;
    videoSharing += video
    totalChannels++;
  });

  const embed = new Discord.EmbedBuilder()
    .setColor(bot.color)
    .setDescription(`<:speakerhighvolume_1f50a:1199388833523974317> En vocal : ${totalMembersInVoice}\n<:mutedspeaker_1f507:1199388899957543083> Muet : ${totalMuted}/${totalMembersInVoice}\n<:headphone_1f3a7:1199388953128747268> Sourdine : ${totalDeafened}/${totalMembersInVoice}\n<:laptop:1199389100512383098> Partage écran : ${totalScreenSharing}/${totalMembersInVoice}\n<:camera_with_flash:1196157741299937390> Caméra : ${videoSharing}/${totalMembersInVoice}`)
    .setFooter(bot.footer);

  interaction.reply({ embeds: [embed] });

  }
}