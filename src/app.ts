import movies from './data/movies.json';
import { MoviesGrid } from './utils/movies';
import { MovieItem, SortByItem } from './utils/types';
import { debounce, getMatchingMovies } from './utils/search';
import { SortBy } from './utils/sort';

const movieList = movies.movies as MovieItem[];
const search = document.querySelector('#movie-search') as HTMLInputElement;
const clearBtn = document.querySelector('#clear-search') as HTMLButtonElement;
const clearSearchContainer = document.querySelector("#clear-search-container") as HTMLDivElement;
const tbody: any = document.querySelector('tbody');
const sortBy = document.querySelector('#sort-by') as HTMLSelectElement;
const orderBy = document.querySelector('#order-by') as HTMLSelectElement;
let displayedResults : MovieItem[];

const loadMovies = (movies: MovieItem[]) => {
    let grid = new MoviesGrid(tbody);
    movies.length ? grid.render(movies) : grid.displayError();
    displayedResults = movies;
}

document.addEventListener("DOMContentLoaded", function(event) {
    loadMovies(movieList);
});

const handleSearch = (movie : string) => {
    clearSearchContainer.className = movie ? 'input-group-text visible' : 'input-group-text invisible'; 
    let matchingMovies = getMatchingMovies(movie,movieList);
    loadMovies(matchingMovies);
}

const debouncedSearch = debounce(handleSearch, 1000);

search.addEventListener('input',(e: Event) => {
    e.preventDefault();
    let movieName = (<HTMLInputElement>e.target).value;
    debouncedSearch(movieName);
});

clearBtn.addEventListener('click',(e: Event) => {
    e.preventDefault();
    search.value = ''; // clear search
    loadMovies(movieList); // load all movies
    clearSearchContainer.className = 'input-group-text invisible'; // hide button
    // reset sorting filters
    sortBy.value = 'title';
    orderBy.value = 'asc';
});

const handleSorting = (e : Event) => {
    e.preventDefault();
    if(displayedResults.length){
        let sortOptions = <SortByItem>{
            column : sortBy.value,
            order : orderBy.value
        };
        let s = new SortBy(sortOptions);
        s.movies = displayedResults;
        let sortedMovies = s.sortMovies();
        loadMovies(sortedMovies);
    }
}
sortBy.addEventListener('change',handleSorting);
orderBy.addEventListener('change',handleSorting);