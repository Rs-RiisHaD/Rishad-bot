module.exports.config = {
  name: "lovemeter",
  version: "1.0.0",
  permission: 0,
  credits: "RiisHaD SoBuJ",
  description: "Love compatibility checker 💘",
  prefix: true,
  category: "fun",
  usages: "lovemeter @user1 @user2",
  cooldowns: 5,
};

module.exports.run = async function ({ api, event, args }) {
  const { threadID, messageID, mentions } = event;

  const mentionIDs = Object.keys(mentions);
  if (mentionIDs.length < 2) {
    return api.sendMessage(
      "⚠️ দয়া করে দুইজনকে @mention করো, যেমন:\n\nlovemeter @user1 @user2",
      threadID,
      messageID
    );
  }

  const name1 = mentions[mentionIDs[0]].replace("@", "");
  const name2 = mentions[mentionIDs[1]].replace("@", "");

  const lovePercent = Math.floor(Math.random() * 101);

  let result = "";
  if (lovePercent >= 90) {
    result = "💍 বিয়ের তারিখ ঠিক করে ফেলো! একে অপরের জন্যই জন্ম 💖";
  } else if (lovePercent >= 70) {
    result = "😍 একে অপরকে দারুণ বোঝো, প্রেম জমে ক্ষীর!";
  } else if (lovePercent >= 50) {
    result = "😊 কিছু ভুল বোঝাবুঝি থাকলেও ঠিক হয়ে যাবে!";
  } else if (lovePercent >= 30) {
    result = "😐 ভালোবাসা আছে, কিন্তু কিছুটা একতরফা...";
  } else {
    result = "💔 Friend zone confirmed... ব্যালেন্স নাই প্রেমে!";
  }

  const messageBody = `💘 𝐋𝐨𝐯𝐞 𝐌𝐞𝐭𝐞𝐫 𝐑𝐞𝐬𝐮𝐥𝐭:\n\n❤️ ${name1} ❤️ ${name2}\n🎯 Compatibility: ${lovePercent}%\n\n${result}`;

  return api.sendMessage(
    {
      body: messageBody,
      mentions: [
        { tag: name1, id: mentionIDs[0] },
        { tag: name2, id: mentionIDs[1] },
      ],
    },
    threadID,
    messageID
  );
};
