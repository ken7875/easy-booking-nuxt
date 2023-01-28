import myFetch from '@/utils/myFetch';

export const getHotHotels = () => {
  return myFetch('/products/hotProducts', {
    method: 'GET'
  });
};

export const getAllHotels = (query = '') => {
  const path = query ? `products?${query}` : 'products';
  return myFetch(`${path}`, {
    method: 'GET'
  });
};
