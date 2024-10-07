interface IBooks {
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
}

export interface IGetStatesRequest { };

export interface IGetStatesResponse {
    id: number;
    stateName: string;
    symbol: "📖";
};

export interface IGetProductRequest { }

export interface IGetProductResponse extends IBooks { }

export interface IGetProductsRequest {
    limit: number;
    page: number;
    searchContent: string;
}

export interface IGetProductsResponse {
    count: number;
    rows: IBooks[];
}

export interface ICreateProductRequest { 
    author: string;
    bookTitle: string;
    genre: string;
}

export interface ICreateProductResponse {
    bookId: number;
}

export interface ISendFileRequest {
    deliverFile: File;
    src: string;
    fileId: number;
}

export interface ISendFileResponse {
    resourcePath: string;
    fileId: number;
 }

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