import { Router } from 'express';
import openaiAssistantController from '@controllers/openai-assistant-controller';
import { openAsBlob } from 'fs';

const router: Router = Router();

router.get('/', openaiAssistantController.get);
// router.get('/createAssistant', openaiAssistantController.createAssistant);
router.get('/sendMessage', openaiAssistantController.sendMessage)

export default router;