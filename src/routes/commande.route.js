import express from 'express';

// Import controllers and middlewares
import commandeController from '../controllers/commande.controller.js';
import isAuth from '../middlewares/permission/isAuth.js';
import isAdmin from '../middlewares/permission/isAdmin.js';

const router = express.Router();

// Define routes
router.post('/', isAuth, commandeController.createCommande); // Create a new order
router.get('/:id', isAuth,  commandeController.getOneCommande); // Get a specific order by ID
router.get('/', isAuth, isAdmin, commandeController.getAllCommande); // Get all orders
router.put('/:id', isAuth, commandeController.updateCommande); // Update an order by ID
router.delete('/:id', isAuth, isAdmin, commandeController.deleteCommande); // Delete an order by ID

export default router;
