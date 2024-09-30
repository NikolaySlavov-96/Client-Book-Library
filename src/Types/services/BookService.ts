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

export interface IGetProductsResponse {
    count: number;
    rows: {
        bookId: number;
        bookImage: string;
        bookGenre: string;
        bookIsVerify: boolean;
        bookTitle: string;
        authorName: string;
        authorImage: string;
        authorGenre: string;
        authorIsVerify: boolean
    }[];
}

export interface ICreateProductRequest { }

export interface ICreateProductResponse { }

export interface IEditProductRequest { }

export interface IEditProductResponse { }

export interface ISearchProductByEmailRequest {
    content: string;
    page: number;
    limit: number;
}

export interface ISearchProductByEmailResponse { }

export interface IGetAllProductByStateRequest extends IGetProductsRequest {
    type: string;

}

export interface IGetAllProductByStateResponse { }

export interface IGetBookStateResponse extends IGetStatesResponse { }

export interface IAddingBookInLibraryRequest {
    state: number;
    bookId: number;
}

export interface IAddingBookInLibraryResponse {
    userInfo: {};
    message: string;
    messageCode: string;
}