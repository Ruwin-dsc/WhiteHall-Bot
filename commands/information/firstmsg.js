const { EmbedBuilder } = require("discord.js");

exports.help = {
  name: "firstmsg",
  category: "outils",
  description: "Permet d'avoir le premier message du salon",
  utilisation: `firstmsg`,
  permissions: "EVERYONE",
};

exports.run = async (bot, message, args) => {
  const { channel } = message;
  const fetchMessages = await channel.messages.fetch({ after: 1, limit: 1 });
  const msg = fetchMessages.first();
  const embed = new EmbedBuilder()
    .setTitle(`Premier messages du salon <#${channel.id}>`)
    .setURL(msg.url)
    .setThumbnail(msg.author.displayAvatarURL({ dynamic: true }))
    .setDescription(
      `Auteur: ${msg.author} \nID du message: ${msg.id}\nContenu: ${msg.content}`
    )
    .setColor(bot.color)
    .setFooter(bot.footer);
  await message.reply({ embeds: [embed] });
};
