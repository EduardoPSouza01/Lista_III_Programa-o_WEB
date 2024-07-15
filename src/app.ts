import express from 'express';
import { DeleteLivroControler, GetLivroControler, GetLivroControlerID, PostLivroControler, PutLivroControler } from './controller/controllerLivro';

const app = express();
const PORT = 3000;
app.use(express.json());

app.listen(PORT, () => console.log("API online na porta: " + PORT));


// Endpoints

// Post - Livros
app.post('/api/livro', PostLivroControler);

// Get - Livros
app.get('/api/livro', GetLivroControler);
app.get('/api/livro/:id', GetLivroControlerID);

// Put - Livros
app.put('/api/livro/:id', PutLivroControler);

// Delete - Livros
app.delete('/api/livro/:id', DeleteLivroControler);

