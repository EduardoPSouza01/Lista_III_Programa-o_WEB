export class LivrosModel {
    id: number;
    title: string;
    author: string;
    publishedDate: string;
    isbn: string;
    pages: number;
    language: string;
    publisher: string

    constructor(title?:string, author?:string, publishedDate?:string, isbn?:string, pages?:number, language?:string, publisher?:string, id?:number){
        this.id = id || this.geraId();
        this.title = title || '';
        this.author = author || '';
        this.publishedDate = publishedDate || '';
        this.isbn = isbn || '';
        this.pages = pages || 0;
        this.language = language || '';
        this.publisher = publisher || '';
    }

    private geraId():number{
        return Date.now();
    }
}


