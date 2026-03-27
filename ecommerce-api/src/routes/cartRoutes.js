import express from 'express';
import { param } from 'express-validator';
import {
    getCarts,
    getCartByUser,
    getCartById,
    createCart,
    updateCart,
    deleteCart
} from '../controllers/cartController.js';
import validate from '../middlewares/validation.js';

const router = express.Router();

const cartIdValidation = [
    param('id')
        .isMongoId()
        .withMessage('Cart Id must be a valid mongoDB object Id'),
];

const userIdValidation = [
    param('id')
        .isMongoId()
        .withMessage('User Id must be a valid mongoDB object Id'),
];

const putCartValidation = [
    param('id')
        .isMongoId()
        .withMessage('Cart Id must be a valid mongoDB object Id'),
    body('user')
        .notEmpty()
        .withMessage('User is required')
        .isMongoId()
        .withMessage('User must be a valid mongoDB object Id'),
    body('products')
        .notEmpty()
        .withMessage('Products are required')
        .isArray()
        .withMessage('Products must be an array'),
    body('products.*.product')
        .notEmpty()
        .withMessage('Each product must have a product Id')
        .isMongoId()
        .withMessage('Each product Id must be a valid mongoDB object Id'),
    body('products.*.quantity')
        .notEmpty()
        .withMessage('Each product item must have a quantity')
        .isInt({ min: 1 })
        .withMessage('Each product quantity must be an integer greater than 0'),
];

//Get all carts
router.get('/cart', getCarts);

//Get cart by id
router.get('/cart/:id', cartIdValidation, validate, getCartById);

//Get cart by user
router.get('/cart/user/:id', userIdValidation, validate, getCartByUser);

//Create cart
router.post('/cart', createCart);

//Update cart
router.put('/cart/:id', updateCart);

//Delete cart
router.delete('/cart/:id', cartIdValidation, validate, deleteCart);

export default router;