const fs = require('fs');
const util = require('util');

const writeFile = util.promisify(fs.writeFile);

async function fetchMovieData() {
    try {
      const response = await fetch('https://my-json-server.typicode.com/horizon-code-academy/fake-movies-api/movies');
      const data = await response.json();
      return data;
    } catch (error) {
      console.log('An error occurred while fetching movie data:', error.message);
      return [];
    }
  }

module.exports = {
  fetchMovieData
};
