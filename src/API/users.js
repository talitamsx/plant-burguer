import { request } from "./request"

const login = (email, senha) => {
 return request('login', 'POST', {}, {email, password:senha}  )
}

export default login

// const login = (email, senha) => {
//     return fetch(`${API_URL}/login`, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//         // 'Content-Type': 'application/x-www-form-urlencoded',
//       },
//       body: JSON.stringify({
//         email: email,
//         password: senha,
//       })
//     })