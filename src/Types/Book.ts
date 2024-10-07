export interface IBookData extends IBookProps {
    bookId: number,
}

export interface IBookProps {
    bookId: number;
    bookGenre: string;
    bookIsVerify: boolean;
    bookTitle: string;
    authorName: string;
    authorImage: string;
    authorGenre: string;
    authorIsVerify: boolean
    bookSrc: string;
    imageId: number;
    imageUrl: string;
    hasTitle?: boolean;
}