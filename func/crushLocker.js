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

      const intimacyBalance = Number(info.data.data.intimacy_balance);
      const storageCost = Number(
        info.data.data.level_info.next_storage_consume_amount
      );
      const spaceCost = Number(
        info.data.data.level_info.next_space_consume_amount
      );

      // Flag to track if either upgrade happens
      let upgradePerformed = false;

      // Check if intimacy balance is sufficient for storage upgrade
      if (intimacyBalance >= storageCost) {
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
        upgradePerformed = true;
      } else {
        console.log(
          `[ BOT ] : Error Upgrade Crush Locker. Insufficient CRUSH Balance. Current Balance: ${intimacyBalance} CRUSH, Required: ${storageCost} CRUSH`
        );
      }

      // Check if intimacy balance is sufficient for space upgrade
      if (intimacyBalance >= spaceCost) {
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
        upgradePerformed = true;
      } else {
        console.log(
          `[ BOT ] : Error Upgrade Space. Insufficient CRUSH Balance. Current Balance: ${intimacyBalance} CRUSH, Required: ${spaceCost} CRUSH`
        );
      }

      // If no upgrade was performed, log a message
      if (!upgradePerformed) {
        console.log(
          `[ BOT ] : No upgrades performed due to insufficient balance for both storage and space.`
        );
      }
    }
  } catch (error) {
    console.log(error.message);
  }
};
