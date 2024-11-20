import { Router } from 'express';
import exampleRoutes from './example.route.js';
import userRoutes from './user.route.js';
import categoryRoutes from './category.route.js';
import commentRoutes from './comment.route.js';
import commandeRoutes from './commande.route.js'
import productRoutes from './product.route.js';
import authenticationRoutes from './authentication.route.js'
const router = Router();

// Define routes
router.use('/examples', exampleRoutes); // Example routes
router.use('/users', userRoutes); // User routes
router.use('/categories', categoryRoutes); // Category routes
router.use('/comments', commentRoutes); // Comment routes
router.use('/commandes', commandeRoutes); // Command routes
router.use('/products', productRoutes); // Product routes
router.use('/auth',authenticationRoutes );//Authentication routes

// Handle unknown routes
router.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

export default router;
