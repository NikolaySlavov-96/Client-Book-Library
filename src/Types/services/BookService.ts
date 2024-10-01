export interface IGetStatesRequest { };

export interface IGetStatesResponse {
    id: number;
    stateName: string;
    symbol: "📖";
};

export interface IGetProductRequest { }

export interface IGetProductResponse {
    id: number;
    authorId: number;
    bookTitle: string;
    image: string;
    genre: string;
    isVerify: boolean;
    createdAt: string;
    updatedAt: string;
    Author: {
        name: string;
        image: string;
        genre: string;
        isVerify: boolean;
    }
}

export interface IGetProductsRequest {
    limit: number;
    page: number;
    searchContent: string;
}

interface IBooks {
    bookId: number;
    bookImage: string;
    bookGenre: string;
    bookIsVerify: boolean;
    bookTitle: string;
    authorName: string;
    authorImage: string;
    authorGenre: string;
    authorIsVerify: boolean
}
export interface IGetProductsResponse {
    count: number;
    rows: IBooks[];
}

export interface ICreateProductRequest { }

export interface ICreateProductResponse { }

export interface ISendFileRequest {
    deliverFile: File;
    src: string;
}

export interface ISendFileResponse { }

export interface IEditProductRequest { }

export interface IEditProductResponse { }

export interface ISearchProductByEmailRequest {
    content: string;
    page: number;
    limit: number;
}

interface IBookEmailType {
    email: string;
    userId: number;
    userYear: number;
    userIdVerify: boolean;
    bookId: number;
    bookImage: string;
    bookGenre: string;
    bookIsVerify: boolean;
    bookTitle: string;
    authorName: string;
    authorImage: string;
    authorGenre: string;
    authorIsVerify: boolean;
    stateId: number;
}

export interface ISearchProductByEmailResponse {
    count: number;
    rows: IBookEmailType[];
}

export interface IGetAllProductByStateRequest extends IGetProductsRequest {
    type: string;
}


interface IBookWithState {
    bookStateId: number;
    bookStateIsDelete: boolean;
    bookId: number;
    bookImage: string;
    bookGenre: string;
    bookIsVerify: boolean;
    bookTitle: string;
    authorName: string;
    authorImage: string;
    authorGenre: string;
    authorIsVerify: boolean;
    email: string;
    userId: number;
}
export interface IGetAllProductByStateResponse {
    count: number;
    rows: IBookWithState[];
}

export interface IGetBookStateResponse extends IGetStatesResponse { }

export interface IAddingBookInLibraryRequest {
    state: string;
    bookId: string;
}

export interface IAddingBookInLibraryResponse {
    userInfo: {};
    message: string;
    messageCode: string;
}