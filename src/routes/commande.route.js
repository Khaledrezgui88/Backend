import express from 'express';

// Import controllers and middlewares
import commandeController from '../controllers/commande.controller.js';
import isAuth from '../middlewares/permission/isAuth.js';
import isAdmin from '../middlewares/permission/isAdmin.js';

const router = express.Router();

// Define routes
router.post('/',  commandeController.createCommande); // Create a new order
router.get('/:id',  commandeController.getOneCommande); // Get a specific order by ID
router.get('/',commandeController.getAllCommande); // Get all orders
router.put('/:id',  commandeController.updateCommande); // Update an order by ID
router.delete('/:id',  commandeController.deleteCommande); // Delete an order by ID

export default router;
