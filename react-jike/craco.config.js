// 扩展 webpack 的配置

const path = require("path");
// 引入辅助函数
const { whenProd, getPlugin, pluginByName } = require("@craco/craco");

console.log("Current NODE_ENV:", process.env.NODE_ENV);
module.exports = {
  // webpack 配置
  webpack: {
    // 配置别名
    alias: {
      // 约定: 使用 @ 表示 src 文件所在路劲
      "@": path.resolve(__dirname, "src"),
    },
    // 配置 CDN
    configure: (webpackConfig) => {
      let cdn = { js: [], css: [] }; // 添加默认值
      whenProd(() => {
        console.log("进生产");
        webpackConfig.externals = {
          react: "React",
          "react-dom": "ReactDOM",
        };
        cdn = {
          js: [
            "https://cdnjs.cloudflare.com/ajax/libs/react/18.1.0/umd/react.production.min.js",
            "https://cdnjs.cloudflare.com/ajax/libs/react-dom/18.1.0/umd/react-dom.production.min.js",
          ],
          css: [],
        };
      });

      // 通过 htmlWebpackPlugin 插件, 在 public/index.html注入 cdn 资源 url
      const { isFound, match } = getPlugin(webpackConfig, pluginByName("HtmlWebpackPlugin"));

      if (isFound) {
        // 找到了 HtmlWebpackPlugin 的插件
        console.log("HtmlWebpackPlugin found");
        console.log("CDN configuration:", cdn);
        match.userOptions.cdn = cdn;
      } else {
        console.log("HtmlWebpackPlugin not found");
      }

      return webpackConfig;
    },
  },
};
