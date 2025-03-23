import express from 'express';
import { signUp } from './controller';
const router = express.Router();

// POST api/v1/auth/signup
router.post('/signup', signUp);

export default router;
