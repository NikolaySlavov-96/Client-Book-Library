export interface IState {
    id: number;
    stateName: string;
    symbol: string;
}

interface IBook {
    bookId: number;
    bookGenre: string;
    bookIsVerify: boolean;
    bookTitle: string;
    authorName: string;
    authorImage: string;
    authorGenre: string;
    authorIsVerify: boolean
}

export interface IBooks extends IBook {
    imageUrl: string;
    imageId: number;
    bookSrc: string;
}

export interface IBookWithState extends IBook {
    bookStateId: number;
    bookStateIsDelete: boolean;
    bookImage: string;
    email: string;
    userId: number;
}

export interface IBookEmailType extends IBook {
    email: string;
    userId: number;
    userYear: number;
    userIdVerify: boolean;
    bookImage: string;
    stateId: number;
}

export interface IFetchSearchParams {
    page: number;
    limit: number;
    searchContent: string;
}

export interface IFetchQueryParams extends IFetchSearchParams {
    type: string;
}