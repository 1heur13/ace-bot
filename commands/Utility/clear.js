const { MessageEmbed } = require("discord.js")

module.exports = {
    name : 'clear',
    aliases : ['purge'],
    timeout:30000,
    run : async(client, message, args) => {

      
        if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send(
          new MessageEmbed()
          .setTitle("ADD ROLE")
          .setDescription(":x: | You do not have permission to use this command.")
          .setFooter("Permission : MANAGE_MESSAGES")
        )

          if(!message.guild.me.hasPermission("MANAGE_MESSAGES")) return message.channel.send(
          new MessageEmbed()
          .setTitle("ADD ROLE")
          .setDescription(":x: | I do not have permission to use this command.")
           .setFooter("Permission : MANAGE_MESSAGES")
        )





        if(!args[0]) return message.channel.send(
          new MessageEmbed()
          .setTitle("CLEAR")
          .setDescription(':x: | Please specify a number of messages to delete ranging from 1 - 99')
          .setFooter("made by >.<#3316")
        )





        if(isNaN(args[0])) return message.channel.send(
          new MessageEmbed()
          .setTitle("CLEAR")
          .setDescription(':x: | Numbers are only allowed')
          .setFooter("made by >.<#3316")
        )





        if(parseInt(args[0]) > 99) return message.channel.send(
          new MessageEmbed()
          .setTitle("CLEAR")
          .setDescription(':x: | The max amount of messages that I can delete is 99')
          .setFooter("made by >.<#3316")
        )





        await message.channel.bulkDelete(parseInt(args[0]) + 1)






      
            .catch(err => console.log(err))




        message.channel.send(
          new MessageEmbed()
          .setTitle("CLEAR")
          .setDescription(':white_check_mark: | Deleted ' + args[0]  + " messages.")
          .setFooter("made by >.<#3316")
        )



    }
}