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
