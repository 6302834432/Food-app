const { sample_foods, sample_tags } = require('../data/data')
const GetAllFoodController = (req, res) => {
    try {
        if (sample_foods) return res.status(200).send({
            success: true,
            message: "Foods Loaded",
            data: sample_foods
        })
        return res.status(500).send({
            success: false,
            error: "foods cannot be Loaded",
            message: "foods cannot be Loaded"
        })
    } catch (error) {
        console.log(error)
        return res.status(400).send({
            success: false,
            message: "Error in Foods Api",
            error
        })

    }

}
const getAllBytagsController = (req, res) => {
    try {
        if (sample_tags) {
            return res.status(200).send({
                success: true,
                data: sample_tags
            })
        }
        return res.status(400).send({
            success: false,
            error: "Tags cannot be Loaded"
        })
    } catch (error) {
        console.log(error)
        return res.status(400).send({
            success: false,
            message: "Error in Tags Api",
            error
        })
    }
}
const HandleSearchController = async (req, res) => {
    const { searchTerm } = req.params;
    const foods = await sample_foods.filter(item => item.name.toLowerCase().includes(searchTerm.toLowerCase()));

    try {
        if (foods) {
            return res.status(200).send({
                success: true,
                data: foods,
            })
        }
        return res.status(201).send({
            success: false,
            error: "No Foods Items Found"
        })

    } catch (error) {
        console.log(error)
        return res.status(400).send({
            success: false,
            message: "Error in Search Api",
            error
        })
    }
}
const HandleGetByTagController = async (req, res) => {
    const { tag } = req.params
    const foods = await sample_foods.filter(item => item.tags?.map(t => t.toLowerCase()).includes(tag.toLowerCase()));
    try {
        if (foods) {
            return res.status(200).send({
                success: true,
                data: foods,
            })
        }
        return res.status(201).send({
            success: false,
            message: "No Food Found"

        })

    } catch (error) {
        console.log(error)
        return res.status(400).send({
            success: false,
            message: "Error in Get By tag Api",
            error
        })
    }

}
const HandleFoodidController = async (req, res) => {
    const { id } = req.params;
    let food = sample_foods.filter(item => item.id == id)
    try {
        if (food) {
            return res.send({
                success: true,
                message: "Foods Loades with Id",
                data:food
            })

        }
        return res.send({
            success: false,
            message: "NO items Found"
        })

    } catch (error) {
        console.log(err);
        res.send({
            error: error,
            success: false
        })
    }
}
module.exports = {
    GetAllFoodController,
    getAllBytagsController,
    HandleSearchController,
    HandleGetByTagController,
    HandleFoodidController
};