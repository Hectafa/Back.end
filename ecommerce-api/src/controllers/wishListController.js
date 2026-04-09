import express from "express";
import WishList from "../models/WishList.js";


async function getWishLists(req, res, next) {
    try {
        const wishLists = await WishList.find()
            .populate("user")
            .populate("products.product");

        res.status(200).json(wishLists);
    } catch (error) {
        next(error);
    }
};

async function getWishListByUser(req, res) {
    try {
        const { id } = req.params;
        const wishList = await WishList.findOne({ user: userId })
            .populate("user")
            .populate("products.product");

        if (!wishList) {
            return res.status(404).json({ error: "No wish list found for this user" });
        };

        res.status(200).json(wishList);
    } catch (error) {
        next(error);
    }
};

async function addProductToWishList(req, res, next) {
    try {
        const { userId, productId } = req.body;
        let wishlist = await WishList.findOne({ user: userId });

        if (!wishlist) {
            wishlist = new WishList({ user: userId, products: [productId] });
        } else {
            const alreadyAdded = wishlist.products.some(
                (p) => p.toString() === productId
            );
            if (alreadyAdded) {
                return res
                    .status(200)
                    .json({ message: 'Product already in wishlist' });
            }
            wishlist.products.push(productId);
        }

        await wishlist.save();
        await wishlist.populate('user');
        await wishlist.populate('products');
        res.status(200).json(wishlist);
    } catch (error) {
        next(error);
    }
};

async function removeProductFromWishList(req, res, next) {
    try {
        const { id } = req.params;
        const { productId } = req.body;
        const wishlist = await WishList.findById(id);

        if (!wishlist) {
            return res.status(404).json({ message: 'Wish list not found' });
        }
        wishlist.products = wishlist.products.filter(
            (p) => p.toString() !== productId
        );

        await wishlist.save();
        await wishlist.populate('user');
        await wishlist.populate('products');

        res.status(200).json(wishlist);
    } catch (error) {
        next(error);
    }
};

async function deleteWishList(req, res, next) {
    try {
        const { id } = req.params;
        const wishlist = WishList.findByIdAndDelete(id);
        if (!wishlist) {
            return res.status(404).json({ message: 'Wish list not found' });
        }

        res.status(204).send();
    } catch (error) {
        next(error);
    }
};

export {
    getWishLists,
    getWishListByUser,
    addProductToWishList,
    removeProductFromWishList,
    deleteWishList,
};


