module.exports.config = {
  name: "lovetest",
  version: "1.0.0",
  hasPermssion: 0,
  credits: "RiisHaD",
  description: "Love compatibility checker 💘",
  commandCategory: "fun",
  usages: "[tag1] [tag2]",
  cooldowns: 5,
};

module.exports.run = async function({ api, event, args }) {
  const mention = Object.keys(event.mentions);
  if (mention.length < 2) {
    return api.sendMessage("⚠️ দয়া করে দুজনকে mention করো\nযেমন: lovetest @A @B", event.threadID, event.messageID);
  }

  const name1 = event.mentions[mention[0]].replace("@", "");
  const name2 = event.mentions[mention[1]].replace("@", "");

  const lovePercent = Math.floor(Math.random() * 101); // 0 to 100

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

  const msg = `🔮 ভালোবাসা বিশ্লেষণ:
💑 ${name1} ❤️ ${name2}
❤️ Matching: ${lovePercent}%

${result}`;

  return api.sendMessage(msg, event.threadID, event.messageID);
};
