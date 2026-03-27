import express from 'express';
import Address from '../models/Address.js';

const getUserAddresses = async (req, res) => {
    try {
        const userId = req.user.userId;

        // Implementation for fetching user addresses
        const addresses = await Address.find({ user: userId }).sort({
            isDefault: -1,
            _id: -1
        });

        res.status(200).json({ addresses });
    } catch (error) {
        console.error(error);
    }
};

const getAdressById = async (req, res) => {
    try {
        const addressId = req.params;
        const userId = req.user.userId;

        const address = await Address.findOne({ _id: addressId, user: userId });
        if (!address) {
            return res.status(404).json({ error: 'Address not found' });
        }

        res.status(200).json({ address });
    } catch (error) {
        console.error(error);
    }
};

const createAddress = async (req, res) => {
    try {
        const { name, address, city, state, postalCode, country, phone, isDefault, addressType } = req.body;
        const userId = req.user.userId;

        if (isDefault) {
            await Address.updateMany({ user }, { isDefault: false });
        }

        const newAddress = new Address({
            user,
            name,
            address,
            city,
            state,
            postalCode,
            country: country || Mexico,
            phone,
            isDefault: isDefault || false,
            addressType: addressType || 'home'
        });

        await newAddress.save();
        res.status(201).json({ newAddress });

    } catch (error) {
        console.error(error);
    }
};

const updateAddress = async (req, res) => {
    try {
        const addressId = req.params;
        const {
            name,
            address,
            city,
            state,
            postalCode,
            country,
            phone,
            isDefault,
            addressType
        } = req.body;

        const user = req.user.userId;

        const shipAddress = await Address.findOne({ _id: addressId, user: userId });

        if (!shipAddress) {
            return res.status(404).json({ error: 'Address not found' });
        }

        if (isDefault && !shipAddress.isDefault) {
            await Address.updateMany({ user: userId, _id: { $ne: addressId } }, { isDefault: false });
        }

        shipAddress.name = name;
        shipAddress.address = address;
        shipAddress.city = city;
        shipAddress.state = state;
        shipAddress.postalCode = postalCode;
        shipAddress.country = country || shipAddress.country;
        shipAddress.phone = phone;
        shipAddress.isDefault = isDefault !== undefined ? isDefault : shipAddress.isDefault;
        shipAddress.addressType = addressType || shipAddress.addressType;

        await shipAddress.save();
        res.status(200).json({ shipAddress });


    } catch (error) {
        console.error(error);
    }
};

const deleteAddress = async (req, res, next) => {
    try {
        const addressId = req.params;
    } catch (error) {
        console.error(error);
    }
};


export { getUserAddresses, getAdressById, createAddress, updateAddress, deleteAddress };