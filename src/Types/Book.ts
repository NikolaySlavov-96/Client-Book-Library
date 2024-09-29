export interface IBookData extends IBookProps {
    bookId: number,
}

export interface IBookProps {
    authorName: string;
    bookGenre: string;
    bookId: number;
    bookImage: string;
    bookTitle: string;
    hasTitle: boolean;
    image: string;
}