import Order from '../models/Order.js';

async function getOrdes(req, res, next) {
    try {
        const orders = await Order.find()
            .populate('user')
            .populate('products.product')
            .populate('address')
            .populate('paymentMethod');
        res.json(orders);
    } catch (error) {
        next(error)
    }
}

async function getOrdersById(req, res, next) {
    try {
        const { id } = req.params;
        const order = await Order.findById(id)
            .populate('user')
            .populate('products.product')
            .populate('address')
            .populate('paymentMethod');

        if (!order) {
            return res.status(404).json({ message: 'Order not found' })
        }
    } catch (error) {

    }
}