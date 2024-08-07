const { default: axios } = require("axios");
const { getTokens } = require("./GetTokens");
const { configDotenv } = require("dotenv");
const { checkIn } = require("./repo");
configDotenv();

exports.validateToken = async () => {
  const tokens = await getTokens();

  const validToken = [];
  for (const token of tokens) {
    try {
      await checkIn(token.token);
      validToken.push(token);
    } catch (error) {
      console.log(`[ Error ] : token not valid , response code : ${error}`);
    }
  }
  console.log(`[ Token valid ] : ${validToken.length}\n`);
  return validToken;
};
