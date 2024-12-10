module.exports = {
    webpack: {
      configure: (webpackConfig) => {
        webpackConfig.module.rules.forEach((rule) => {
          if (
            rule.enforce === 'pre' &&
            rule.use &&
            rule.use.some((u) => u.loader && u.loader.includes('source-map-loader'))
          ) {
            rule.exclude = [/node_modules\/@mediapipe\/tasks-vision/];
          }
        });
        return webpackConfig;
      },
    },
  };
  