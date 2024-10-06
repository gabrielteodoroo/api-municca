# API Municca

Esta é a API desenvolvida para um processo seletivo, utilizando Node.js com NestJS.

## Requisitos

Antes de iniciar, certifique-se de ter os seguintes requisitos instalados em sua máquina:

- **Node.js**: Versão 18.x ou superior [Node.js Download](https://nodejs.org/)
- **npm**: Gerenciador de pacotes padrão do Node.js
- **Docker**: Para rodar o banco de dados em containers [Docker Download](https://www.docker.com/)


## Tecnologias Utilizadas

As principais tecnologias utilizadas para o desenvolvimento desta API são:

- **Node.js**: Runtime JavaScript
- **NestJS**: Framework de desenvolvimento de APIs
- **TypeScript**: Superconjunto do JavaScript que adiciona tipagem estática
- **Jest**: Framework de testes
- **Prisma**: ORM (Object-Relational Mapping)
- **PostgreSQL**: Banco de dados relacional (rodando em um container Docker)
- **Docker**: Containerização do banco de dados

## Instalação

1. Clone o repositório para a sua máquina local:

   ```bash
   git clone https://github.com/gabrielteodoroo/api-municca
   ```
2. Acesse o diretório do projeto:

   ```bash
   cd api-municca
   ```
3. Instale as dependências:

   ```bash
   npm install 
   ```
4. Suba o container do banco de dados PostgreSQL com Docker:

      ```bash
      docker-compose up -d
      ```

5. Renomeie o arquivo `.env-example` para `.env`

6. Configure o banco de dados executando as migrações:

    ```base
    npx prisma migrate dev
    ```

## Como Usar

### Executando o servidor de desenvolvimento

Para iniciar a API em modo de desenvolvimento, utilize o comando:

   ```bash
   npm run start:dev
   ```

O servidor será iniciado em http://localhost:3000.

### Documentação da API

A documentação está disponível no **SwaggerHub**.
Acesse o link abaixo:
+ [Documentação da API no SwaggerHub](https://app.swaggerhub.com/apis/BIELTEODOROB/municca-api/1.0.0)

### Rotas disponíveis

#### User

+ **POST** /login: Autentica um usuário e retorna um token JWT.
+ **GET** /users: Retorna a lista de usuários.
+ **POST** /users: Cria um novo usuário.
+ **GET** /users/:id: Retorna os dados de um usuário específico.
+ **PUT** /users/:id: Atualiza as informações de um usuário específico.
+ **DELETE** /users/:id: Exclui um usuário específico.

#### Document

+ **POST** /documents: Cria um documento para o usuário logado.
+ **GET** /documents: Retorna a lista de documentos do usuário logado.
+ **GET** /documents/:id: Retorna os dados de um documento específico.
+ **PUT** /documents/:id: Atualiza as informações de um documento específico.
+ **DELETE** /documents/:id Exclui um documento específico.

## Como testar

### Testes dos casos de uso

Os testes de casos de uso foram implementados utilizando Jest. Para rodar os testes, utilize o comando:

   ```bash
   npm run test
   ```

### Testes E2E
Os testes End-to-End (E2E), que testam os controllers da aplicação, podem ser executados com o comando:

   ```bash
   npm run test:e2e
   ```

## Contribuindo

1. Faça fork do projeto
2. Crie uma nova branch com sua feature: `git checkout -b minha-feature`.
3. Faça commit das suas mudanças: `git commit -m 'Minha nova feature'`.
4. Envie para a branch principal: `git push origin minha-feature`.
5. Abra um Pull Request.