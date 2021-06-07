const Food = require('../models/food.js');
const Restaurant = require('../models/restaurant.js');
const Order = require('../models/order.js');
checkFood = async (resId, foods) => {
    try {
        for (let i = 0; i < foods.length; i++) {

            const food = await Food.findById(foods[i]);

            if (food.restaurant != resId || !food) {
                return false;
            }
        }

        return true;
    } catch (e) {
        return false

    }
};

exports.getRestaurants = async (req, res, next) => {
    try {
        let restaurants = await Restaurant.find();
        restaurants = restaurants.map((res) => {
            return {
                name: res.name,
                id: res._id
            }
        });
        res.status(200).json({restaurants: restaurants});
    } catch (e) {
        next(e);
    }
};

exports.getFoods = async (req, res, next) => {
    try {
        const resId = req.params.resId;
        if (!resId) {
            const error = new Error('restaurantId is required !')
            error.statusCode = 401;
            throw error;
        }
        const restaurant = await Restaurant.findById(resId).populate('foods');
        const foods = restaurant.foods;
        res.status(200).json({foods: foods})
    } catch (e) {
        next(e)
    }
};
exports.setOrder = async (req, res, next) => {
    try {
        const foods = req.body.foods;
        const resId = req.params.resId;
        if (!foods || !resId) {
            const error = new Error('Info is not complete !')
            error.statusCode = 401;
            throw error;
        }
        const check = await checkFood(resId, foods);

        if (!check) {
            const error = new Error('foods is not valid');
            error.statusCode = 401;
            throw error;
        }
        const order = await new Order({
            restaurant: resId,
            foods: foods
        });
        await order.save();
        const restaurant = await Restaurant.findById(resId);
        restaurant.orders.push(order);
        await restaurant.save();
        res.status(200).json({order: order});

    } catch (e) {
        next(e)
    }
};
exports.editOrder = async (req, res, next) => {
    try {
        const orderId = req.params.orderId;
        const foods = req.body.foods;
        const resId = req.body.resId;
        if (!orderId) {
            const error = new Error('orderId is require');
            error.statusCode = 401;
            throw error
        }
        const order = await Order.findById(orderId);
        const check = await checkFood(resId, foods);
        if (!check) {
            const error = new Error('foods is not valid');
            error.statusCode = 401;
            throw error;
        }
        order.foods = foods;
        await order.save();
        res.status(200).json({order: order})
    } catch (e) {
        next(e)
    }
};
exports.delOrder = async (req, res, next) => {
    try {
        const orderId = req.params.orderId;
        if (!orderId) {
            const error = new Error('orderId is require')
            error.statusCode = 401;
            throw error
        }
        const order = await Order.findByIdAndDelete(orderId);
        res.status(200).json({order: order});

    } catch (e) {
        next(e)
    }
};
