import Book from './book';

export default interface SingleBook extends Book {
  authorIds: string[];
}
