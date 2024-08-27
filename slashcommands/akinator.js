const {
  EmbedBuilder
} = require("discord.js");
const akinator = require("discord.js-akinator");

module.exports = {
  name: "akinator",
  description: "Permet de jouer à akinator",
  permission: "Aucune",
  dm: true,
  options: [
    {
      type: "string",
      name: "type",
      description: "Le type d'akinator !",
      required: true,
      autocomplete: true,
    },
  ],

  async run(bot, interaction, slashCommand) {

    const type = slashCommand.getString("type")

      let language, gameType;

  switch (type) {
    case 'objet':
      language = "fr";
      gameType = "object";
      break;
    case 'personnage':
      language = "fr";
      gameType = "character";
      break;
    case 'animal':
      language = "fr";
      gameType = "animal";
      break;
  }

  const childMode = false;
  const useButtons = true;
  const embedColor = bot.color;

  akinator(interaction, {
    language: language,
    childMode: childMode,
    gameType: gameType,
    useButtons: useButtons,
    embedColor: embedColor
  });

  }
}