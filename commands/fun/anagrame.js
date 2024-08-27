const Discord = require("discord.js");

exports.help = {
  name: "anagramme",
  description: "Affiche le nombre d'anagrammes contenant le mot donné.",
  category: "funny",
  utilisation: 'anagrame [mot]',
  permission: 'EVERYONE'
};

exports.run = async (bot, message, args) => {
  const word = args[0];

  if (!word) {
    const b = new Discord.EmbedBuilder()
      .setTitle(`${bot.emoji.deny}・Erreur`)
      .setDescription(`<@${message.author.id}>, merci de bien utiliser la commande.\n **Utilisation:** \`${bot.prefix}anagrame [mot]\``)
      .setColor(bot.color)
      .setFooter(bot.footer);

    return message.reply({ embeds: [b] });
  }

  const permutations = findPermutations(word);
  const numPermutations = permutations.length;

  const c = new Discord.EmbedBuilder()
    .setTitle(`Anagramme`)
    .setDescription(`${bot.emoji.writinghand} **•** **Votre anagramme est...** \`${word}\`\n${bot.emoji.nerdface} **•** Le mot \`${word}\` a **${numPermutations}** différentes anagrammes!`)
    .setColor(bot.color)
    .setFooter(bot.footer);

  return message.channel.send({ embeds: [c] });
};

function findPermutations(word) {
  if (word.length === 1) {
    return [word];
  }

  const results = [];

  for (let i = 0; i < word.length; i++) {
    const firstChar = word[i];
    const charsLeft = word.substring(0, i) + word.substring(i + 1);
    const innerPermutations = findPermutations(charsLeft);

    for (let j = 0; j < innerPermutations.length; j++) {
      results.push(firstChar + innerPermutations[j]);
    }
  }

  return results;
}
