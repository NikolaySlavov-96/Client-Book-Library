const AUTH_PREFIX = '/auth';

const _ROUT_NAMES = {
    BOOK_DETAILS: '/book/:id',
    BOOK: '/book',
    CREATE_BOOK: '/create',
    HOME: '/',
    LOGIN: `${AUTH_PREFIX}/login`,
    REGISTER: `${AUTH_PREFIX}/register`,
    REVIEW_BOOKS_BY_EMAIL: '/search/:email',
    SUPPORT_CHAT: `/support`,
    USER_COLLECTION: '/collections',
    VERIFY_TOKEN: `${AUTH_PREFIX}/verify/:verifyToken`,
};

export default _ROUT_NAMES;

export const _HEADER_BUTTON_TITLES = {
    BOOK: 'Book',
    CHAT: 'Chat',
    COLLECTION_OF_BOOKS: 'Collections of Books',
    CREATE_BOOK: 'Create',
    LOGIN: 'Login',
    LOGOUT: 'Logout',
    REGISTER: 'Register',
}