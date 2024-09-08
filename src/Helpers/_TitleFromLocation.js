const PRIMARY_PATH = ['/create', '/collections'];
const SECONDARY_PATHS = ['/auth'];

const _titleFromLocation = (location) => {
    const hasState = location.state;
    const pathName = location.pathname;

    let newTitle = 'book';

    if (hasState && hasState.bookTitle) {
        newTitle = hasState.bookTitle;
    }
    if (SECONDARY_PATHS.includes(pathName)) {
        newTitle = pathName.split('/')[2];
    }
    if (PRIMARY_PATH.includes(pathName)) {
        newTitle = pathName.split('/')[1];
    }

    const firstLetter = newTitle[0].toUpperCase();
    const allTitle = newTitle.replace(newTitle[0], firstLetter);

    return allTitle;
};

export default _titleFromLocation;