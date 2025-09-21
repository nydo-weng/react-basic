const path = require("path");

module.exports = {
  webpack: {
    // 别名配置, 让 @ 指向 src
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
};
