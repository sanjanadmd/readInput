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
  registerDetails() {
    return JSON.stringify(this.user);
  }
}

const readInput = (queries) => {
  let input = '';
  let index = 0;
  console.log(queries[index].query);
  process.stdin.on('data', (chunk) => {
    input += chunk;
    const lines = input.split('\n');
    lines.slice(0, -1).forEach((line) => {
      if (queries[index].answer(line)) {
        index++;
      }
      console.log(queries[index].query);
    });
    input = lines.slice(-1)[0];
  });

  process.stdin.on('end', () => {
    console.log('Thank you');
  });

};

const getDetails = () => {
  const user = new User();
  const queries = [
    {
      query: 'Please enter your name:', answer: (name) => user.addName(name)
    },
    {
      query: 'Please enter your DOB(yyyy-mm-dd)', answer: (dob) => user.addDOB(dob)
    },
    {
      query: 'Please enter your hobbies', answer: (hobbies) => user.addHobbies(hobbies)
    },
    {
      query: 'Thank you', answer: () => {
        const details = user.registerDetails();
        fs.writeFileSync('user.json', details, 'utf8');
        process.exit();
      }
    }
  ];
  readInput(queries);
}

getDetails();
