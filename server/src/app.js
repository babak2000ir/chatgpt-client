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
import Router from 'koa-router';
import OpenAI from "openai";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = new Koa();
const router = new Router();
app.use(bodyParser());

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

router.post('/api', async (ctx) => {
  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });

  const response = await openai.chat.completions.create({
    ...ctx.request.body,
    model: process.env.OPENAI_MODEL,
    response_format: {
      type: 'text'
    },
    stream: false,
  }).withResponse()

  //console.log("API response: " + api_reponse);

  //put all key values of the headers in an array
  const headers = Array.from(response.response.headers.entries()).map(([key, value]) => ({ key, value }));

  ctx.body = {
    headers,
    response: response.data,
    reply: response.data.choices?.[0]?.message.content || ""
  };
  /*   try {
      for await (const chunk of stream) {
        console.log(`\n${JSON.stringify(chunk)}\n`);
        chunks.push(chunk);
        api_reponse += chunk.choices[0]?.delta?.content || "";
      }
    } 
    finally {
      console.log("API response: " + api_reponse);
      ctx.body = { api_reponse, chunks, stream };
    }*/
});

app.use(router.routes());

if (process.env.NODE_ENV === 'development') {
  app.use(serve(path.join(__dirname, '../../client/build')));
  app.use(serve(path.join(__dirname, '../../client/public')));
}
else
  app.use(serve(path.join(__dirname, '../../dist/client')));

const port = process.env.port || 8080;

Init()
  .then(() => {
    app.listen(port, () => {
      console.log(`Server is listening on port ${port}`);
      initCompleted();
    });
  })
  .catch((error) => {
    console.log(`Initialization error: ${error}`);
  });


async function Init() {
  console.log('Init Started.');
}

async function initCompleted() {
  console.log('Init Completed.');
}
