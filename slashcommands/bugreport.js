const Discord = require("discord.js")
const {
  EmbedBuilder,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
} = require("discord.js");
const webhookClient = new Discord.WebhookClient({
  id: "1196162548186226698",
  token: "M2ojqNbg_KlyvWIgBLHRGrgLQt3R2fb5cG7mUNVTHdTv8S4Adb43gWOV8z2K6LuEm_sW",
});

module.exports = {
  name: "bugreport",
  description: "Permet de signaler un bug sur le bot",
  permission: "Aucune",
  dm: true,
  options: [
    {
      type: "string",
      name: "bug",
      description: "Le bug que tu as trouvé.",
      required: true,
      autocomplete: false,
    },
  ],

  async run(bot, interaction, slashCommand) {
    const query = slashCommand.get("bug").value;

    const member = interaction.user;


    const reportEmbed = new Discord.EmbedBuilder()
      .setTitle("__**Report Bug**__")
      .setDescription(
        `**Membre :**\n> ${member} \n**Bug :**\n > ${query}`
      )
      .setFooter({ text: `ID de l'utilisateur: ${member.id}` })
      .setThumbnail(member.avatarURL({ dynamic: true }))
      .setTimestamp()
      .setColor(bot.color);

    interaction.reply({
      content: "Merci pour votre report ! Cela a été envoyé avec succès !!!",
    });
    webhookClient.send({ embeds: [reportEmbed] });


  }}