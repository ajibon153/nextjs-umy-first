export function success(res, code, data, message = '') {
  res.status(code).json({ data, message, success: true });
}

export function failed(res, code, message, data = null) {
  console.log('message error : ', message);
  console.log('Error :', data);
  console.log('code', code);
  if (!data) res.status(code).json({ message: message, success: false });
}
