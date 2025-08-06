module.exports.config = {
  name: "compliment",
  version: "1.0.0",
  hasPermssion: 0,
  credits: "RiisHaD + ChatGPT",
  description: "কাউকে মেনশন করে মজার বা সুন্দর কমপ্লিমেন্ট দেওয়া",
  commandCategory: "fun",
  usages: "compliment @mention",
  cooldowns: 5,
};

module.exports.run = async function({ api, event }) {
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
  const targetTag = mentions[targetID].replace("@", "");

  const compliments = [
    "তোমার হাসি দেখলে সূর্য লজ্জায় লুকিয়ে যায়! ☀️😊",
    "তুমি যেন বৃষ্টির মাঝখানে ঝলমলে রোদের মত! 🌞💖",
    "তোমার বুদ্ধি দেখে calculator লজ্জা পায়! 🧠",
    "তুমি এত স্মার্ট যে, গুগল তোমার কাছ থেকে শেখে! 🤓",
    "তুমি সবাইকে হাসানোর মেশিন! 😂",
    "তুমি একেবারে ভাই-বোনের মতো মিষ্টি! 🍬",
    "তোমার চোখে চাঁদের আলো ফুটে আছে! 🌙✨",
    "তুমি একদম sunshine, সবাইকে আলোকিত করো! ☀️",
    "তুমি এমন একজন, যার কথা শুনলে সবাই মুগ্ধ হয়! 🗣️",
    "তুমি একদম বইয়ের মতো, যা পড়তে কখনো ক্লান্তি লাগে না! 📖",
    "তুমি মধুর হাসি, যা সবাইকে ভালো লাগে! 🍯",
    "তুমি একদম চাঁদের আলো, যা রাতকে আলোকিত করে! 🌙",
    "তুমি একদম পিজ্জার মতো, সবাই তোমাকে পছন্দ করে! 🍕",
    "তুমি জীবনকে রঙিন করো! 🌈",
    "তুমি সবার জন্য ভালোবাসার মেলা! 💕",
    "তুমি যেন মিষ্টি কেক, যার স্বাদ মিস করা যায় না! 🎂",
    "তুমি বন্ধুত্বের হারানো অধ্যায় খুঁজে পেয়েছ! 📖",
    "তুমি বন্ধুত্বের সবচেয়ে সুন্দর উদাহরণ! 🤝",
    "তুমি স্বপ্নের রাজকুমারী/রাজপুত্র! 👑",
    "তুমি জীবনকে আলোকিত করো ঠিক সূর্যোদয়ের মতো! 🌅",
  ];

  const randomCompliment = compliments[Math.floor(Math.random() * compliments.length)];

  const msg = {
    body: `${targetTag}, ${randomCompliment}`,
    mentions: [{
      tag: targetTag,
      id: targetID
    }]
  };

  return api.sendMessage(msg, threadID, messageID);
};
