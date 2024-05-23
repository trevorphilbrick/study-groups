// Learn more https://docs.expo.io/guides/customizing-metro
const { getDefaultConfig } = require("expo/metro-config");

/** @type {import('expo/metro-config').MetroConfig} */
const config = getDefaultConfig(__dirname, {
  env: {
    production: {
      plugins: ["react-native-paper/babel"],
    },
  },
});

module.exports = config;
