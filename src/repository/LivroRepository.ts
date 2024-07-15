import { LivrosModel } from "../model/modelLivros";

export class LivrosRepository{

    bookLivors:LivrosModel[] = [];

    DeleteLivrosRepository(book:LivrosModel){
        const indexBook = this.bookLivors.findIndex(b => b.id === book.id);
        if(indexBook !== -1) this.bookLivors.splice(indexBook, 1)
    }

    GetLivrosRepositoryID(id:number):LivrosModel| undefined{
        return this.bookLivors.find(book => book.id === id)
    }

    PutLivrosRepository(book:LivrosModel): number{
        const indexBook = this.bookLivors.findIndex(b => b.id === book.id);
        if (indexBook !== -1) this.bookLivors[indexBook] = book;
        return indexBook;
    }
    GetLivrosRepository():LivrosModel [] {
        return this.bookLivors
    }

    filtraPorISBNRepository(isbn:String):LivrosModel|undefined{
        return this.bookLivors.find(livros => livros.isbn === isbn);
    }

    PostLivrosRepository(book: LivrosModel){
        this.bookLivors.push(book);
    }
}