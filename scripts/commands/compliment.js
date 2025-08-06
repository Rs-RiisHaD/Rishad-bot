module.exports.config = {
  name: "compliment",
  version: "1.0.1",
  permission: 0,
  credits: "RiisHaD",
  description: "Send a funny or sweet compliment to someone you mention",
  prefix: true,
  category: "fun",
  usages: "compliment @mention",
  cooldowns: 5,
};

module.exports.run = async ({ api, event }) => {
  const { threadID, messageID, mentions } = event;
  const mentionIDs = Object.keys(mentions);

  if (mentionIDs.length === 0) {
    return api.sendMessage(
      "⚠️ দয়া করে কাউকে @mention করো, যেমন:\ncompliment @user",
      threadID,
      messageID
    );
  }

  const targetID = mentionIDs[0];
  const targetName = mentions[targetID].replace(/^@/, "");

  const compliments = [
    "তোমার হাসি দেখলে সূর্য লজ্জায় লুকিয়ে যায়! ☀️😊",
    "তুমি যেন বৃষ্টির মাঝখানে ঝলমলে রোদের মত! 🌞💖",
    "তোমার বুদ্ধি দেখে calculator লজ্জা পায়! 🧠",
    "তুমি এত স্মার্ট যে, গুগল তোমার কাছ থেকে শেখে! 🤓",
    "তুমি একেবারে ভাই-বোনের মতো মিষ্টি! 🍬",
    "তোমার চোখে চাঁদের আলো ফুটে আছে! 🌙✨",
    "তুমি বন্ধুত্বের ডায়মন্ড, যা কখনো হারায় না! 💎",
    "তুমি বইয়ের মতো, যা পড়তে কখনো ক্লান্তি লাগে না! 📖",
    "তোমার হাসি আমার সব দুঃখ ভুলিয়ে দেয়! 😄",
    "তুমি একদম sunshine, সবাইকে আলোকিত করো! ☀️",
    "তুমি একদম মধুর হাসি, যা সবাইকে ভালো লাগে! 🍯",
    "তুমি জীবনকে রঙিন করো! 🌈",
    "তোমার উপস্থিতি থেকেই উৎসব শুরু হয়! 🎉"
  ];

  const compliment = compliments[Math.floor(Math.random() * compliments.length)];

  const message = {
    body: `@${targetName}, ${compliment}`,
    mentions: [{
      tag: `@${targetName}`,
      id: targetID
    }]
  };

  return api.sendMessage(message, threadID, messageID);
};
