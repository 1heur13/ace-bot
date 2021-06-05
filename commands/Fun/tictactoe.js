const { tictactoe } = require('reconlx')
const { MessageEmbed } = require("discord.js")

module.exports = {
    name : 'tictactoe',
    run : async(client, message, args) => {
        const member = message.mentions.members.first() 
            if(!member)  return  message.channel.send(
              new MessageEmbed()
              .setTitle("TICTACTOE")
              .setDescription(':x: | Please specify a member'))
            
        
        new tictactoe({
            player_two: member, 
            message: message
        })
    }
}