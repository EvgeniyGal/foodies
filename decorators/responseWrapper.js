import HttpError from '../helpers/HttpError.js';

const responseWrapper = (respData, errorStatus, res, resStatus) => {
  if (!respData) {
    throw HttpError(errorStatus);
  }
  res.status(resStatus).json(respData);
};

export default responseWrapper;
