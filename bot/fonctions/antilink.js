module.exports = async (message, bot) => {


  bot.db.query(`SELECT * FROM antilinksalon WHERE channelId = "${message.channel.id}"`, async (err, req) => {
    if (req.length < 1) {
      if (
        message.content.match(
          /(https?:\/\/)?(www\.)?(discord\.gg\/\w+)|(https?:\/\/)(?!.*discord\.gg\/\w+)/g
        )
      ) {
        await message.delete();
        await message.channel.send(`Attention ${message.author}, les liens ne sont pas autorisés sur le serveur.`).then(async mess => setTimeout(async () => {mess.delete()}, 2000));
        await message.guild.members.cache.get(message.author.id).timeout(60000, 'antilink');
      }
    } else {
      const autorisation = req[0].autorisation;
      if (autorisation === 'allow') {
        return;
      } else {
        if (
          message.content.match(
            /(https?:\/\/)?(www\.)?(discord\.gg\/\w+)|(https?:\/\/)(?!.*discord\.gg\/\w+)/g
          )
        ) {
          await message.delete();
          await message.channel.send(`Attention ${message.author}, les liens ne sont pas autorisés sur le serveur.`).then(async mess => setTimeout(async () => {mess.delete()}, 2000));
        }
      }
    }
  });
};
