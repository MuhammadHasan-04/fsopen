import axios from 'axios'
const baseUrl = '/api/login'



const login = async (credentials) => {
  console.log('Mock login with:', credentials)

  // Simulate successful login response
  return Promise.resolve({
    username: credentials.username,
    name: 'Mock User',
    token: '1234567890abcdef'
  })
}




export default {login}