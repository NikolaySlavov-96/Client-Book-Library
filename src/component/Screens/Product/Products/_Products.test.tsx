import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';

import Products from './_Products';
import { TEXTS } from '../../../../constants';
import { EStatusId } from '../../../../constants/statusMap';

const mockFetchProducts = jest.fn();

let storeValue: Record<string, unknown>;

jest.mock('../../../../hooks', () => ({
  useStoreZ: () => storeValue,
}));

const renderProducts = () =>
  render(
    <MemoryRouter>
      <Products />
    </MemoryRouter>
  );

describe('Products status filter', () => {
  beforeEach(() => {
    mockFetchProducts.mockReset();
    storeValue = {
      products: { count: 0, rows: [] },
      fetchProducts: mockFetchProducts,
      pageLimit: 10,
      isLoadingProducts: false,
      isAuthenticated: true,
      addingProductState: jest.fn(),
    };
  });

  it('fetches with statusId = null on initial render', () => {
    renderProducts();
    expect(mockFetchProducts).toHaveBeenCalledWith(
      expect.objectContaining({ statusId: null })
    );
  });

  it('fetches with the mapped statusId when a status filter is chosen', async () => {
    renderProducts();
    mockFetchProducts.mockClear();

    await userEvent.click(screen.getByRole('button', { name: TEXTS.CATALOG_FILTER_READING }));

    expect(mockFetchProducts).toHaveBeenCalledWith(
      expect.objectContaining({ statusId: EStatusId.READING })
    );
  });

  it('hides status filters for guests', () => {
    storeValue.isAuthenticated = false;
    renderProducts();
    expect(screen.queryByRole('button', { name: TEXTS.CATALOG_FILTER_READING })).toBeNull();
  });
});
