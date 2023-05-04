
const { Client, LocalAuth } = require("whatsapp-web.js");

module.exports.client = new Client({
  authStrategy: new LocalAuth(),
  puppeteer: {
    args: ["--no-sandbox"],
  },
});