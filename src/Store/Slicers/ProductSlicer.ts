import { StateCreator } from "zustand";

import { ProductService as productService } from "../../services";

import {
    IProductEmailType,
    IProduct,
    IProductWithState,
    IFetchQueryParams,
    IFetchSearchParams,
    IState,
    IAddProductWithImage
} from "./ProductSlicer.interface";


export interface IProductSlicer {
    // error: 
    isLoadingProducts: boolean;
    isLoadingProductByEmails: boolean;
    isLoadingProduct: boolean;
    isLoadingProductState: boolean;
    isLoadingProductCollection: boolean;
    isLoadingProductAddition: boolean;
    isAddingProductState: boolean;

    productStates: IState[];
    fetchAllProductStates: () => void;

    productByEmail: { count: number, rows: IProductEmailType[] };
    fetchProductsForEmail: (data: IFetchSearchParams) => void;

    products: { count: number, rows: IProduct[] };
    fetchProducts: (data: IFetchSearchParams) => void;

    productById: IProduct;
    fetchProductById: (id: string) => void;

    productState: { stateId: number };
    fetchProductState: (id: string) => void;
    addingProductState: (id: string, state: string) => void;

    productCollection: { count: number, rows: IProductWithState[] };
    fetchProductCollection: (data: IFetchQueryParams) => void;

    isProductAdded: boolean;
    addProductWithImage: (data: IAddProductWithImage['data'], fileData: IAddProductWithImage['fileDate']) => void;
};

const createProductSlicer: StateCreator<IProductSlicer> = (set, get) => ({
    isLoadingProducts: false,
    isLoadingProductByEmails: false,
    isLoadingProduct: false,
    isLoadingProductState: false,
    isLoadingProductCollection: false,
    isLoadingProductAddition: false,
    isAddingProductState: false,

    productStates: [],
    fetchAllProductStates: async () => {
        try {
            const result = await productService.getAllStatus();
            set({ productStates: result })
        } catch (err) {
            console.log('fetchAllProductStates error --->: ', err);
        }
    },

    productByEmail: { count: 0, rows: [] },
    fetchProductsForEmail: async (data) => {
        set({ isLoadingProductByEmails: true });
        try {
            const result = await productService.searchProductByEmailOnUser(data);
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
        productId: 0,
        productType: '',
        productStatus: false,
        productTitle: '',
        authorName: '',
        authorImage: '',
        authorGenre: '',
        authorStatus: false,
        fileUrl: '',
        fileId: 0,
        fileSrc: '',
    },
    fetchProductById: async (id) => {
        set({ isLoadingProduct: true });
        try {
            const { products } = get();
            const isProductExist = products.rows.filter(p => p.productId === Number(id));
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
            const result = await productService.getProductStatus(id);
            set({ productState: { stateId: result.statusId } });
        } catch (err) {
            console.log('fetchProductState error --->: ', err);
        } finally {
            set({ isLoadingProductState: false });
        }
    },
    addingProductState: async (id, state) => {
        set({ isAddingProductState: true });
        try {
            const result = await productService.addStatusOnProduct({ productId: id, statusId: state });
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
            const result = await productService.getAllProductStatus(data);
            set({ productCollection: result });
        } catch (err) {
            console.log('fetchProductCollection error --->: ', err);
        } finally {
            set({ isLoadingProductCollection: false });
        }
    },

    isProductAdded: false,
    addProductWithImage: async (data, fileData) => {
        set({ isLoadingProductAddition: true });
        try {
            const result = await productService.createProduct(data);

            const formData = new FormData();
            formData.append('deliverFile', fileData.file);
            formData.append('src', fileData.name);
            formData.append('fileId', result?.productId.toString());

            await productService.sendFile(formData as unknown as { deliverFile: File, src: string, fileId: number });

            set({ isProductAdded: true });
        } catch (err) {
            console.log('addProductWithImage --->: ', err);
            // set(erroMessage)
        } finally {
            set({ isLoadingProductAddition: false });
        }
    },
});

export default createProductSlicer;




// const onSubmitEditProduct = useCallback(async (data: any) => {
//     try {
//         const prod = await productService.editProduct(data._id, data);
//         // setBook(p => p?.rows.map(x => x.id === data.id ? prod : x));

//         // navigate(ROUT_NAMES.HOME);
//     } catch (err) {
//         console.log('onSubmitEditProduct --->: ', err);
//     }
// }, []);

// const onSubmitDeleteProduct = useCallback(async (id: string) => {
//     try {
//         await productService.deleteProduct(id);
//         // setBook(p => p.filter(prod => prod._id !== id));

//         // navigate(ROUT_NAMES.HOME);
//     } catch (err) {
//         console.log('onSubmitDeleteProduct --->: ', err);
//     }
// }, []);