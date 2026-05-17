# Future Features

Features intentionally left as "Coming Soon" in the current redesign.
All UI placeholders display `—` or a disabled state with the tooltip "Coming soon".

## Book Detail Page

- **Pages count** — API does not expose a page count field. Shown as `—`.
- **Publication year** — API does not expose a year field. Shown as `—`.
- **Star rating** — No rating system exists in the API. Shown as `—`.
- **Book description** — API does not return a description. Shown as placeholder text.

## Auth Page

- **Sign in with email link** — Magic-link authentication not yet implemented in the API.
  The button is rendered but is `disabled` with tooltip "Coming soon".

## Shelf (UserCollection)

- **Remove from shelf** — No `DELETE /product-state` endpoint exists in the API.
  The remove button on ShelfCard is `disabled` with tooltip "Coming soon".

- **Reading goal year** — The goal (e.g. 12 books/year) is currently hardcoded at 12.
  A user-editable goal field requires a new API endpoint.

## Profile

- **Settings page** — User profile editing (avatar, name, notification preferences) requires new API endpoints.

## Catalog

- **Filter by status (server-side)** — The filter pills currently filter client-side from the loaded page.
  True server-side filtering by status requires a new API query parameter.

- **Layout toggle (grid/list)** — UI toggle exists but list layout is functionally identical to grid at small screen widths.

## General

- **Pagination on shelf/search-by-email** — UserCollection and SearchByEmail currently fetch all records (limit=999).
  Proper cursor-based pagination requires API changes.
