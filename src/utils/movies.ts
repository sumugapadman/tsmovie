import {MovieItem} from './types';

export class Movie implements MovieItem{

    constructor(
        readonly title?: string,
        readonly rating?: string,
        readonly year?: string,
    ){}

    getRow() : HTMLTableRowElement{
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${this.title}</td>
            <td>${this.rating}</td>
            <td>${this.year}</td>
        `;
        return tr;
    }
}

export class MoviesGrid{

    constructor(private container : HTMLTableElement){}

    render(items : MovieItem[]){
        this.clear();
        items.forEach((item) => {
            let m = new Movie(item.title, item.rating, item.year);
            this.container.appendChild(m.getRow());
        });
    }

    clear(){
        this.container.innerHTML = '';
    }

    displayError(){
        this.container.innerHTML = `<p class="pt-3 text-end">No matching movies found ...</p>`;
    }
}