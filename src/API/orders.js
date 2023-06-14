import { request } from "./request";

export const pedidos = async (token, userId, cliente, produtos) => {
  const headers = {
    'Authorization': `Bearer ${token}`
  };
  const body = {
    userId,
    client:cliente,
    products:produtos,
    status:"pendente",
    dateEntry:new Date()
  };

  const response = await request('orders', 'POST', headers, body);
  return response;
};

export const finalizados = async (token, orderId) => {
  const headers = {
    'Authorization': `Bearer ${token}`
  };
  const body = {
    orderId,
    status: "finalizado",
    dateEntry: new Date()
  };
  const response = await request(`orders/${orderId}`, 'PATCH', headers, body);
  return response;
};

export const obterPedidos = async (token) => {
  const headers = {
    'Authorization': `Bearer ${token}`
  };
  const response = await request('orders', 'GET', headers);
  return response;
};






// const API_URL = 'http://localhost:8080'

// export const pedidos = (token, userId, cliente, produtos) => {
//   return fetch(`${API_URL}/orders`, {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//       'Authorization': `Bearer ${token}`
//     },
//     body: JSON.stringify({
//       userId, 
//       client: cliente,
//       products: produtos,
//       status: "pendente",
//       dateEntry: new Date()
//     })
//   })
// }

// export const obterPedidos = (token) => {
//   return fetch(`${API_URL}/orders`, {
//     method: "GET",
//     headers: {
//       "Content-Type": "application/json",
//       'Authorization': `Bearer ${token}`
//     },
//   })
// }

// export const finalizados = (token, orderId) => {
//   return fetch(`${API_URL}/orders/${orderId}`, {
//     method: "PATCH",
//     headers: {
//       "Content-Type": "application/json",
//       'Authorization': `Bearer ${token}`
//     },
//     body: JSON.stringify({
//       orderId,
//       status: "finalizado",
//       dateEntry: new Date()
//     })
//   })
// }


