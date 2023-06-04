const { displayMenu, promptUser } = require('./modules/userInteraction');
const { readCatalog, writeCatalog } = require('./modules/fileHandling');
const { MovieCatalog } = require('./modules/movieManagement');
const { fetchMovieData } = require('./modules/apiRequests');

// Function to start the application
async function start() {
  try {
    // Load the catalog from the JSON file
    let catalog = await readCatalog();

    // Create a new instance of MovieCatalog
    const movieCatalog = new MovieCatalog(catalog);

    // Display the initial menu
    let choice;
    while (choice !== '0') {
      displayMenu();
      choice = await promptUser('Enter your choice: ');

      switch (choice) {
        case '1':
          movieCatalog.displayCatalog();
          break;
        case '2':
          const movieData = await promptUserForMovieData();
          movieCatalog.addMovie(movieData);
          break;
        case '3':
          const movieIndex = await promptUserForMovieIndex(movieCatalog);
          const updatedMovieData = await promptUserForMovieData();
          movieCatalog.updateMovie(movieIndex, updatedMovieData);
          break;
        case '4':
          const movieIndexToDelete = await promptUserForMovieIndex(movieCatalog);
          movieCatalog.deleteMovie(movieIndexToDelete);
          break;
        case '5':
          const searchQuery = await promptUser('Enter a search query: ');
          const searchResults = movieCatalog.searchMovies(searchQuery);
          movieCatalog.displayFilteredMovies(searchResults);
          break;
        case '6':
          const filterBy = await promptUserForFilterOption();
          const filterValue = await promptUser('Enter a filter value: ');
          const filteredResults = movieCatalog.filterMovies(filterBy, filterValue);
          movieCatalog.displayFilteredMovies(filteredResults);
          break;
        case '7':
           await fetchAndStoreMovieData(movieCatalog);
          break;
        case '0':
          console.log('Exiting the application...');
          break;
        default:
          console.log('Invalid choice. Please try again.');
          break;
      }

      // Save the updated catalog to the JSON file
      await writeCatalog(movieCatalog.catalog);
    }
  } catch (error) {
    console.log('An error occurred:', error.message);
  }
}

// Function to prompt the user for movie data
async function promptUserForMovieData() {
  const title = await promptUser('Enter the movie title: ');
  const director = await promptUser('Enter the movie director: ');
  const releaseYear = await promptUser('Enter the release year: ');
  const genre = await promptUser('Enter the movie genre: ');

  return {
    title,
    director,
    releaseYear,
    genre,
  };
}

// Function to prompt the user to select a movie index
async function promptUserForMovieIndex(movieCatalog) {
  movieCatalog.displayCatalog();
  const index = await promptUser('Enter the index of the movie: ');
  return parseInt(index);
}

// Function to prompt the user for filter options
async function promptUserForFilterOption() {
  const filterByOptions = ['title', 'director', 'genre'];
  const optionsString = filterByOptions.map((option, index) => `${index + 1}. ${option}`).join('\n');
  const choice = await promptUser(`Choose a filter option:\n${optionsString}\nEnter your choice: `);
  const selectedOption = filterByOptions[parseInt(choice) - 1];

  return selectedOption;
}

async function fetchAndStoreMovieData(movieCatalog) {
    const movieData = await fetchMovieData();
  
    if (movieData.length > 0) {
      movieData.forEach((movie) => {
        movieCatalog.addMovie(movie);
      });
  
      await writeCatalog(movieCatalog.catalog);
    } else {
      console.log('No movie data found from the API.');
    }
  }

// Start the application
start();
