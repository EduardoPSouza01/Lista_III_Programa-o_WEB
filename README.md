# Lista III - Desenvolvimento de uma API REST para Gestão de Biblioteca

## Objetivo

Desenvolver uma API em TypeScript utilizando Node.js, Express e MySQL, que permita o cadastro, consulta, atualização e exclusão de livros em uma biblioteca. A API deve seguir o padrão de projeto MVC e manipular os dados em formato JSON.

## Descrição

Você deverá criar uma API que gerencie um acervo de livros. Para isso a mesma deverá permitir as seguintes operações:

<ul>
  <li>Criar um novo livro (Create)</li>
  <li>Consultar os livros cadastrados (Read)</li>
  <li>Consultar um livro por ID (Read)</li>
  <li>Atualizar informações de um livro existente (Update)</li>
  <li>Excluir um livro (Delete)</li>
</ul>

## Requisitos Adicionais

1. Validação: Implementar validações para garantir que todos os campos obrigatórios estão sendo enviados e possuem valores válidos. Verificação se o isbn é único ao criar um novo livro.
2. Tratamento de Erros: A API deve retornar respostas apropriadas em caso de erros, como 400 Bad Request para requisições inválidas, 404 Not Found para livros não encontrados e 409 Conflict para tentativas de criação de livros com isbn duplicado.
3. Persistência de Dados: Utilizar o banco de dados MySQL.
