import { Request, Response } from "express";
import { LivrosService } from "../service/LivroService";

const livrosService = new LivrosService();

export function DeleteLivroControler (req: Request, res: Response){
    try {
        const id = Number(req.params.id); 
        livrosService.DeleteLivrosService(id);
        res.status(200).json({
            message: 'Livro deletado com sucesso'
        })
    } catch (error: any) {
        res.status(400).json({message: error.message})
    }
}

export function PutLivroControler(req: Request, res: Response){
    try {
        const idNumber = Number(req.params.id); 
        const book = livrosService.PutLivrosService(idNumber, req.body);
        res.status(200).json({
            message: 'Livro Atualizado com sucesso',
            Livro: book
        })
    } catch (error:any) {
        res.status(400).json({message: error.message})
    }
}

export function GetLivroControlerID(req: Request, res: Response){
    try {
        const book = livrosService.GetLivrosServiceID(req.params.id);
        res.status(200).json({
            Livros: book
        })
    } catch (error: any) {
        res.status(400).json({message: error.message});
        
    }
}

export function GetLivroControler(req: Request, res: Response){
    try {
        const books = livrosService.GetLivrosService();
        res.status(200).json({
            Livros: books
        })
    } catch (error: any) {
        res.status(400).json({message: error.message})
    };
}

export function PostLivroControler(req: Request, res: Response ){

    try {
        const novoLivro = livrosService.PostLivrosService(req.body);
        res.status(200).json({
            messagem: 'Livro adcionado com sucesso',
            Livro: novoLivro
        })
    } catch (error: any) {
        res.status(400).json({message: error.message});
    }

}