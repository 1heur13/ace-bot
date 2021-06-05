const {Collection, Client, Discord, MessageEmbed} = require('discord.js')
const fs = require('fs')
const mongoose = require("mongoose")
const client = new Client({
    disableEveryone: true
})

require("discord-buttons")(client)

const coinsSchema = require("./models/Economy")
const config = require('./config.json')



mongoose.connect("mongodb+srv://mydb:LoLo97234@cluster0.n19fg.mongodb.net/acebot", {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(console.log("connected to mongoDB"))



module.exports = client;
const { reconDB } = require("reconlx");
const db3 = require("./reconDB")


const prefix = config.prefix
const token = config.token


client.commands = new Collection();
client.aliases = new Collection();
const modlogsSchema = require("./models/mod-logs")
client.modlogs = async function({ Member, Action, Color, Reason }, message) {
  const data = await modlogsSchema.findOne({ Guild: message.guild.id })
  if(!data) return;
  const channel = message.guild.channels.cache.get(data.Channel)

  const logsEmbed = new MessageEmbed()
  .setColor(Color)
  .setDescription(`Reason :${Reason || "No reason"}`)
  .addField('Member', `${Member.user.tag} (${Member.id})`)
  .setTitle(`Action took: ${Action}`)

  channel.send(logsEmbed)
}
client.categories = fs.readdirSync("./commands/");
["command"].forEach(handler => {
    require(`./handlers/${handler}`)(client);
}); 

const coinsSchemaa = require("./models/Economy")



client.on('clickButton', async(button) => {
  console.log(button.id)
})


client.login(token)