import mysql, { Connection, RowDataPacket, OkPacket } from 'mysql2';
import { LivrosModel } from '../model/modelLivros';

const dbConfig = {
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'root',
    database: 'livros'
};

const mysqlConnection: Connection = mysql.createConnection(dbConfig);

mysqlConnection.connect((err) => {
    if (err) {
        console.error('Erro ao conectar ao banco de dados:', err);
        throw err;
    }
    console.log('Conexão bem-sucedida com o banco de dados MySQL');

    const createTableQuery = `
        CREATE TABLE IF NOT EXISTS livros (
            id INT AUTO_INCREMENT PRIMARY KEY,
            title VARCHAR(255) NOT NULL,
            author VARCHAR(255) NOT NULL,
            publishedDate DATE,
            isbn VARCHAR(13) UNIQUE,
            pages INT,
            language VARCHAR(50),
            publisher VARCHAR(255)
        )
    `;

    mysqlConnection.query(createTableQuery, (err) => {
        if (err) {
            console.error('Erro ao criar a tabela:', err);
            throw err;
        }
        console.log('Tabela livros verificada/criada com sucesso');
    });
});

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
