const https = require("https");

const GITHUB_TOKEN = process.env.GH_TOKEN;
const REPOSITORY = process.env.GITHUB_REPOSITORY;
const RELEASE_ID = process.env.RELEASE_ID;

const options = {
  hostname: "api.github.com",
  port: 443,
  path: `/repos/${REPOSITORY}/releases/${RELEASE_ID}/assets`,
  method: "GET",
  headers: {
    "Authorization": `token ${GITHUB_TOKEN}`,
    "Accept": "application/vnd.github+json",
    "User-Agent": "GitHub Actions"
  },
};

https.get(options, (res) => {
  let data = "";

  res.on("data", (chunk) => {
    data += chunk;
  });

  res.on("end", () => {
    console.log("Assets:", data);
  });
}).on("error", (err) => {
  console.log("Error:", err.message);
});
