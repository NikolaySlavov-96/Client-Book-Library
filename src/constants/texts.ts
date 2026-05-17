export interface ITexts {
  // Navigation
  readonly NAV_LOGO: string;
  readonly NAV_LOGO_PREFIX: string;
  readonly NAV_LOGO_SUFFIX: string;
  readonly NAV_BOOKS: string;
  readonly NAV_COLLECTIONS: string;
  readonly NAV_LOGIN: string;
  readonly NAV_LOGOUT: string;
  readonly NAV_REGISTER: string;
  readonly NAV_CREATE: string;
  readonly NAV_CHAT: string;
  readonly NAV_SEARCH_TRIGGER: string;
  readonly NAV_GUEST: string;
  // Auth
  readonly AUTH_LOGIN_HEADING: string;
  readonly AUTH_LOGIN_SUBTITLE: string;
  readonly AUTH_REGISTER_HEADING: string;
  readonly AUTH_REGISTER_SUBTITLE: string;
  readonly AUTH_TAB_LOGIN: string;
  readonly AUTH_TAB_REGISTER: string;
  readonly AUTH_BTN_LOGIN: string;
  readonly AUTH_BTN_REGISTER: string;
  readonly AUTH_EMAIL_LINK: string;
  readonly AUTH_OR_DIVIDER: string;
  readonly AUTH_TERMS: string;
  readonly AUTH_TERMS_LINK: string;
  readonly AUTH_LABEL_EMAIL: string;
  readonly AUTH_LABEL_PASSWORD: string;
  readonly AUTH_LABEL_YEAR: string;
  readonly AUTH_PLACEHOLDER_EMAIL: string;
  readonly AUTH_PLACEHOLDER_PASSWORD: string;
  readonly AUTH_PLACEHOLDER_YEAR: string;
  readonly AUTH_LOGIN_TAGLINE: string;
  readonly AUTH_LOGIN_QUOTE: string;
  readonly AUTH_REGISTER_TAGLINE: string;
  // Catalog
  readonly CATALOG_TITLE: string;
  readonly CATALOG_SUBTITLE: string;
  readonly CATALOG_SEARCH_PLACEHOLDER: string;
  readonly CATALOG_EMPTY: string;
  readonly CATALOG_FILTER_ALL: string;
  readonly CATALOG_FILTER_READ: string;
  readonly CATALOG_FILTER_READING: string;
  readonly CATALOG_FILTER_WANT: string;
  readonly CATALOG_FILTER_LISTENING: string;
  readonly CATALOG_FILTER_LISTENED: string;
  // Book Detail
  readonly DETAIL_BACK: string;
  readonly DETAIL_PAGES: string;
  readonly DETAIL_YEAR: string;
  readonly DETAIL_RATING: string;
  readonly DETAIL_ADD_TO_SHELF: string;
  readonly DETAIL_SHARE_LABEL: string;
  readonly DETAIL_SHARE_PLACEHOLDER: string;
  readonly DETAIL_SHARE_BTN: string;
  readonly DETAIL_DESC_PLACEHOLDER: string;
  // Profile / Shelf
  readonly PROFILE_STAT_TOTAL: string;
  readonly PROFILE_STAT_READ: string;
  readonly PROFILE_STAT_READING: string;
  readonly PROFILE_STAT_LISTENED: string;
  readonly PROFILE_GOAL_LABEL: string;
  readonly PROFILE_SETTINGS: string;
  readonly PROFILE_FRIEND_LABEL: string;
  readonly PROFILE_FRIEND_PLACEHOLDER: string;
  readonly PROFILE_FRIEND_BTN: string;
  readonly PROFILE_REMOVE: string;
  readonly PROFILE_EMPTY_SHELF: string;
  readonly PROFILE_TITLE: string;
  // Shelf Tabs
  readonly SHELF_TAB_ALL: string;
  readonly SHELF_TAB_READ: string;
  readonly SHELF_TAB_READING: string;
  readonly SHELF_TAB_WANT: string;
  readonly SHELF_TAB_LISTENING: string;
  readonly SHELF_TAB_LISTENED: string;
  // Search Modal
  readonly SEARCH_PLACEHOLDER: string;
  readonly SEARCH_CLOSE: string;
  readonly SEARCH_SUGGESTED_LABEL: string;
  readonly SEARCH_RESULTS_LABEL: string;
  readonly SEARCH_EMPTY: string;
  readonly SEARCH_ADD: string;
  // Status labels
  readonly STATUS_READ: string;
  readonly STATUS_READING: string;
  readonly STATUS_WANT: string;
  readonly STATUS_LISTENING: string;
  readonly STATUS_LISTENED: string;
  // Create Product
  readonly CREATE_TITLE: string;
  readonly CREATE_BTN: string;
  readonly CREATE_LABEL_AUTHOR: string;
  readonly CREATE_LABEL_TITLE: string;
  readonly CREATE_LABEL_GENRE: string;
  readonly CREATE_LABEL_IMAGE: string;
  readonly CREATE_LABEL_SRC: string;
  readonly CREATE_PLACEHOLDER_AUTHOR: string;
  readonly CREATE_PLACEHOLDER_TITLE: string;
  readonly CREATE_PLACEHOLDER_GENRE: string;
  // Support Chat
  readonly SUPPORT_TITLE: string;
  // Search By Email
  readonly SEARCH_EMAIL_TITLE: string;
  // Common
  readonly COMMON_LOADING: string;
  readonly COMMON_COMING_SOON: string;
  readonly COMMON_NOT_FOUND_TITLE: string;
  readonly COMMON_NOT_FOUND_SUBTITLE: string;
  readonly COMMON_BACK_TO_HOME: string;
  readonly COMMON_PLACEHOLDER_VALUE: string;
  readonly COMMON_SEARCH_LABEL: string;
  // Toast messages
  readonly TOAST_LOGIN_SUCCESS: string;
  readonly TOAST_REGISTER_SUCCESS: string;
  readonly TOAST_IMAGE_SUCCESS: string;
  readonly TOAST_GENERIC_ERROR: string;
}

export const TEXTS: ITexts = {
  // Navigation
  NAV_LOGO: 'Bookshelf',
  NAV_LOGO_PREFIX: 'Booksh',
  NAV_LOGO_SUFFIX: 'elf',
  NAV_BOOKS: 'Books',
  NAV_COLLECTIONS: 'My Shelf',
  NAV_LOGIN: 'Login',
  NAV_LOGOUT: 'Logout',
  NAV_REGISTER: 'Register',
  NAV_CREATE: 'Create',
  NAV_CHAT: 'Support Chat',
  NAV_SEARCH_TRIGGER: 'Search book or author...',
  NAV_GUEST: 'Guest',
  // Auth
  AUTH_LOGIN_HEADING: 'Welcome back',
  AUTH_LOGIN_SUBTITLE: 'Sign in to your bookshelf',
  AUTH_REGISTER_HEADING: 'Create account',
  AUTH_REGISTER_SUBTITLE: 'Start tracking your reading',
  AUTH_TAB_LOGIN: 'Login',
  AUTH_TAB_REGISTER: 'Register',
  AUTH_BTN_LOGIN: 'Sign in',
  AUTH_BTN_REGISTER: 'Create account',
  AUTH_EMAIL_LINK: 'Sign in with email link',
  AUTH_OR_DIVIDER: 'or',
  AUTH_TERMS: 'By signing in, you accept our',
  AUTH_TERMS_LINK: 'Terms of Service',
  AUTH_LABEL_EMAIL: 'Email',
  AUTH_LABEL_PASSWORD: 'Password',
  AUTH_LABEL_YEAR: 'Birth year',
  AUTH_PLACEHOLDER_EMAIL: 'name@example.com',
  AUTH_PLACEHOLDER_PASSWORD: '••••••••',
  AUTH_PLACEHOLDER_YEAR: 'e.g. 1990',
  AUTH_LOGIN_TAGLINE: 'Track every book,\nyou read\nor want to.',
  AUTH_LOGIN_QUOTE: 'Track what you have read, plan the next one, share with friends.',
  AUTH_REGISTER_TAGLINE: 'Start your\nreading\njourney.',
  // Catalog
  CATALOG_TITLE: 'Book Catalog',
  CATALOG_SUBTITLE: 'Find your next favourite book',
  CATALOG_SEARCH_PLACEHOLDER: 'Search by title or author...',
  CATALOG_EMPTY: 'No books found.',
  CATALOG_FILTER_ALL: 'All',
  CATALOG_FILTER_READ: 'Read',
  CATALOG_FILTER_READING: 'Reading',
  CATALOG_FILTER_WANT: 'To read',
  CATALOG_FILTER_LISTENING: 'Listening',
  CATALOG_FILTER_LISTENED: 'Listened',
  // Book Detail
  DETAIL_BACK: '← Back to catalog',
  DETAIL_PAGES: 'Pages',
  DETAIL_YEAR: 'Year',
  DETAIL_RATING: 'Rating',
  DETAIL_ADD_TO_SHELF: 'Add to my shelf',
  DETAIL_SHARE_LABEL: "View a friend's shelf",
  DETAIL_SHARE_PLACEHOLDER: 'friend@example.com',
  DETAIL_SHARE_BTN: 'View shelf',
  DETAIL_DESC_PLACEHOLDER: 'Description coming soon.',
  // Profile / Shelf
  PROFILE_STAT_TOTAL: 'Total books',
  PROFILE_STAT_READ: 'Read',
  PROFILE_STAT_READING: 'Reading',
  PROFILE_STAT_LISTENED: 'Listened',
  PROFILE_GOAL_LABEL: 'Goal 2026',
  PROFILE_SETTINGS: 'Settings',
  PROFILE_FRIEND_LABEL: "View a friend's shelf:",
  PROFILE_FRIEND_PLACEHOLDER: 'enter email...',
  PROFILE_FRIEND_BTN: 'View shelf',
  PROFILE_REMOVE: 'Remove',
  PROFILE_EMPTY_SHELF: 'No books in this category.',
  PROFILE_TITLE: 'My Shelf',
  // Shelf Tabs
  SHELF_TAB_ALL: 'All',
  SHELF_TAB_READ: 'Read',
  SHELF_TAB_READING: 'Reading',
  SHELF_TAB_WANT: 'To read',
  SHELF_TAB_LISTENING: 'Listening',
  SHELF_TAB_LISTENED: 'Listened',
  // Search Modal
  SEARCH_PLACEHOLDER: 'Search by title or author...',
  SEARCH_CLOSE: 'Close',
  SEARCH_SUGGESTED_LABEL: 'Suggested',
  SEARCH_RESULTS_LABEL: 'Results',
  SEARCH_EMPTY: 'No results found.',
  SEARCH_ADD: '+ Add',
  // Status labels
  STATUS_READ: 'Read',
  STATUS_READING: 'Reading',
  STATUS_WANT: 'To read',
  STATUS_LISTENING: 'Listening',
  STATUS_LISTENED: 'Listened',
  // Create Product
  CREATE_TITLE: 'Add new book',
  CREATE_BTN: 'Create book',
  CREATE_LABEL_AUTHOR: 'Author name',
  CREATE_LABEL_TITLE: 'Book title',
  CREATE_LABEL_GENRE: 'Genre',
  CREATE_LABEL_IMAGE: 'Cover image',
  CREATE_LABEL_SRC: 'Image name',
  CREATE_PLACEHOLDER_AUTHOR: 'Author name',
  CREATE_PLACEHOLDER_TITLE: 'Book title',
  CREATE_PLACEHOLDER_GENRE: 'Genre',
  // Support Chat
  SUPPORT_TITLE: 'Support Chat',
  // Search By Email
  SEARCH_EMAIL_TITLE: 'Viewing shelf for',
  // Common
  COMMON_LOADING: 'Loading...',
  COMMON_COMING_SOON: 'Coming soon',
  COMMON_NOT_FOUND_TITLE: '404',
  COMMON_NOT_FOUND_SUBTITLE: 'Page not found',
  COMMON_BACK_TO_HOME: 'Back to home',
  COMMON_PLACEHOLDER_VALUE: '—',
  COMMON_SEARCH_LABEL: 'Search',
  // Toast messages
  TOAST_LOGIN_SUCCESS: 'Successfully logged in',
  TOAST_REGISTER_SUCCESS: 'Account created — check your email',
  TOAST_IMAGE_SUCCESS: 'Cover image uploaded successfully',
  TOAST_GENERIC_ERROR: 'Something went wrong. Please try again.',
};
