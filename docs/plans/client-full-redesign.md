# Client Full Redesign Plan

**Scope:** Complete visual and architectural rewrite of `client-book-library/src`  
**Type:** Refactor / Redesign  
**Status:** PLAN — awaiting approval before any code changes

---

## Phase 0 — Overview & Analysis Findings

### Design Files (`/[desig]`)

There are **2 HTML files** (not 3 — each file contains multiple screens):

| File | Screens contained |
|------|------------------|
| `bookshelf_app_prototype.html` | Login/Register, Book Catalog, Book Detail |
| `bookshelf_profile_search.html` | Profile/Personal Shelf, Search Modal overlay |

**Total distinct screen designs: 5**

---

### Identified Screens in `/Client` (routes)

| Route | Component | Has design equivalent? |
|-------|-----------|----------------------|
| `/` and `/book` | `Products` (Catalog) | Yes — Book Catalog screen |
| `/book/:id` | `DetailsForProduct` | Yes — Book Detail screen |
| `/auth/login` | `Login` | Yes — Login tab in Auth screen |
| `/auth/register` | `Register` | Yes — Register tab in Auth screen |
| `/auth/verify/:verifyToken` | `VerifyAccount` | No — apply design system by analogy |
| `/search/:email` | `SearchByEmail` | Partial — maps to "friend shelf" bar + modal pattern |
| `/collections` | `UserCollection` | Yes — Profile/Shelf with tab filtering |
| `/create` | `CreateProduct` (support role) | No — apply design system by analogy |
| `/support` | `Support` (support role) | No — apply design system by analogy |
| `*` | `NotFound` | No — apply design system by analogy |

---

### Design Tokens Extracted

**Colors:**
```
--ink: #1a1714           (primary text)
--ink-2: #5a5550         (secondary text)
--ink-3: #9c9690         (muted / placeholder text)
--cream: #faf8f4         (primary background)
--cream-2: #f3f0ea       (secondary background, inputs)
--cream-3: #ebe6dd       (tertiary background, hover states)
--accent: #8b5e3c        (primary accent — brown)
--accent-hover: #7a5234  (accent hover — darker brown)
--accent-2: #c49a6c      (secondary accent — golden)
--accent-light: #f5ece3  (accent tint background)
--border: rgba(90,85,80,0.15)    (default border)
--border-med: rgba(90,85,80,0.25) (medium border)

Status colors (badge backgrounds — light variant):
--status-read-bg: #d1fae5      --status-read-text: #065f46
--status-reading-bg: #dcfce7   --status-reading-text: #14532d
--status-want-bg: #e0e7ff      --status-want-text: #3730a3
--status-listening-bg: #ffedd5 --status-listening-text: #9a3412
--status-listened-bg: #fef3c7  --status-listened-text: #78350f

Status colors (badge backgrounds — solid variant, used on covers):
--status-reading-solid: rgba(45,106,79,0.9)
--status-read-solid: rgba(27,67,50,0.9)
--status-want-solid: rgba(92,107,192,0.9)
--status-listening-solid: rgba(230,126,34,0.9)
--status-listened-solid: rgba(160,64,0,0.9)

Overlay: rgba(20,18,16,0.55)   (modal backdrop)
White: #ffffff
```

**Typography:**
```
--font-serif: 'Playfair Display', Georgia, serif
--font-sans: 'DM Sans', system-ui, sans-serif
--font-size-base: 14px
--line-height-base: 1.5

Font-size scale (even numbers aligned):
--text-xs: 10px    (badge labels, shelf-remove)
--text-sm: 12px    (labels, footer, captions)
--text-md: 14px    (body text, inputs)
--text-lg: 16px    (modal input)
--text-xl: 18px    (stat values)
--text-2xl: 22px   (nav logo, profile stat number)
--text-3xl: 26px   (auth card heading)
--text-4xl: 28px   (profile name)
--text-5xl: 30px   (catalog heading)
--text-6xl: 32px   (detail title)
--text-7xl: 40px   (login tagline)

Font weights:
--font-weight-light: 300
--font-weight-regular: 400
--font-weight-medium: 500
--font-weight-bold: 600
```

**Spacing scale (even numbers, aligns with rules):**
```
--spacing-1: 4px
--spacing-2: 8px
--spacing-3: 12px
--spacing-4: 16px
--spacing-5: 20px
--spacing-6: 24px
--spacing-7: 28px
--spacing-8: 32px
--spacing-9: 36px
--spacing-10: 40px
--spacing-12: 48px
--spacing-14: 56px
--spacing-15: 60px
```

**Border radius:**
```
--radius-sm: 6px
--radius-md: 8px   (default — buttons, inputs, tabs, toasts)
--radius-lg: 10px  (search box, share box, cards)
--radius-xl: 12px  (shelf cards, detail cover)
--radius-2xl: 16px (book cards, modal box)
--radius-pill: 20px (filter pills, status badges)
--radius-full: 50%  (avatars)
```

**Shadows:**
```
--shadow-card: 0 8px 24px rgba(0,0,0,0.07)
--shadow-tab: 0 1px 3px rgba(0,0,0,0.08)
--shadow-focus: 0 0 0 3px rgba(196,154,108,0.12)
```

**Transitions:**
```
--transition-fast: all 0.12s
--transition-base: all 0.15s
--transition-slow: all 0.20s
```

**Composite property tokens (required by rules):**
```
--border-default: 1px solid var(--border)
--border-med-default: 1px solid var(--border-med)
--border-accent: 1px solid var(--accent)
--border-accent-2: 1px solid var(--accent-2)
```

**Nav height:**
```
--nav-height: 60px
```

**Responsive breakpoints (from rules — not in design files, added by best practices):**
```css
/* sm */ @media (min-width: 640px) { }
/* md */ @media (min-width: 768px) { }
/* lg */ @media (min-width: 1024px) { }
/* xl */ @media (min-width: 1280px) { }
```

---

### Repeating UI Components (2+ occurrences → component library)

| Component | Variants | Occurrences |
|-----------|----------|-------------|
| Button | `primary` (solid accent), `ghost` (outlined), `outline` (white bg), `text` (no border) | Nav buttons, forms, share, friend bar, shelf remove |
| Input | text, email, password, number, search (with icon) | Auth forms, search bar, share input |
| Badge/Chip | Status colors × 2 styles (solid on covers, light in lists) | Book cards, shelf cards, search modal |
| Card | `book-card` (catalog grid), `shelf-card` (profile grid) | Catalog, profile |
| Filter Pill | default, active | Book catalog |
| Tab | default, active | Auth tabs, shelf tabs |
| Avatar | small (32-34px nav), large (88px profile) | Nav, profile |
| Pagination | — | Products, UserCollection, SearchByEmail |
| Modal | search overlay, notification (NewProductModal) | Header search, socket notification |
| Progress Bar | — | Profile page |
| Toast | — | Global |
| Navigation Bar | unauthenticated, authenticated | All pages |
| Skeleton | card (grid), card (list), detail, select | Products, DetailsForProduct |

---

### Repeating Utility Patterns (→ global utility classes in `globals.css`)

| Pattern | Used in |
|---------|---------|
| `display: flex; align-items: center` | Nav, search row, form rows, share row, profile header |
| `display: flex; align-items: center; justify-content: space-between` | Nav, QueryBar, shelf item |
| `display: flex; flex-direction: column` | Login left, login card, shelf card |
| `display: grid; grid-template-columns: repeat(auto-fill, ...)` | Catalog grid, profile shelf grid |
| `white-space: nowrap; overflow: hidden; text-overflow: ellipsis` | Book title on cards, shelf author |
| `-webkit-line-clamp: 2` (multiline truncate) | Cover title on cards |
| `position: absolute; top: 0; left: 0; right: 0; bottom: 0` | Modal overlay, cover gradient overlay |
| `position: sticky; top: 0; z-index: N` | Nav |
| `border-radius: 50%` (circle) | All avatars |
| `text-transform: uppercase; letter-spacing: 0.08em` | Genre tag, section labels |
| `font-family: var(--font-serif)` | Logo, headings, card titles |
| `font-family: var(--font-sans)` | Body text, buttons |

---

### Current State — Design Tokens / Utilities in Client

The current client has **no design token system**:
- `App.css`: global utility classes like `.global__bg-radius`, `.section`, `.form__container`, `.content__page`, `.shadow` — all using hardcoded colors (`#ecbb00`, `#ffefca`) with no connection to the new design.
- `index.css`: system font stack body reset only.
- `App.css` has a partial `:root` with 5 variables (`--primary-accent: #ecbb00`, etc.) — all incompatible with the new design.
- Component-level `.module.css` files contain mostly unique styles (acceptable).
- **No `globals.css` / tokens file exists** — needs to be created from scratch.

---

### Current State — State Management

| State | Current location | Migration target |
|-------|-----------------|-----------------|
| Auth (token, email, userId, userRole, isAuthenticated, isVerifyUser) | `AuthContext` (useContext) + `useLocalStorage` | **Migrate to Zustand `AuthSlicer` with `persist` middleware** |
| Products, productById, productStates, productCollection, productByEmail | `ProductSlicer` (Zustand) | Keep in Zustand |
| Modal (modalName, content, isVisible, error) | `ModalSlicer` (Zustand) | Keep in Zustand |
| Support chat (rooms, messages, users, selectedRoom, welcomeMessage) | `SupportSlicer` (Zustand) | Keep in Zustand |
| Common (pageLimit, connectId, search Map) | `CommonSlicer` (Zustand) | Keep in Zustand |

**`useContext` migration decision:**  
`AuthContext` is the only `useContext` usage. It **can and should** be migrated to Zustand because:
1. The state it manages (token, user data) is already persisted via `useLocalStorage` — identical to Zustand `persist` middleware.
2. All auth actions (login, logout, register, verify) are async service calls with no React tree dependencies.
3. After migration, `AuthProvide` wrapper and `useAuthContext` hook are deleted. Auth data is accessed via `useStoreZ()` like all other state.

---

### API Endpoint Inventory

| Endpoint | Method | Auth | Description |
|----------|--------|------|-------------|
| `/auth/login` | POST | No | Login, returns accessToken + user info |
| `/auth/register` | POST | No | Register, triggers email verification |
| `/auth/logout` | POST | No | Logout (body: connectId) |
| `/auth/check` | GET | No | Check if email exists in DB |
| `/auth/verify` | POST | No | Verify account via email token |
| `/product` | GET | No | Get paginated products with search |
| `/product/status/all` | GET | No | Get all status types (id, stateName, symbol) |
| `/product/:id` | GET | No | Get single product by id |
| `/product/:id/status` | GET | Yes | Get authenticated user's status for a product |
| `/product/status/:statusId` | GET | Yes | Get user's products filtered by status (personal library) |
| `/product` | POST | Yes (support role) | Create new product |
| `/product/status` | POST | Yes | Add/update product status in user library |
| `/file/addImage` | POST | Yes | Upload image file |
| `/bulk` | POST | Yes | Bulk product creation |
| `/search/email` | GET | No | Get all products for a user by email |

---

### API Gaps vs Design (→ `docs/future-features.md`)

| Design UI Element | API Status | Notes |
|-------------------|-----------|-------|
| Book page count ("Страници") on detail page | **Missing** | No `pages` field in Product model |
| Book publication year on detail page | **Missing** | No `year` field in Product model (user has birth year, not book year) |
| Book rating (★ 4.9) on detail page | **Missing** | No `rating` field in Product model |
| Book description on detail page | **Missing** | No `description` field in Product model |
| "Login with email link" (magic link) | **Missing** | No magic link auth endpoint |
| Reading goal progress bar (Profile page) | **Missing** | No reading goal / progress endpoint |
| Profile "Settings" button | **Missing** | No user settings endpoint |
| "Remove from shelf" button (Profile shelf card) | **Missing** | No DELETE for product status; `POST /product/status` does upsert only |
| Suggested books in search modal | **Partial** | Can reuse `GET /product` with search; no dedicated "suggestions" endpoint needed |
| Profile statistics (total, read, reading, listened) | **Partial** | Must be derived client-side from multiple `GET /product/status/:statusId` calls; no dedicated stats endpoint |

---

### Crosscheck Design ↔ Functionality

**Functional elements with full backend support:**
- Login, Register, Email verification
- Catalog with search + pagination
- Book detail view
- Set/change book status (add to personal library)
- Personal library with status tabs + pagination + search
- View another user's library by email
- Create new book (support role)
- Customer support chat (WebSocket)
- "New product added" notification (WebSocket)

**Non-functional UI elements (design has, API does not support):**
- Book page count, year, rating, description — visually rendered but no real data; show placeholder values like `—`
- Magic link login button
- Reading goal progress bar
- Profile settings button
- Remove from shelf button

**Functional elements without design equivalent (apply design system by analogy):**
- Email verification page (`/auth/verify/:verifyToken`)
- Create product page (`/create`)
- Support admin chat page (`/support`)
- NotFound page (`*`)
- Customer support chat widget (floating)
- NewProductModal (socket notification)

---

### Risk Points

1. **`AuthContext` → Zustand migration:** Removing `AuthProvide` wrapper from `App.jsx` changes the component tree. Every component currently using `useAuthContext()` must be updated to use `useStoreZ()`.
2. **`search` Map in CommonSlicer:** `Map` is not JSON-serializable. If Zustand `persist` middleware is applied to the whole store, `search` must be excluded from persistence or replaced with a plain object. The form state Map is ephemeral anyway — it should not persist across sessions.
3. **`App.jsx` / `index.jsx`:** These are `.jsx` not `.tsx`. The redesign converts them to `.tsx`.
4. **No `constants/texts.ts`:** Rules require all UI text from a texts constants file. This file must be created as part of Phase 1.
5. **Direct external library imports:** Currently `sweetalert2` is imported directly in `Toasts/`. Rules require wrapping in `lib/`. Must be wrapped.
6. **`SocketService` store access:** `SocketService` uses `useStoreZ.getState()` (Zustand vanilla API outside React) — this pattern is valid and should be preserved.
7. **`productType` vs `genre`:** The API returns `productType` and `authorGenre` — it's unclear which is the primary genre field. The detail page design shows a single genre label. Must map consistently.
8. **Status IDs are numeric (1–5):** The design uses string keys (`read`, `reading`, `want`, `listening`, `listened`). The API uses numeric status IDs. The mapping between ID and string key must be centralized (currently ad-hoc in components).

---

## Phase 1 — Foundation (Design System)

### 1.1 — Create `src/styles/globals.css`

Replace `src/index.css` and `src/App.css` entirely. The new `globals.css` contains:

**a) Google Fonts import:**
```css
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600&family=DM+Sans:wght@300;400;500&display=swap');
```

**b) CSS reset:**
```css
*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
html { scroll-behavior: smooth; }
body { font-family: var(--font-sans); background: var(--cream); color: var(--ink); font-size: var(--text-md); line-height: var(--line-height-base); min-height: 100vh; -webkit-font-smoothing: antialiased; }
img { display: block; max-width: 100%; }
a { text-decoration: none; color: inherit; }
button { cursor: pointer; font-family: var(--font-sans); }
ul, ol { list-style: none; }
p { margin: 0; padding: 0; }
```

**c) CSS custom properties (`:root`):**  
All tokens from Phase 0 Design Tokens section above — colors, typography, spacing scale, border-radius, shadows, transitions, composite border tokens, `--nav-height`.

**d) Global utility classes:**

Layout:
```css
.flex { display: flex; }
.flex-col { display: flex; flex-direction: column; }
.flex-center { display: flex; align-items: center; justify-content: center; }
.flex-between { display: flex; align-items: center; justify-content: space-between; }
.flex-align { display: flex; align-items: center; }
.flex-wrap { display: flex; flex-wrap: wrap; }
.grid-auto-fill-180 { display: grid; grid-template-columns: repeat(auto-fill, minmax(180px, 1fr)); gap: var(--spacing-5); }
.grid-auto-fill-160 { display: grid; grid-template-columns: repeat(auto-fill, minmax(160px, 1fr)); gap: var(--spacing-5); }
.grid-detail { display: grid; grid-template-columns: 220px 1fr; gap: var(--spacing-12); align-items: start; }
```

Typography:
```css
.text-serif { font-family: var(--font-serif); }
.text-sans { font-family: var(--font-sans); }
.text-xs { font-size: var(--text-xs); }
.text-sm { font-size: var(--text-sm); }
.text-md { font-size: var(--text-md); }
.text-muted { color: var(--ink-3); }
.text-secondary { color: var(--ink-2); }
.text-accent { color: var(--accent); }
.text-uppercase { text-transform: uppercase; letter-spacing: 0.08em; }
.text-truncate { white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.text-clamp-2 { display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }
.font-medium { font-weight: var(--font-weight-medium); }
.font-bold { font-weight: var(--font-weight-bold); }
```

Spacing / sizing:
```css
.gap-1 { gap: var(--spacing-1); }
.gap-2 { gap: var(--spacing-2); }
.gap-3 { gap: var(--spacing-3); }
/* ... through gap-10 */
.mt-auto { margin-top: auto; }
.mb-auto { margin-bottom: auto; }
```

Visual:
```css
.rounded-md { border-radius: var(--radius-md); }
.rounded-lg { border-radius: var(--radius-lg); }
.rounded-xl { border-radius: var(--radius-xl); }
.rounded-full { border-radius: var(--radius-full); }
.border-default { border: var(--border-default); }
.bg-cream { background: var(--cream); }
.bg-cream-2 { background: var(--cream-2); }
.bg-white { background: #fff; }
.bg-accent { background: var(--accent); }
.bg-accent-light { background: var(--accent-light); }
.overflow-hidden { overflow: hidden; }
.sr-only { position: absolute; width: 1px; height: 1px; padding: 0; margin: -1px; overflow: hidden; clip: rect(0,0,0,0); white-space: nowrap; border: 0; }
```

Positioning:
```css
.relative { position: relative; }
.absolute-fill { position: absolute; top: 0; left: 0; right: 0; bottom: 0; }
.sticky-top { position: sticky; top: 0; }
```

**e) Page layout wrapper:**
```css
.page-wrap { max-width: 1140px; margin: 0 auto; padding: var(--spacing-9) var(--spacing-10); }
.page-wrap--narrow { max-width: 1000px; margin: 0 auto; padding: var(--spacing-9) var(--spacing-10); }
```

**f) Animation keyframes:**
```css
@keyframes fadeInUp { from { opacity: 0; transform: translateY(6px); } to { opacity: 1; transform: translateY(0); } }
.animate-fade-in { animation: fadeInUp 0.25s ease; }
```

### 1.2 — Create `src/constants/texts.ts`

Centralizes all UI text strings. Structure:

```ts
export const TEXTS = {
  NAV: { LOGO: 'Bookshelf', BOOKS: 'Books', COLLECTIONS: 'My Shelf', LOGIN: 'Login', LOGOUT: 'Logout', REGISTER: 'Register', CREATE: 'Create', CHAT: 'Support Chat' },
  AUTH: { LOGIN_TITLE: 'Welcome back', LOGIN_SUBTITLE: 'Sign in to your bookshelf', REGISTER_TITLE: 'Create account', TAB_LOGIN: 'Login', TAB_REGISTER: 'Register', BUTTON_LOGIN: 'Sign in', BUTTON_REGISTER: 'Create account', EMAIL_LINK: 'Sign in with email link', TERMS: 'By signing in, you accept our', TERMS_LINK: 'Terms of Service', ... },
  CATALOG: { TITLE: 'Book Catalog', SUBTITLE: 'Find your next favourite book', SEARCH_PLACEHOLDER: 'Search by title or author...', EMPTY: 'No books found.', FILTER_ALL: 'All', ... },
  DETAIL: { BACK: '← Back to catalog', PAGES: 'Pages', YEAR: 'Year', RATING: 'Rating', ADD_TO_SHELF: 'Add to my shelf', SHARE_LABEL: 'View a friend\'s shelf', SHARE_PLACEHOLDER: 'friend@example.com', SHARE_BUTTON: 'View shelf', ... },
  PROFILE: { TOTAL: 'Total books', READ: 'Read', READING: 'Reading', LISTENED: 'Listened', GOAL_LABEL: 'Goal 2026', SETTINGS: 'Settings', FRIEND_LABEL: 'View a friend\'s shelf:', FRIEND_PLACEHOLDER: 'enter email...', FRIEND_BUTTON: 'View shelf', REMOVE: 'Remove', ... },
  STATUS: { READ: 'Read', READING: 'Reading', WANT: 'To read', LISTENING: 'Listening', LISTENED: 'Listened' },
  COMMON: { LOADING: 'Loading...', COMING_SOON: 'Coming soon', NOT_FOUND_TITLE: 'Page not found', BACK: 'Back', SEARCH_LABEL: 'Search', SEARCH_CLOSE: 'Close', ... },
  CREATE: { TITLE: 'Add new book', BUTTON: 'Create book', AUTHOR: 'Author name', BOOK_TITLE: 'Book title', GENRE: 'Genre', IMAGE: 'Cover image', ... },
  SUPPORT: { TITLE: 'Support Chat', ... },
}
```

### 1.3 — Update `src/lib/` wrappers

Create wrapper modules for external libraries (rules: no direct external imports):
- `src/lib/toast.ts` — wraps `sweetalert2` (currently used in `Toasts/`)
- `src/lib/socket.ts` — re-export of socket.io client (already partially isolated in `_SocketService`)

### 1.4 — Status ID ↔ key mapping

Create `src/constants/statusMap.ts`:

```ts
export const STATUS_KEYS = { READ: 1, READING: 2, WANT: 3, LISTENING: 4, LISTENED: 5 } as const
export const STATUS_LABELS = { 1: 'Read', 2: 'Reading', 3: 'To read', 4: 'Listening', 5: 'Listened' } as const
export const STATUS_CLASS_KEYS = { 1: 'read', 2: 'reading', 3: 'want', 4: 'listening', 5: 'listened' } as const
```

### 1.5 — Convert `App.jsx` / `index.jsx` to `.tsx`

- `src/App.jsx` → `src/App.tsx`
- `src/index.jsx` → `src/index.tsx`
- Remove `AuthProvide` wrapper after Phase 3 AuthSlicer migration.

### 1.6 — Delete old CSS files

- Delete `src/App.css` (replaced by `globals.css`)
- Replace `src/index.css` content with a single import: `@import './styles/globals.css';`

---

## Phase 2 — Component Library

All components follow rules: TypeScript, `I` prefix on interfaces, no hardcoded strings (use `TEXTS`), utility classes in `className`, CSS Modules only for unique styles, `className?: string` prop accepted on all.

### Atoms (src/component/atoms/)

#### 2.1 — `Button/Button.tsx`

**Replaces:** current `_Button.tsx` (currently minimal / pass-through)

Props:
```ts
interface IButtonProps {
  label: string;
  variant?: 'primary' | 'ghost' | 'outline' | 'text';
  size?: 'sm' | 'md';
  isLoading?: boolean;
  isDisabled?: boolean;
  type?: 'button' | 'submit';
  className?: string;
  onClick?: () => void;
}
```

Styles from design: `btn-primary` (full-width accent), `nav-btn ghost`, `nav-btn solid`, `btn-outline`, `btn-accent`, `btn-email-share`. Map to variants.

#### 2.2 — `Input/Input.tsx`

**Replaces:** current `_InputField.tsx` (refactored, see risk #2 — Map-based form state kept)

Props:
```ts
interface IInputProps {
  label?: string;
  name: string;
  type?: HTMLInputTypeAttribute;
  placeholder?: string;
  value?: string;
  error?: string;
  formName?: E_FORM_NAMES;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: FocusEvent<HTMLInputElement>) => void;
  hasSearchIcon?: boolean;
  className?: string;
}
```

Design variants: standard field (`.field input`), search box input (with icon prefix).

#### 2.3 — `Badge/Badge.tsx`

**New component.**

Props:
```ts
type TBadgeVariant = 'read' | 'reading' | 'want' | 'listening' | 'listened';
type TBadgeStyle = 'light' | 'solid';

interface IBadgeProps {
  variant: TBadgeVariant;
  style?: TBadgeStyle;  // 'light' for lists, 'solid' for cover overlays
  className?: string;
}
```

Config file: `Badge.config.ts` — maps variant to CSS class and label.

#### 2.4 — `Avatar/Avatar.tsx`

**New component.**

Props:
```ts
type TAvatarSize = 'sm' | 'lg';

interface IAvatarProps {
  initials: string;
  size?: TAvatarSize;
  className?: string;
}
```

sm = 32–34px (nav), lg = 88px (profile). Styles: `bg-accent-light`, `border: var(--border-accent-2)`, serif font initials.

#### 2.5 — `SectionTitle/SectionTitle.tsx`

**Keep, minor refactor:** use `TEXTS` for content, add TypeScript interface.

#### 2.6 — Existing atoms to refactor in place

- `Link/_Link.tsx` — add `className` prop, TypeScript interface with `I` prefix.
- `NavigationButton/_NavigationButton.tsx` — use `TEXTS`, TypeScript interface.
- `List/_List.tsx` — TypeScript interface with `I` prefix.
- `MessageLine/_MessageLine.tsx` — TypeScript interface.
- `MessageForm/_MessageForm.tsx` — TypeScript interface.
- `ChatHeader/_ChatHeader.tsx` — TypeScript interface.
- `IconActionButton/_IconActionButton.tsx` — TypeScript interface, ARIA label.

### Molecules (src/component/molecules/)

#### 2.7 — `NavBar/NavBar.tsx`

**Replaces:** current `_Header.tsx` + `_Header.module.css`.

Implements the new nav design: logo (SVG + Playfair Display), center search trigger (Profile page nav variant), right user/guest links. Two layout modes:
- `catalog` mode: logo left + nav links right (unauthenticated: Login / Register buttons; authenticated: user avatar + name)
- `profile` mode: logo left + search trigger center + avatar right

Props:
```ts
type TNavMode = 'catalog' | 'profile';
interface INavBarProps {
  mode?: TNavMode;
  className?: string;
}
```

CSS Module: `NavBar.module.css` — only unique styles (nav height, logo font-size, sticky behavior).

#### 2.8 — `SearchModal/SearchModal.tsx`

**New component** — implements the search overlay from `bookshelf_profile_search.html`.

Props:
```ts
interface ISearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  className?: string;
}
```

Behavior: renders suggested books on open (top 5 from `products.rows`), searches on input change, shows book results with status badge or "+ Add" action.

#### 2.9 — `BookCard/BookCard.tsx`

**Replaces:** current `_ProductCard.tsx` + `_ProductDetails.tsx` (molecule part).

Props:
```ts
type TBookCardLayout = 'grid' | 'list';
interface IBookCardProps {
  productId: number;
  productTitle: string;
  authorName: string;
  productType: string;  // genre
  fileUrl?: string;
  fileSrc?: string;
  statusId?: number;
  layout?: TBookCardLayout;
  className?: string;
}
```

Grid layout: book cover (200px height) with gradient fallback, title overlay, status badge, author, quick-action buttons (authenticated). List layout: horizontal row. Wraps in `<Link>` to `/book/:id`.

#### 2.10 — `ShelfCard/ShelfCard.tsx`

**New component** — profile page shelf card.

Props:
```ts
interface IShelfCardProps {
  productId: number;
  productTitle: string;
  authorName: string;
  statusId: number;
  fileUrl?: string;
  className?: string;
}
```

Cover (190px), title, author, status badge (light variant), "Remove" button (disabled/coming-soon — no API delete endpoint).

#### 2.11 — `FilterPills/FilterPills.tsx`

**New component.**

Props:
```ts
interface IFilterPillsProps {
  options: Array<{ label: string; value: string }>;
  activeValue: string;
  onSelect: (value: string) => void;
  className?: string;
}
```

#### 2.12 — `ShelfTabs/ShelfTabs.tsx`

**New component** — tabs with count badges (profile page).

Props:
```ts
interface IShelfTabsProps {
  tabs: Array<{ label: string; value: string; count: number }>;
  activeValue: string;
  onSelect: (value: string) => void;
  className?: string;
}
```

#### 2.13 — `ProgressBar/ProgressBar.tsx`

**New component** — reading goal progress bar (Profile page). Visual only — disabled / "Coming soon" on interaction.

Props:
```ts
interface IProgressBarProps {
  label: string;
  current: number;
  goal: number;
  className?: string;
}
```

#### 2.14 — `AuthTabs/AuthTabs.tsx`

**New component** — the Login / Register tab switcher.

Props:
```ts
interface IAuthTabsProps {
  activeTab: 'login' | 'register';
  onSwitch: (tab: 'login' | 'register') => void;
  className?: string;
}
```

#### 2.15 — `Toast/Toast.tsx` (via `src/lib/toast.ts`)

Update existing `Toasts/` to use `lib/toast.ts` wrapper. Keep same API.

#### 2.16 — Existing molecules to refactor in place

- `Footer/_Footer.tsx` — new design style, use `TEXTS`, TypeScript interface.
- `Pagination/_Pagination.tsx` — TypeScript interface, apply design tokens.
- `Select/_Select.tsx` — TypeScript interface, apply design tokens.
- `SearchField/_SearchField.tsx` → merged into `Input` atom with `hasSearchIcon` prop, or kept as separate molecule — **decision: keep as `SearchField` molecule** that composes `Input` + search button.
- `LayoutIcon/_LayoutIcon.tsx` — TypeScript interface.
- `LinkedParagraph/_LinkedParagraph.tsx` — TypeScript interface.
- `ProductDetails/_ProductDetails.tsx` — refactored for detail page layout, use design tokens.
- `Modals/NewProductModal/_NewProductModal.tsx` — apply new design toast-style modal.
- `ChatWithSupport/_ChatWithSupport.tsx` — TypeScript interface.
- `ChatWindowCloser/_ChatWindowCloser.tsx` — TypeScript interface.

### Organisms (src/component/organisms/)

#### 2.17 — `BookGrid/BookGrid.tsx`

**Replaces:** `_ListRenderProduct.tsx` + skeleton variants.

Props:
```ts
type TBookGridLayout = 'grid' | 'list';
interface IBookGridProps {
  books: IProduct[];
  layout?: TBookGridLayout;
  isLoading?: boolean;
  pageLimit?: number;
  className?: string;
}
```

Renders `BookCard` in grid or list layout. Uses `grid-auto-fill-180` utility class for grid.

#### 2.18 — `ShelfGrid/ShelfGrid.tsx`

**New component** — profile shelf grid of `ShelfCard` components.

#### 2.19 — `QueryBar/_QueryBar.tsx`

**Keep with refactor** — apply design tokens, TypeScript interface with `I` prefix, use `TEXTS`.

#### 2.20 — `ModalContainer/_ModalContainer.tsx`

**Keep with refactor** — apply design tokens.

#### 2.21 — `CustomerSupportChat/_CustomerSupportChat.tsx`

**Keep with refactor** — apply design tokens, TypeScript interface.

#### 2.22 — `Support/_CustomerSupportChat.tsx`

**Keep with refactor** — apply design tokens, TypeScript interface.

---

## Phase 3 — Client Architecture Refactor

### 3.1 — New File Structure

```
src/
├── styles/
│   └── globals.css                    # NEW: design tokens + utility classes
├── lib/
│   ├── toast.ts                       # NEW: sweetalert2 wrapper
│   └── socket.ts                      # NEW: socket.io-client wrapper
├── constants/
│   ├── _routNames.ts                  # keep
│   ├── _modalNames.ts                 # keep
│   ├── _form.ts                       # keep
│   ├── _queryLimit.ts                 # keep
│   ├── _searchName.ts                 # keep
│   ├── _serverError.ts                # keep
│   ├── _socketEvents.ts               # keep
│   ├── _storageVariables.ts           # keep
│   ├── _connectionData.ts             # keep
│   ├── statusMap.ts                   # NEW: status ID ↔ key mapping
│   ├── texts.ts                       # NEW: all UI text strings
│   └── index.ts                       # update exports
├── Store/
│   └── Slicers/
│       ├── AuthSlicer.ts              # NEW: replaces AuthContext
│       ├── CommonSlicer.ts            # keep (minor refactor)
│       ├── ModalSlicer.ts             # keep
│       ├── ProductSlicer.ts           # keep
│       ├── ProductSlicer.interface.ts # keep
│       └── SupportSlicer.ts          # keep
├── hooks/
│   ├── _useStoreZ.ts                  # update: add AuthSlicer
│   ├── _useDeviceDetector.ts          # keep
│   ├── _useForm.ts                    # keep
│   ├── _useGetUserAddress.ts          # keep
│   ├── _useLocalStorage.ts            # keep
│   └── _useViewType.ts                # keep
├── services/
│   ├── _api.ts                        # keep
│   ├── _AuthService.ts                # keep
│   ├── _ProductService.ts             # keep
│   ├── _FileService.ts                # keep
│   ├── _SocketService.ts              # update: import from lib/socket.ts
│   └── index.ts                       # keep
├── Types/                             # keep all existing
├── contexts/
│   └── AuthContext.tsx                # DELETED after AuthSlicer migration
├── Helpers/                           # keep all
├── Configuration/                     # keep all
├── Toasts/                            # keep, update to use lib/toast.ts
├── Skeleton/                          # keep all skeleton components
├── component/
│   ├── atoms/
│   │   ├── Button/Button.tsx          # NEW (replaces _Button.tsx)
│   │   ├── Input/Input.tsx            # REFACTORED (was _InputField.tsx)
│   │   ├── Badge/Badge.tsx            # NEW
│   │   ├── Badge/Badge.config.ts      # NEW
│   │   ├── Avatar/Avatar.tsx          # NEW
│   │   ├── SectionTitle/              # keep, refactor
│   │   ├── Link/                      # keep, refactor
│   │   ├── NavigationButton/          # keep, refactor
│   │   ├── List/                      # keep, refactor
│   │   ├── MessageLine/               # keep, refactor
│   │   ├── MessageForm/               # keep, refactor
│   │   ├── ChatHeader/                # keep, refactor
│   │   └── IconActionButton/          # keep, refactor
│   ├── molecules/
│   │   ├── NavBar/NavBar.tsx          # NEW (replaces Header)
│   │   ├── SearchModal/SearchModal.tsx # NEW
│   │   ├── BookCard/BookCard.tsx      # NEW (replaces ProductCard + ProductDetails)
│   │   ├── ShelfCard/ShelfCard.tsx    # NEW
│   │   ├── FilterPills/FilterPills.tsx # NEW
│   │   ├── ShelfTabs/ShelfTabs.tsx    # NEW
│   │   ├── ProgressBar/ProgressBar.tsx # NEW
│   │   ├── AuthTabs/AuthTabs.tsx      # NEW
│   │   ├── Footer/                    # keep, refactor
│   │   ├── Pagination/                # keep, refactor
│   │   ├── Select/                    # keep, refactor
│   │   ├── SearchField/               # keep, refactor
│   │   ├── LayoutIcon/                # keep, refactor
│   │   ├── LinkedParagraph/           # keep, refactor
│   │   ├── ProductDetails/            # keep, refactor (used on detail page)
│   │   ├── Modals/NewProductModal/    # keep, refactor
│   │   ├── ChatWithSupport/           # keep, refactor
│   │   └── ChatWindowCloser/          # keep, refactor
│   ├── organisms/
│   │   ├── BookGrid/BookGrid.tsx      # NEW (replaces ListRenderProduct)
│   │   ├── ShelfGrid/ShelfGrid.tsx    # NEW
│   │   ├── QueryBar/                  # keep, refactor
│   │   ├── ModalContainer/            # keep, refactor
│   │   └── CustomerSupportChat/       # keep, refactor
│   └── Screens/
│       ├── Auth/
│       │   ├── Login/                 # refactor
│       │   ├── Register/              # refactor
│       │   └── VerifyAccount/         # refactor
│       ├── Product/
│       │   ├── Products/              # refactor (catalog)
│       │   ├── DetailsForProduct/     # refactor
│       │   ├── UserCollection/        # refactor (personal shelf)
│       │   └── SearchByEmail/         # refactor
│       ├── CreateProduct/             # refactor
│       ├── Support/                   # refactor
│       ├── NotFound/                  # refactor
│       └── index.ts                   # keep
├── Utils/
│   └── _Navigator.tsx                 # refactor: remove AuthProvide dep
├── App.tsx                            # was App.jsx: remove AuthProvide
└── index.tsx                          # was index.jsx
```

### 3.2 — AuthSlicer (Zustand) — Replaces AuthContext

File: `src/Store/Slicers/AuthSlicer.ts`

```ts
export interface IAuthSlicer {
  accessToken: string;
  email: string;
  userId: string;
  userRole: 'user' | 'support';
  isVerify: boolean;
  isAuthenticated: boolean;

  onSubmitLogin: (data: { email: string; password: string }) => Promise<any>;
  onSubmitLogout: () => Promise<void>;
  onSubmitRegister: (data: { email: string; password: string; year: string }) => Promise<any>;
  verifyAccountWithToken: (token: string) => Promise<void>;
  _setAuthData: (tokenData: any) => void;
  _clearAuthData: () => void;
}
```

State is persisted via Zustand `persist` middleware to `localStorage` key `@Product_TokenData` (same key as before — backward compatible).

`_useStoreZ.ts` update: add `AuthSlicer` to combined store type and slice composition. Add `persist` middleware for auth fields only using `partialize`.

### 3.3 — CommonSlicer `search` Map

The `Map` type is not JSON-serializable. Since form state is ephemeral (should not survive page refresh), the `search` slice is **excluded from persist**. No change to existing Map-based logic.

### 3.4 — App.tsx

Remove `AuthProvide` wrapper. `App.tsx` becomes:
```tsx
import { NavBar } from './component/molecules';
import { Footer } from './component/molecules';
import { Navigator } from './Utils';

const App = () => (
  <>
    <NavBar />
    <main>
      <Navigator />
    </main>
    <Footer />
  </>
);
```

### 3.5 — Routing (Navigator)

No route changes. `_Navigator.tsx` updated to remove `useAuthContext` — reads `userRole` from `useStoreZ()`.

---

## Phase 4 — Page-by-Page Redesign

### 4.1 — Login / Register Page (`/auth/login`, `/auth/register`)

**Design equivalent:** Auth screen from `bookshelf_app_prototype.html`

**New structure:**
```
LoginPage
├── div.login-wrap (flex)
│   ├── div.login-left (decorative panel — dark bg, tagline, book spines, quote)
│   └── div.login-right (420px, centered)
│       └── div.login-card
│           ├── div.login-head (h2 + subtitle)
│           ├── AuthTabs (Login / Register tab switcher)
│           ├── [Login form] or [Register form] (conditionally rendered)
│           └── div.login-footer (Terms of service text)
```

The current design has Login and Register as separate routes. The new design combines them on one page with tabs. **Decision:** Keep separate routes but render both tabs on the same visual layout. When at `/auth/login`, Login tab is active; at `/auth/register`, Register tab is active. Switching tabs navigates via `useNavigate`.

**Login form elements:**
- Email input
- Password input
- "Sign in" button (`Button` variant `primary`)
- Divider "or"
- "Sign in with email link" button (variant `ghost`) — **disabled, tooltip "Coming soon"**

**Register form elements:**
- Email input
- Password input
- Year input (birth year)
- "Create account" button (`Button` variant `primary`)

**Note:** The design shows a "Name" field in Register but the API only accepts email, password, year. The Name field is omitted to match the API contract.

**State:** Uses `useStoreZ()` for `search` (form values) and `onSubmitLogin`/`onSubmitRegister`/`onSubmitLogout` (from AuthSlicer).

**No AuthContext usage** after Phase 3 migration.

### 4.2 — Book Catalog Page (`/`, `/book`)

**Design equivalent:** Book List screen from `bookshelf_app_prototype.html`

**New structure:**
```
ProductsPage
├── section.page-wrap
│   ├── div.list-header (h1 title + subtitle)
│   ├── div.search-row (Input with search icon + optional filters)
│   ├── FilterPills (All / To read / Reading / Read / Listening / Listened)
│   ├── BookGrid (loading: Skeleton | loaded: grid of BookCards)
│   └── Pagination
```

**Filter pills:** Connect to status filter. When a status pill is active, the route fetches `GET /product/status/:statusId` if user is authenticated, or uses client-side filter on `GET /product` if not authenticated. If not authenticated, status-specific pills are hidden.

**State:** `useStoreZ()` — `products`, `fetchProducts`, `isLoadingProducts`, `pageLimit`, `setPageLimit`, `productStates`, `isAuthenticated`.

**ViewType toggle (grid/list):** Kept from current implementation via `useViewType` hook.

### 4.3 — Book Detail Page (`/book/:id`)

**Design equivalent:** Book Detail screen from `bookshelf_app_prototype.html`

**New structure:**
```
DetailsForProductPage
├── div.page-wrap--narrow
│   ├── Button (back — variant `text`, "← Back to catalog")
│   └── div.detail-grid (220px cover + 1fr details)
│       ├── div.detail-cover (BookCover with gradient fallback)
│       └── div.detail-right
│           ├── div.detail-genre (uppercase, accent color)
│           ├── h1.detail-title (Playfair Display)
│           ├── div.detail-author
│           ├── div.detail-stats (3 stats: pages, year, rating)  ← Coming soon data
│           ├── p.detail-desc                                     ← Coming soon
│           ├── [if authenticated] Status action buttons
│           └── [if authenticated] Share box (view friend's shelf)
```

**Coming soon UI elements on this page:** pages, year, rating, description — rendered with `—` placeholder value. The UI elements are visible but data is empty. This is documented in `future-features.md`.

**Status buttons:** Map `productStates` (from API) to button group. Selected state highlighted. On click: `addingProductState()` from Zustand.

**Share box:** Email input + "View shelf" button → navigates to `/search/${email}`.

**State:** `useStoreZ()` — `productById`, `fetchProductById`, `productStates`, `productState`, `fetchProductState`, `addingProductState`, `isLoadingProduct`, `email` (from AuthSlicer), `isAuthenticated`.

### 4.4 — Personal Shelf / Profile Page (`/collections`)

**Design equivalent:** Profile screen from `bookshelf_profile_search.html`

**New structure:**
```
UserCollectionPage
├── div.profile-wrap.page-wrap
│   ├── div.profile-header
│   │   ├── Avatar size=lg (initials from email)
│   │   ├── div.profile-info (name, email, stats)
│   │   └── Button "Settings" (variant `outline`, disabled — Coming soon)
│   ├── ProgressBar (Reading goal — Coming soon, static placeholder)
│   ├── div.friend-bar (email input + "View shelf" button)
│   ├── ShelfTabs (All / Reading / Read / Want / Listening / Listened + counts)
│   └── ShelfGrid (ShelfCards) or loading skeleton
```

**Stats:** `stat-total`, `stat-read`, `stat-reading`, `stat-listened` — derived client-side from tab counts (fetched from API per status type). Each count comes from `productCollection.count` per status fetch. Initial fetch loads all statuses and derives counts.

**ShelfTabs count:** Fetch per-status counts by calling `fetchProductCollection` for each status on mount.

**Friend shelf bar:** On submit → `navigate('/search/${email}')`.

**State:** `useStoreZ()` — `productCollection`, `fetchProductCollection`, `productStates`, `isLoadingProductCollection`, `pageLimit`, `email` (AuthSlicer), `isAuthenticated`.

**Search modal:** Triggered from NavBar `profile` mode search trigger. `SearchModal` component overlays.

### 4.5 — Search By Email Page (`/search/:email`)

**Design equivalent:** Partial — maps to "friend shelf" concept. No dedicated screen in design → apply design system by analogy.

**New structure (by analogy with UserCollection / Catalog):**
```
SearchByEmailPage
├── div.page-wrap
│   ├── div.list-header (h1 "Viewing shelf for {email}")
│   ├── ShelfGrid or BookGrid
│   └── Pagination
```

**State:** `useStoreZ()` — `productByEmail`, `fetchProductsForEmail`, `isLoadingProductByEmails`, `pageLimit`.

### 4.6 — Create Product Page (`/create`)

**No design equivalent** — apply design system by analogy with Auth page form layout.

**New structure:**
```
CreateProductPage
├── div.page-wrap (centered, narrow)
│   ├── h1 (Playfair Display, TEXTS.CREATE.TITLE)
│   └── div.form-card (white bg, border, rounded-xl, padding)
│       └── form
│           ├── Input (Author name)
│           ├── Input (Book title)
│           ├── Input (Genre)
│           ├── Input type=file (Cover image)
│           └── Button type=submit (variant `primary`)
```

**State:** `useStoreZ()` — `addProductWithImage`, `isLoadingProductAddition`, `isProductAdded`, `search`.

### 4.7 — Support Chat Page (`/support`)

**No design equivalent** — apply design system by analogy. Keep existing functionality unchanged, apply design tokens.

Style changes:
- Container uses `--cream` background, `--border-default` borders
- Chat bubbles use accent colors
- Input uses new Input atom

### 4.8 — Email Verify Page (`/auth/verify/:verifyToken`)

**No design equivalent** — apply design system by analogy. Currently renders nothing. After redesign: show a simple card with a status message (verifying / success / error).

### 4.9 — NotFound Page (`*`)

**No design equivalent** — apply design system by analogy.

New structure: centered page with Playfair Display large "404", subtitle "Page not found", `Button` back to home.

---

## Phase 5 — "Coming Soon" UI and `future-features.md`

### 5.1 — Non-functional UI elements list

| Element | Page | Interaction | Strategy |
|---------|------|-------------|----------|
| Book page count ("Страници") | Detail | Display only | Show `—` placeholder; `title` attribute: "Coming soon" |
| Book publication year | Detail | Display only | Show `—` placeholder |
| Book rating (★) | Detail | Display only | Show `—` placeholder |
| Book description | Detail | Display only | Show "Description coming soon." |
| "Sign in with email link" button | Login | Click | `disabled` attribute + tooltip "Coming soon" via `title` |
| Reading goal progress bar | Profile | Interact/edit | Rendered static at 0%; "Coming soon" tooltip on click area |
| Profile "Settings" button | Profile | Click | `disabled` attribute + tooltip "Coming soon" |
| "Remove from shelf" button | Shelf card | Click | `disabled` attribute + tooltip "Coming soon" |

### 5.2 — Strategy per element type

- **Display-only missing data:** Render `—` or placeholder text. No disabled state needed.
- **Clickable disabled:** Use `disabled` HTML attribute (for `<button>`) + `title="Coming soon"` tooltip. Style with `opacity: 0.5; cursor: not-allowed`.
- **Progress bar:** Render with `current=0, goal=20`. No edit UI.

### 5.3 — `docs/future-features.md` structure

File location: `client-book-library/docs/future-features.md`

```markdown
# Future Features

Features that are visually implemented in the UI but require backend support to function.

## Book Metadata (Pages, Year, Rating, Description)
- **Page:** Book Detail (`/book/:id`)
- **Expected behavior:** Show page count, publication year, star rating, and description text for each book.
- **API gap:** The `Product` model (table) does not have `pages`, `year`, `rating`, or `description` fields.
- **Required API change:** Add fields to the Product model and migration; expose in `GET /product/:id` response.

## Magic Link Login
- **Page:** Login (`/auth/login`)
- **Expected behavior:** Send a one-time sign-in link to user's email; clicking it logs the user in without a password.
- **API gap:** No magic link / passwordless auth endpoint exists.
- **Required API change:** New endpoint `POST /auth/magic-link` and `GET /auth/magic-link/verify/:token`.

## Reading Goal Progress
- **Page:** Profile / Shelf (`/collections`)
- **Expected behavior:** User sets an annual reading goal (e.g., 20 books); a progress bar shows books read vs goal.
- **API gap:** No reading goal storage or progress endpoint.
- **Required API change:** New endpoint `POST /user/goal` and `GET /user/goal`.

## Profile Settings
- **Page:** Profile / Shelf (`/collections`)
- **Expected behavior:** User can edit profile settings (display name, email, password, avatar).
- **API gap:** No user settings / profile update endpoint.
- **Required API change:** New endpoint `PUT /user/profile`.

## Remove Book from Shelf
- **Page:** Profile / Shelf (`/collections`)
- **Expected behavior:** Clicking "Remove" on a shelf card removes the book from the user's personal library.
- **API gap:** The `POST /product/status` endpoint only upserts a status. There is no delete/remove endpoint for product status.
- **Required API change:** New endpoint `DELETE /product/status/:productId`.
```

---

## Phase 6 — Responsive & Accessibility

### 6.1 — Responsive behavior from design

The design files have **no media queries**. All responsive behavior is added by best practices per the rules.

### 6.2 — Responsive implementation plan

Apply mobile-first breakpoints (from rules: sm 640px, md 768px, lg 1024px, xl 1280px):

| Component | Mobile (base) | md+ | lg+ |
|-----------|--------------|-----|-----|
| NavBar | hamburger menu or stacked links | full horizontal nav | same |
| Login page `.login-wrap` | single column (form only) | two-column (left panel visible) | same |
| Book grid `.grid-auto-fill-180` | 1–2 columns (minmax 140px) | 3–4 columns | 5–6 columns |
| Shelf grid `.grid-auto-fill-160` | 2 columns | 3–4 columns | 5 columns |
| Detail page `.detail-grid` | single column (cover above content) | `220px 1fr` two-column | same |
| QueryBar | stacked (search full-width, selectors below) | horizontal row | same |
| FilterPills | `flex-wrap: wrap` (already) | same | same |
| ShelfTabs | scroll horizontally (overflow-x: auto) | show all tabs | same |
| Page wrap padding | 16px horizontal | 24px | 40px |

NavBar hamburger: on mobile, nav links collapse into a toggle button. Clicking shows a dropdown or drawer.

### 6.3 — Accessibility additions (best practices)

Per accessibility rules (WCAG 2.1 AA):

- **NavBar:** `<nav aria-label="Main navigation">`, `<button aria-expanded>` for hamburger toggle.
- **Auth forms:** `<form>`, every input has `<label htmlFor>`, error messages linked via `aria-describedby`, required fields have `aria-required="true"`.
- **Book cards:** `<article>`, image `alt={productTitle}` (or empty string if decorative), `<h2>` for title, action buttons have descriptive `aria-label` (e.g., `aria-label="Mark as Reading"`).
- **Filter pills / Shelf tabs:** `role="tablist"`, each tab `role="tab"`, `aria-selected`, `aria-controls`.
- **Modal:** `role="dialog"`, `aria-modal="true"`, `aria-labelledby` pointing to modal title, focus trap on open, `Escape` key closes, focus returns to trigger on close.
- **Status badges:** Include text, not just color (already done in design — text is shown).
- **Disabled buttons:** Use `disabled` attribute (not just `aria-disabled`) for truly non-functional buttons.
- **"Coming soon" tooltips:** Use `title` attribute + `aria-label` for screen reader context.
- **Focus order:** Follows reading order (left-to-right, top-to-bottom).
- **Skip link:** `<a href="#main-content" class="sr-only">Skip to main content</a>` added to `App.tsx` above `<NavBar>`.
- **Color contrast:** All text colors from design tokens meet 4.5:1 ratio (e.g., `--ink` on `--cream` is well above threshold). Status badge light variants verified: dark text on light background.
- **`<main>`:** Wrap page content in `<main id="main-content">` (in `App.tsx`).
- **`<footer>`:** Semantic `<footer>` element (already exists).
- **Images:** All `<img>` tags have `alt` (book cover: `alt={productTitle}`, decorative: `alt=""`).

---

## Phase 7 — Cleanup & Verification

### 7.1 — Files to delete after rewrite

| File | Reason |
|------|--------|
| `src/App.css` | Replaced by `src/styles/globals.css` |
| `src/contexts/AuthContext.tsx` | Replaced by `AuthSlicer` |
| `src/component/atoms/Button/_Button.tsx` | Replaced by `Button/Button.tsx` |
| `src/component/atoms/InputField/_InputField.tsx` | Replaced by `Input/Input.tsx` |
| `src/component/molecules/Header/_Header.tsx` | Replaced by `NavBar/NavBar.tsx` |
| `src/component/organisms/ProductCard/_ProductCard.tsx` | Replaced by `BookCard/BookCard.tsx` |
| `src/component/organisms/ListRenderProduct/_ListRenderProduct.tsx` | Replaced by `BookGrid/BookGrid.tsx` |
| `src/Skeleton/organisms/ListRenderProductSkeleton/` | Merged into `BookGrid` |
| Old `_Header.module.css`, `_ProductCard.module.css`, `_ListRenderProduct.module.css` | Deleted with parent components |

### 7.2 — Manual verification checklist (before sign-off)

**Visual:**
- [ ] All pages match the design tokens (correct colors, fonts, spacing)
- [ ] Login page: two-column layout (md+), single column (mobile)
- [ ] Catalog page: grid of book cards with search + filter pills
- [ ] Book detail page: two-column layout (md+), correct metadata display
- [ ] Profile page: avatar, stats, progress bar, friend bar, shelf tabs, shelf grid
- [ ] Search modal: overlay with results
- [ ] All "Coming soon" elements are visually rendered but disabled
- [ ] Footer rendered on all pages
- [ ] NavBar matches authenticated / unauthenticated states

**Functionality:**
- [ ] Login works; token persisted in localStorage; user state reflects in NavBar
- [ ] Register works; redirects to login after success
- [ ] Logout clears all auth state and socket connection
- [ ] Email verification page triggers verification on load
- [ ] Catalog: search filters books, pagination works, view type toggle works
- [ ] Catalog: book cards link to detail page
- [ ] Book detail: status buttons change book state (authenticated user only)
- [ ] Book detail: share box navigates to `/search/{email}`
- [ ] Personal shelf: tabs filter by status, counts shown
- [ ] Personal shelf: friend bar navigates to `/search/{email}`
- [ ] Search by email: shows correct user's books
- [ ] Create product: form submits and creates new book (support role)
- [ ] Support chat page: rooms, messages, send functionality (support role)
- [ ] Customer support widget: opens/closes, sends messages
- [ ] NewProductModal: appears on new book socket event, auto-closes after 5s
- [ ] Socket connection established on app load
- [ ] NotFound page shown for unknown routes

**State management:**
- [ ] Auth state persists across page refresh (localStorage via Zustand persist)
- [ ] AuthContext fully removed — no `useAuthContext` calls remain
- [ ] All components read auth from `useStoreZ()`
- [ ] Product state, modal state, support state work as before

---

## API Changes

**No API changes needed.**

All design elements that require new data fields (book pages, year, rating, description, magic link, reading goal, remove from shelf) are implemented as "Coming soon" UI with disabled interactions. They are documented in `docs/future-features.md` for future backend work.

The existing API contract is fully preserved. The client continues to call the same endpoints with the same request/response shapes.

---

## Risks

| Risk | Impact | Mitigation |
|------|--------|-----------|
| `AuthContext` → `AuthSlicer` migration touches many files | High — every component using `useAuthContext` must change | Systematic search-replace; run TypeScript compiler after each file to catch misses |
| Zustand `persist` + `Map` type in `search` | Medium — `Map` breaks JSON serialization | Exclude `search` from persist via `partialize`; test thoroughly |
| `App.jsx` → `.tsx` conversion | Low | Straightforward; TypeScript strict mode may flag some types |
| Status ID ↔ key mapping inconsistency | Medium — currently ad-hoc per component | Centralize in `statusMap.ts` in Phase 1; update all consumers in Phase 4 |
| `productType` vs `authorGenre` field ambiguity | Low | Check `productStatusService` JOIN query to confirm which field is the display genre; use consistently |
| Design has no responsive breakpoints | Medium — mobile view undefined | Apply systematic breakpoints per Phase 6 table; test on mobile viewport |
| `_useStoreZ` naming inconsistency (underscore prefix, inconsistent with rules) | Low | Rename to `useStoreZ` (exported name already correct); update the file name only if desired |
| Socket re-connection on auth state change | Medium | `onSubmitLogout` already calls `SocketService.disconnect()` then `SocketService.connect()` — keep this pattern |

---

## Validation

Validation is manual — no automated tests exist or are added.

**Validation process:**
1. Developer runs `npm run dev` and opens the app in a browser.
2. Walk through every page in the verification checklist in Phase 7.2 — both authenticated and unauthenticated states.
3. Open browser DevTools: check Console for errors, check Network tab to verify API calls match the existing contract.
4. Check localStorage: verify auth token persists after refresh and is cleared after logout.
5. Resize browser to mobile width (375px) and verify responsive layouts.
6. Run `npm run build` to verify TypeScript compilation with no errors.
