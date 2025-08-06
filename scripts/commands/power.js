module.exports.config = {
  name: "power",
  version: "1.0.0",
  permission: 1, // Admin only
  credits: "RiisHaD SoBuJ",
  description: "ট্যাগ করে কাউকে পাওয়ারফুল বকা দেওয়া হবে",
  prefix: false,
  premium: false,
  category: "মজা",
  usages: "power @mention",
  cooldowns: 5
};

module.exports.run = async function ({ api, event }) {
  const { threadID, messageID, senderID, mentions } = event;

  // ✅ Check Admin
  const threadInfo = await api.getThreadInfo(threadID);
  const isAdmin = threadInfo.adminIDs.some(admin => admin.id === senderID);

  if (!isAdmin) {
    return api.sendMessage("❌ | এই কমান্ড চালাতে হলে অ্যাডমিন হতে হবে!", threadID, messageID);
  }

  const mentionedIDs = Object.keys(mentions);
  if (mentionedIDs.length === 0) {
    return api.sendMessage("⚠️ | দয়া করে কাউকে @mention করো যারে পাওয়ার দিতে চাও!", threadID, messageID);
  }

  const roasts = [
    "তোর দেমাগ এত বেশি, GPS-ও সিগন্যাল হারায়! 🧭",
    "তুই এমন এক যন্ত্র, যারে চালু করলেই BUG বের হয়! 💣",
    "তোর দেহে এত বকা জমে গেছে, antivirus-ও detect করে না! 🛡️",
    "তুই এমন এক processor, যারে heat sink লাগালেও ঠান্ডা হয় না! 🔥",
    "তুই না মানুষ, তুই একটা logic error! 🤯",
    "তোর মধ্যে RAM কম, আর attitude বেশি! 💁‍♂️",
    "তোর কথা শুনলে Siri নিজেই silent হয়ে যায়! 🤐",
    "তুই এমন এক Virus, যারে vaccine দিলেও uninstall হয় না! 🧬",
    "তুই এমন এক meme, যারে দেখে হ্যাকাররাও হাসে! 😹",
    "তুই এমন একটা App, যারে user দ্যাখেই uninstall দেয়! 📲"
  ];

  const target = mentions[mentionedIDs[0]];
  const message = `🔋 পাওয়ার মোড অন করা হলো ${target} এর জন্য:\n\n` + roasts.join("\n");

  return api.sendMessage({
    body: message,
    mentions: [{
      tag: target,
      id: mentionedIDs[0]
    }]
  }, threadID, messageID);
};
