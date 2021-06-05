const { Client, Message, MessageEmbed } = require('discord.js');
const Guild = require('../../models/Guild');
  module.exports = {
      name: 'set-counting-channel',
      /** 
       * @param {Client} client 
       * @param {Message} message 
       * @param {String[]} args 
       */
      run: async(client, message, args) => {
        const channel = message.mentions.channels.first();
        if(!channel) return message.reply(
          new MessageEmbed()
          .setTitle("COUNTING")
          .setDescription(':x: | No channel found')
        )
        Guild.findOne({
          id: message.guild.id,
        }, async(err, data) => {
          if(err) throw err;
          if(data) {
            data.Channel = channel.id;
          } else {
            data = new Guild({
              id: message.guild.id,
              Current: 0,
              Channel: channel.id
            })
          }
          data.save();
          message.channel.send(
            new MessageEmbed()
            .setTitle("COUNTING")
            .setDescription(':white_check_mark: | Counting channel has been binded to ' + channel.toString())
          );
        })
      }
  }