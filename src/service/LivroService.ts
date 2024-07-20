    import { LivrosModel } from "../model/modelLivros";
    import { LivrosRepository } from "../repository/LivroRepository";


    export class LivrosService{

        livrosRepository: LivrosRepository = new LivrosRepository();

        async DeleteLivrosService(idNumber:any){
            const book = await this.livrosRepository.GetLivrosRepositoryID(idNumber);
            if(!book) throw new Error('O livro não existe');
            this.livrosRepository.DeleteLivrosRepository(book)

        }

        async PutLivrosService(idNumber:any,  livroData:any): Promise<LivrosModel> {
            const {title, author, publishedDate, isbn, pages, language, publisher  } = livroData;
            if (!title || !author || !publishedDate || !isbn || !pages || !language || !publisher) throw new Error("Informações incompletas");
            const livroExistente = await this.livrosRepository.GetLivrosRepositoryID(idNumber);
            if (!livroExistente) throw new Error('O livro não existe!'); 

            livroExistente.title = title;
            livroExistente.author = author;
            livroExistente.publishedDate = publishedDate;
            livroExistente.isbn = isbn;
            livroExistente.pages = pages;
            livroExistente.language = language;
            livroExistente.publisher = publisher;

            await  this.livrosRepository.PutLivrosRepository(livroExistente);
            return livroExistente;
        }

        async GetLivrosServiceID(id:any): Promise<LivrosModel>{
            const idNumber: number = parseInt(id, 10);
            const verificação = await this.livrosRepository.GetLivrosRepositoryID(idNumber);
        if(verificação)
                return verificação
        else
                throw  new Error('O Livro não existe na base de dados');
        }

        async GetLivrosService(): Promise<LivrosModel[]>{
            return await this.livrosRepository.GetLivrosRepository();
        }

        async PostLivrosService(livroData: any): Promise<LivrosModel> {

            const { title, author, publishedDate, isbn, pages, language, publisher } = livroData;

            if (!title || !author || !publishedDate || !isbn || !pages || !language || !publisher) throw new Error("Informações incompletas");

            const livroExistente = await this.livrosRepository.filtraPorISBNRepository(isbn);
            if (livroExistente) throw new Error('O livro já existe');

            const novoLivro = new LivrosModel(title, author, publishedDate, isbn, pages, language, publisher);
            await this.livrosRepository.PostLivrosRepository(novoLivro);

            return novoLivro;
        }

    }