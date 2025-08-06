module.exports.config = {
  name: "lovemeter",
  version: "1.0.0",
  hasPermssion: 0,
  credits: "RiisHaD",
  description: "Love compatibility checker 💘",
  commandCategory: "fun",
  usages: "[tag1] [tag2]",
  cooldowns: 5,
};

module.exports.run = async function ({ api, event }) {
  const { threadID, messageID, mentions } = event;

  try {
    const mentionIDs = Object.keys(mentions);
    if (mentionIDs.length < 2) {
      return api.sendMessage(
        "⚠️ দয়া করে দুইজনকে মেনশন করো, যেমন:\n\nlovemeter @user1 @user2",
        threadID,
        messageID
      );
    }

    // মেনশন থেকে নামগুলো ধরে নিচ্ছি
    const name1 = mentions[mentionIDs[0]];
    const name2 = mentions[mentionIDs[1]];

    // র‍্যান্ডম প্রেমের শতাংশ
    const lovePercent = Math.floor(Math.random() * 101);

    // ফলাফল তৈরি
    let result = "";
    if (lovePercent >= 90) {
      result = "💍 বিয়ের তারিখ ঠিক করে ফেলো! একে অপরের জন্যই তৈরি 💖";
    } else if (lovePercent >= 70) {
      result = "😍 একে অপরকে খুব ভালো বোঝো, প্রেম জমে ক্ষীর!";
    } else if (lovePercent >= 50) {
      result = "😊 কিছু ঝামেলা থাকলেও প্রেম জমবে আশা করি!";
    } else if (lovePercent >= 30) {
      result = "😐 একটু কষ্ট হবে, কিন্তু চেষ্টা করলে সব হয়!";
    } else {
      result = "💔 Friend zone detected... প্রেমে ব্যালেন্স নাই!";
    }

    const message = `🔮 ভালোবাসা বিশ্লেষণ:\n💑 ${name1} ❤️ ${name2}\n❤️ Matching: ${lovePercent}%\n\n${result}`;

    return api.sendMessage(message, threadID, messageID);
  } catch (err) {
    console.error("lovemeter error:", err);
  }
};
