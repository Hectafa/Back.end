import express from 'express';
import { body, param } from 'express-validator';
import {
    getOrdes,
    getOrderById,
    createOrder,
    updateOrderStatus,
} from '../controllers/orderController.js';
import validate from '../middlewares/validation.js';
import authMiddleware from '../middlewares/authMiddleware.js';
import isAdmin from '../middlewares/isAdminMiddleware.js';

const router = express.Router();

const orderIdValidation = [
    param('id')
        .isMongoId()
        .withMessage('Order Id must be a valid mongoDB object Id'),
];

const createOrderValidation = [
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
        .withMessage('Each product item include a quantity')
        .isInt({ min: 1 })
        .withMessage('Each product quantity must be a number greater than or equal to 1'),
    body('products.*.price')
        .notEmpty()
        .withMessage('Each product item must include a price')
        .isFloat({ min: 0 })
        .withMessage('Each product price must be a number greater than or equal to 0'),
    body('address')
        .notEmpty()
        .withMessage('Address is required')
        .isMongoId()
        .withMessage('Address must be a valid mongoDB object Id'),
    body('paymentMethod')
        .notEmpty()
        .withMessage('Payment method is required')
        .isMongoId()
        .withMessage('Payment method must be a valid mongoDB object Id'),
    body('totalPrice')
        .notEmpty()
        .withMessage('Total price is required')
        .isMongoId()
        .isFloat({ min: 0 })
        .withMessage('Total price must be a number greater than or equal to 0'),
    body('shippingCost ')
        .optional()
        .isFloat({ min: 0 })
        .withMessage('Shipping cost must be a number greater than or equal to 0'),
];

const updateOrderStatusValidation = [
    param('id')
        .isMongoId()
        .withMessage('Order Id must be a valid mongoDB object Id'),
    body('status')
        .optional()
        .isIn(['pending', 'processing', 'shipped', 'delivered', 'cancelled'])
        .withMessage('Invalid order status'),
    body('paymentStatus')
        .optional()
        .isIn(['pending', 'completed', 'failed', 'refunded'])
        .withMessage('Invalid payment status'),
];

router.get('/orders', authMiddleware, isAdmin, getOrdes);

router.get(
    '/orders/:id',
    authMiddleware,
    orderIdValidation,
    validate,
    getOrderById
);

router.post(
    '/orders',
    authMiddleware,
    createOrderValidation,
    validate,
    createOrder
);

router.put(
    '/orders/:id',
    authMiddleware,
    updateOrderStatusValidation,
    validate,
    updateOrderStatus
);

export default router;

































































































