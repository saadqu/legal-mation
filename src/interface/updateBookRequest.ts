import Book from './book';

export default interface UpdateBookRequest {
  id: string | number;
  book: Book;
}
