import express from "express";
import Cart from "../models/Cart.js";

async function getCarts(req, res) {
    try {
        const carts = await Cart.find()
            .populate("user")
            .populate("products.product");
        res.json(carts);
    } catch (error) {
        console.error(error);
    }
}

async function getCartById(req, res) {
    try {
        const id = req.params.id;
        const cart = await Cart.findById(id)
            .populate("user")
            .populate("products.product");
        if (!cart) {
            return res.status(404).json({ message: "Cart not found" });
        }
        res.json(cart);
    } catch (error) {
        console.error(error);
    }
}

async function getCartByUser(req, res) {
    try {
        const userId = req.params.id;
        const cart = await Cart.findOne({ user: userId })
            .populate("user")
            .populate("products.product");
        if (!cart) {
            return res.status(404).json({ message: "No cart found for this user" });
        }
        res.json(cart);
    } catch (error) {
        console.error(error);
    }
}

async function createCart(req, res) {
    try {
        const { user, products } = req.body;

        if (!user || !products || !Array.isArray(products)) {
            return res.status(400).json({ message: "User and products are required" });
        }

        for (let i = 0; i < products.length; i++) {
            if (!products[i].product || !products[i].quantity || products[i].quantity < 1) {
                return res.status(400).json({ error: "Each product must have a valid product ID and quantity >= 1" });
            }
        }


        const newCart = await Cart.create({
            user,
            products,
        });

        await newCart.populate("user"); //populate es para traer toda la información del usuario, no solo el id que se guarda en el cart, sino también el nombre, email, etc. del usuario. Lo mismo para los productos, trae toda la información de los productos que están en el cart, no solo el id.
        await newCart.populate("products.product");

        res.status(201).json(newCart);

    } catch (error) {
        console.error(error);
    }
}

async function updateCart(req, res) {
    try {
        const { id } = req.params;
        const { user, products } = req.body;

        if (!user || !products || !Array.isArray(products)) {
            return res.status(400).json({ message: "User and products are required" });
        }

        for (let i = 0; i < products.length; i++) {
            if (!products[i].product || !products[i].quantity || products[i].quantity < 1) {
                return res.status(400).json({ error: "Each product must have a valid product ID and quantity >= 1" });
            }
        }

        const updatedCart = await Cart.findByIdAndUpdate(
            id,
            { user, products },
            { new: true }
        )
            .populate("user")
            .populate("products.product");

        if (updatedCart) {
            return res.status(200).json(updatedCart);
        } else {
            return res.status(404).json({ message: "Cart not found" });
        }

    } catch (error) {
        console.error(error);
    }
}

async function deleteCart(req, res) {
    try {
        const { id } = req.params;
        const deletedCart = await Cart.findByIdAndDelete(id);

        if (deletedCart) {
            return res.status(204).send();
        } else {
            return res.status(400).json({ error: "Cart not found" });
        }
    } catch (error) {
        console.error(error);
    }
}

export { getCarts, getCartById, getCartByUser, createCart, updateCart, deleteCart };