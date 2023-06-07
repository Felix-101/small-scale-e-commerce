const express = require('express')
const path = require('path')

const router = express.Router()
const shopctrl = require('../controllers/shopCtrl')

router.get('/', shopctrl.getIndex)

router.get('/products', shopctrl.getProducts)

router.get('/products/:productId', shopctrl.getProduct)
// the colon signals to express that it should not look for a route but instead the route can be anything and it can load it. a more specific route has to be above this

router.get('/cart', shopctrl.getCart)
router.post('/cart', shopctrl.postCart)
router.post('/cart-delete-item', shopctrl.postDeleteCartItem)

router.get('/checkout', shopctrl.getCheckout)
router.get('orders', shopctrl.getOrders)
module.exports = router
//exporting the entire file
