import Router from 'koa-router';
import OpenAI from "openai";
import { JSONFilePreset } from 'lowdb/node';
import crypto from 'crypto';

//database
const db = await JSONFilePreset('db.json', { embeddings: [] })

const router = new Router({ prefix: '/api' });

router.post('/chat', async (ctx) => {
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

    //put all key values of the headers in an array
    const headers = Array.from(response.response.headers.entries()).map(([key, value]) => ({ key, value }));

    ctx.body = {
        headers,
        response: response.data,
        reply: response.data.choices?.[0]?.message.content || ""
    };
});

router.post('/embedding', async (ctx) => {
    //Sanitize the input and generate hash

    const request = {
        text: ctx.request.body?.text || '',
        hash: crypto.createHash('md5').update(ctx.request.body?.text || '').digest('hex'),
        vector: []
    }
    //validate
    if (request.text)
    {
        //check table for existing hash
        const existingEmbedding = db.data.embeddings.find(e => e.hash === request.hash);
        if (!existingEmbedding)
            await db.update(({ embeddings }) => embeddings.push({...request, vector: [1,2,3]}));
    }

    ctx.body = db.data.embeddings;

    /* const openai = new OpenAI({
        apiKey: process.env.OPENAI_API_KEY,
    });

    const response = await openai.embeddings.create({
        ...ctx.request.body,
        model: process.env.OPENAI_MODEL,
    }).withResponse()

    //put all key values of the headers in an array
    const headers = Array.from(response.response.headers.entries()).map(([key, value]) => ({ key, value }));

    ctx.body = {
        headers,
        response: response.data,
        reply: response.data.choices?.[0]?.message.content || ""
    }; */
});

export default router;