const cron = require("node-cron");
const express = require("express");
const { configDotenv } = require("dotenv");
const { checkInToday } = require("./func/checkInToday");
const { dailySpinner } = require("./func/dailySpinner");
const { claimFarming } = require("./func/claimFarming");
const { crushLocker } = require("./func/crushLocker");
const fs = require("fs").promises;
configDotenv();

checkInToday();
dailySpinner();
claimFarming();

async function boost() {
  const config = await fs.readFile("configs/config.json", "utf-8");
  const data = JSON.parse(config);

  for (const item of data) {
    if (item.token == null)
      return console.log(
        `[ Error ] : Token not found, please add token on configs/config.json`
      );
    if (item.boost == null)
      return console.log(
        `[ Error ] : Boost config not found, please add boost on configs/config.json`
      );
    if (item.boost.enable) {
      crushLocker();
      cron.schedule("0 * * * *", crushLocker);
    } else {
      console.log(`[ Boost ] : Auto upgrade crush locker is disabled`);
    }
  }
}

boost();

cron.schedule("0 * * * *", checkInToday);
cron.schedule("0 * * * *", dailySpinner);
cron.schedule("0 * * * *", claimFarming);

// Start the server
const port = process.env.PORT || 103;
const app = express();

app.get("/", (req, res) => {
  res.send("API cron job server is running");
});

app.listen(port, async () => {
  console.log(`Server is running on port ${port}`);
});
