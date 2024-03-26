import File from '../models/fileModel.js';
import AppError from '../utils/AppError.js';

export const getAllFiles = async (req, res, next) => {
  try {
    const files = await File.find({ userId: req.params.userId });
    res.status(200).json({
      status: 'success',
      files,
    });
  } catch (error) {
    console.log(error);
    next(new AppError(error.message));
  }
};

export const newFile = async (req, res, next) => {
  try {
    req.body.userId = req.params.userId;
    const newFile = await File.create(req.body);
    res.status(200).json({
      status: 'success',
      file: newFile,
    });
  } catch (error) {
    console.log(error);
    next(new AppError(error.message));
  }
};
