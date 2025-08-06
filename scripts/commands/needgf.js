const axios = require("axios");
const fs = require("fs");
const path = require("path");
const https = require("https");

const encodedUrl = "aHR0cHM6Ly9yYXNpbi14LWFwaXMub25yZW5kZXIuY29tL2FwaS9yYXNpbi9nZg==";
const encodedKey = "cnNfdDFnM2Izc2EtOXloZS1ja3g3LTlvdzEtcnA=";

function decode(b64) {
  return Buffer.from(b64, "base64").toString("utf-8");
}

function downloadImage(url, filePath) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(filePath);
    https.get(url, res => {
      if (res.statusCode !== 200) return reject(new Error(`Image fetch failed with status: ${res.statusCode}`));
      res.pipe(file);
      file.on("finish", () => file.close(resolve));
    }).on("error", err => {
      if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
      reject(err);
    });
  });
}

module.exports.config = {
  name: "needgf",
  version: "1.0.0",
  hasPermssion: 0,
  credits: "Ullash api rasin",
  description: "সিঙ্গেলদের শেষ ভরসার ছবি পাঠাবে",
  prefix: false,
  commandCategory: "fun",
  usages: "needgf",
  cooldowns: 20,
};

module.exports.run = async function({ api, event }) {
  try {
    const apiUrl = decode(encodedUrl);
    const apiKey = decode(encodedKey);
    const fullUrl = `${apiUrl}?apikey=${apiKey}`;

    const res = await axios.get(fullUrl);
    const title = res.data.data.title || "Here's your GF image!";
    const imgUrl = res.data.data.url;

    if (!imgUrl) return api.sendMessage("😔 ছবি পাওয়া যায়নি, পরে আবার চেষ্টা করো।", event.threadID, event.messageID);

    const imgDir = path.join(__dirname, "cache");
    if (!fs.existsSync(imgDir)) fs.mkdirSync(imgDir);

    const imgPath = path.join(imgDir, `${event.senderID}_gf.jpg`);
    await downloadImage(imgUrl, imgPath);

    api.sendMessage(
      {
        body: title,
        attachment: fs.createReadStream(imgPath)
      },
      event.threadID,
      () => fs.unlinkSync(imgPath),
      event.messageID
    );

  } catch (err) {
    console.error("❌ needgf error:", err.message);
    api.sendMessage("❌ কিছু সমস্যা হয়েছে, পরে আবার চেষ্টা করো।", event.threadID, event.messageID);
  }
};
