export interface IState {
    id: number;
    stateName: string;
    symbol: string;
}

export interface IProduct {
    productId: number;
    productType: string;
    productStatus: boolean;
    productTitle: string;
    authorName: string;
    authorImage: string;
    authorGenre: string;
    authorStatus: boolean;
    fileUrl: string;
    fileId: number;
    fileSrc: string;
}

export interface IProductWithState extends IProduct {
    productStateId: number;
    productStateStatus: boolean; // IsDelete
    email: string;
    userId: number;
}

export interface IProductEmailType extends IProduct {
    email: string;
    userId: number;
    userYear: number;
    userStatus: boolean;
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