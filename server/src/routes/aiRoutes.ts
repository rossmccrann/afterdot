import express from 'express';
import { analyzeText } from '../controllers/aiController';

const router = express.Router();

router.post('/analysis', analyzeText); // This is now valid

export default router;