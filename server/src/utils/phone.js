function removeNonDigits(input) {
  return input.replace(/\D/g, '');
}

function toStandardFormat(phone) {
  if (phone.length === 9) return '380' + phone;
  if (phone.startsWith('0') && phone.length === 10) return '38' + phone;
  return phone;
}
export {
  removeNonDigits,
  toStandardFormat
}
