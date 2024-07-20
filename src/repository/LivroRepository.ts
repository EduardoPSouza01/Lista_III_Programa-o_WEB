import mysql, { RowDataPacket, OkPacket } from 'mysql2';
import { LivrosModel } from '../model/modelLivros';
import { mysqlConnection } from '../database/mysql';


mysqlConnection.query(`
        CREATE TABLE IF NOT EXISTS livros (
            id INT AUTO_INCREMENT PRIMARY KEY,
            title VARCHAR(255) NOT NULL,
            author VARCHAR(255) NOT NULL,n
            publishedDate DATE,
            isbn VARCHAR(13) UNIQUE,
            pages INT,
            language VARCHAR(50),
            publisher VARCHAR(255)
        )
    `, (err) => {
        if (err) {
            console.error('Erro ao criar a tabela:', err);
            throw err;
        }
        console.log('Tabela livros verificada/criada com sucesso');
    }
);


export class LivrosRepository {
    DeleteLivrosRepository(book: LivrosModel): Promise<void> {
        const query = 'DELETE FROM livros WHERE id = ?';
        return new Promise((resolve, reject) => {
            mysqlConnection.query(query, [book.id], (err, result: OkPacket) => {
                if (err) return reject(err);
                console.log(`Livro deletado do banco de dados, linhas afetadas: ${result.affectedRows}`);
                resolve();
            });
        });
    }

    GetLivrosRepositoryID(id: number): Promise<LivrosModel | undefined> {
        const query = 'SELECT * FROM livros WHERE id = ?';
        return new Promise((resolve, reject) => {
            mysqlConnection.query(query, [id], (err, rows: RowDataPacket[]) => {
                if (err) return reject(err);
                resolve(rows.length > 0 ? rows[0] as LivrosModel : undefined);
            });
        });
    }

    PutLivrosRepository(book: LivrosModel): Promise<number> {
        const query = 'UPDATE livros SET title = ?, author = ?, publishedDate = ?, isbn = ?, pages = ?, language = ?, publisher = ? WHERE id = ?';
        const { title, author, publishedDate, isbn, pages, language, publisher, id } = book;
        return new Promise((resolve, reject) => {
            mysqlConnection.query(query, [title, author, publishedDate, isbn, pages, language, publisher, id], (err, result: OkPacket) => {
                if (err) return reject(err);
                resolve(result.affectedRows);
            });
        });
    }

    GetLivrosRepository(): Promise<LivrosModel[]> {
        const query = 'SELECT * FROM livros';
        return new Promise((resolve, reject) => {
            mysqlConnection.query(query, (err, rows: RowDataPacket[]) => {
                if (err) return reject(err);
                resolve(rows as LivrosModel[]);
            });
        });
    }

    filtraPorISBNRepository(isbn: string): Promise<LivrosModel | undefined> {
        const query = 'SELECT * FROM livros WHERE isbn = ?';
        return new Promise((resolve, reject) => {
            mysqlConnection.query(query, [isbn], (err, rows: RowDataPacket[]) => {
                if (err) return reject(err);
                resolve(rows.length > 0 ? rows[0] as LivrosModel : undefined);
            });
        });
    }

    PostLivrosRepository(book: LivrosModel): Promise<void> {
        const { title, author, publishedDate, isbn, pages, language, publisher } = book;
        
        const query = 'INSERT INTO livros (title, author, publishedDate, isbn, pages, language, publisher) VALUES (?, ?, ?, ?, ?, ?, ?)';

        return new Promise((resolve, reject) => {
            mysqlConnection.query(query, [title, author, publishedDate, isbn, pages, language, publisher], (err) => {
                if (err) return reject(err);
                resolve();
            });
        });
    }
}
