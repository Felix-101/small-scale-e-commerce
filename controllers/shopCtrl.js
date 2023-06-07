const Product = require('../models/product')
const Cart = require('../models/cart')

// in this we will be storing the products in a file check '../assignment/products' for previous works where an array was used

exports.getProducts = (req, res, next) => {
  Product.fetchAll((products) => {
    res.render('../views/shop/product-list.ejs', {
      pro: products,
      pageTitle: 'All-products',
      path: '/products',
    })
  }) // because there is a callback in the model(product.js) then we render the page inside fetchall becuase the data will be parsed there
}

exports.getProduct = (req, res, next) => {
  //params.productId is the function helping us to see product.id and use it

  const proId = req.params.productId

  /* when details in the products page is clicked it will render this page */

  Product.findById(proId, (product) => {
    //console.log(products)
    res.render('../views/shop/product-detail.ejs', {
      pro: product,
      pageTitle: product.title,
      path: '/products',
    })
  })
}

exports.getIndex = (req, res, next) => {
  Product.fetchAll((products) => {
    res.render('../views/shop/index.ejs', {
      pro: products,
      pageTitle: 'Shop',
      path: '/',
    })
  }) //
}

exports.getCart = (req, res, next) => {
  Cart.getCart((cart) => {
    Product.fetchAll((products) => {
      const cartProducts = []

      for (const product of products) {
        const cartProudctData = cart.products.find(
          (pro) => pro.id === product.id
        )

        if (cartProudctData) {
          cartProducts.push({ productData: product, qty: cartProudctData.qty })
        }
      }

      res.render('../views/shop/cart.ejs', {
        path: '/cart',
        pageTitle: 'Your cart',
        products: cartProducts,
      })
    })
  })
}
/* this will render the page(get method) */

exports.postCart = (req, res, next) => {
  const proId = req.body.productId
  Product.findById(proId, (product) => {
    Cart.addProduct(proId, product.price)
  })
  res.redirect('/cart')
}
/* this post method will allow us to send data from that page and load the get route above */

exports.postDeleteCartItem = (req, res, next) => {
  const proId = req.body.productId
  Product.findById(proId, (product) => {
    Cart.deleteProduct(proId, product.price)
    res.redirect('/cart')
  })
}

exports.getCheckout = (req, res, next) => {
  res.render('../views/shop/checkout.ejs', {
    path: '/checkout',
    pageTitle: 'Checkout',
  })
}

exports.getOrders = (req, res, next) => {
  res.render('../views/shop/orders.ejs', { pageTitle: 'orders' })
}

exports.get404 = (req, res, next) => {
  res.status(404).render('404', {
    pageTitle: 'Page-not-found',
    path: '/404',
  })
}
