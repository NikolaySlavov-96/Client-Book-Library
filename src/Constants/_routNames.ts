const AUTH_PREFIX = '/auth';

const _ROUT_NAMES = {
    PRODUCT_DETAILS: '/book/:id',
    PRODUCT: '/book',
    CREATE_PRODUCT: '/create',
    HOME: '/',
    LOGIN: `${AUTH_PREFIX}/login`,
    REGISTER: `${AUTH_PREFIX}/register`,
    REVIEW_PRODUCTS_BY_EMAIL: '/search/:email',
    SUPPORT_CHAT: `/support`,
    USER_COLLECTION: '/collections',
    VERIFY_TOKEN: `${AUTH_PREFIX}/verify/:verifyToken`,
};

export default _ROUT_NAMES;

export const _HEADER_BUTTON_TITLES = {
    PRODUCT: 'Book',
    CHAT: 'Chat',
    COLLECTION_OF_PRODUCTS: 'Collections of Books',
    CREATE_PRODUCT: 'Create',
    LOGIN: 'Login',
    LOGOUT: 'Logout',
    REGISTER: 'Register',
}