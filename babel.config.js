module.exports = function (api) {
  api.cache.using(() => process.env.NODE_ENV);

  const presets = [
    "@babel/preset-env",
    "@babel/preset-react",
  ];
  const plugins = [
    "@babel/plugin-proposal-object-rest-spread",
    ["@babel/plugin-proposal-decorators", { "legacy": true }],
    ["@babel/plugin-proposal-class-properties", { "loose" : true }],
    ["@babel/plugin-proposal-optional-chaining"],
    ["@babel/plugin-proposal-nullish-coalescing-operator"],
  ];

  if (!api.env('production')) {
    plugins.push(["react-refresh/babel"])
  }

  return {
    presets,
    plugins
  };
};
