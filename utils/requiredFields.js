import AppError from './AppError.js';

export const requiredFields = (reqParamsArrays, next) => {
  for (const k of reqParamsArrays) {
    if (k === '' || k === undefined || k == null) {
      next(new AppError('All Fields are requried', 400));
    }
  }
};
