const { default: axios } = require("axios");
const { validateToken } = require("./CheckValidToken");

exports.crushLocker = async () => {
  try {
    const tokens = await validateToken();
    for (const token of tokens) {
      const info = await axios.get(
        "https://app.secondlive.world/api/user/figure/info",
        {
          headers: {
            Authorization: `Bearer ${token.token}`,
          },
        }
      );

      if (info.data.data == null) return null;

      if (
        Number(info.data.data.intimacy_balance) <
        Number(
          info.data.data.level_info.next_storage_consume_amount ||
            Number(info.data.data.intimacy_balance) <
              Number(info.data.data.level_info.next_space_consume_amount)
        )
      )
        return console.log(
          `[ BOT ] : Error Upgrade Crush Locker or Space. Insufficient CRUSH Balance. Current Balance : ${info.data.data.intimacy_balance} CRUSH`
        );
      const upgrade = await axios.post(
        "https://app.secondlive.world/api/user/figure/upgrade",
        { upgrade_type: "storage" },
        {
          headers: {
            Authorization: `Bearer ${token.token}`,
          },
        }
      );
      console.log(
        `[ Running ] : Upgrade Crush Locker Lv ${upgrade.data.data.after_level} Successfully.`
      );
      const space = await axios.post(
        "https://app.secondlive.world/api/user/figure/upgrade",
        { upgrade_type: "space" },
        {
          headers: {
            Authorization: `Bearer ${token.token}`,
          },
        }
      );
      console.log(
        `[ Running ] : Space Lv ${space.data.data.after_level} Successfully.`
      );
    }
  } catch (error) {
    console.log(error.message);
  }
};
