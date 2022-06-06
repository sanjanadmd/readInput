const validateYear = (year) => {
  return year?.length === 4 && isFinite(year);
}
const validateMonth = (month) => {
  return month?.length === 2 && isFinite(month);
}
const validateDate = (date) => {
  return date?.length === 2 && isFinite(date);
}

const validateDOB = (dob) => {
  const [year, month, date] = dob.split('-');
  return validateYear(year) && validateMonth(month) && validateDate(date);
}

class User {
  constructor() {
    this.user = {};
    this.user.address = [];
  }

  #validateName(name) {
    if (name.length > 4) {
      return !isFinite(name);
    }
    return false;
  }
  addName(name) {
    if (this.#validateName(name)) {
      this.user.name = name;
      return true;
    }
    return false;
  }
  addDOB(dob) {
    if (validateDOB(dob)) {
      this.user.dob = dob;
      return true;
    }
    return false;
  }
  #validateHobbies(hobbies) {
    return hobbies.length > 0 && hobbies[0] !== '';
  }
  addHobbies(hobbiesString) {
    const hobbies = hobbiesString.split(',');
    if (this.#validateHobbies(hobbies)) {
      this.user.hobbies = hobbies;
      return true;
    }
    return false;
  }

  #validatePhoneNumber(number) {
    return number.length === 10 && isFinite(number);
  }
  addPhoneNumber(number) {
    if (this.#validatePhoneNumber(number)) {
      this.user.ph_no = number;
      return true;
    }
    return false;
  }
  #validateAddress(address) {
    return address !== '';
  }

  setAddress() {
    if (this.user.address === undefined) {
      this.user.address = '';
    }
  }
  addAddress(address) {
    if (this.#validateAddress(address)) {
      this.setAddress();
      this.user.address = (this.user.address + '\n' + address).trim();
      return true;
    }
    return false;
  }
  registerDetails() {
    return JSON.stringify(this.user);
  }
}

exports.User = User;
