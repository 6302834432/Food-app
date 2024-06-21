const mongoose=require('mongoose')
const {UserModel}=require('../Model/Usermodel')
const {FoodModel}=require('../Model/FoodModel')
const PASSWORD_HASH_SALT_ROUNDS = 10;
const {sample_foods}=require('../data/data.js')
mongoose.set('strictQuery', true);

 const dbconnect = async () => {
  try {
    mongoose.connect(process.env.MONGO_URI);
    await seedUsers();
    await seedFoods();
    console.log('connect successfully---');
  } catch (error) {
    console.log(error);
  }
};

async function seedUsers() {
  const usersCount = await UserModel.countDocuments();
  if (usersCount > 0) {
    console.log('Users seed is already done!');
    return;
  }

  for (let user of sample_users) {
    user.password = await bcrypt.hash(user.password, PASSWORD_HASH_SALT_ROUNDS);
    await UserModel.create(user);
  }

  console.log('Users seed is done!');
}

async function seedFoods() {
  const foods = await FoodModel.countDocuments();
  if (foods > 0) {
    console.log('Foods seed is already done!');
    return;
  }
  
  for (const food of sample_foods) {
    food.imageUrl = `/foods/${food.imageUrl}`;
    await FoodModel.create(food);
  }

  console.log('Foods seed Is Done!');
}
module.exports={dbconnect}