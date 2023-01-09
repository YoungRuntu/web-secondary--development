module.exports = {
  '/api': {
    // 'target': 'http://192.168.1.240:43210/',
    'target': 'http://10.15.111.16:8082',
    // 'target': 'http://8.142.67.172:18018/',
    'changeOrigin': true,
    'pathRewrite': { '^/api': '' },
  },
}