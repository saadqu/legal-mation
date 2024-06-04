import constants from '../constants';
import { Book } from '../interface';
import { BaseService } from './base';

const BASE_URL = `/${constants.NAMESPACE}/books`;
const service = new BaseService<Book>(BASE_URL);

const addBook = (data: Book) => {
  return service.create(data);
};

const fetchBooks = () => {
  return service.get();
};

const getSingle = (id: number | string) => {
  return service.getOne(id);
};

const update = (data: Book, id: number | string) => {
  return service.update(data, id);
};

const removeBook = (id: number | string) => {
  return service.remove(id);
};

export { addBook, fetchBooks, getSingle, update, removeBook };
