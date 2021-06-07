const express = require('express');
const router = express.Router();
const controller = require('../controller/main');


router.get('/getRestaurants', controller.getRestaurants);
router.get('/getFoods/:resId', controller.getFoods);
router.post('/setOrder/:resId', controller.setOrder);
router.put('/editOrder/:orderId', controller.editOrder);
router.delete('/delOrder/:orderId', controller.delOrder);

module.exports = router;
