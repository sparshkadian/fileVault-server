import File from '../models/fileModel.js';
import AppError from '../utils/AppError.js';

export const getAllFiles = async (req, res, next) => {
  try {
    let files = await File.find({ userId: req.params.userId });

    files = files.filter((file) => {
      return !file.inTrash;
    });

    console.log(files);

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

export const moveToTrash = async (req, res) => {
  try {
    await File.findByIdAndUpdate(
      req.params.fileId,
      {
        $set: {
          inTrash: true,
        },
      },
      {
        runValidators: true,
        new: true,
      }
    );
    res.status(200).json({
      status: 'success',
    });
  } catch (error) {
    console.log(error);
    next(new AppError(error.message));
  }
};
