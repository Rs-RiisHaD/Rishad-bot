module.exports.config = {
  name: "gali",
  version: "3.0.0",
  permission: 1, // Admin-only
  credits: "RiisHaD SoBuJ",
  description: "শুধু অ্যাডমিনদের জন্য: কাউকে ট্যাগ করে একসাথে অনেক গালি দেয়",
  prefix: false,
  premium: false,
  category: "মজা",
  usages: "gali @mention",
  cooldowns: 5
};

module.exports.run = async function ({ api, event }) {
  const { threadID, messageID, senderID, mentions } = event;

  // ✅ Admin Check
  const threadInfo = await api.getThreadInfo(threadID);
  const isAdmin = threadInfo.adminIDs.some(admin => admin.id === senderID);

  if (!isAdmin) {
    return api.sendMessage("❌ | তুমি এই কমান্ড চালাতে পারো না! অ্যাডমিন লাগবে ভাই।", threadID, messageID);
  }

  const mentionedIDs = Object.keys(mentions);
  if (mentionedIDs.length === 0) {
    return api.sendMessage("⚠️ | আগে কাউকে @mention করো যাকে বকা দিতে চাও!", threadID, messageID);
  }

  const bokas = [
    "তুই গাধা নয়, গাধার বাপ! 🐴",
    "তোর বুদ্ধি দেখে calculator লজ্জা পায়! 🧠",
    "তুই এমন একটা পেঁপে, কাটলেও ভেতরে কিছু নাই! 🥴",
    "তুই এমন একটা BUG, যারে fix করলেই নতুন error দেয়! 💥",
    "তোর মতো বেকুবকে গুগলেও খুঁজে পাওয়া যায় না! 🕵️‍♂️",
    "তুই BIOS না, তুই শুধু ঝামেলা! ⚙️",
    "তুই এত ডিম, ফ্রিজেও জায়গা হইত না! 🥚",
    "তুই এমন একটা লজ্জার ভুল, যারে spelling check করেও ধরা যায় না! 😵",
    "তোর নাম রাখার আগে antivirus ভাবছিল, block করবো নাকি! 🦠",
    "তুই একটা চলন্ত warning sign! ⚠️",
    "তুই এমন একটা BAKWAAS app, যারে install দিলে সাথে সাথেই uninstall চায়! 📱",
    "তুই একটা টাইম ওয়েস্টিং মেশিন! 🕒",
    "তুই হলো সেই RAM-less brain! 😮‍💨",
    "তুই এমন একটা রোবট, যারে গুগলও ignore করে! 🤖",
    "তুই কপি পেস্টের সেই ভুল যে প্রশ্নেই নাম্বার কাটা যায়! ❌"
  ];

  // All gali together
  const target = mentions[mentionedIDs[0]];
  const fullGali = bokas.map((gali, index) => `${index + 1}. ${gali}`).join("\n");

  const message = `😡 ওই ${target}, শুন:\n\n${fullGali}`;

  return api.sendMessage({
    body: message,
    mentions: [{
      tag: target,
      id: mentionedIDs[0]
    }]
  }, threadID, messageID);
};
