const path = require('path');

module.exports = {
    // 기존 웹팩 설정...
  
    resolve: {
      fallback: {
        zlib: require.resolve('browserify-zlib'),
        querystring: require.resolve('querystring-es3'),
        path: require.resolve('path-browserify'),
        crypto: require.resolve('crypto-browserify'),
        stream: require.resolve('stream-browserify'),
        util: require.resolve('util/'),
        buffer: require.resolve('buffer/'),
        url: require.resolve('url/'),
        fs: false, // 필요 없는 경우 false로 설정
        net: false, // 필요 없는 경우 false로 설정
        http: require.resolve('stream-http'),
      },
    },
  };