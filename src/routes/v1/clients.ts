import { Router } from 'express';

import { list, show, create, edit, destroy } from 'controllers/clients';

const router = Router();

router.get('/', list);
router.get('/:phone', show);
router.post('/', create);
router.patch('/:phone', edit);
router.delete('/:phone', destroy);

export default router;
