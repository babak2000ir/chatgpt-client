//env import & config
import dotenv from 'dotenv';
dotenv.config({ path: '../.env' });

//import node
import path from 'node:path';
import { fileURLToPath } from 'node:url';

//import npm
import Koa from 'koa';
import bodyParser from 'koa-bodyparser';
import serve from 'koa-static';

//import modules
import openaiApi from './openai-api-router.js';
import ollamaApi from './ollama-api-router.js';
import { startJobs } from './processing-agent.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

//koa app
const app = new Koa();
app.use(bodyParser({
  enableTypes: ['json'],
  jsonLimit: '100mb'
}));

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

app.use(async (ctx, next) => {
  // Log the request to the console
  const timeStamp = `${(new Date()).toLocaleDateString('en-GB')} ${(new Date()).toLocaleTimeString('en-GB')}`;
  console.log(`${timeStamp} ${ctx.request.method} '${ctx.request.url}' ${JSON.stringify(ctx.request.body)}`);
  await next();
});

app.use(openaiApi.routes());
app.use(ollamaApi.routes());

if (process.env.NODE_ENV === 'development') {
  app.use(serve(path.join(__dirname, '../../client/build')));
  app.use(serve(path.join(__dirname, '../../client/public')));
}
else
  app.use(serve(path.join(__dirname, '../../dist/client')));

const port = process.env.serverport || 8080;

Init()
  .then(() => {
    app.listen(port, () => {
      console.log(`Server is listening on port ${port}`);
      initCompleted();
    });
  })
  .catch((error) => {
    console.log(`Initialization error: ${error}`);
    const errorApp = new Koa();
    errorApp.use(async (ctx) => {
      ctx.status = 500;
      ctx.body = `Initialization error: ${error}`;
    });

    errorApp.listen(port, () => {
      console.log(`Error server is running on port ${port}`);
    });
  });

async function Init() {
  console.log('Init Started.');
}

async function initCompleted() {
  startJobs();
  console.log('Init Completed.');
}
