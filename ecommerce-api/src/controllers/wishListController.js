import express from "express";
import WishList from "../models/WishList.js";


async function getWishLists(req, res) {
    try {
        const wishLists = await WishList.find()
            .populate("user")
            .populate("products.product");

        res.json(wishLists);
    } catch (error) {
        console.error(error);
    }
};

async function getWhishListById(req, res) {
    try {
        const id = req.params.id;
        const wishList = await WishList.findById(id)
            .populate("user")
            .populate("products.product");

        if (!wishList) {
            return res.status(404).json({ error: "WishList not found" });
        }

        res.json(wishList);
    } catch (error) {
        console.error(error);
    }
};

async function getWishListByUser(req, res) {
    try {
        const userId = req.params.id;
        const wishList = await WishList.findOne({ user: userId })
            .populate("user")
            .populate("products.product");

        if (!wishList) {
            return res.status(404).json({ error: "No wish list found for this user" });
        };

        res.json(wishList);
    } catch (error) {
        console.error(error);
    }
};

async function createWishList(req, res) {
    try {
        const { user, products } = req.body;

        if (!user || !products || !Array.isArray(products)) {
            return res.status(400).json({ error: "User and products are required" });
        }

        const newWishList = await WishList.create({ user, products });
        res.status(201).json(newWishList);
    } catch (error) {
        console.error(error); 
    }
}