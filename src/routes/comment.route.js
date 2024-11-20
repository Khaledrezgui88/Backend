import express from 'express';

// Import controllers and middlewares
import commentControllers from '../controllers/comment.controller.js'
import isAuth from '../middlewares/permission/isAuth.js';
import isAdmin from '../middlewares/permission/isAdmin.js';

const router = express.Router();

// Define routes
router.post('/', isAuth, isAdmin, commentControllers.createComment);
router.get('/:id', isAuth, commentControllers.getOneComment);  // Get a comment by ID
router.get('/', isAuth, commentControllers.getAllComment);
router.put('/:id', isAuth, commentControllers.updateComment);
router.delete('/:id', isAuth, isAdmin, commentControllers.deleteComment);

export default router;