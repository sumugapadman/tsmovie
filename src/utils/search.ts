import { MovieItem } from './types';

export const debounce = (func: Function, timeout = 300) => {
    let timer : ReturnType<typeof setTimeout> | any;
    return (...args: any) => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        func.apply(this, args);
      }, timeout);
    };
};

export const getMatchingMovies = (movieName : string, items : MovieItem[]) => {
    let matchingMovies = items.filter((movie) => 
        Object.values(movie).some((item) => item.toLowerCase().indexOf(movieName.toLowerCase()) >= 0)
    );
    return matchingMovies;
}