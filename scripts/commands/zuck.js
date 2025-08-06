const axios = require('axios');
const fs = require('fs');
const path = require('path');

module.exports.config = {
  name: "zuck",
  version: "1.0.0",
  permission: 0,
  credits: "RiisHaD SoBuJ",
  description: "ফেক পোস্টে মার্ক জাকারবার্গের কমেন্ট",
  prefix: false,
  category: "fun",
  usages: "@mention",
  cooldowns: 5
};

module.exports.run = async function ({ api, event }) {
  const { threadID, messageID, mentions } = event;

  const mentionID = Object.keys(mentions)[0];
  if (!mentionID) {
    return api.sendMessage("❌ | আগে কাউকে @mention করো!", threadID, messageID);
  }

  const targetName = mentions[mentionID].replace("@", "");

  const fakeImageUrl = "https://i.imgur.com/35rqJiy.jpg"; // এখানে স্ক্রিনশট ইমেজ লিঙ্ক

  const imgPath = path.join(__dirname, "cache", "zuck.jpg");

  const res = await axios.get(fakeImageUrl, { responseType: "arraybuffer" });
  fs.writeFileSync(imgPath, Buffer.from(res.data, "binary"));

  return api.sendMessage({
    body: `😲 ${targetName}, দেখো! Mark Zuckerberg তোমার পোস্টে কমেন্ট করেছে!`,
    attachment: fs.createReadStream(imgPath),
    mentions: [{
      tag: targetName,
      id: mentionID
    }]
  }, threadID, () => fs.unlinkSync(imgPath), messageID);
};
