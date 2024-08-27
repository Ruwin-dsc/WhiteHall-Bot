const { EmbedBuilder } = require("discord.js");
const Discord = require("discord.js")

module.exports = {
  name: "autopublish",
  description: "Permet d'activer ou désactiver l'antipublish",
  permission: Discord.PermissionFlagsBits.Administrator,
  dm: false,
  options: [
    {
      type: "string",
      name: "choix",
      description: "Activer ou désactiver ?",
      required: true,
      autocomplete: true,
    },
  ],

  async run(bot, interaction, slashCommand) {
    const type = slashCommand.getString("choix")

        const c2 = new EmbedBuilder()
        .setTitle(`${bot.emoji.deny}・Erreur`)
        .setDescription(`<@${interaction.user.id}>, l'autopublish est déjà désactivé !`)
        .setColor(bot.color)
        .setFooter(bot.footer);

    const c3 = new EmbedBuilder()
        .setTitle(`${bot.emoji.deny}・Erreur`) 
        .setDescription(`<@${interaction.user.id}>, l'autopublish est déjà activé !`)
        .setColor(bot.color)
        .setFooter(bot.footer);


    if (type === 'on') {
        bot.db.query(`SELECT * FROM configuration WHERE guildID = "${interaction.guild.id}"`, async (err, req) => {
            if (err) throw err;

            if (req.length < 1) {
                bot.db.query(`INSERT INTO configuration (guildID, autopublish) VALUES ("${interaction.guild.id}", "on")`);
                const success = new EmbedBuilder()
                    .setTitle(`Autopublish activé`)
                    .setDescription(`<@${interaction.user.id}>, l'autopublish a bien été activé !`)
                    .setColor(bot.color)
                    .setFooter(bot.footer);
                return interaction.reply({ embeds: [success] });
            } else {
                const c = req[0].autopublish;
                if (c === 'on') {
                    return interaction.reply({ embeds: [c3] });
                }

                bot.db.query(`UPDATE configuration SET autopublish = 'on' WHERE guildID = ${interaction.guild.id}`);
                const success = new EmbedBuilder()
                    .setTitle(`Autopublish activé`)
                    .setDescription(`<@${interaction.user.id}>, l'autopublish a bien été activé !`)
                    .setColor(bot.color)
                    .setFooter(bot.footer);
                return interaction.reply({ embeds: [success] });
            }
        });
    }

    if (type === 'off') {
        bot.db.query(`SELECT * FROM configuration WHERE guildID = "${interaction.guild.id}"`, async (err, req) => {
            if (err) throw err;

            if (req.length < 1) {
                bot.db.query(`INSERT INTO configuration (guildID, autopublish) VALUES ("${interaction.guild.id}", "off")`);
                const success = new EmbedBuilder()
                    .setTitle(`Autopublish désactivé`)
                    .setDescription(`<@${interaction.user.id}>, l'autopublish a bien été désactivé !`)
                    .setColor(bot.color)
                    .setFooter(bot.footer);
                return interaction.reply({ embeds: [success] });
            } else {
                const c = req[0].autopublish;
                if (c === 'off') {
                    return interaction.reply({ embeds: [c2] });
                }

                bot.db.query(`UPDATE configuration SET autopublish = 'off' WHERE guildID = ${interaction.guild.id}`);
                const success = new EmbedBuilder()
                    .setTitle(`Autopublish désactivé`)
                    .setDescription(`<@${interaction.user.id}>, l'autopublish a bien été désactivé !`)
                    .setColor(bot.color)
                    .setFooter(bot.footer);
                return interaction.reply({ embeds: [success] });
            }
        });



  }
}}