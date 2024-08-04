const cron = require("cron");
const https = require("https");
require("dotenv").config();

const apiUrl = `${process.env.BACKEND_URL_API}`;
const job = new cron.CronJob("*/5 * * * *", function () {
  console.log("Restarting Server...");

  https
    .get(apiUrl, (res) => {
      if (res.statusCode === 200) {
        console.log("Server restarted");
      } else {
        console.error(
          `Failed to restart server with error code: ${res.statusCode}`
        );
      }
    })
    .on("error", (error) => {
      console.error(`Error occurred while restarting server ${error.message}`);
    });
});

module.exports = {
  job,
};
