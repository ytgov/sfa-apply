import fetch from 'node-fetch';

const environment = require('../../environments.js')
const base_url = environment.config.api.base_url;

export const api = async (endpoint, options) => {
  var params = { 
    //method: 'GET',
    headers: {
      //'Content-Type': 'application/json',
      'X-API-Key': '86823ecf-e64f-42d2-8ea7-a0984299328c'
    },
    ...options
  }
  console.log("fetching", `${base_url}${endpoint}`, params)
  const response = await fetch(`${base_url}${endpoint}`);
  const data = await response.json();
  return data
}