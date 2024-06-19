const express=require('express')
const {sample_foods}=require('./../data/data')
const { GetAllFood, getAllBytags, HandleSearch, GetAllFoodController, HandleSearchController, getAllBytagsController, HandleGetByTagController, HandleFoodidController } = require('../Controllers/FoodController')
const router =express.Router()


router.get('/',GetAllFoodController)

router.get('/tags',getAllBytagsController)

router .get('/search/:searchTerm',HandleSearchController)

router.get('/tag/:tag',HandleGetByTagController)

router .get ('/:id',HandleFoodidController)

module.exports=router