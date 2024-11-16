interface IBook {
    productId: number;
    productType: string;
    productStatus: boolean;
    productTitle: string;
    authorName: string;
    authorImage: string;
    authorGenre: string;
    authorStatus: boolean
    fileUrl: string;
    fileId: number;
    fileSrc: string;
}

export interface IGetStatesRequest { };

export interface IGetStatesResponse {
    id: number;
    stateName: string;
    symbol: "📖";
};

export interface IGetProductRequest { }

export interface IGetProductResponse extends IBook { }

export interface IGetProductsRequest {
    limit: number;
    page: number;
    searchContent: string;
}

export interface IGetProductsResponse {
    count: number;
    rows: IBook[];
}

export interface ICreateProductRequest {
    author: string;
    productTitle: string;
    genre: string;
}

export interface ICreateProductResponse {
    productId: number;
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
    searchContent: string;
    page: number;
    limit: number;
}

interface IBookEmailType extends IBook {
    email: string;
    userId: number;
    userYear: number;
    userStatus: boolean;
    bookImage: string;
    stateId: number;
}

export interface ISearchProductByEmailResponse {
    count: number;
    rows: IBookEmailType[];
}

export interface IGetAllProductByStateRequest extends IGetProductsRequest {
    type: number;
}


interface IBookWithState extends IBook {
    productStateId: number;
    productStateStatus: boolean; // IsDelete
    bookImage: string;
    email: string;
    userId: number;
}
export interface IGetAllProductByStateResponse {
    count: number;
    rows: IBookWithState[];
}

export interface IGetBookStateResponse {
    stateId: number;
}

export interface IAddingBookInLibraryRequest {
    state: string;
    bookId: string;
}

export interface IAddingBookInLibraryResponse {
    userInfo: {};
    message: string;
    messageCode: string;
}