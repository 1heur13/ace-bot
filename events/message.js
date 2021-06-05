const client = require("../index")
const prefix = require("../config").prefix
const  { MessageEmbed } = require("discord.js")
const blacklist = require('../models/blacklist')
const { Collection } = require('discord.js')
const schema = require("../models/custom-commands")
const ms = require("ms")
const db = require("../models/command")
const Timeout = new Collection();
const premiumSchema = require("../models/premium")







client.on("message", async (message) => {
  // replace the files accordingly
    if (!message.content.startsWith(prefix)) return;
    blacklist.findOne({ id : message.author.id }, async(err, data) => {
        if(err) throw err;
        if(!data) {
            if (!message.guild) return;
            if (!message.member) message.member = await message.guild.fetchMember(message);
            const member = message.mentions.members.first();
            const args = message.content.slice(prefix.length).trim().split(/ +/g);
            const cmd = args.shift().toLowerCase();
            const data = await schema.findOne({Guild: message.guild.id, Command: cmd})
            if(data) return message.channel.send(data.Response)
            if (cmd.length == 0) return;
            let command = client.commands.get(cmd)
            if (!command) command = client.commands.get(client.aliases.get(cmd));
    
          if (command) {
            
            const check = await db.findOne({Guild: message.guild.id})

            if(check){
              if(check.Cmds.includes(command.name)) return message.channel.send(
                new MessageEmbed()
                .setTitle("Disable")
                .setDescription(":x: | This command has been disabled by admins")
              )
            }




            if(command.premium && !(await premiumSchema.findOne({User: message.author.id})))
            return message.channel.send(
              new MessageEmbed()
              .setTitle("PREMIUM")
              .setDescription(":x: | You need to upgrade to premium to use this command!")
            )
          if(command.timeout) {
            if(Timeout.has(`${command.name}${message.author.id}`)) return message.channel.send(
              new MessageEmbed()
              .setTitle("TIMEOUT")
              .setDescription(`You are on a \`${ms(Timeout.get(`${command.name}${message.author.id}`) - Date.now(), {long : true})}\` cooldown.`)
            )
            command.run(client, message, args)
            Timeout.set(`${command.name}${message.author.id}`, Date.now() + command.timeout)
            setTimeout(() => {
                Timeout.delete(`${command.name}${message.author.id}`)
              }, command.timeout)
            } else {
                command.run(client, message, args)
            }
          }
        }
    })
})