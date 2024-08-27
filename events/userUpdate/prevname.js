module.exports = {
  name: "userUpdate",
  async execute(oldUser, newUser, bot) {
    if (oldUser.username !== newUser.username) {
      const nom = newUser.username.replace(/"/g, '\\"');

      const prevsalon = bot.channels.cache.get("1199082854072713248");

      await bot.db.query(
        `INSERT INTO prevname (userID, pseudo, Date) VALUES ("${
          oldUser.id
        }", "${nom}", "${Date.now()}")`
      );
      prevsalon.send(`Le pseudo ${nom} (\`${oldUser.id}\`) a été ajouté à la DataBase !`)
    }
  },
};
