const client = require("./index")
const { reconDB } = require("reconlx")
const db = new reconDB(client, {
  uri:
    "",
})

module.exports = db;
