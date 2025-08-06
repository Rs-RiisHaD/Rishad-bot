const axios = require("axios");

module.exports.config = {
  name: "hug",
  version: "1.0.0",
  permission: 0,
  credits: "RiisHaD SoBuJ",
  description: "Send hug using canvas API (stream version)",
  prefix: false,
  category: "fun",
  usages: "hug @mention",
  cooldowns: 5,
  dependencies: {
    axios: ""
  }
};

module.exports.run = async function ({ api, event }) {
  const { threadID, messageID, senderID, mentions } = event;

  // চেক করি কেউ মেনশন করা হয়েছে কি না
  if (Object.keys(mentions).length === 0) {
    return api.sendMessage("⚠️ দয়া করে কাউকে @mention করে হাগ পাঠাও!", threadID, messageID);
  }

  // প্রথম মেনশন ইউজারের ID নিলাম
  const mentionID = Object.keys(mentions)[0];

  // নাম ঠিকমত পেতে চেষ্টা করছি
  let mentionName = mentions[mentionID];
  if (typeof mentionName !== "string") {
    mentionName = mentionName.replace("@", "") || "Friend";
  }

  // API বেস URL চেক করছি
  if (!global.imranapi || !global.imranapi.canvas) {
    return api.sendMessage("❌ API বেস URL সেট করা হয় নি। অ্যাডমিনের সাথে যোগাযোগ করো।", threadID, messageID);
  }

  // API থেকে ছবি লোডের URL
  const imgURL = `${global.imranapi.canvas}/hug?one=${senderID}&two=${mentionID}`;

  try {
    // API থেকে ছবি স্ট্রিম আকারে নিয়ে আসছি
    const response = await axios.get(imgURL, { responseType: "stream" });

    // মেসেজ এবং ছবি পাঠাচ্ছি
    return api.sendMessage({
      body: `🤗 ${mentionName}, তোমাকে একটা হাগ পাঠানো হলো!`,
      attachment: response.data
    }, threadID, messageID);
  } catch (error) {
    console.error("Hug command error:", error);
    return api.sendMessage("❌ দুঃখিত, হাগ পাঠাতে সমস্যা হচ্ছে। পরে চেষ্টা করো।", threadID, messageID);
  }
};
