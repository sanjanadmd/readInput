class User {
  constructor() {
    this.user = {};
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
  #validateYear(year) {
    return year?.length === 4 && isFinite(year);
  }
  #validateMonth(month) {
    return month?.length === 2 && isFinite(month);
  }
  #validateDate(date) {
    return date?.length === 2 && isFinite(date);
  }
  #validateDOB(dob) {
    const [year, month, date] = dob.split('-');
    return this.#validateYear(year) && this.#validateMonth(month) && this.#validateDate(date);
  }
  addDOB(dob) {
    if (this.#validateDOB(dob)) {
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
  registerDetails() {
    return JSON.stringify(this.user);
  }
}

exports.User = User;
