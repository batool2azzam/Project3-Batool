// movieManagement.js

class MovieCatalog {
    catalog

    constructor(catalog) {
      this.catalog = catalog;
    }
  
    // Function to display the movie catalog
    displayCatalog() {
      console.log(' Movie Catalog ....');
      this.catalog.forEach((movie, index) => {
        console.log(`${index + 1}. ${movie.title} (${movie.director}, ${movie.releaseYear}) - ${movie.genre}`);
      });
    }
  
    // Function to add a new movie to the catalog
    addMovie(movieData) {
      this.catalog.push(movieData);
      console.log('Movie added successfully.');
    }
  
    // update the details of a movie in the catalog
    updateMovie(index, updatedMovieData) {
      if (index >= 0 && index < this.catalog.length) {
        this.catalog[index] = { ...this.catalog[index], ...updatedMovieData };
        console.log('Movie details updated successfully.');
      } else {
        console.log('Invalid movie index.');
      }
    }
  
    // Function to delete a movie from the catalog
    deleteMovie(index) {
      if (index >= 0 && index < this.catalog.length) {
        this.catalog.splice(index, 1);
        console.log('Movie deleted successfully.');
      } else {
        console.log('Invalid movie index.');
      }
    }
  
    // Function to search for movies by title, director, or genre
    searchMovies(anything) {
      return this.catalog.filter(
        (movie) =>
          movie.title.includes(anything) ||
          movie.director.includes(anything) ||
          movie.genre.includes(anything)
      );
    }
  
    // Function to filter movies based on a specific criterion
    filterMovies(criterion, value) {
      return this.catalog.filter((movie) => movie[criterion] === value);
    }
  
    // Function to display filtered movie results
    displayFilteredMovies(filteredMovies) {
      console.log(' Filtered Movies ');
      filteredMovies.forEach((movie, index) => {
        console.log(`${index + 1}. ${movie.title} (${movie.director}, ${movie.releaseYear}) - ${movie.genre}`);
      });
    }
  

  }
  
  module.exports = {
    MovieCatalog
  };
  