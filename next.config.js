module.exports = {
  async rewrites() {
    return [
      {
        source: '/hello',
        destination: 'http://localhost:5000/hello' // Proxy to Backend
      }
    ]
  }
}