import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

const app = express();
dotenv.config();

import openaiRouter from '@routes/openai-router';
import openaiAssistantRouter from '@routes/openai-assistant-router';
import catRouter from '@routes/cat-router'

app.use(cors());
app.use(express.json());
app.use(express.urlencoded( { extended: true } ));
app.use('/openai', openaiRouter);
app.use('/openaiAssistant', openaiAssistantRouter);
app.use('/cat', catRouter);


export default app;