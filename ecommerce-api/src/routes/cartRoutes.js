import express from 'express';
import { body, param } from 'express-validator';
import {
    getCarts,
    getCartByUser,
    getCartById,
    createCart,
    updateCart,
    deleteCart
} from '../controllers/cartController.js';
import validate from '../middlewares/validation.js';
import authMiddleware from '../middlewares/authMiddleware.js';
import isAdmin from '../middlewares/isAdminMiddleware.js';

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

const createCartValidation = [
    body('user')
        .notEmpty()
        .withMessage('User is required')
        .isMongoId()
        .withMessage('User must be a valid mongoDB object Id'),
    body('products')
        .optional()
        .isArray()
        .withMessage('Products must be an array'),
    body('products.*.product')
        .isMongoId()
        .withMessage('Each product Id must be a valid mongoDB object Id'),
    body('products.*.quantity')
        .isInt({ min: 1 })
        .withMessage('Each product quantity must be an integer greater than 0'),
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


router.get('/cart', authMiddleware, isAdmin, getCarts);

router.get(
    '/cart/:id',
    authMiddleware,
    isAdmin,
    cartIdValidation,
    validate,
    getCartById
);

router.get(
    '/cart/user/:id',
    authMiddleware,
    userIdValidation,
    validate,
    getCartByUser
);

router.post(
    '/cart',
    authMiddleware,
    createCartValidation,
    validate,
    createCart
);

router.put(
    '/cart/:id',
    authMiddleware,
    putCartValidation,
    validate,
    updateCart
);

router.delete(
    '/cart/:id',
    authMiddleware,
    cartIdValidation,
    validate,
    deleteCart
);

export default router;