const User = require('../Model/Usermodel')
const jwt = require('jsonwebtoken');
const { BAD_REQUEST } = require('../constants/httpStatus');
const {UserModel}=require('../Model/Usermodel')
const HandleLoginuser = async (req, res) => {

    const { email, password } = req.body;
    try {
        if (email == null || password == null)
            return res.status(500).send({
                success: false,
                error: "Email or Password is Required"
            })
        const user = await User.findOne({ email: email, password: password })
        if (!user) {
            return res.status(500).send({
                success: false,
                error: "User not Found"
            })
        }

        return res.status(200).send({
            success: true,
            message: "User Login Successfull",

        })

    } catch (error) {
        console.log(error)
        return res.status(400).send({
            success: false,
            error,
            message: "User Login is Failed"
        })
    }

}
const HandleUserSignupController = async (req, res) => {
    const { name, email, password, phonenumber } = req.body;
    const user = await User.findOne({ email });
    if (email == null || name == null || password == null || phonenumber == null) return res.send({
        success: false,
        error: "all Fields are required",
    })
    if (user) {
        return res.send({
            success: false,
            error: ' User Already Exist Please Login'
        })
    }
    const token = jwt.sign({ ...user }, secretkey);
    await User.create({
        name,
        email,
        password,
        phonenumber
    })
    return res.send({
        success: true,
        message: "Signup is Successfull",
        token: token
    })

}
const UpdateProfileController = async (req, res) => {
    try {
      const { name, address } = req.body;
  
      // Check if req.user.id is set correctly
      if (!req.user || !req.user.id) {
        console.error('User ID not found in request');
        return res.status(UNAUTHORIZED).send({
          success: false,
          message: 'Unauthorized',
        });
      }
  
      const user = await UserModel.findByIdAndUpdate(
        req.user.id,
        { name, address },
        { new: true }
      );
  
      // Log the user to see if the update was successful
      if (user) {
        console.log('User updated:', user);
        return res.status(200).send({
          success: true,
          data: generateTokenResponse(user),
        });
      } else {
        console.error('User not found or update failed');
        return res.status(BAD_REQUEST).send({
          success: false,
          message: 'User not found or update failed',
        });
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      return res.status(500).send({
        success: false,
        message: 'Server error',
      });
    }
  };
  
  module.exports = { UpdateProfileController };
  
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
module.exports = { HandleLoginuser, HandleUserSignupController,UpdateProfileController } 