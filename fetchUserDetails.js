const fs = require('fs');

process.stdin.setEncoding('utf8');

class User {
  constructor() {
    this.user = {};
  }

  #validateName(name) {
    return !isFinite(name);
  }
  addName(name) {
    if (this.#validateName(name)) {
      this.user.name = name;
      return true;
    }
    return false;
  }
  #validateDOB(dob) {
    const [year, month, date] = dob.split('-');
    return isFinite(year) && isFinite(month) && isFinite(date);
  }
  addDOB(dob) {
    if (this.#validateDOB(dob)) {
      this.user.dob = dob;
      return true;
    }
    return true;
  }
  addHobbies(hobbies) {
    this.user.hobbies = hobbies;
  }

  display() {
    console.log(this.user);
  }
  registerDetails() {
    fs.writeFileSync(this.user.name + '.json', JSON.stringify(this.user), 'utf8');
  }
}

const readInput = (cb, label) => {
  let input = '';
  console.log(label);
  process.stdin.on('data', (chunk) => {
    input += chunk;
    const lines = input.split('\n');
    lines.slice(0, -1).forEach((line) => {
      if (cb(line)) {
        process.stdin.emit('close');
      }
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
    { label: 'Hobbies:', callback: (hobbies) => user.addName(hobbies) }
  ];
  readInput(user.addName, 'Name:');
  readInput(user.addDOB, 'DOB:');
}

getDetails();
