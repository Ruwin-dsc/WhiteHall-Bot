const { EmbedBuilder } = require('discord.js');
const fs = require('fs');

exports.help = {
  name: 'pokedex',
  category: 'funny',
  utilisation: 'pokedex [pokemon]',
  description: 'Permet de rechercher un pokémon',
  permission: 'EVERYONE'
};

exports.run = async (bot, message, args) => {
  if (args.length === 0) {
    return message.channel.send("Veuillez spécifier le nom d'un Pokémon.");
  }
  
  const pokemonName = removeAccents(args[0].toLowerCase());
  
  const pokemonData = getPokemonData(pokemonName);
  
  if (!pokemonData) {
    return message.channel.send("Le Pokémon spécifié n'a pas été trouvé. (Il n'y a pas encore tous les pokémon)");
  }
  
  const embed = new EmbedBuilder()
    .setColor(bot.color)
    .setTitle(`Pokedex - ${pokemonData.name} - #${pokemonData.number}`)
    .setDescription(`Type: ${pokemonData.type || 'non disponible'}\nTaille: ${pokemonData.taille || 'non disponible'}\nPoids: ${pokemonData.poids || 'non disponible'}\n\n${pokemonData.description || 'non disponible'}`)
    .setImage(pokemonData.image)
    .setThumbnail(pokemonData.sprite)
    .setFooter(bot.footer)

  message.channel.send({ embeds: [embed] });
};

function getPokemonData(pokemonName) {
  const data = fs.readFileSync("../../utils/pokedex.json");
  const pokemonData = JSON.parse(data);
  
  return pokemonData[pokemonName];
}

function removeAccents(str) {
  const accents = 'ÀÁÂÃÄÅàáâãäåÈÉÊËèéêëÌÍÎÏìíîïÒÓÔÕÖÙÚÛÜùúûüÿÑñÇç';
  const accentsOut = 'AAAAAAaaaaaaEEEEeeeeIIIIiiiiOOOOOOUUUUuuuuyNnCc';
  return str
    .split('')
    .map((letter) => {
      const accentIndex = accents.indexOf(letter);
      return accentIndex !== -1 ? accentsOut[accentIndex] : letter;
    })
    .join('');
}
