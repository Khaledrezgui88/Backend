import express from 'express';
import authenticationControllers from '../controllers/authentication.controller.js';  // Contrôleur d'authentification


const router = express.Router();

// Route pour l'inscription d'un utilisateur
router.post('/signup', authenticationControllers.signup);

// Route pour la connexion d'un utilisateur
router.post('/login', authenticationControllers.login);

// Route pour la déconnexion d'un utilisateur (si tu utilises un token)
router.post('/logout', authenticationControllers.logout);

export default router;

