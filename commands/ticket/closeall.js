const { EmbedBuilder } = require("discord.js")

exports.help = {
    name: "closeall",
    description: "Supprime tous les salons commençant par 'ticket' ou 'fermé'.",
    utilisation: "closeall",
    permission: 'ADMINISTRATOR',
    category: 'ticket'
  };
  
  exports.run = async (bot, message) => {
    const channelsToDelete = message.guild.channels.cache.filter(channel =>
      channel.name.toLowerCase().startsWith('ticket-') ||
      channel.name.toLowerCase().startsWith('fermé-')
    );
  
    channelsToDelete.forEach(async channel => {
      try {
        await channel.delete();
      } catch (error) {
      }
    });

   await message.channel.send(`${channelsToDelete.size} salons ont été supprimés !`)
  
  };