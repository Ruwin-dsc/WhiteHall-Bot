module.exports = {
  colorBot(bot) {
    const fetchGuildColors = async () => {
      try {
        const rows = await queryAllGuildColors();

        rows.forEach((row) => {
          const guildId = row.guildId;
          const couleur = row.color;
          guildColors.set(guildId, couleur);
        });


      } catch (error) {
       
      }
    };

    const queryAllGuildColors = () => {
      return new Promise((resolve, reject) => {
        bot.db.query(`SELECT guildId, color FROM serveurs`, (err, req) => {
          if (err) {
            reject(err);
          } else {
            resolve(req);
          }
        });
      });
    };

    const guildColors = new Map();

    fetchGuildColors()
      .then(() => {
        console.log("Initialisation des couleurs des guildes terminée.");
      })
      .catch((error) => {
        console.error(
          "Une erreur s'est produite lors de l'initialisation des couleurs des guildes :",
          error
        );
      });

    setInterval(fetchGuildColors, 200000);

    bot.color = "#7f00ff";

    bot.guilds.cache.forEach(async (guild) => {
      if (!guild) return;
      const couleur = guildColors.get(guild.id);

      if (couleur) {
        bot.color = couleur;
      }
    });
  },
};
