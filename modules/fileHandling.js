// fileHandling.js

const fs = require('fs');
const util = require('util');

const readFile = util.promisify(fs.readFile);
const writeFile = util.promisify(fs.writeFile);


async function readCatalog() {
  try {
    const data = await readFile("movies.json", 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.log('Failed reading the catalog:', error.message);
    return [];
  }
}

// Function to write the movie catalog to the JSON file
async function writeCatalog(catalog) {
  try {
    const data = JSON.stringify(catalog, null, 2);
    await writeFile("movies.json", data, 'utf8');
    console.log('Catalog updated successfully.');
  } catch (error) {
    console.log('Failed writing the catalog:', error.message);
  }
}

module.exports = {
  readCatalog,
  writeCatalog
};
