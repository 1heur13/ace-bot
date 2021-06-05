const { Message } = require('discord.js')
const { MessageEmbed } = require("discord.js")

module.exports = {
    name : 'remove-role',
    timeout:30000,
    run : async(client, message, args) => {
 


        if(!message.member.hasPermission("MANAGE_ROLES")) return message.channel.send(
          new MessageEmbed()
          .setTitle("REMOVE ROLE")
          .setDescription(":x: | You do not have permission to use this command.")
          .setFooter("Permission : MANAGE_ROLES")
        )


           if(!message.guild.me.hasPermission("MANAGE_ROLES")) return message.channel.send(
          new MessageEmbed()
          .setTitle("REMOVE ROLE")
          .setDescription(":x: | I do not have permission to use this command.")
           .setFooter("Permission : MANAGE_ROLES")
        )





       
        const target = message.mentions.members.first() 







        if(!target) return message.channel.send(
          new MessageEmbed()
          .setTitle("REMOVE ROLE")
          .setDescription(":x: | Please mention a member.")
          .setFooter("made by >.<#3316")
        ) 








        const role = message.mentions.roles.first() 
        







             if(!role) return message.channel.send(
          new MessageEmbed()
          .setTitle("REMOVE ROLE")
          .setDescription(":x: | Please mention a role.")
          .setFooter("made by >.<#3316")
        ) 





              if(target.roles.cache.has(role.id)) return message.channel.send(
           new MessageEmbed()
           .setTitle("REMOVE ROLE")
           .setDescription(`:x: | ${target.displayName} the member does not have the mentioned role ${role}`)
           .setFooter("made by >.<#3316")
         )

        



        
         

        
        await target.roles.remove(role) 
        






        message.channel.send(
          new MessageEmbed()
          .setTitle("REMOVE ROLE")
          .setDescription(`:white_check_mark: | ${target.user.username} roles has been removed ${role}`)
          .setFooter("made by >.<#3316")
        )
        


    }
}