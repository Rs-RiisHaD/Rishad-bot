module.exports.config = {
  name: "fakehug",
  version: "1.0.0",
  permission: 0,
  credits: "ChatGPT",
  description: "Send a fake hug image (no API needed)",
  prefix: false,
  category: "fun",
  usages: "fakehug @mention",
  cooldowns: 5,
};

module.exports.run = async function({ api, event }) {
  const { threadID, messageID, mentions, senderID } = event;
  const mentionIDs = Object.keys(mentions);

  if (mentionIDs.length === 0) {
    return api.sendMessage("⚠️ দয়া করে কাউকে @mention করো, যেমন:\nfakehug @user", threadID, messageID);
  }

  const targetID = mentionIDs[0];
  const targetName = mentions[targetID];

  const fakeHugImage = "https://i.ibb.co/R7JsmWb/fake-hug.gif";

  const msg = `🤗 @${targetName}, ${event.senderName} তোমাকে একটা হাগ পাঠালো!`;

  return api.sendMessage({
    body: msg,
    mentions: [{ tag: targetName, id: targetID }],
    attachment: await global.utils.getStream(fakeHugImage)
  }, threadID, messageID);
};
