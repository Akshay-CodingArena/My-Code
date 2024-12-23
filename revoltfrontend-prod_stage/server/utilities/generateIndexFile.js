const { headHome, bodyHome, headApp, bodyApp } = require("./contentPrepend");
const fs = require("fs");
const path = require("path");
const IndexFetcher = async () => {
  let data = fs.readFileSync(
    path.resolve(__dirname, "..", "..", "build", "index.html"),
    "utf-8",
  );
  return data;
};

const BRZFetcher = async () => {
  let data = fs.readFileSync(
    path.resolve(__dirname, "..", "..", "build", "rv400-brz.html"),
    "utf-8",
  );
  return data;
};
const HomeIndex = `<html><head>${headHome}</head><body>${bodyHome}</body></html>`;
const AppIndex = `<html><head>${headApp}</head><body>${bodyApp}</body></html>`;

export { HomeIndex, AppIndex, IndexFetcher, BRZFetcher };
