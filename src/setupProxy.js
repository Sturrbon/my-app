const proxy = require('http-proxy-middleware')

module.exports = function (app) {
  app.use(proxy('/jingdong', { target: 'http://119.23.228.131:8091/api/'}))
  app.use(proxy('/taobao', { target: 'http://119.23.228.131:8092/api/'}))
  app.use(proxy('/unicom', { target: 'http://119.23.228.131:8093/api/'}))
  app.use(proxy('/mobile', { target: 'http://119.23.228.131:8094/api/'}))
  app.use(proxy('/telecom', { target: 'http://119.23.228.131:8095/api/'}))
}