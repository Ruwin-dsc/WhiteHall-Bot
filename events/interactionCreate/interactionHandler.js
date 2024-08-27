const Discord = require('discord.js')
const command = require('../../handlers/command')

module.exports = {
  name: "interactionCreate",
  async execute(interaction, bot) {
    if(interaction.type === Discord.InteractionType.ApplicationCommandAutocomplete) {

        let entry = interaction.options.getFocused()

       
        if(interaction.commandName === "akinator") {
            let choices = ["objet", "personnage", "animal"]
            let sortie = choices.filter(c => c.includes(entry))
            await interaction.respond(entry === "" ? sortie.map(c => ({name: c, value: c})) : sortie.map(c => ({name: c, value: c}))) 
            }
        if(interaction.commandName === "autopublish") {
            let choices = ["on", "off"]
            let sortie = choices.filter(c => c.includes(entry))
            await interaction.respond(entry === "" ? sortie.map(c => ({name: c, value: c})) : sortie.map(c => ({name: c, value: c}))) 
            }
    }

    if(interaction.type === Discord.InteractionType.ApplicationCommand) {

        let slashCommand = require(`../../slashcommands/${interaction.commandName}`);
        slashCommand.run(bot, interaction, interaction.options);

    }

  }}