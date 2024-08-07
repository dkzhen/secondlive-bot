const cron = require("node-cron");
const express = require("express");
const { configDotenv } = require("dotenv");
const { checkInToday } = require("./func/checkInToday");
const { dailySpinner } = require("./func/dailySpinner");
const { claimFarming } = require("./func/claimFarming");
const { crushLocker } = require("./func/crushLocker");
configDotenv();

checkInToday();
dailySpinner();
claimFarming();
crushLocker();
cron.schedule("0 * * * *", checkInToday);
cron.schedule("0 * * * *", dailySpinner);
cron.schedule("0 * * * *", claimFarming);
cron.schedule("0 * * * *", crushLocker);

// Start the server
const port = process.env.PORT || 103;
const app = express();

app.get("/", (req, res) => {
  res.send("API cron job server is running");
});

app.listen(port, async () => {
  console.log(`Server is running on port ${port}`);
});
