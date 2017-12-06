const server = 'http://192.168.11.205:8200'
const client = window.d2c.client || new window.d2c.search({
  host: server
})
window.d2c.client = client

export default client
