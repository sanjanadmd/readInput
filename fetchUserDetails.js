const fs = require('fs');

process.stdin.setEncoding('utf8');

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
    return year.length === 4 && isFinite(year);
  }
  #validateMonth(month) {
    return month.length === 2 && isFinite(month);
  }
  #validateDate(date) {
    return date.length === 2 && isFinite(date);
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
    return hobbies.length > 0;
  }
  addHobbies(hobbiesString) {
    const hobbies = hobbiesString.split(',');
    if (this.#validateHobbies(hobbies)) {
      this.user.hobbies = hobbies;
      return true;
    }
    return false;
  }
  display() {
    console.log(this.user);
  }
  registerDetails() {
    fs.writeFileSync(this.user.name + '.json', JSON.stringify(this.user), 'utf8');
  }
}

const readInput = (reading) => {
  let input = '';
  let index = 0;
  console.log(reading[index].label);
  process.stdin.on('data', (chunk) => {
    input += chunk;
    const lines = input.split('\n');
    lines.slice(0, -1).forEach((line) => {
      if (reading[index].callback(line)) {
        index++;
      }
      console.log(reading[index].label);
    });
    input = lines.slice(-1)[0];
  });

  process.stdin.on('end', () => {
    console.log('Thank you')
  });

};

const getDetails = () => {
  const user = new User();
  const reading = [
    { label: 'Name:', callback: (name) => user.addName(name) },
    { label: 'DOB:', callback: (dob) => user.addDOB(dob) },
    { label: 'Hobbies:', callback: (hobbies) => user.addHobbies(hobbies) },
    {
      label: 'Thank you', callback: () => {
        user.registerDetails();
        process.exit();
      }
    }
  ];
  readInput(reading);
}

getDetails();
