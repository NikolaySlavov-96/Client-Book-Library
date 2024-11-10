import { StateCreator } from "zustand";

import { BookService as productService } from "../../services";

import { IBookEmailType, IBook, IBookWithState, IFetchQueryParams, IFetchSearchParams, IState } from "./ProductSlicer.interface";


export interface IProductSlicer {
    // error: 
    isLoadingProducts: boolean;
    isLoadingProductByEmails: boolean;
    isLoadingProduct: boolean;
    isLoadingProductState: boolean;
    isLoadingProductCollection: boolean;
    isAddingProductState: boolean;

    pageLimit: number;
    setPageLimit: (limit: number) => void;

    productStates: IState[];
    fetchAllProductStates: () => void;

    productByEmail: { count: number, rows: IBookEmailType[] };
    fetchProductsForEmail: (data: IFetchSearchParams) => void;

    products: { count: number, rows: IBook[] };
    fetchProducts: (data: IFetchSearchParams) => void;

    productById: IBook;
    fetchProductById: (id: string) => void;

    productState: { stateId: number };
    fetchProductState: (id: string) => void;
    addingProductState: (id: string, state: string) => void;

    productCollection: { count: number, rows: IBookWithState[] };
    fetchProductCollection: (data: IFetchQueryParams) => void;
};

const createProductSlicer: StateCreator<IProductSlicer> = (set, get) => ({
    isLoadingProducts: false,
    isLoadingProductByEmails: false,
    isLoadingProduct: false,
    isLoadingProductState: false,
    isLoadingProductCollection: false,
    isAddingProductState: false,

    pageLimit: 12,
    setPageLimit: (limit) => set({ pageLimit: limit }),

    productStates: [],
    fetchAllProductStates: async () => {
        try {
            const result = await productService.getStates();
            set({ productStates: result })
        } catch (err) {
            console.log('fetchAllProductStates error --->: ', err);
        }
    },

    productByEmail: { count: 0, rows: [] },
    fetchProductsForEmail: async (data) => {
        set({ isLoadingProductByEmails: true });
        try {
            const result = await productService.searchBookByEmailOnUser(data);
            set({ productByEmail: result });
        } catch (err) {
            console.log('fetchProductsForEmail error --->: ', err);
        } finally {
            set({ isLoadingProductByEmails: false });
        }
    },

    products: { count: 0, rows: [] },
    fetchProducts: async (data) => {
        // set({ error: null, loading: true })
        set({ isLoadingProducts: true });
        try {
            const result = await productService.getProducts(data);
            set({ products: result });
        } catch (err) {
            console.log('fetchProducts error --->: ', err);
            // set({ error: error.message })
        } finally {
            set({ isLoadingProducts: false });
        }
    },

    productById: {
        bookId: 0,
        bookGenre: '',
        bookIsVerify: false,
        bookTitle: '',
        authorName: '',
        authorImage: '',
        authorGenre: '',
        authorIsVerify: false,
        imageUrl: '',
        imageId: 0,
        bookSrc: '',
    },
    fetchProductById: async (id) => {
        set({ isLoadingProduct: true });
        try {
            const { products } = get();
            const isProductExist = products.rows.filter(p => p.bookId === Number(id));
            if (isProductExist?.length) {
                set({ productById: isProductExist[0] });
            }

            const resultFromRequest = await productService.getProduct(id);
            set({ productById: resultFromRequest });
        } catch (err) {
            console.log('fetchProductById error --->: ', err);
        } finally {
            set({ isLoadingProduct: false });
        }
    },

    productState: { stateId: 0 },
    fetchProductState: async (id) => {
        set({ isLoadingProductState: true });
        try {
            const result = await productService.getBookState(id);
            set({ productState: result });
        } catch (err) {
            console.log('fetchProductState error --->: ', err);
        } finally {
            set({ isLoadingProductState: false });
        }
    },
    addingProductState: async (id, state) => {
        set({ isAddingProductState: true });
        try {
            const result = await productService.addBookToLibrary({ bookId: id, state }); // Refactor from bookId to productId or only id
            console.log("🚀 ~ addingProductState: ~ result:", result)
            // TODO Visualize success message
            set({ productState: { stateId: Number(state) } });
        } catch (err) {
            console.log('addingProductState error --->: ', err);
        } finally {
            set({ isAddingProductState: false });
        }
    },

    productCollection: { count: 0, rows: [] },
    fetchProductCollection: async (data) => {
        set({ isLoadingProductCollection: true });
        try {
            const result = await productService.getAllBooksByState(data); // TODO refactor rename getAllBooksByState
            set({ productCollection: result });
        } catch (err) {
            console.log('fetchProductCollection error --->: ', err);
        } finally {
            set({ isLoadingProductCollection: false });
        }
    },
});

export default createProductSlicer;