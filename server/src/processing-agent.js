//database
import { JSONFilePreset } from 'lowdb/node';
import OpenAI from "openai";
const db = await JSONFilePreset('db.json', { embeddings: [] })

export async function startJobs() {
    console.log('Starting processing agent...');
    processPendingChunks();
}

async function processPendingChunks() {
    const unprocessedEmbeddings = db.data.embeddings.filter(e => e.pending);

    if (unprocessedEmbeddings.length !== 0) {
        console.log('Pocessing pending embeddings...');
    }

    //process 5 chunks at a time
    let counter = 0;

    for (const embedding of unprocessedEmbeddings) {
        console.log(`Processing embedding ${embedding.hash}, Counter: ${counter}`);
        if (counter >= 5) {
            console.log('Counter reached 5, breaking loop');
            break;
        }

        //if there are no chunks with embeddings.length === 0 then set pending to false and update db
        if (embedding.chunks.every(c => c.embedding.length > 0)) {
            console.log('All chunks for embedding ${embedding.hash} have embeddings, setting pending to false');
            db.update(({ embeddings }) => embeddings.find(e => e.hash === embedding.hash).pending = false);
        } else
            for (const chunk of embedding.chunks) {
                console.log(`Processing chunk idx: ${chunk.idx} text ${chunk.chunk} for embedding ${embedding.hash}`);
                if (chunk.embedding.length === 0) {
                    const openai = new OpenAI({
                        apiKey: process.env.OPENAI_API_KEY,
                    });

                    const response = await openai.embeddings.create({
                        input: chunk.chunk,
                        encoding_format: 'float',
                        model: process.env.OPENAI_EMBEDDING_MODEL,
                    }).withResponse();

                    chunk.embedding = response.data.data[0].embedding;

                    db.update(({ embeddings }) => embeddings.find(e => e.hash === embedding.hash).chunks.find(c => c.idx === chunk.idx).embedding = chunk.embedding);

                    counter++;
                }
            }
    }

    setTimeout(processPendingChunks, 1500);
}