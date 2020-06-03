const faker = require('faker')

const products = []

faker.seed(100)
for (let i = 1; i <= 50; i++) {
  products.push({
    id: i,
    title: faker.commerce.productName(),
    description: faker.lorem.text(),
    price: faker.commerce.price(0, 10000),
    rating: parseInt(faker.commerce.price(0, 5)),
    ratingCount: parseInt(faker.commerce.price(0, 10000)),
    image: 'https://cdn.vuetifyjs.com/images/cards/plane.jpg'
  })
}

module.exports = function () {
  return {
    products: products,
    orders: []
  }
}
