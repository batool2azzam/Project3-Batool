const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function displayMenu() {
  console.log('.. Movie Catalog CLI Application .. ')
  console.log('1- Display Movie Catalog')
  console.log('2- Add New Movie')
  console.log('3- Update Movie Details')
  console.log('4- Delete Movie')
  console.log('5- Search Movies')
  console.log('6- Filter Movies')
  console.log('7- Fetch Movie Data')
  console.log('0- Exit')
}

function promptUser(prompt) {
  return new Promise((resolve) => {
    rl.question(prompt, (input) => {
      resolve(input);
    });
  });
}

function close() {
  rl.close();
}

module.exports = {
  displayMenu,
  promptUser,
  close
};
