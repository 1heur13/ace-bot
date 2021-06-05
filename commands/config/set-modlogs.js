const { Message, Client, MessageEmbed } = require("discord.js")
const Schema = require("../../models/mod-logs")

module.exports = {
  name: "set-modlogs",
  run: async(client, message, args) => {
    if(!message.member.permissions.has("ADMINISTRATOR")) return message.channel.send(
      new MessageEmbed()
      .setDescription(":x: | You do not have permission to use this command"))
      const channel = message.mentions.channels.first()


      if(!channel) return message.channel.send(
                   new MessageEmbed()
      .setDescription(`:x: | Please mention a channel`)
      )


      Schema.findOne({ Guild: message.guild.id }, async(err, data) => {
        if(data) return message.channel.send(
           new MessageEmbed()
      .setDescription(`:x: | You already set a modlogs channel : ${channel}`)
        )

        new Schema({
          Guild: message.guild.id,
          Channel: channel.id
        }).save()
        message.channel.send(
          new MessageEmbed()
          .setDescription(`:white_check_mark: | Saved modlogs channel to : ${channel}`)
        )
      })

    
  }
}