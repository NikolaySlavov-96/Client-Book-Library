const AUTH_PREFIX = '/auth';

const ROUT_NAMES = {
    HOME: '/',
    BOOK: '/book',
    CREATE_BOOK: '/create',
    BOOK_DETAILS: '/book/:id',
    USER_COLLECTION: '/collections',
    REGISTER: `${AUTH_PREFIX}/register`,
    LOGIN: `${AUTH_PREFIX}/login`,
    VERIFY_TOKEN: `${AUTH_PREFIX}/verify/:verifyToken`,
};

export default ROUT_NAMES;