const mongoose = require('mongoose');
const Food = require('./models/food.js');
const Restaurant = require('./models/restaurant.js');
const Order = require('./models/order.js');


require('dotenv').config();

mongoose
    .connect(
        process.env.DB
    )
    .then(async (result) => {
        let temp;
        let food;
        temp = await new Restaurant({
            name:'رستوران اول'
        });
        await temp.save();
        food = await new Food({
            name: 'غذاي 1',
            restaurant:temp._id
        });
        await food.save();
        temp.foods.push(food._id)
        food = await new Food({
            name: 'غذاي 2',
            restaurant:temp._id
        });
        await food.save();
        temp.foods.push(food._id)
        food = await new Food({
            name: 'غذاي 3',
            restaurant:temp._id
        });
        await food.save();
        temp.foods.push(food._id)
        await temp.save();
        temp = await new Restaurant({
            name:'رستوران دوم'
        });
        await temp.save();
        temp = await new Restaurant({
            name:'رستوران سوم'
        });
        await temp.save();




    })
    .catch(err => console.log(err));
