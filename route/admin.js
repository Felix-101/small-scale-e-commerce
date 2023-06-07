const express = require('express')
const path = require('path')

const router = express.Router()

const productsCtrl = require('../controllers/adminCtrl')

const routeCtrl = require('../controllers/adminCtrl')
// we areusing this cause of a post method

router.get('/add-product', productsCtrl.getAddProduct)

// to route the page after the data has been parsed
router.post('/add-product', routeCtrl.postRoute)

router.get('/product', productsCtrl.getProduct)
// you do not need the path to be "/admin/product" here because this admin.js is being rendered in server001.js and admin has been added to it already
// varible.exportedfunction

router.get('/edit-product/:productId', productsCtrl.editProduct)

router.post('/edit-product', routeCtrl.postEditProduct)

router.post('/delete-product', routeCtrl.postDeleteProduct)
module.exports = router

/*  
exports.routes=router
// exporting the router function, it is being stored inside a key becuase we are not using module exports

exports.product=products
// the array products is being stored in product, exported and used in shop.js
*/
