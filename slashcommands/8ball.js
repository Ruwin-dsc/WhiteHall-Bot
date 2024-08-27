const {
  EmbedBuilder
} = require("discord.js");

module.exports = {
  name: "8ball",
  description: "Permet de poser une question à la boule magique",
  permission: "Aucune",
  dm: true,
  options: [
    {
      type: "string",
      name: "question",
      description: "Question à poser à la boule magique",
      required: true,
      autocomplete: false,
    },
  ],

  async run(bot, interaction, slashCommand) {
    const content = slashCommand.getString("question")
    
    const responses = [
    "Non.",
    "Je te réponds plus tard...",
    "Peut-être.",
    "Possible.",
    "Je ne veux pas y répondre.",
    "Arrête de m'utiliser.",
    "Je dois aider les membres, non répondre à vos questions.",
    "Oui.",
    "Si je ne réponds pas à ta question, que vas-tu faire ? :)",
    "Désolé, je dois aller manger.",
  ];

  const embed = new EmbedBuilder()
    .setColor(bot.color)
    .setDescription(`
    Question: ${content}
    Réponse: ${responses[Math.floor(Math.random() * responses.length)]}
    `)
    .setFooter(bot.footer)
    .setTimestamp();

  interaction.reply({ embeds: [embed] });
  }
}