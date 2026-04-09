import express from 'express';
import { body, param } from 'express-validator';
import {
    getCategories,
    getCategoryById,
    createCategory,
    updateCategory,
    deleteCategory,
} from '../controllers/categoryController.js';
import validate from '../middlewares/validation.js';
import authMiddleware from '../middlewares/authMiddleware.js';
import isAdmin from '../middlewares/isAdminMiddleware.js';

const router = express.Router();

const categoryIdValidation = [
    param('id')
        .isMongoId()
        .withMessage('Category Id must be a valid mongoDB object Id'),
];

const createCategoryValidation = [
    body('name')
        .notEmpty()
        .withMessage('Name is required'),
    body('description')
        .notEmpty()
        .withMessage('Description is required'),
    body('parentCategory')
        .optional()
        .isMongoId()
        .withMessage('Parent Category Id must be a valid mongoDB object Id')
];

const updateCategoryValidation = [
    param('id')
        .isMongoId()
        .withMessage('Category Id must be a valid mongoDB object Id'),
    body('name')
        .optional()
        .notEmpty()
        .withMessage('Name cannot be empty'),
    body('description')
        .optional()
        .notEmpty()
        .withMessage('Description cannot be empty'),
    body('parentCategory')
        .optional()
        .isMongoId()
        .withMessage('Parent Category Id must be a valid mongoDB object Id')
];

router.get('/categories', getCategories);

router.get('/categories/:id', categoryIdValidation, validate, getCategoryById);

router.post(
    '/categories',
    authMiddleware,
    isAdmin,
    createCategoryValidation,
    validate,
    createCategory,
);

router.put(
    '/categories/:id',
    authMiddleware,
    isAdmin,
    updateCategoryValidation,
    validate,
    updateCategory,
);

router.delete(
    '/categories/:id',
    authMiddleware,
    isAdmin,
    categoryIdValidation,
    validate,
    deleteCategory,
);

export default router;