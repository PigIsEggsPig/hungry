/**
 * Created by PC on 2017/4/25.
 */
var express = require('express');
var config = require('./config/index');
var port = process.env.PORT || config.build.port;

var app = express();
var router = express.Router();
router.get('/', function (req, res, next) {
  req.url = '/index.html';
  next();
});

app.use(router);

var appData = require('./data.json');
var seller = appData.seller;
var goods = appData.goods;
var ratings = appData.ratings;

//  定义路由
var apiRoutes = express.Router();
apiRoutes.get('/seller', function (req, res) {
  res.json({
    errno: 0,
    data: seller
  });
});

apiRoutes.get('/goods', function (req, res) {
  res.json({
    errno: 0,
    data: goods
  });
});

apiRoutes.get('/ratings', function (req, res) {
  res.json({
    errno: 0,
    data: ratings
  });
});
//  使用路由创建虚拟目录
app.use('/api', apiRoutes);

app.use(express.static('./dist'));

//  启动服务
var uri = 'http://localhost:' + port;

var _resolve;
var readyPromise = new Promise(resolve => {
  _resolve = resolve
});

console.log('> Starting dev server...');
var server = app.listen(port);

module.exports = {
  ready: readyPromise,
  close: () => {
    server.close()
  }
};
