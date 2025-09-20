interface IProduct {
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

export interface IGetProductResponse extends IProduct { }

export interface IGetProductsRequest {
    limit: number;
    page: number;
    searchContent: string;
}

export interface IGetProductsResponse {
    count: number;
    rows: IProduct[];
}

export interface ICreateProductRequest {
    author: string;
    productTitle: string;
    genre: string;
    filesId?: number[],
}

export interface ICreateProductResponse {
    productId: number;
}

export interface IEditProductRequest { }

export interface IEditProductResponse { }

export interface ISearchProductByEmailRequest {
    searchContent: string;
    page: number;
    limit: number;
}

interface IProductEmailType extends IProduct {
    email: string;
    userId: number;
    userYear: number;
    userStatus: boolean;
    bookImage: string;
    stateId: number;
}

export interface ISearchProductByEmailResponse {
    count: number;
    rows: IProductEmailType[];
}

export interface IGetAllProductByStateRequest extends IGetProductsRequest {
    type: number;
}


interface IProductWithState extends IProduct {
    productStateId: number;
    productStateStatus: boolean; // IsDelete
    // TODO Check name
    bookImage: string;
    email: string;
    userId: number;
}
export interface IGetAllProductByStateResponse {
    count: number;
    rows: IProductWithState[];
}

export interface IGetStatusResponse {
    statusId: number;
}

export interface IAddingProductInLibraryRequest {
    statusId: string;
    productId: string;
}

export interface IAddingProductInLibraryResponse {
    userInfo: {};
    message: string;
    messageCode: string;
}