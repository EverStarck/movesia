module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    plugins: [
      "@babel/plugin-proposal-export-namespace-from",
      require.resolve("expo-router/babel"),
      [
        "module:react-native-dotenv",
        {
          moduleName: "@env",
          path: ".env",
        },
      ],
      [
        "module-resolver",
        {
          root: ["."],
          alias: {
            "@": "./",
          },
        },
      ],
    ],
  };
};
