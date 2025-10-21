// --- auth.routes.js ---
// This file is in /backend/routes/

import express from 'express';
import { signup, login } from '../controllers/auth.controller.js';

const router = express.Router();

// @route   POST /api/auth/signup
router.post('/signup', signup);

// @route   POST /api/auth/login
router.post('/login', login);

export default router;