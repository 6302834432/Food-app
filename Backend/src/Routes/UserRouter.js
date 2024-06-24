
const express=require('express')
const jwt =require('jsonwebtoken')
const{ BAD_REQUEST}=require('../constants/httpStatus.js')
const router =express.Router()
const {authmiddleware}=require('../middlewares/authmiddleware.js')
const {adminMid}=require('../middlewares/adminmiddleware.js')
const {UserModel}=require('../Model/Usermodel.js')
const handler=require('express-async-handler')
const { UpdateProfileController } = require('../Controllers/UserController.js')
const bcrypt=require('bcrypt')
const PASSWORD_HASH_SALT_ROUNDS = 10;

router.post(
  '/login',
  handler(async (req, res) => {
    const { email, password } = req.body;
    const user = await UserModel.findOne({ email });
    const passCompare=bcrypt.compare(password,user.password)
    if (user && passCompare) {
      res.send(generateTokenResponse(user));
      return;
    }

    res.status(BAD_REQUEST).send('Username or password is invalid');
  })
);


router.post(
  '/register',
  handler(async (req, res) => {
    const { name, email, password, address } = req.body;

    const user = await UserModel.findOne({ email });

    if (user) {
      res.status(BAD_REQUEST).send('User already exists, please login!');
      return;
    }

    const hashedPassword = await bcrypt.hash(
      password,
      PASSWORD_HASH_SALT_ROUNDS
    );

    const newUser = {
      name,
      email: email.toLowerCase(),
      password: hashedPassword,
      address,
    };

    const result = await UserModel.create(newUser);
    res.send(generateTokenResponse(result));
  })
);




router.put('/updateProfile',authmiddleware,UpdateProfileController) 
router.put(
  '/changePassword',
  authmiddleware,
  handler(async (req, res) => {
    const { currentPassword, newPassword } = req.body;
    console.log(currentPassword,newPassword)
    const user = await UserModel.findById(req.user.id);

    if (!user) {
      res.status(BAD_REQUEST).send('Change Password Failed!');
      return;
    }

    const equal = await bcrypt.compare(currentPassword, user.password);
    // const equal=null;
    if (!equal) {
      res.status(BAD_REQUEST).send('Current Password Is Not Correct!');
      return;
    }

    user.password = await bcrypt.hash(newPassword, PASSWORD_HASH_SALT_ROUNDS);
    await user.save();

    res.send(user);
  })
);

// router.get(
//   '/getall/:searchTerm?',
//   adminMid,
//   handler(async (req, res) => {
//     const { searchTerm } = req.params;

//     const filter = searchTerm
//       ? { name: { $regex: new RegExp(searchTerm, 'i') } }
//       : {};

//     const users = await UserModel.find(filter, { password: 0 });
//     res.send(users);
//   })
// );

// router.put(
//   '/toggleBlock/:userId',
//   adminMid,
//   handler(async (req, res) => {
//     const { userId } = req.params;

//     if (userId === req.user.id) {
//       res.status(BAD_REQUEST).send("Can't block yourself!");
//       return;
//     }

//     const user = await UserModel.findById(userId);
//     user.isBlocked = !user.isBlocked;
//     user.save();

//     res.send(user.isBlocked);
//   })
// );

// router.get(
//   '/getById/:userId',
//   adminMid,
//   handler(async (req, res) => {
//     const { userId } = req.params;
//     const user = await UserModel.findById(userId, { password: 0 });
//     res.send(user);
//   })
// );

// router.put(
//   '/update',
//   adminMid,
//   handler(async (req, res) => {
//     const { id, name, email, address, isAdmin } = req.body;
//     await UserModel.findByIdAndUpdate(id, {
//       name,
//       email,
//       address,
//       isAdmin,
//     });

//     res.send(generateTokenResponse(user));
//   })
// );

const generateTokenResponse = user => {
  const token = jwt.sign(
    {
      id: user.id,
      email: user.email,
      isAdmin: user.isAdmin,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: '30d',
    }
  );

  return {
    id: user.id,
    email: user.email,
    name: user.name,
    address: user.address,
    isAdmin: user.isAdmin,
    token,
  };
};

module.exports=router