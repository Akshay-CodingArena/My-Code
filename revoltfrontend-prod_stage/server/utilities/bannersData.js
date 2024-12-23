const axios = require("axios");
const fs = require("fs");
const path = require("path");

const bannersDataUpdate = async () => {
  const url =
    process.env.REACT_APP_URL_API +
    "/api/v1/common/marketing/bannerdata?status=1";

  const { data } = await axios.get(url);
  let temp = Object.values(data).filter((key) => typeof key == "object");

  const bannersData = temp.map((item) => {
    if (item.desktop) {
      item.desktop_url =
        process.env.REACT_APP_S3_BASE + "/" + item.desktop.image;
      item.mobile_url = process.env.REACT_APP_S3_BASE + "/" + item.mobile.image;
      item.id = process.env.REACT_APP_S3_BASE + "/" + item.id;
    }
    return item;
  });
  fs.writeFileSync(
    path.resolve(__dirname, "..", "..", "build", "bannersData.json"),
    JSON.stringify(bannersData),
  );
  return bannersData;
};

module.exports = { bannersDataUpdate };
