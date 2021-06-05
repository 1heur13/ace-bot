const { Client, Message, MessageEmbed } = require("discord.js");

module.exports = {
  name: "say",
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
    const query = args.join(" ")

    if(!query) return message.channel.send(
      new MessageEmbed()
      .setTitle("SAY")
      .setDescription(":x: | Please say a message")
    )
    const sayEmbed = new MessageEmbed()
        .setAuthor(message.author.tag, message.author.displayAvatarURL({ dyanmic: true }))
        .setDescription(args.join(" "))
        .setTimestamp()
        .setColor("RANDOM")

    message.channel.send(sayEmbed)
  },
};