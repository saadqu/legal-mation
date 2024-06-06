import Author from "./author";

export default interface UpdateAuthorRequest {
    id: string | number;
    author: Author;
}