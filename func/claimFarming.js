const { default: axios } = require("axios");
const { validateToken } = require("./CheckValidToken");

exports.claimFarming = async () => {
  try {
    const tokens = await validateToken();

    for (const token of tokens) {
      const claim = await axios.post(
        "https://app.secondlive.world/api/user/figure/claim",
        {
          is_claim_double: false,
        },
        {
          headers: {
            Authorization: `Bearer ${token.token}`,
          },
        }
      );

      if (claim.data.code === 100002)
        return console.log(`[ Completed ] : No claim left. ${claim.data.data}`);

      console.log(
        `[ Running ] : Claim farming successfully. Rewards: ${claim.data.data.claim_intimacy} CRUSH`
      );
    }
  } catch (error) {
    console.log(error.message);
  }
};
