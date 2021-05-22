export interface MovieItem {
    [key: string]: any;
    readonly title?: string;
    readonly rating?: string;
    readonly year?: string;
    getRow() : HTMLTableRowElement;
}

export interface SortByItem {
    [key: string]: any;
    column : string;
    order : string;
    sortMovies() : MovieItem[];
}

export const SORT_ASC = "asc";
export const SORT_DESC = "desc";