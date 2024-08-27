const { EmbedBuilder } = require('discord.js')

const Discord = require("discord.js")
exports.help = {
    name: "say",
    category: "outils",
    description: "Permet de dire quelque chose à travers le bot",
    utilisation: "say [text]",
    permission: "ADMINISTRATOR"
  }
  
  exports.run = async (bot, message, args) => {
  
    let say = message.content.split(' ').slice(1).join(' ');

    const nondef = new EmbedBuilder()
    .setTitle(`${bot.emoji.deny}・Erreur`)
    .setDescription(`<@${message.author.id}>, merci d'utiliser correctement la commande !\n\n**Utilisation:** \`${bot.prefix}say [text]\``)
    .setColor(bot.color)
    .setFooter(bot.footer);
  
    if (!say) return message.reply({embeds: [nondef]});
  
    const isUserAdmin = message.member.permissions.has(Discord.PermissionsBitField.Flags.Administrator);
    if (!isUserAdmin) {
      say = say.replace(/https?:\/\/\S+/g, 'https://#!&!"àé#@');
      say = say.replace(/discord\.gg\/\S+|discord\.com\/invite\/\S+/gi, 'discord.gg/craftbot ~~(le lien original a été caché)~~');
    }
    await message.delete();
    message.channel.send({ content: `${say}`, allowedMentions: { parse: [] } });
  }