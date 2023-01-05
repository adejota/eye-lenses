# Eye Lenses

## Pré requisitos

Para rodar o projeto é necessário que você já tenha instalado em seu computador:

- [Nodejs > 14.18](https://nodejs.org/en/)
- [MySQL](https://www.mysql.com/)

## Tecnologias

Back-end

- [Nodejs](https://nodejs.org/en/)
- [MySQL](https://www.mysql.com/)

Front-end

- [Vuejs](https://vuejs.org/)

## Rodando o projeto

No terminal, clone o repositório e acesse o diretório com os seguintes comandos:

```
$ git clone https://github.com/adejota/eye-lenses.git
$ cd eye-lenses
```

### Banco de dados

No MySQL, abra uma nova guia e execute as querys descritas no arquivo [db.sql](db/db.sql)

### Api

Para executar a api, da raiz do repo acesse o diretório da api:

```
$ cd api-eye-lenses
```

Execute os comandos abaixo no terminal:

```
$ npm run dev
```

Pronto, o back está rodando em localhost:5000.

### Web

Para executar o frontend, da raiz do repo acesse o diretório da web:

```
$ cd web-eye-lenses
```

Execute os comandos abaixo no terminal:

```
$ npm install
$ npm run dev
```

A porta :5173 deve estar livre para evitar error de CORS.
Pronto, o front está rodando em localhost:5173.
