module.exports = {
  root: true,
  extends: [
    "@react-native-community",
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:prettier/recommended",
    "plugin:@tanstack/eslint-plugin-query/recommended",
  ],
  plugins: ["react", "react-native", "prettier"],
  rules: {
    "react/jsx-uses-react": "off",
    "react/react-in-jsx-scope": "off",
    "prettier/prettier": "warning",
  },
};
