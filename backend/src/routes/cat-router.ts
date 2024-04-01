import { Router } from 'express';
import catController from '@controllers/cat-controller';

const router: Router = Router();

router.get('/', catController.get);
router.get('/fetchCats', catController.fetchCats);

export default router;