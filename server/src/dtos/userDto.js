module.exports = class UserDto {
  id;

  name;

  surname;

  gender;

  phone;

  password;

  email;

  floor;

  room;

  role;

  avatar;

  constructor(model) {
    this.id = model.id;
    this.name = model.name;
    this.surname = model.surname;
    this.gender = model.gender;
    this.phone = model.phone;
    this.password = model.password;
    this.email = model.email;
    this.floor = model.floor;
    this.room = model.room;
    this.role = model.role;
    this.avatar = model.avatar;
  }
};
