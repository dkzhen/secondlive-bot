const { default: axios } = require("axios");
const { validateToken } = require("./CheckValidToken");
const { checkIn } = require("./repo");

exports.checkInToday = async () => {
  try {
    const tokens = await validateToken();
    for (const token of tokens) {
      const now = await checkIn(token.token);
      if (now.length < 1) return null;
      const [is_today] = now.filter((item) => item.is_today === true);

      if (!is_today.is_checkin) {
        await axios.post(
          "https://app.secondlive.world/api/user/checkin",
          {},
          {
            headers: {
              Authorization: `Bearer ${token.token}`,
            },
          }
        );
        console.log(is_today);
        console.log(`[ Running ] : Checkin Successfully.`);
      } else {
        console.log(`[ Completed ] : days: ${is_today.days} has been checkin`);
      }
    }
  } catch (error) {
    console.log`    [ Error ] : ${error.message}`;
  }
};
