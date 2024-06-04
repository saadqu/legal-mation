import constants from '../constants';
import { Author } from '../interface';
import { BaseService } from './base';

const BASE_URL = `/${constants.NAMESPACE}/authors`;
const service = new BaseService<Author>(BASE_URL);

const fetchAuthors = async () => {
  return service.get();
};

const fetchSingle = async (id: string | number) => {
  console.log('🚀 ~ fetchSingle ~ id:', id);
  return service.getOne(id);
};

const addAuthor = async (data: Author) => {
  return service.create(data);
};

const editAuthor = async (data: Author, id: string | number) => {
  // eslint-disable-next-line no-async-promise-executor
  return service.update(data, id);
};

const deleteAuthor = async (id: string | number) => {
  return service.remove(id);
};

export { fetchAuthors, addAuthor, fetchSingle, editAuthor, deleteAuthor };
