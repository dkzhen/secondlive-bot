const { default: axios } = require("axios");
const { validateToken } = require("./CheckValidToken");

exports.dailySpinner = async () => {
  try {
    const tokens = await validateToken();

    for (const token of tokens) {
      const spin = await axios.post(
        "https://app.secondlive.world/api/lottery-turntable/use",
        {},
        {
          headers: {
            Authorization: `Bearer ${token.token}`,
          },
        }
      );

      if (spin.data.code === 100002)
        return console.log(
          `[ Completed ] : No daily spins left. ${spin.data.data}`
        );
      console.log(
        `[ Running ] : Daily Spinner Successfully. Rewards: ${spin.data.data.prize_amount}`
      );
    }
  } catch (error) {
    console.log(error.message);
  }
};
