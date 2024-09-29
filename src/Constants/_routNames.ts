const AUTH_PREFIX = '/auth';

const _ROUT_NAMES = {
    BOOK_DETAILS: '/book/:id',
    BOOK: '/book',
    CREATE_BOOK: '/create',
    REVIEW_BOOKS_BY_EMAIL: '/search/:email',
    HOME: '/',
    LOGIN: `${AUTH_PREFIX}/login`,
    REGISTER: `${AUTH_PREFIX}/register`,
    USER_COLLECTION: '/collections',
    VERIFY_TOKEN: `${AUTH_PREFIX}/verify/:verifyToken`,
    ADD_FILE: '/uploadFile',
};

export default _ROUT_NAMES;

export const _HEADER_BUTTON_TITLES = {
    BOOK: 'Book',
    CREATE_BOOK: 'Create',
    LOGIN: 'Login',
    REGISTER: 'Register',
    COLLECTION_OF_BOOKS: 'Collections of Books',
    LOGOUT: 'Logout',
}