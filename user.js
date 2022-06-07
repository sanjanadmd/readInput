class User {
  constructor() {
    this.user = {};
    this.user.address = [];
  }
  addName(name) {
    this.user.name = name;
  }
  addDOB(dob) {
    this.user.dob = dob;
  }
  addHobbies(hobbiesString) {
    const hobbies = hobbiesString.split(',');
    this.user.hobbies = hobbies;
  }
  addPhoneNumber(number) {
    this.user.ph_no = number;
  }

  setAddress() {
    if (this.user.address === undefined) {
      this.user.address = '';
    }
  }
  addAddress(address) {
    this.setAddress();
    this.user.address = (this.user.address + '\n' + address).trim();
  }
  registerDetails() {
    return JSON.stringify(this.user);
  }
}

exports.User = User;
