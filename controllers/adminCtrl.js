const Product = require('../models/product')

exports.getAddProduct = (req, res, next) => {
  res.render('../views/admin/edit-product.ejs', {
    pageTitle: 'add-product',
    path: '/admin/add-product',
    editing: false,
  })
}

exports.postRoute = (req, res, next) => {
  const title = req.body.title
  const imageUrl = req.body.imageUrl
  const price = req.body.price
  const description = req.body.description
  const product = new Product(null, title, imageUrl, description, price)
  product.save() // in the save function products is pushing the data
  res.redirect('/')
}

exports.editProduct = (req, res, next) => {
  const editMode = req.query.edit
  if (!editMode) {
    return res.redirect('/')
  }
  const proId = req.params.productId
  Product.findById(proId, (product) => {
    if (!product) {
      return res.redirect('/')
    }
    res.render('admin/edit-product', {
      pageTitle: 'Edit Product',
      path: '/admin/edit-product',
      editing: editMode,
      product: product,
    })
  })
}

exports.postEditProduct = (req, res, next) => {
  const proId = req.body.productId
  const updatedTitle = req.body.title
  const updatedPrice = req.body.price
  const updatedImageUrl = req.body.imageUrl
  const updatedDescription = req.body.description
  const updatedProduct = new Product(
    proId,
    updatedTitle,
    updatedImageUrl,
    updatedDescription,
    updatedPrice
  ).save()
  res.redirect('/admin/product')
}

exports.getProduct = (req, res, next) => {
  Product.fetchAll((products) => {
    // pro is holding all the data we received from the middleware above
    res.render('../views/admin/product-li.ejs', {
      pro: products,
      path: '/admin/product',
      pageTitle: 'Admin products',
    })
  })
}

exports.postDeleteProduct = (req, res, next) => {
  const proId = req.body.productId
  Product.deleteById(proId)
  res.redirect('/admin/product')
}
