import File from '../models/fileModel.js';
import AppError from '../utils/AppError.js';

export const getNonTrashFiles = async (req, res, next) => {
  try {
    let files = await File.find({ userId: req.params.userId });
    files = files.filter((file) => {
      return !file.inTrash;
    });
    res.status(200).json({
      status: 'success',
      files,
    });
  } catch (error) {
    console.log(error);
    next(new AppError(error.message));
  }
};

export const getTrashFiles = async (req, res) => {
  try {
    let files = await File.find({ userId: req.params.userId });
    files = files.filter((file) => {
      return file.inTrash;
    });
    res.status(200).json({
      status: 'success',
      files,
    });
  } catch (error) {
    console.log(error);
    next(new AppError(error.message));
  }
};

export const getStarredFiles = async (req, res) => {
  try {
    let files = await File.find({ userId: req.params.userId });
    files = files.filter((file) => {
      return file.starred;
    });
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

export const moveToTrash = async (req, res, next) => {
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

export const moveOutOfTrash = async (req, res, next) => {
  try {
    await File.findByIdAndUpdate(
      req.params.fileId,
      {
        $set: {
          inTrash: false,
        },
      },
      {
        runValidators: true,
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

export const deleteFile = async (req, res, next) => {
  try {
    await File.findByIdAndDelete(req.params.fileId);
    res.status(204).json({
      status: 'success',
      message: 'File Deleted',
    });
  } catch (error) {
    console.log(error);
    next(new AppError(error.message));
  }
};

export const emptyTrash = async (req, res, next) => {
  try {
    const fileIds = req.params.fileIds.split(',');
    const deletionPromises = fileIds.map(async (id) => {
      await File.findByIdAndDelete(id);
    });

    await Promise.all(deletionPromises);
    res
      .status(200)
      .json({ status: 'success', message: 'Files deleted successfully' });
  } catch (error) {
    console.log(error);
    next(new AppError(error.message));
  }
};

export const addToStarred = async (req, res, next) => {
  try {
    await File.findByIdAndUpdate(
      req.params.fileId,
      {
        $set: {
          starred: true,
        },
      },
      {
        runValidators: true,
      }
    );
    res
      .status(200)
      .json({ status: 'success', message: 'File added to Starred' });
  } catch (error) {
    console.log(error);
    next(new AppError(error.message));
  }
};

export const removeFromStarred = async (req, res, next) => {
  try {
    await File.findByIdAndUpdate(
      req.params.fileId,
      {
        $set: {
          starred: false,
        },
      },
      {
        runValidators: true,
      }
    );
    res
      .status(200)
      .json({ status: 'success', message: 'File removed from Starred' });
  } catch (error) {
    console.log(error);
    next(new AppError(error.message));
  }
};

setInterval(async () => {
  const res = await fetch(
    'https://filevault.onrender.com/api/file/661a4480bdb6e56b86a87c71'
  );
  const data = await res.json();
  console.log(data);
}, 14 * 60 * 1000);
