const errorHandler = (err, _, res, __) => {
  const { status = 500, message = 'Server error' } = err;
  res.status(status).json({ message });
};

export default errorHandler;
