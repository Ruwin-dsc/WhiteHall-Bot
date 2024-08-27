exports.help = {
  name: "botinvite",
  category: "général",
  description: "T'envoie le lien d'invitation du bot",
  utilisation: "botinvite",
  permission: "EVERYONE",
};

exports.run = async (bot, message) => {
  message.reply(
    `https://discord.com/api/oauth2/authorize?client_id=1199079642104090695&permissions=8&scope=bot`
  );
};
