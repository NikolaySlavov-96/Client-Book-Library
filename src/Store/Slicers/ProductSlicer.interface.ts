export interface IState {
    id: number;
    stateName: string;
    symbol: string;
}

export interface IBook {
    bookId: number;
    bookGenre: string;
    bookIsVerify: boolean;
    bookTitle: string;
    authorName: string;
    authorImage: string;
    authorGenre: string;
    authorIsVerify: boolean;
    imageUrl: string;
    imageId: number;
    bookSrc: string;
}

export interface IBookWithState extends IBook {
    bookStateId: number;
    bookStateIsDelete: boolean;
    email: string;
    userId: number;
}

export interface IBookEmailType extends IBook {
    email: string;
    userId: number;
    userYear: number;
    userIdVerify: boolean;
    stateId: number;
}

export interface IFetchSearchParams {
    page: number;
    limit: number;
    searchContent: string;
}

export interface IFetchQueryParams extends IFetchSearchParams {
    type: number;
}