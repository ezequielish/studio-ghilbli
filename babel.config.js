module.exports = {
  presets: [
    "@babel/preset-env",
    "@vue/cli-plugin-babel/preset",
  ],
  plugins: [
    "@babel/plugin-transform-runtime",
    "@babel/plugin-proposal-optional-chaining",
    ["@babel/plugin-proposal-private-methods", { loose: false }]
  ]
}
