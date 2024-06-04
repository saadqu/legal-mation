import AuthorPics from "./authorPics";

export default interface Author {
  id?: number;
  name: string;
  picture?: AuthorPics;
}
