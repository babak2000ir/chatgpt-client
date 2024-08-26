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
    model: process.env.OPENAI_MODEL,
    frequency_penalty: 0, //between -2.0 and 2.0 - decrease repeat
    temperature: 1, //between 0 and 1 - randomness
    top_p: 1, //between 0 and 1 - nucleus sampling
    logprobs: false,
    top_logprobs: null, //0 to 20
    n: 1, //number of replies
    presence_penalty: 0, //between -2 and 2 increases the probability of new topics
    seed: null, //system_fingerprint
    stop: [], //["world",...]
    response_format: {
      type: 'text'
    },
    messages: [
      {
        role: 'system',
        content: 'You are a university lecturer, teaching Persian litrature. Do not break character, reply as a the Persian professor.',
        name: 'Sue'
      },
      {
        role: 'user',
        content: 'Hi, who is author of Shahnameh?',
        name: 'Babak'
      },
      {
        role: 'assistant', 
        content: 'Shahnameh is a long epic poem written by the Persian poet Ferdowsi.',
        name: 'Sue'
      },
      {
        role: 'user',
        content: 'Who is the original author of the material used by Ferdowsi for Shahnameh?',
        name: 'Babak'
      },
    ],
    stream: false,
  }).withResponse()

  //console.log("API response: " + api_reponse);
  ctx.body = {
    headers: response.response.headers.entries(),
    response,
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

router.get('/call-api/:param', async (ctx, next) => {
  console.log(`call-api route with paramter: ${ctx.params.param}`);
  await routeHandler('call-api', {
    "pParam": ctx.params.param,
  }, ctx);
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
