const fs = require('fs')
const path = require('path')
const cart = require('./cart')

const p = path.join(
  path.dirname(require.main.filename),
  'data',
  'products.json'
)

const getProductsFromFile = (cb) => {
  fs.readFile(p, (err, fileContent) => {
    if (err) {
      cb([])
    } else {
      cb(JSON.parse(fileContent))
    }
  })
}

module.exports = class Product {
  constructor(id, title, imageUrl, description, price) {
    this.id = id
    this.title = title
    this.imageUrl = imageUrl
    this.description = description
    this.price = price
  }

  save() {
    getProductsFromFile((products) => {
      if (this.id) {
        const existingProductIndex = products.findIndex(
          (pro) => pro.id === this.id
        )

        const updatedProducts = [...products]
        updatedProducts[existingProductIndex] = this

        fs.writeFile(p, JSON.stringify(updatedProducts), (err) => {
          console.log(err)
        })
      } else {
        this.id = Math.random().toString()
        products.push(this)

        fs.writeFile(p, JSON.stringify(products), (err) => {
          console.log(err)
        })
      }
    })
  }

  static deleteById(id) {
    getProductsFromFile((products) => {
      const product = products.find((pro) => pro.id === id)

      const updatedProducts = products.filter((p) => p.id !== id)
      //filter is what is deleteing the item using its id

      fs.writeFile(p, JSON.stringify(updatedProducts), (err) => {
        if (!err) {
          cart.deleteProduct(id, product.price)
        }
      })
    })
  }

  static fetchAll(cb) {
    getProductsFromFile(cb)
  }

  static findById(id, cb) {
    getProductsFromFile((products) => {
      const product = products.find((p) => p.id === id)
      cb(product)
    })
  }
}
/*  const productIndex = products.findIndex((p) => p.id === id)
      cb(productIndex) for deletebyid*/
