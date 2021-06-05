const premiumSchema = require("../../models/premium")
const { MessageEmbed } = require("discord.js")

module.exports = {
  name: "add-premium",
timeout:30000,
  run: async(client, message, args) => {
    if(message.author.id !== '843099386497990663') return message.channel.send(
      new MessageEmbed()
      .setTitle("PREMIUM")
      .setDescription(":x: | You do not have permission to use this command (Owner only)"))





      const member = message.mentions.members.first() || message.guild.members.cache.get(args[0])





      if(!member) return message.channel.send( 
        new MessageEmbed() 
        .setTitle("PREMIUM") 
        .setDescription(":x: | Please mention a member")
        )




        premiumSchema.findOne({User: member.id},async(err, data) => {
          if(data) return message.channel.send(
            new MessageEmbed()
            .setTitle("PREMIUM")
            .setDescription(`:x: | This user already gained premium features`)
          )


                  new premiumSchema({User: member.id}).save()
        return message.channel.send(
          new MessageEmbed()
          .setTitle("PREMIUM")
          .setDescription(`:white_check_mark: | Added premium to : ${member}`)
        )
        })
    
  }
}