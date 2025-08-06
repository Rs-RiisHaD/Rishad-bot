module.exports.config = {
  name: "gali",
  version: "2.1.0",
  permission: 1, // Admin only
  credits: "RiisHaD SoBuJ",
  description: "শুধু অ্যাডমিনদের জন্য: কাউকে ট্যাগ করে মজার গালি",
  prefix: false,
  premium: false,
  category: "মজা",
  usages: "gali @mention",
  cooldowns: 5
};

module.exports.run = async function ({ api, event, Threads }) {
  const { threadID, messageID, senderID, mentions } = event;

  // ✅ Check if sender is admin
  const threadInfo = await api.getThreadInfo(threadID);
  const isAdmin = threadInfo.adminIDs.some(admin => admin.id === senderID);

  if (!isAdmin) {
    return api.sendMessage("❌ | তুমি এই কমান্ড চালানোর অনুমতি পাওনি, ভাই! 😒", threadID, messageID);
  }

  const galis = [
    "তুই এত বোকা যে গুগল তোকে খুঁজতেই পারে না! 🤣",
    "তোর মগজে যদি RAM থাকতো, তো hang করতে না! 😜",
    "তুই এমন এক ভাইরাস, যারে uninstall করা যায় না! 🦠",
    "তুই এমন কপি পেস্ট, যার পেছনে কেউ খোঁজে না! 📄",
    "তুই এত গাধা যে calculator দিয়েও তোকে solve করা যায় না! 🧮",
    "তুই এমন বাজে coder, তোর কোডেও bug হাসে! 🐞",
    "তোর জন্মদাতা debugger ছিলো না? 🤔",
    "তুই কি বায়োডেটা নাকি, যারে সবাই reject করে? 🥴",
    "তুই এমন একটা লেগে থাকা error যারে ignore করলেও চলে না! 💥"
  ];

  const mentionedIDs = Object.keys(mentions);

  if (mentionedIDs.length === 0) {
    return api.sendMessage("⚠️ | দয়া করে কাউকে @mention করো!", threadID, messageID);
  }

  const replies = mentionedIDs.map((id, index) => {
    const randomGali = galis[Math.floor(Math.random() * galis.length)];
    return {
      body: `😡 ওই ${mentions[id]}, ${randomGali}`,
      mentions: [{ tag: mentions[id], id: id }]
    };
  });

  for (const reply of replies) {
    await api.sendMessage(reply, threadID);
  }
};
