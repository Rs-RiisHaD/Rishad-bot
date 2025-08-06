let activeWars = {};

module.exports.config = {
  name: "war",
  version: "1.0.0",
  permission: 1, // Admin-only
  credits: "RiisHaD SoBuJ",
  description: "গালি বোম্বিং যুদ্ধ (শুধু অ্যাডমিন)",
  prefix: false,
  category: "fun",
  usages: "war @mention",
  cooldowns: 5
};

module.exports.run = async function ({ api, event }) {
  const { threadID, messageID, senderID, mentions, body } = event;

  // Admin check
  const threadInfo = await api.getThreadInfo(threadID);
  const isAdmin = threadInfo.adminIDs.some(admin => admin.id === senderID);

  if (!isAdmin) {
    return api.sendMessage("❌ | এই কমান্ডটি চালাতে হলে অ্যাডমিন হতে হবে!", threadID, messageID);
  }

  // Stop command
  if (body.toLowerCase().includes("stop")) {
    if (activeWars[threadID]) {
      clearInterval(activeWars[threadID]);
      delete activeWars[threadID];
      return api.sendMessage("🛑 | গালির যুদ্ধ থেমে গেছে ভাই!", threadID, messageID);
    } else {
      return api.sendMessage("⚠️ | এখন কোনো যুদ্ধ চলছে না।", threadID, messageID);
    }
  }

  const mentionedIDs = Object.keys(mentions);
  if (mentionedIDs.length === 0) {
    return api.sendMessage("⚠️ | দয়া করে আগে কাউকে @mention করো!", threadID, messageID);
  }

  const targetID = mentionedIDs[0];
  const targetName = mentions[targetID];

  const bokas = [
    "তোগোরে ফাসিতে লটকাইয়া চুদমু",
    "তোগোর ধোন টাইনা তোগোর পিছন দিয়া ঢুকামু",
    "জং ধরা লোহা দিয়া পাকিস্তানের মানচিত্র বানাই্য়া তোদের পিছন দিয়া ঢুকামু।",
    "তর মায়ের ভোদা শিরিষ কাগজ দিয়া ঘইষা দিমু।",
    "তর মায়ের ভোদা বোম্বাই মরিচ দিয়া চুদামু।",
    "তর হোগায় ইনপুট, তর মায়ের ভোদায় আউটপুট।",
    "তর বাপের পুটকির ফুটা দিয়া কাডল ঢুকামু।",
    "নিজামীর গোয়ার কৃমি।",
    "তর বাপের ধন দিয়া ডাংগুলি খেলুম।",
    "তর বাপের বিচি বেইচা কটকটি খামু।",
    "তর বৌয়ের ভোদায় মাগুর মাছ চাষ করুম।",
    "তর ধন দিয়া মাটি খুড়ুম।",
    "ফাটা কন্ডমের ফসল।",
    "লাত্থায় তর মার শ্বশুরবাড়ী ফাকিস্তান পাঠায় দিমু।",
    "হাতির ল্যাওড়া দিয়া তর মায়েরে চুদুম।",
    "তর মায়ের ভোদা ছিল্লা লবণ লাগায় দিমু।",
    "তর বাপের হোগা দিয়া ট্রেন ভইরা দিমু।",
    "তরে গোআ দিয়া চুদামু",
    "এক কানে হোল ভইরা আরেক কান দিয়া বাইর করমু।",
    "তোর হোল ভাজি কইরা তোরেই খাওয়ামু",
    "কুত্তার পুকটি চাটামু",
    "মাসিকের ত্যানা।",
    "তোর নাকে হাইগ্যা দিমু।",
    "তোর বাপ গাইড়্যা।",
    "মোবাইল ভাইব্রেশন কইরা তুর পুকটিতে ভরবো।",
    "তোর বইয়ের মুসলমানি দিমু।",
    "তোর বাপে তোর নানা।"
  ];

  let index = 0;
  activeWars[threadID] = setInterval(() => {
    if (index >= bokas.length) {
      clearInterval(activeWars[threadID]);
      delete activeWars[threadID];
      return api.sendMessage(`😈 | যুদ্ধ শেষ! ${targetName} ভাইরে শিক্ষা হইছে!`, threadID);
    }

    api.sendMessage({
      body: `😡 ${targetName}, ${bokas[index]}`,
      mentions: [{
        tag: targetName,
        id: targetID
      }]
    }, threadID);

    index++;
  }, 3000); // প্রতি ৩ সেকেন্ডে একটা করে মেসেজ যাবে
};
