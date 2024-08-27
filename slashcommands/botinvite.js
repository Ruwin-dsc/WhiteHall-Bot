module.exports = {
  name: "botinvite",
  description: "Permet d'avoir l'invitation du bot",
  permission: "Aucune",
  dm: true,

  async run(bot, interaction) {
    interaction.reply(
      `https://discord.com/api/oauth2/authorize?client_id=1199079642104090695&permissions=8&scope=bot`
    );
  }}