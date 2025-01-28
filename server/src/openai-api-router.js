import Router from 'koa-router';
import OpenAI from "openai";
import { JSONFilePreset } from 'lowdb/node';
import crypto from 'crypto';
import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";
import similarity from 'compute-cosine-similarity';

const chunkSize = 200;
const chunkOverlap = 50;
const topN = 3;

//database
const db = await JSONFilePreset('db.json', { embeddings: [] })

const router = new Router({ prefix: '/api' });

router.post('/chat', async (ctx) => {
    const openai = new OpenAI({
        apiKey: process.env.OPENAI_API_KEY,
    });

    const response = await openai.chat.completions.create({
        ...ctx.request.body,
        model: process.env.OPENAI_CHAT_MODEL,
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
        text: ctx.request.body?.text || ''
    }

    if (request.text) {
        await processText(request.text);
    }

    ctx.body = db.data.embeddings.map(e => ({ hash: e.hash, text: e.text }));
});

async function processText(text) {
    const hash = crypto.createHash('md5').update(text).digest('hex')
    const existingEmbedding = db.data.embeddings.find(e => e.hash === hash);
    if (!existingEmbedding) {
        /* //Tokenizing
        const tokenizer = encoding_for_model(process.env.OPENAI_EMBEDDING_MODEL);
        const tokens = tokenizer.encode(text); */

        const splitter = new RecursiveCharacterTextSplitter({
            chunkSize, // Max size of each chunk
            chunkOverlap, // Overlap between chunks
        });

        const chunks = await splitter.splitText(text);

        const openai = new OpenAI({
            apiKey: process.env.OPENAI_API_KEY,
        });

        const processedChunks = [];
        let idx = 0;
        for (const chunk of chunks) {
            const response = await openai.embeddings.create({
                input: chunk,
                encoding_format: 'float',
                model: process.env.OPENAI_EMBEDDING_MODEL,
            }).withResponse();
        
            processedChunks.push({
                idx,
                embedding: response.data.data[0].embedding,
                chunk
            });

            idx++;
        }

        await db.update(({ embeddings }) => embeddings.push({
            hash,
            text,
            chunks: processedChunks
        }));
    }
}

router.post('/similarity', async (ctx) => {
    ctx.body = await getTopChunks(ctx.request.body.essayHash, ctx.request.body.searchHash);
});

async function getTopChunks(essayHash, searchHash, n = topN) {
    const essayChunks = db.data.embeddings.find(e => e.hash === essayHash).chunks;
    const searchChunks = db.data.embeddings.find(e => e.hash === searchHash).chunks;
    
    const chunkRank = [];

    for (const searchChunk of searchChunks) {
        for (const essayChunk of essayChunks) {
            const chunkRankExist = chunkRank.find(e => e.essayChunk === essayChunk);
            if (chunkRankExist) {
                chunkRankExist.similarity += similarity(searchChunk.embedding, essayChunk.embedding)
            }
            else {
                chunkRank.push({
                    essayChunk,
                    similarity: similarity(searchChunk.embedding, essayChunk.embedding)
                });
            }
        }
    }

    // Sort by similarity in descending order
    chunkRank.sort((a, b) => b.similarity - a.similarity);

    // Return top N results
    return chunkRank.slice(0, n);
}

export default router;