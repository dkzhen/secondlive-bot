const { default: axios } = require("axios");

exports.checkIn = async (token) => {
  try {
    const API_URL =
      "https://app.secondlive.world/api/user/checkin-list?checkin_type=Centralized";
    const checkIn = await axios.get(API_URL, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return checkIn.data.data;
  } catch (error) {
    throw error.message;
  }
};
