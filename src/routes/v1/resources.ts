import { Router } from 'express';

import { list as clientsList } from 'controllers/resources/clients';
import { list as pcsList } from 'controllers/resources/pcs';
import { list as sessionsList } from 'controllers/resources/sessions';

const router = Router();

router.get('/pcs', pcsList);
router.get('/sessions', sessionsList);
router.get('/clients', clientsList);

export default router;
