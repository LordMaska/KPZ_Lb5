import { Router } from 'express';

import auth from './auth';
import resources from './resources';
import users from './users';

const router = Router();

router.use('/auth', auth);
router.use('/users', users);
router.use('/resources', resources);

export default router;
