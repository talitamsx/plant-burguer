import { request } from "./request"

const produtos = async (token) => {
  const headers = {
    'Authorization': `Bearer ${token}`
  };

  const response = await request('products', 'GET', headers);
  return response;
};

export default produtos;