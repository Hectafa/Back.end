import express from 'express';
import { param } from 'express-validator';
import {
    getUserAddresses,
    getAddressById,
    createAddress,
    updateAddress,
    deleteAddress
} from '../controllers/addressController.js';
import validate from '../middlewares/validation.js';

const router = express.Router();

const addressIdValidation = [
    param('id')
        .isMongoId()
        .withMessage('Address Id must be a valid mongoDB object Id'),
];

const userIdValidation = [
    param('id')
        .isMongoId()
        .withMessage('User Id must be a valid mongoDB object Id'),
];

const putAddressValidation = [
    param('id')
        .isMongoId()
        .withMessage('Address Id must be a valid mongoDB object Id'),
    body('name')
        .notEmpty()
        .withMessage('Name is required'),
    body('address')
        .notEmpty()
        .withMessage('Address is required'),
    body('city')
        .notEmpty()
        .withMessage('City is required'),
    body('state')
        .notEmpty()
        .withMessage('State is required'),
    body('postalCode')
        .notEmpty()
        .withMessage('Postal code is required'),
    body('country')
        .notEmpty()
        .withMessage('Country is required'),
    body('phone')
        .notEmpty()
        .withMessage('Phone number is required'),
    body('isDefault')
        .isBoolean()
        .withMessage('isDefault must be a boolean value'),
    body('addressType')
        .isIn(['shipping', 'billing'])
        .withMessage('Address type must be either shipping or billing'),
];

//Get user addresses
router.get('/address/user/:id', userIdValidation, validate, getUserAddresses);

//Get address by id
router.get('/address/:id', addressIdValidation, validate, getAddressById);

//Create address
router.post('/address', createAddress);

//Update address
router.put('/address/:id', putAddressValidation, validate, updateAddress);

//Delete address
router.delete('/address/:id', addressIdValidation, validate, deleteAddress);


export default router;