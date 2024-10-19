import User from '../models/userModel.js';
import AppError from '../utils/AppError.js';

export const updateUser = async (req, res, next) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.userId,
      req.body,
      {
        runValidators: true,
        new: true,
      }
    );

    res.status(200).json({
      status: 'success',
      user: updatedUser,
    });
  } catch (error) {
    console.log(error);
    next(new AppError(error.message));
  }
};

export const deleteUser = async (req, res, next) => {
  try {
    await User.findByIdAndDelete(req.params.userId);
    res.status(204).json({
      status: 'success',
    });
  } catch (error) {
    console.log(error);
    next(new AppError(error.message));
  }
};

export const getAllUsers = async (req, res) => {
  try {
    const limit = +req.query['limit'];
    const page = +req.query['page'];

    const users = await User.find()
      .limit(limit)
      .skip((page - 1) * limit);
    const usersCount = await User.countDocuments();

    res.status(200).json({
      status: 'success',
      totalPages: Math.ceil(usersCount / limit),
      currentPage: page,
      users,
    });
  } catch (error) {
    console.log(error);
  }
};
