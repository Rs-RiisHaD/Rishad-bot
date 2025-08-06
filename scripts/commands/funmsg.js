const axios = require("axios");

module.exports.config = {
  name: "funmsg",
  version: "1.0.0",
  permission: 0,
  credits: "RiisHaD SoBuJ",
  description: "Send a random funny message to yourself or a tagged user",
  prefix: true,
  category: "fun",
  usages: "funmsg [@mention]",
  cooldowns: 5,
};

module.exports.run = async ({ api, event, args }) => {
  const { threadID, senderID, messageID, mentions } = event;

  // React to the message
  api.setMessageReaction("😂", messageID, () => {}, true);

  // Determine target user
  const isMentioned = Object.keys(mentions).length > 0;
  const targetID = isMentioned ? Object.keys(mentions)[0] : senderID;
  const targetName = isMentioned ? mentions[targetID].replace("@", "") : "you";

  // List of 50 funny messages
  const funnyLines = [
    "তুই হাইড্রোজেন বোম্ব, কিন্তু মাথায় শুধু বাতাস!",
    "তোর ব্রেইনে Wi-Fi নাই, শুধু ping আসে!",
    "তুই জন্মায়া মায়ার ভুল প্রুফ!",
    "তোর হাসি দেখলে রেফ্রিজারেটর ঠান্ডা হয়!",
    "তুই এত ফালতু, Google তোকে খুঁজে পায় না!",
    "তোর লজিক মানে বালির উপর ঘর!",
    "তুই ফেসবুকের মূর্তিমান বেকার!",
    "তুই মশার চেয়েও বিপদজনক!",
    "তোর জন্ম ব্লু টিকের আগে, কিন্তু কাজ কিছু নাই!",
    "তুই পেঁয়াজের দামে আত্মসম্মান বিক্রি করিস!",
    "তোর IQ দেখে ক্যালকুলেটর হাসে!",
    "তুই এমন গাধা, ঘোড়াও তোকে দেখে হাঁসে!",
    "তোর মাথায় শুধুই FM বাজে!",
    "তুই এত মিষ্টি, চিনিও হিংসে করে!",
    "তুই রাস্তায় নামলে লাইটও বন্ধ হয়ে যায়!",
    "তোর বুদ্ধি সিম কার্ড ছাড়া মোবাইল!",
    "তুই এমন ফালতু, recycle bin তোকে delete করতে চায়!",
    "তোর প্রেম মানে TikTok ট্রেন্ড!",
    "তোর মাথা গুগলে সার্চ করলে 'not found'!",
    "তুই শুধু অ্যাক্টিভ, ব্রেইন inactive!",
    "তুই ২৪ ঘন্টা অনলাইন, কিন্তু কাজ 0%",
    "তোর মতো ফ্রেন্ড থাকলে শত্রু দরকার নেই!",
    "তুই এত বোকা, ভুলেও answer দেয় না!",
    "তুই মাথায় ঘাস লাগিয়ে গরুর সাথে প্রতিযোগিতা করিস!",
    "তুই লিমিটেড এডিশন গাধা!",
    "তোর বুদ্ধির বাল্ব ফিউজ হয়ে গেছে!",
    "তোর প্রোফাইল দেখলেই আত্মবিশ্বাস কমে যায়!",
    "তুই এমন ফাজিল, teacher তোকে block দিছে!",
    "তোর পায়ের ছায়া দেখলেও লোকজন ভয় পায়!",
    "তোর বোকামি দেখেই রোবটরা চাকরি ছেড়ে দেয়!",
    "তুই এমন meme, যা কেউ শেয়ার করতেও চায় না!",
    "তোর মতোই useless pen drive — no data, no use!",
    "তুই হাসলে keyboard error দেয়!",
    "তুই প্রেম করলে WiFi বন্ধ হয়ে যায়!",
    "তুই এত slow, snail তোকে দেখে হাসে!",
    "তুই না ফ্রেন্ড, CPU এর virus!",
    "তুই তোর নিজের shadow কে block করেছিস!",
    "তোর মুখ দেখলেই মনে হয় filter ভেঙে গেছে!",
    "তুই হচ্ছে logic without sense!",
    "তোর attitude zero byte!",
    "তুই ভুলেও ঠিক কথা বলিস না!",
    "তুই এত ফালতু, recycle bin তোকে বাঁচিয়ে রাখে!",
    "তুই একটা real life lag!",
    "তোর মাথায় RAM নেই, শুধু noise!",
    "তুই সেই file, যার extension খুঁজে পাওয়া যায় না!",
    "তোর মতো বেকার মানেই inspiration for time waste!",
    "তুই posting দিয়ে পৃথিবীর সময় নষ্ট করিস!",
    "তুই প্রেমে পড়লে WiFi disconnect হয়!",
    "তোর status মানে 'error 404 – life not found'!",
    "তুই এমন কিউট, বাচ্চারা ভয় পায়!",
    "তোর কথা শুনে মোবাইল নিজেই silent হয়ে যায়!"
  ];

  // Pick random message
  const msg = funnyLines[Math.floor(Math.random() * funnyLines.length)];

  // Send response
  api.sendMessage(`${targetName}, ${msg}`, threadID, messageID);
};
