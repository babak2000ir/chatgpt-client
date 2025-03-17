import Router from 'koa-router';
import OpenAI from "openai";
//import { JSONFilePreset } from 'lowdb/node';

const settings = {
    chunkOverlap: 100,
    topN: 3,
    paragraph: {
        words: 250,
        letters: 2000
    },
    sentence: {
        words: 40,
        letters: 150
    }
}

//database
//const db = await JSONFilePreset('db.json', { embeddings: [] })

const router = new Router({ prefix: '/ollamaApi' });

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

/* router.post('/embedding', async (ctx) => {
    //Sanitize the input and generate hash
    const request = {
        text: ctx.request.body?.text || ''
    }

    if (request.text) {
        await processText(request.text);
    }

    ctx.body = db.data.embeddings.map(e => ({ hash: e.hash, text: e.text, pending: e.pending }));
});

 router.post('/similarity', async (ctx) => {
    ctx.body = await getTopChunksCosineSimilarity(ctx.request.body.essayHash, ctx.request.body.searchHash);

});

router.post('/similarity2', async (ctx) => {
    ctx.body = await getTopChunksHNSW(ctx.request.body.essayHash, ctx.request.body.searchHash);
});

 async function processText(text) {
    const hash = crypto.createHash('md5').update(text).digest('hex')
    const existingEmbedding = db.data.embeddings.find(e => e.hash === hash);
    if (!existingEmbedding) {

        if (text.length < settings.paragraph.letters) {

            const openai = new OpenAI({
                apiKey: process.env.OPENAI_API_KEY,
            });

            const response = await openai.embeddings.create({
                input: text,
                encoding_format: 'float',
                model: process.env.OPENAI_EMBEDDING_MODEL,
            }).withResponse();

            await db.update(({ embeddings }) => embeddings.push({
                hash,
                text,
                chunks: {
                    idx: 0,
                    embedding: response.data.data[0].embedding,
                    chunk: text
                },
                pending: false
            }));
        }
        else {
            const splitter = new RecursiveCharacterTextSplitter({
                chunkSize: settings.sentence.letters, // Max size of each chunk
                chunkOverlap: settings.chunkOverlap, // Overlap between chunks
            });

            const chunks = (await splitter.splitText(text)).map((chunk, idx) => ({ idx, embedding: [], chunk }));

            await db.update(({ embeddings }) => embeddings.push({
                hash,
                text,
                chunks: chunks,
                pending: true
            }));
        }
    }
}

async function getTopChunksCosineSimilarity(essayHash, searchHash, n = topN) {
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

async function getTopChunksHNSW(essayHash, searchHash) {
    // Parameters
    const dim = 1536; // Embedding dimension for ada-002
    const maxElements = 1000;
    const M = 16;
    const efConstruction = 200;
    const efSearch = 50;

    // Initialize HNSW index
    const hnsw = new hnswlib.HierarchicalNSW("cosine", dim); //cosine, l2, ip
    hnsw.initIndex(maxElements, M, efConstruction, efSearch);

    const essayChunks = db.data.embeddings.find(e => e.hash === essayHash).chunks;
    const searchChunks = db.data.embeddings.find(e => e.hash === searchHash).chunks;

    for (const chunk of essayChunks) {
        hnsw.addPoint(chunk.embedding, chunk.idx);
    }

    const similarityResult = hnsw.searchKnn(searchChunks[0].embedding, 3);
    return similarityResult.neighbors.map(sr => essayChunks[sr]);
} */

export default router;