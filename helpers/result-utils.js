export function success(res, code, data, message = '') {
  res.status(code).json({ data, message, success: true });
}

export function failed(res, code, message, data = null) {
  console.log('message error : ', message);
  console.log('Error :', data.message);
  console.log('code', code);
  if (!data) res.status(code).json({ message: message, success: false });
  if (data)
    if (data.message)
      res.status(code).json({ message: data.message, success: false });
}
