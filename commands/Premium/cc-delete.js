const schema = require('../../models/custom-commands');
const { MessageEmbed } = require("discord.js")

module.exports = {
    name: 'cc-delete',
    premium: true,
    run: async(client, message, args) => {
        if(!message.member.hasPermission('ADMINISTRATOR')) return message.channel.send(
        new MessageEmbed()
        .setTitle("CC DELETE")
        .setDescription(':x: | You do not have permissions to use this command')
        );

        const name = args[0];

        if(!name) return message.channel.send(
          new MessageEmbed()
          .setTitle("CC DELETE")
          .setDescription(':x: | Please specify a command name')
        );

        const data = await schema.findOne({ Guild: message.guild.id, Command: name });
        if(!data) return message.channel.send(
          new MessageEmbed()
          .setTitle("CC DELETE")
          .setDescription(':x: | That custom command does not exist!')
        );
        await schema.findOneAndDelete({ Guild: message.guild.id, Command: name });
        message.channel.send(
          new MessageEmbed()
          .setTitle("CC DELETE")
          .setDescription(`:white_check_mark: | Removed **${name}** from custom commands!`)
        );
    }
}