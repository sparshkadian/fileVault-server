import File from '../models/fileModel.js';
import AppError from '../utils/AppError.js';

export const getNonTrashFiles = async (req, res, next) => {
  try {
    const userId = req.params.userId;
    const searchQuery = req.query['search'];
    if (searchQuery.length === 0) {
      let files = await File.find({ userId });
      files = files.filter((file) => {
        return !file.inTrash;
      });
      res.status(200).json({
        status: 'success',
        files,
      });
    } else {
      let files = await File.find({
        $text: { $search: searchQuery },
        userId,
      });
      res.status(200).json({
        status: 'success',
        files,
      });
    }
  } catch (error) {
    console.log(error);
    next(new AppError(error.message));
  }
};

export const updateFile = async (req, res, next) => {
  try {
    const fileId = req.params.fileId;
    const file = await File.findOne({ _id: fileId });
    if (!file) {
      return next(new AppError('No file found with this id!', 404));
    }
    const updatedFile = await File.findByIdAndUpdate(fileId, req.body, {
      runValidators: true,
      new: true,
    });

    res.status(200).json({
      status: 'success',
      updatedFile,
    });
  } catch (error) {
    console.log(error);
    next(new AppError(error.message));
  }
};

export const getTrashFiles = async (req, res, next) => {
  try {
    const userId = req.params.userId;
    const searchQuery = req.query['search'];
    if (searchQuery.length === 0) {
      let files = await File.find({ userId });
      files = files.filter((file) => {
        return file.inTrash;
      });
      res.status(200).json({
        status: 'success',
        files,
      });
    } else {
      console.log('by query', searchQuery);
      let files = await File.find({ $text: { $search: searchQuery }, userId });
      files = files.filter((file) => {
        return file.inTrash;
      });
      res.status(200).json({
        status: 'success',
        files,
      });
    }
  } catch (error) {
    console.log(error);
    next(new AppError(error.message));
  }
};

export const getStarredFiles = async (req, res, next) => {
  try {
    const userId = req.params.userId;
    const searchQuery = req.query['search'];
    if (searchQuery.length === 0) {
      let files = await File.find({ userId });
      files = files.filter((file) => {
        return file.starred;
      });
      res.status(200).json({
        status: 'success',
        files,
      });
    } else {
      let files = await File.find({ $text: { $search: searchQuery }, userId });
      files = files.filter((file) => {
        return file.starred;
      });
      res.status(200).json({
        status: 'success',
        files,
      });
    }
  } catch (error) {
    console.log(error);
    next(new AppError(error.message));
  }
};

export const newFile = async (req, res, next) => {
  try {
    req.body.userId = req.params.userId;
    const addFilesPromises = req.body.map(
      async (file) => await File.create(file)
    );
    const files = await Promise.all(addFilesPromises);
    res.status(200).json({
      status: 'success',
      files,
    });
  } catch (error) {
    console.log(error);
    next(new AppError(error.message));
  }
};

export const moveToTrash = async (req, res, next) => {
  try {
    console.log(req.params.fileId);
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

    const nonTrashFiles = await File.find({ inTrash: false });
    res.status(200).json({
      status: 'success',
      files: nonTrashFiles,
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

export const addAllToTrash = async (req, res, next) => {
  try {
    const fileIds = req.params.fileIds.split(',');

    const promises = await fileIds.map(async (id) => {
      await File.findByIdAndUpdate(id, { inTrash: true });
    });

    await Promise.all(promises);
    res.status(200).json({
      status: 'success',
      message: 'all files added to Trash',
    });
  } catch (error) {
    console.log(error);
    next(new AppError(error.message, 500));
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
    const files = await File.find();
    res.status(200).json({ status: 'success', files });
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
