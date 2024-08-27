const Discord = require("discord.js");
const { EmbedBuilder, ButtonBuilder, ActionRowBuilder, ButtonStyle } = require("discord.js");

exports.help = {
  name: "emojilist",
  aliases: ["allemojis"],
  description: "Permet de voir la liste des emojis du serveur",
  category: "infos",
  utilisation: "emojilist",
  permission: "EVERYONE",
};
exports.run = async (bot, message, args) => {
  let i0 = 0;
  let i1 = 10;
  let page = 1;

  let description;

  description = message.guild.emojis.cache
    .map((r) => r)
    .map((r, i) => `**${i + 1}** ${r}\`(${r.name})\``)
    .slice(0, 10)
    .join("\n");

  let emb = new EmbedBuilder()
    .setTitle(`Liste des emojis (${message.guild.emojis.cache.size})`)
    .setColor(bot.color)
    .setFooter(bot.footer)
    .setDescription(description);

  let pages = new ActionRowBuilder().addComponents(
    new ButtonBuilder()
      .setStyle(ButtonStyle.Primary)
      .setLabel("Précédent")
      .setCustomId("previous_emoji"),
    new ButtonBuilder()
      .setStyle(ButtonStyle.Primary)
      .setLabel("Suivant")
      .setCustomId("next_emoji")
  );

  let dis = new ActionRowBuilder().addComponents(
    new ButtonBuilder()
      .setEmoji("Précédent")
      .setStyle(ButtonStyle.Success)
      .setCustomId("previous_emoji"),
    new ButtonBuilder()
      .setEmoji("Suivant")
      .setStyle(ButtonStyle.Success)
      .setCustomId("next_emoji")
  );

  if (message.guild.emojis.cache.size < 10)
    return message.channel.send({
      embeds: [emb],
      components: [dis],
    });

  let msg = await message.channel.send({
    embeds: [emb],
    components: [pages],
  });

  let filter = (i) => i.user.id === message.author.id;
  let filter2 = (i) => i.message.id === message.id;

  let collector = msg.createMessageComponentCollector({
    filter,
    filter2,
  });

  collector.on("collect", async (i) => {
    i.deferUpdate();
    if (i.customId === "previous_emoji") {
      i0 = i0 - 10;
      i1 = i1 - 10;
      page = page - 1;

      if (i1 < 9) return msg.delete();

      description = message.guild.emojis.cache
        .map((r) => r)
        .map((r, i) => `**${i + 1}** ${r}\`(${r.name})\``)
        .slice(i0, i1)
        .join("\n");

      emb.setFooter(bot.footer).setDescription(description);

      msg.edit({
        embeds: [emb],
      });
    }

    if (i.customId === "next_emoji") {
      i0 = i0 + 10;
      i1 = i1 + 10;
      page = page + 1;

      if (i1 > message.guild.emojis.cache.size + 10) return msg.delete();
      if (!i0 || !i1) return msg.delete();

      description = message.guild.emojis.cache
        .map((r) => r)
        .map((r, i) => `**${i + 1}** ${r}\`(${r.name})\``)
        .slice(i0, i1)
        .join("\n");

      emb.setFooter(bot.footer).setDescription(description);
      msg.edit({
        embeds: [emb],
      });
    }
  });
};
