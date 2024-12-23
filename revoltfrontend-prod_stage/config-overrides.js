const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
module.exports = function override(config, env) {
  // ... other configurations ...
  config.optimization = {
    ...config.optimization,
    minimize: true,
    minimizer: [new TerserPlugin()],
  };
  // Add OptimizeCSSAssetsPlugin for CSS minification
  config.optimization.minimizer.push(
    new OptimizeCSSAssetsPlugin({
      cssProcessorPluginOptions: {
        preset: ["default", { discardComments: { removeAll: true } }],
      },
    }),
  );

  console.log(
    "config-overrides.js is executing: #######################################",
    new Date().toLocaleString(),
  );

  return config;
};
