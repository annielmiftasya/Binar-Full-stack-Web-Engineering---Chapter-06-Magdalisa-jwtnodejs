var express = require('express');
var router = express.Router();
const CarController = require('../controller/car')
const authCar= require("../middleware/adminsuperadmin")
const auth= require("../middleware/auth")

//add car
router.post('/create',authCar,CarController.createCar);

//update car
router.post('/update/:id',authCar,CarController.updateCar);

//delete car
router.post('/delete/:id',authCar,CarController.deleteCar);

//get all car 
router.get('/allCar',authCar,CarController.getAllCar);

//get available car
router.get('/available',auth,CarController.getCar);

//get by id
router.get('/:id',auth,CarController.getbyIdCar);
module.exports = router;
