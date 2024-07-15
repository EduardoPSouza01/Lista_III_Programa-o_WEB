import { LivrosModel } from "../model/modelLivros";
import { LivrosRepository } from "../repository/LivroRepository";


export class LivrosService{

    livrosRepository: LivrosRepository = new LivrosRepository();

    DeleteLivrosService(idNumber:any){

        const book = this.livrosRepository.GetLivrosRepositoryID(idNumber);

        if(!book) throw new Error('O livro não existe');

        this.livrosRepository.DeleteLivrosRepository(book)
    }

    PutLivrosService(idNumber:any,  livroData:any): LivrosModel{

        const {title, author, publishedDate, isbn, pages, language, publisher  } = livroData;

        if (!title || !author || !publishedDate || !isbn || !pages || !language || !publisher) throw new Error("Informações incompletas");

        const livroExistente = this.livrosRepository.GetLivrosRepositoryID(idNumber);
        if (!livroExistente) throw new Error('O livro não existe!'); 

        livroExistente.title = title;
        livroExistente.author = author;
        livroExistente.publishedDate = publishedDate;
        livroExistente.isbn = isbn;
        livroExistente.pages = pages;
        livroExistente.language = language;
        livroExistente.publisher = publisher;

        this.livrosRepository.PutLivrosRepository(livroExistente);
        return livroExistente;

    }

    GetLivrosServiceID(id:any): LivrosModel{
        const idNumber: number = parseInt(id, 10);
        const verificação = this.livrosRepository.GetLivrosRepositoryID(idNumber);

       if(verificação)
            return verificação
       else
            throw  new Error('O Livro não existe na base de dados');

    }

    GetLivrosService():LivrosModel[]{
        return this.livrosRepository.GetLivrosRepository();
    }

    PostLivrosService(livroData: any): LivrosModel {

        const { title, author, publishedDate, isbn, pages, language, publisher } = livroData;

        if (!title || !author || !publishedDate || !isbn || !pages || !language || !publisher) throw new Error("Informações incompletas");

        const livroExistente = this.livrosRepository.filtraPorISBNRepository(isbn);
        if (livroExistente) throw new Error('O livro já existe');
        
        const novoLivro = new LivrosModel(title, author, publishedDate, isbn, pages, language, publisher);
        this.livrosRepository.PostLivrosRepository(novoLivro);

        return novoLivro;
    }

}