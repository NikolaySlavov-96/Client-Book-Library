const PRIMARY_PATH = ['create', 'collections', 'search'];
const SECONDARY_PATHS = ['auth'];

const _titleFromLocation = (location) => {
    const hasState = location.state;
    const pathName = location.pathname;

    const splittedPatchName = pathName.split('/')[1];

    let newTitle = 'book';

    if (hasState && hasState.bookTitle) {
        newTitle = hasState.bookTitle;
    }
    if (SECONDARY_PATHS.includes(splittedPatchName)) {
        newTitle = pathName.split('/')[2];
    }
    if (PRIMARY_PATH.includes(splittedPatchName)) {
        newTitle = pathName.split('/')[1];
    }

    const firstLetter = newTitle[0].toUpperCase();
    const allTitle = newTitle.replace(newTitle[0], firstLetter);

    return allTitle;
};

export default _titleFromLocation;