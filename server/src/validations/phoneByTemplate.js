function phoneByTemplate(phone) {
  let templatedPhone = phone;
  if (phone.startsWith('0')) {
    templatedPhone = `+38${phone}`;
  } else if (phone.startsWith('380')) {
    templatedPhone = `+${phone}`;
  }
  return templatedPhone;
}

export default phoneByTemplate;
