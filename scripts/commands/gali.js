const fs = require("fs");
const path = __dirname + "/gali.json";

// গালি ফাইল না থাকলে তৈরি করবে
if (!fs.existsSync(path)) fs.writeFileSync(path, JSON.stringify([
  "তুই গাধা নয়, গাধার বাপ! 🐴",
  "তোর মগজে RAM থাকলে তুই hang করতে না! 💻",
  "তুই একটা চলন্ত error! 💥",
  "calculator তোকে ক্যালকুলেট করতে চায় না! 😂",
  "debugger তোকে দেখলে pause মারে! ⏸️",
  "তুই এমন একটা BUG, যারে fix করলে system crash করে! 🔥"
], null, 2));

function loadGaliList() {
  return JSON.parse(fs.readFileSync(path));
}

function saveGaliList(data) {
  fs.writeFileSync(path, JSON.stringify(data, null, 2));
}

module.exports.config = {
  name: "gali",
  version: "5.0.0",
  permission: 1, // Admin only
  credits: "RiisHaD SoBuJ",
  description: "গালি কমান্ড - bomb, add সহ",
  category: "fun",
  usages: "gali @mention | gali bomb @mention | gali add [গালি]",
  cooldowns: 5
};

module.exports.run = async function ({ api, event, args, messageID, threadID, senderID, mentions }) {
  const threadInfo = await api.getThreadInfo(threadID);
  const isAdmin = threadInfo.adminIDs.some(admin => admin.id === senderID);

  if (!isAdmin) return api.sendMessage("❌ ভাই, permission নাই! শুধু অ্যাডমিন চালাতে পারবে।", threadID, messageID);

  const subcmd = args[0]?.toLowerCase();

  const allGalies = loadGaliList();

  if (subcmd === "add") {
    const newGali = args.slice(1).join(" ");
    if (!newGali) return api.sendMessage("⚠️ দয়া করে একটি গালি লিখো!", threadID, messageID);

    allGalies.push(newGali);
    saveGaliList(allGalies);
    return api.sendMessage(`✅ নতুন গালি যুক্ত হলো:\n"${newGali}"`, threadID, messageID);
  }

  if (subcmd === "bomb") {
    const mentionedIDs = Object.keys(mentions);
    if (mentionedIDs.length === 0) return api.sendMessage("⚠️ আগে কাউকে @mention করো!", threadID, messageID);

    const targetID = mentionedIDs[0];
    const targetTag = mentions[targetID];
    const total = 20;

    for (let i = 0; i < total; i++) {
      const gali = allGalies[Math.floor(Math.random() * allGalies.length)];
      await new Promise(r => setTimeout(r, 600));
      await api.sendMessage({
        body: `😡 ওই ${targetTag}, ${gali}`,
        mentions: [{ tag: targetTag, id: targetID }]
      }, threadID);
    }
    return;
  }

  // সাধারন gali @mention
  const mentionedIDs = Object.keys(mentions);
  if (mentionedIDs.length === 0) return api.sendMessage("⚠️ কাউকে @mention করো!", threadID, messageID);

  const targetID = mentionedIDs[0];
  const targetTag = mentions[targetID];

  for (const gali of allGalies.slice(0, 10)) {
    await new Promise(r => setTimeout(r, 700));
    await api.sendMessage({
      body: `😡 ওই ${targetTag}, ${gali}`,
      mentions: [{ tag: targetTag, id: targetID }]
    }, threadID);
  }
};
