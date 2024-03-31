import { Router } from 'express';
import openaiController from '@controllers/openai-controller';

const router: Router = Router();

router.get('/', openaiController.get);
router.get('/callOpenaiApi', openaiController.callOpenaiApi);

export default router;