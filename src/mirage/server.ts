import { Model, belongsTo, createServer, hasMany } from 'miragejs';
import constant from '../constants';

const makeServer = ({ environment = 'test' } = {}) => {
  const server = createServer({
    environment,
    models: {
      books: Model.extend({
        authors: hasMany(),
      }),
      authors: Model.extend({
        books: belongsTo(),
      }),
    },

    routes() {
      this.passthrough(constant.RANDOM_PICS);

      this.namespace = constant.NAMESPACE;

      this.post('/authors', async (schema, request) => {
        const attrs = JSON.parse(request.requestBody);
        schema.create('authors', attrs);

        return attrs;
      });

      this.get('/authors');

      this.get('/authors/:id', (schema, request) => {
        const id = request.params.id;
        const author = schema.find('authors', id);
        return author;
      });

      this.patch('/authors/:id', (schema, request) => {
        const newAttrs = JSON.parse(request.requestBody);
        const id = request.params.id;
        const author = schema.find('authors', id);

        author?.update(newAttrs);

        return author;
      });

      this.delete('/authors/:id', (schema, request) => {
        const id = request.params.id;

        const author = schema.find('authors', id);
        if (author) author.destroy();

        return author;
      });

      this.post('/books', async (schema, request) => {
        const attrs = JSON.parse(request.requestBody);
        const { authors } = attrs;
        const author = schema.find('authors', authors);
        const payload = { ...attrs, authors: [author] };
        schema.create('books', payload);

        return attrs;
      });

      this.get('/books');

      this.get('/books/:id', (schema, request) => {
        const id = request.params.id;
        const book = schema.find('books', id);
        if (!book) return {};
        return book.attrs;
      });

      this.patch('/books/:id', (schema, request) => {
        const newAttrs = JSON.parse(request.requestBody);
        const id = request.params.id;
        const book = schema.find('books', id);

        const author = schema.find('authors', newAttrs.authors);
        const payload = { ...newAttrs, authors: [author] };

        book?.update(payload);
        return book;
      });

      this.delete('/books/:id', (schema, request) => {
        const id = request.params.id;

        const book = schema.find('books', id);
        if (book) book.destroy();

        return book;
      });
    },
  });
  return server;
};

export default makeServer;
