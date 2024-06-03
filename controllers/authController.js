import User from '../models/userModel.js';
import AppError from '../utils/AppError.js';
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';

const generateToken = (user, res) => {
  const { password, ...rest } = user._doc;
  const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET_KEY);

  res.set('Auth_token', `Bearer ${token}`).status(200).json({
    status: 'success',
    user: rest,
  });
};

export const verifyUserToken = (req, res, next) => {
  next();
};

export const signup = async (req, res, next) => {
  try {
    let { name, userName, email, password } = req.body;
    password = bcrypt.hashSync(password, 12);
    const newUser = await User.create({ name, userName, email, password });
    generateToken(newUser, res);
  } catch (error) {
    next(new AppError(error.message, 400));
  }
};

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return next(new AppError('Both Fields are required', 400));
    }
    const user = await User.findOne({ email });
    if (!user) {
      return next(new AppError('No user found', 400));
    }
    const comparePasswords = bcryptjs.compareSync(password, user.password);
    if (!comparePasswords) {
      return next(new AppError('Incorrect Credentials', 400));
    }

    generateToken(user, res);
  } catch (error) {
    console.log(error);
    next(new AppError(error.message));
  }
};

export const google = async (req, res, next) => {
  try {
    const { userName, email, avatar } = req.body;

    const user = await User.findOne({ email });
    if (user) {
      generateToken(user, res);
    } else {
      let password = '12345';
      password = bcryptjs.hashSync(password, 10);
      const newUser = await User.create({ userName, email, password, avatar });
      generateToken(newUser, res);
    }
  } catch (error) {
    next(new AppError(error.message));
  }
};

export const signOut = async (req, res) => {
  try {
    res.status(200).json({
      status: 'success',
      message: 'User signed out successfully',
    });
  } catch (error) {
    next(new AppError(error.message));
  }
};
