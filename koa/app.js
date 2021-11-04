const Koa = require('koa');
const Router = require('koa-router'); // 引入koa-router

const app = new Koa();
const router = new Router(); // 创建路由，支持传递参数

// logger

app.use(async (ctx, next) => {
  await next();
  const rt = ctx.response.get('X-Response-Time');
  console.log(`${ctx.method} ${ctx.url} - ${rt}`);
});

// x-response-time

app.use(async (ctx, next) => {
  const start = Date.now();
  await next();
  const ms = Date.now() - start;
  ctx.set('X-Response-Time', `${ms}ms`);
});

// response

router.get('/ping', async (ctx) => {
  ctx.type = 'html';
  ctx.body = 'pong!';
})

router.get('/api/ping', async (ctx) => {
  ctx.type = 'html';
  ctx.body = '/api/ping!';
})

router.get('/bff/ping', async (ctx) => {
  ctx.type = 'html';
  ctx.body = '/bff/ping!';
})

router.get('/bff/ehr/user/profile', async (ctx) => {
  ctx.type = 'html';
  ctx.body = '/bff/ehr/user/profile!';
})

router.get('/api/ehr/user/profile', async (ctx) => {
  ctx.type = 'html';
  ctx.body = '/api/ehr/user/profile!';
})

router.get('/', async (ctx) => {
  ctx.type = 'html';
  ctx.body = 'it‘s work!';
})

// 调用router.routes()来组装匹配好的路由，返回一个合并好的中间件
// 调用router.allowedMethods()获得一个中间件，当发送了不符合的请求时，会返回 `405 Method Not Allowed` 或 `501 Not Implemented`
app.use(router.routes());
app.use(router.allowedMethods({
  // throw: true, // 抛出错误，代替设置响应头状态
  // notImplemented: () => '不支持当前请求所需要的功能',
  // methodNotAllowed: () => '不支持的请求方式'
}));


// app.use(async ctx => {
//   ctx.body = 'it‘s work!’';
// });

// 启动服务监听本地80端口
app.listen(3000, () => {
  console.log('应用已经启动，http://localhost:3000');
})