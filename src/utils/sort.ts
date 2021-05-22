import { MovieItem, SortByItem, SORT_DESC } from './types';

export class SortBy implements SortByItem{

    public column;
    public order;
    public movies!: MovieItem[]; 

    constructor(private options: SortByItem){
        this.column = this.options.column;
        this.order = this.options.order;
    }
    
    sortMovies() : MovieItem[]{
        return this.movies.sort((a,b) => {
            if (this.order === SORT_DESC) return a[this.column] < b[this.column] ? 1 : -1;
            return a[this.column] > b[this.column] ? 1 : -1;
        });
    }

}