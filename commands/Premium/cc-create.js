const schema = require('../../models/custom-commands');
const { MessageEmbed } = require("discord.js")

module.exports = {
    name: 'cc-create',
    premium: true,
    run: async(client, message, args) => {
        if(!message.member.hasPermission('ADMINISTRATOR')) return message.channel.send(
          new MessageEmbed()
          .setTitle(':x: | You do not have permissions to use this command')
        );

        const name = args[0]; const response = args.slice(1).join(" ");

        if(!name) return message.channel.send(
          new MessageEmbed()
          .setTitle('CC CREATE')
          .setDescription(":x: | Please specify a command name")
        );
        if(!response) return message.channel.send(
          new MessageEmbed()
          .setTitle("CC CREATE")
          .setDescription(':x: | Please specify a response')
        );

        const data = await schema.findOne({ Guild: message.guild.id, Command: name });
        if(data) return message.channel.send(
          new MessageEmbed()
          .setTitle("CC CREATE")
          .setDescription(':x: | This custom commands exists already!')
        );
        const newData =  new schema({
            Guild: message.guild.id,
            Command: name,
            Response: response
        })
        await newData.save();
        message.channel.send(
          new MessageEmbed()
          .setTitle("CC CREATE")
          .setDescription(`:white_check_mark: | Saved **${name}** as a custom command!`)
        );
    }
}