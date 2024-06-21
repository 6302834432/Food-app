const express=require('express')
const router =express.Router()
const handler=require ('express-async-handler');
const { FoodModel } = require('../Model/FoodModel');
router.post ('/add',
    handler(async(req,res)=>{
        const {
            name,
            tags,
            price,
            favorite,
            imageUrl,
            origins,
            cookTime,
            stars

        }=req.body
        console.log( name,
            tags,
            price,
            favorite,
            imageUrl,
            origins,
            cookTime,
            stars)
        await FoodModel.create({
            name,
            tags,
            price,
            favorite,
            imageUrl:`/foods/${imageUrl}`,
            origins,
            cookTime,
            stars
        })
        return res.send({
            sucess:true,
        })
    })
)
router.get(
  '/',
  handler(async (req, res) => {
    const foods = await FoodModel.find({});
    res.send(foods);
  })
);

router.get(
  '/tags',
  handler(async (req, res) => {
    const tags = await FoodModel.aggregate([
      {
        $unwind: '$tags',
      },
      {
        $group: {
          _id: '$tags',
          count: { $sum: 1 },
        },
      },
      {
        $project: {
          _id: 0,
          name: '$_id',
          count: '$count',
        },
      },
    ]).sort({ count: -1 });

    const all = {
      name: 'All',
      count: await FoodModel.countDocuments(),
    };

    tags.unshift(all);

    res.send(tags);
  })
);

router.get(
  '/search/:searchTerm',
  handler(async (req, res) => {
    const { searchTerm } = req.params;
    const searchRegex = new RegExp(searchTerm, 'i');

    const foods = await FoodModel.find({ name: { $regex: searchRegex } });
    res.send(foods);
  })
);

router.get(
  '/tag/:tag',
  handler(async (req, res) => {
    const { tag } = req.params;
    const foods = await FoodModel.find({ tags: tag });
    res.send(foods);
  })
);

router.get(
  '/:foodId',
  handler(async (req, res) => {
    const { foodId } = req.params;
    const food = await FoodModel.findById(foodId);
    res.send(food);
  })
);
module.exports=router